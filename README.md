# VidRocket - YouTube Downloader

A full-stack web app for downloading YouTube videos and audio in multiple formats and quality levels.

## Features

- Fetch video info (title, thumbnail, duration) from any YouTube URL
- Download videos in MP4 at various resolutions (720p up to 8K UHD)
- Download audio as MP3
- Support for additional formats: WebM, MKV, MOV
- Real-time download progress tracking
- Supports youtube.com, youtu.be, Shorts, and embed URLs

## Tech Stack

**Frontend:** React 19, React Router, Vite, Tailwind CSS, Axios

**Backend:** Django 6, Django REST Framework, Celery, Redis, yt-dlp, SQLite

## Project Structure

```
├── frontend/
│   └── src/
│       ├── components/     # React components (Navbar, SearchBox, VideoInfo, ProgressBar, FormatTable)
│       ├── styles/         # CSS stylesheets
│       ├── api/api.js      # Axios client
│       └── App.jsx         # Root component
└── backend/
    ├── api/
    │   ├── views.py        # API endpoints
    │   ├── tasks.py        # Celery async download task
    │   ├── utils.py        # yt-dlp helpers and format parsing
    │   └── urls.py         # API routes
    └── backend/
        ├── settings.py     # Django + Celery configuration
        └── celery.py       # Celery app setup
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/info/` | Fetch video metadata and available formats |
| POST | `/api/download/` | Start an async download, returns `task_id` |
| GET | `/api/progress/<task_id>/` | Poll download progress |

## Getting Started

### Prerequisites

- Python 3.10+
- Node.js 18+
- Redis (must be running on `localhost:6379`)

### Backend

```bash
cd backend
pip install django djangorestframework django-cors-headers celery redis yt-dlp
python manage.py migrate
python manage.py runserver
```

In a separate terminal, start the Celery worker:

```bash
cd backend
celery -A backend worker -l info
```

The API will be available at `http://127.0.0.1:8000`.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

The app will be available at `http://localhost:5173`.

## Downloads

Downloaded files are saved to `backend/downloads/` using the naming pattern:

```
<title>_<video_id>_<height>p.<ext>
```

