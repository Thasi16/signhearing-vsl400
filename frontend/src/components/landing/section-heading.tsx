export function SectionHeading({
  chapter,
  title,
  number,
}: {
  chapter: string;
  title: string;
  number: string;
}) {
  return (
    <>
      <p className="eyebrow">
        <span className="chapter-index" aria-hidden="true">
          {number}
        </span>
        {chapter}
      </p>
      <h2>{title}</h2>
    </>
  );
}
