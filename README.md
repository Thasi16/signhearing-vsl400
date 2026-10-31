# SignHearing — Next.js + FastAPI

Landing kể chuyện và khu học tập VSL, giữ nguyên thương hiệu, nội dung VI/EN,
video demo và các module đã merge. Nhánh migration: `feature/modern-fullstack`.

## Chạy local

Yêu cầu Node.js 22+, Python 3.12+ và uv. PostgreSQL không cần để xem trang hoặc chạy các module hiện có.

Terminal 1:

```powershell
cd frontend
npm ci
npm run dev
```

Terminal 2, từ thư mục repo:

```powershell
cd backend
uv sync --locked --python 3.12
uv run uvicorn app.main:app --host 127.0.0.1 --port 8001 --reload
```

- Trang chủ VI/EN: http://127.0.0.1:3000/?lang=vi / http://127.0.0.1:3000/?lang=en
- Khu học: http://127.0.0.1:3000/app
- API health: http://127.0.0.1:8001/api/health
- Server Python cũ vẫn chạy độc lập: `python serve.py --port 8000`.

Máy hiện tại có Node portable trong `D:\SignHearing\.tools\node-v22.23.4-win-x64`.
Nếu chưa có Node trong PATH, xem hướng dẫn đầy đủ bên dưới. Có thể chạy
`scripts/start-modern.ps1` để mở cả hai server, ghi log trong `.runtime/`.

## Kiến trúc

`frontend/`: Next App Router, React, TypeScript strict, Tailwind v4, component theo
mẫu shadcn/ui với Radix, Motion và Lucide. Landing và nội dung dùng Server Components.

`backend/`: FastAPI, Pydantic settings, SQLAlchemy 2.x, Alembic, cấu hình PostgreSQL.
Health và landing không yêu cầu database. Chưa tạo bảng nghiệp vụ hoặc dữ liệu giả.

`/app/*`: Next chuyển tiếp cùng origin sang FastAPI, dùng lại các module Python/JS
đang có với giao diện dùng chung mới. Đây là migration từng bước, chưa viết lại
8 module thành React. Giữ nguyên `SH.store`, quiz, video và dữ liệu mẫu đã merge.
Tiến độ vẫn lưu trong trình duyệt và phụ thuộc origin/port; không bị xóa hoặc gửi lên DB.

## Nội dung và nhận diện

Logo/mascot gốc giữ nguyên byte và tỷ lệ; dùng màu CSS gốc navy/blue/pink/sky.
Giữ đầy đủ 499 key dịch và nội dung gốc, thứ tự câu chuyện, hai CTA, nguồn trích dẫn,
thông báo thiếu liên hệ và trạng thái học liệu chưa chính thức.
`npm run dev` / `npm run build` đồng bộ locale và assets từ nguồn cũ.
Không sửa trực tiếp `frontend/src/locales/`.

## Kiểm tra

Frontend: `npm run typecheck`, `npm run lint`, `npm run format:check`, `npm test`,
`npm run build`, `npm run test:http` (khi hai server đang chạy).
Backend: `uv run pytest`, `uv run ruff check app tests alembic scripts`.
Kết quả thực tế và phần chưa xác minh nằm trong báo cáo bên dưới.

## Tài liệu

- [Hướng dẫn chạy, PostgreSQL, migration và giới hạn](docs/MODERN-DEVELOPMENT.md)
- [Audit ban đầu](docs/MIGRATION-AUDIT.md)
- [Design system](docs/DESIGN-SYSTEM.md)
- [Kết quả kiểm tra](docs/MODERNIZATION-RESULTS.md)
- [i18n dùng chung](docs/I18N.md)
- [Quy ước module gốc](docs/MODULES.md)
- [README trước migration, giữ nguyên](docs/LEGACY-README.md)

Không push hoặc merge nhánh migration khi chưa được cho phép.
