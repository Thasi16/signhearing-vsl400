"""Import syllabus words only; never read, copy or upload source videos.

Requires PyMuPDF. Usage: python -X utf8 scripts/import_vsl400_vocabulary.py PDF GLOSS_DIRECTORY
"""
import argparse
import json
from pathlib import Path
import re
import unicodedata

import fitz

ROOT = Path(__file__).resolve().parents[1]
EXPECTED_COUNTS = [19, 29, 22, 20, 16, 19, 10, 23, 30, 31, 24, 22, 22, 13, 18, 33, 39, 10]
ENGLISH_TITLES = [
    'Family & relatives', 'Basic communication actions & responses',
    'Time & times of day', 'Months & festivals', 'Weather, climate & seasons',
    'Food & drinks', 'Fruit', 'Cooking, flavours & shopping',
    'Clothing, accessories & colours', 'Household items & daily routines',
    'School & learning supplies', 'Occupations & the workplace',
    'Places, countries & distances', 'Transport & movement',
    'Sports & leisure', 'Appearance, health & physical properties',
    'Emotions, personality & judgements', 'Animals',
]


def read_lessons(pdf_path):
    with fitz.open(pdf_path) as pdf:
        pages = [page.get_text() for page in pdf]
    lessons = []
    for page_number, page in enumerate(pages, 1):
        matches = list(re.finditer(r'Bài (\d+): ([^\n]+)\n(\d+) từ vựng\n', page))
        for index, match in enumerate(matches):
            number, title, count = match.groups()
            body = page[match.end():matches[index + 1].start() if index + 1 < len(matches) else len(page)]
            body = re.split(r'Trọng tâm thực hành|\nHỌC PHẦN |\nHƯỚNG DẪN', body)[0]
            groups = re.findall(r'(?:Danh mục từ vựng:|• [^:\n]+:)\s*(.*?)(?:\.\s|\Z)', body, re.S)
            words = [re.sub(r'\s+', ' ', word).strip() for group in groups for word in group.split(',')]
            assert len(words) == int(count) == EXPECTED_COUNTS[int(number) - 1], (number, count, words)
            lessons.append({'id': int(number), 'title': title, 'words': words, 'page': page_number})
    assert [lesson['id'] for lesson in lessons] == list(range(1, 19)), 'Expected 18 ordered lessons'
    words = [word for lesson in lessons for word in lesson['words']]
    assert len(words) == len(set(words)) == 400, 'Expected 400 distinct syllabus words'
    return lessons


def slugify(word):
    value = unicodedata.normalize('NFD', word.lower().replace('đ', 'd'))
    value = ''.join(char for char in value if unicodedata.category(char) != 'Mn')
    return re.sub(r'[^a-z0-9]+', '-', value).strip('-')


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('pdf', type=Path)
    parser.add_argument('gloss_directory', type=Path)
    args = parser.parse_args()
    lessons = read_lessons(args.pdf)
    folders = {path.name for path in args.gloss_directory.iterdir() if path.is_dir()}
    words = {word for lesson in lessons for word in lesson['words']}
    assert words == folders, {'missing_folders': sorted(words - folders), 'outside_syllabus': sorted(folders - words)}
    path = ROOT / 'data/curriculum.json'
    data = json.loads(path.read_text(encoding='utf-8'))
    existing = {sign['word']['vi']: sign for sign in data['signs']}
    used_slugs = {sign['slug'] for word, sign in existing.items() if word in words}
    signs = []
    for imported, lesson in zip(lessons, data['lessons'], strict=True):
        assert imported['id'] == lesson['id']
        lesson.update(title={'vi': imported['title'], 'en': ENGLISH_TITLES[lesson['id'] - 1]},
                      status='published', signs=[], source_page=imported['page'])
        for word in imported['words']:
            sign = existing.get(word)
            if sign is None:
                base_slug = slugify(word)
                slug, suffix = base_slug, 2
                while slug in used_slugs:
                    slug = f'{base_slug}-{suffix}'
                    suffix += 1
                used_slugs.add(slug)
                sign = {'slug': slug, 'word': {'vi': word}, 'meaning': {},
                        'status': 'published', 'video': None, 'thumbnail': None,
                        'variants': [], 'ai_supported': False}
            sign['lesson'] = lesson['id']
            sign['source_gloss'] = word
            if not sign.get('video'):
                sign['status'] = 'published'
            # "Anh" is a country in lesson 13, not the family term in the old sample.
            if word == 'Anh':
                sign['word']['en'] = 'United Kingdom'
            if word == 'Ấm':
                sign['word']['en'] = 'Warm'
            # Keep existing video provenance; remove old generic placeholder meanings.
            if sign.get('collection') == 'local-videos':
                sign['meaning'] = {}
            lesson['signs'].append(sign['slug'])
            signs.append(sign)
    assert len({sign['slug'] for sign in signs}) == 400, 'Slug collision'
    data['signs'] = signs
    data['version'] = 'vsl400-syllabus-vocabulary-1'
    data['_readme'] = ('All 400 word labels and 18 lesson titles follow the supplied VSL 400 PDF. '
                       'Published lessons expose vocabulary; video availability is independent. '
                       'Only pre-existing sample videos are retained; no source videos were imported. '
                       'English word labels fall back to Vietnamese where a translation is not available.')
    data['_syllabus'] = {'file': args.pdf.name, 'lessons': 18, 'words': 400,
                         'gloss_directories_matched': len(folders)}
    data['_local_videos']['note'] = ('Existing sample videos mapped by exact Vietnamese gloss to the supplied syllabus. '
                                     'No additional videos imported; sample media remains unreviewed.')
    path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    print('Imported 400 word labels across 18 lessons / 8 modules; matched all 400 gloss folders.')
    print(f'Preserved {sum(bool(sign["video"]) for sign in signs)} existing video references; copied 0 videos.')


if __name__ == '__main__':
    main()
