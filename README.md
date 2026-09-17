# Library Management System

A full-stack Library Management System built with:
- **Frontend:** React (React Router, Axios, JWT auth)
- **Backend:** Django + Django REST Framework
- **Database:** SQLite

## Features
- Role-based users (Admin, Librarian, Member) with JWT authentication
- Book management (CRUD, search, categories)
- Member management
- Issue/Return system with automatic fine calculation
- Book reservation system
- Overdue reports and dashboard stats

## Setup Instructions

### Backend (Django)
```bash
cd backend
python -m venv venv
source venv/bin/activate      # venv\Scripts\activate on Windows
pip install -r requirements.txt
python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```
Backend runs at: http://localhost:8000

### Frontend (React)
```bash
cd frontend
npm install
npm start
```
Frontend runs at: http://localhost:3000

## API Overview
| Endpoint | Description |
|---|---|
| POST /api/auth/login/ | Login (returns JWT) |
| POST /api/accounts/register/ | Register user |
| GET/POST /api/books/ | List/create books |
| GET/POST /api/members/ | List/create members |
| GET/POST /api/transactions/issues/ | Issue a book |
| POST /api/transactions/issues/{id}/return_book/ | Return a book |
| GET/POST /api/transactions/reservations/ | Book reservations |

## Folder Structure
See project tree — `backend/` (Django apps: accounts, books, members, transactions),
`frontend/` (React app), `docs/` (place your SRS, ER diagram, DFD, screenshots, and report here for submission).

## Notes
- This is a starter scaffold — install dependencies and run migrations before first use.
- Update `SECRET_KEY` and `DEBUG` in `backend/library_backend/settings.py` before deploying.
