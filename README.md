# RentSecure

A rental platform with smart contract escrow protection for tenants and landlords.

## Tech Stack

- **Frontend**: React 19, Vite, TypeScript, Tailwind CSS
- **Backend**: Django, Django REST Framework

## Run Locally

**Prerequisites:** Node.js, Python 3.x

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Backend
```bash
cd backend
python -m venv venv
.\venv\Scripts\activate
python -m pip install django djangorestframework django-cors-headers
python manage.py migrate
python seed.py
python manage.py runserver
```

The frontend runs at `http://localhost:5173` and the backend API at `http://localhost:8000/api/`.
