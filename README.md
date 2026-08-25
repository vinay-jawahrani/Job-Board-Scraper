# Job Board Scraper - Full Stack Application

A modern, production-ready job board platform with automated web scraping capabilities. Built as a full-stack application with **FastAPI** (Python) backend and **React + TypeScript** frontend.

## Overview

Job Board Scraper is a complete job listing platform that allows users to:
- Browse and search for job opportunities
- Create and manage job postings
- Save jobs to a personal dashboard
- Automatically scrape job listings from external sources (Indeed, LinkedIn)

This project demonstrates production-grade full-stack development skills, including REST API design, authentication, database management, and modern frontend architecture.

## Why This Project?

This project was built to solve the problem of fragmented job searching. Instead of visiting multiple job boards, users can find, save, and track job opportunities in one place, with the added ability to automatically pull in listings from external sources.

## Key Features

### 🔐 Authentication & Authorization
- Secure JWT-based authentication
- Password hashing with bcrypt
- Protected routes and admin privileges

### 💼 Job Management
- Create, read, update, and delete job listings
- Advanced search and filtering (keyword, location, job type)
- Salary range validation

### 📊 User Dashboard
- Save jobs to personal collection
- View saved jobs at a glance
- Account management

### 🤖 Automated Scraping
- Background job scraping from external sources (Indeed, LinkedIn)
- Celery + Redis for async task processing
- Scraping logs and monitoring

### 🎨 Modern UI
- Responsive design with Tailwind CSS
- Clean, professional interface
- Real-time feedback with React Hot Toast

## Tech Stack

### Backend
- **FastAPI** - Modern Python web framework
- **PostgreSQL** - Production database
- **SQLAlchemy** - Async ORM
- **JWT** - Authentication
- **bcrypt** - Password hashing
- **Celery + Redis** - Background tasks
- **Selenium + BeautifulSoup** - Web scraping

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **React Router** - Navigation
- **React Query** - Data fetching
- **Axios** - API client
- **Lucide React** - Icons

### Deployment
- **Render** - Backend + Frontend hosting
- **PostgreSQL** - Render managed database
- **GitHub** - Version control

## Live Demo

- **Frontend**: [https://job-board-scraper-1.onrender.com](https://job-board-scraper-1.onrender.com)
- **API Documentation**: [https://job-board-scraper-bcfe.onrender.com/docs](https://job-board-scraper-bcfe.onrender.com/docs)

## Installation & Setup

### Prerequisites
- Python 3.12+
- Node.js 18+
- PostgreSQL (or SQLite for development)

### Backend Setup

```bash
# Clone the repository
git clone https://github.com/vinay-jawahrani/Job-Board-Scraper.git
cd Job-Board-Scraper/backend

# Create virtual environment
python -m venv venv
# Activate (Windows)
venv\Scripts\activate
# Activate (Mac/Linux)
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Set up environment variables
cp .env.example .env
# Edit .env with your database URL and secret key

# Run migrations
alembic upgrade head

# Start the server
uvicorn app.main:app --reload

Frontend Setup
bash
cd ../frontend

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your API URL

# Start the development server
npm run dev
Seeding Sample Data
bash
cd backend
python scripts/seed_jobs.py
API Endpoints
Method	Endpoint	Description
POST	/api/auth/register	Register new user
POST	/api/auth/login	Login user
GET	/api/auth/me	Get current user
GET	/api/jobs	Get all jobs
GET	/api/jobs/{id}	Get job by ID
POST	/api/jobs	Create job (auth required)
PUT	/api/jobs/{id}	Update job (auth required)
DELETE	/api/jobs/{id}	Delete job (admin only)
GET	/api/users/saved-jobs	Get saved jobs
POST	/api/users/saved-jobs	Save job
DELETE	/api/users/saved-jobs/{id}	Unsave job
POST	/api/scraper/trigger	Trigger scraping (admin only)
Database Schema
Users Table
Column	Type	Description
id	Integer	Primary key
email	String	Unique user email
password_hash	String	Hashed password
full_name	String	User's full name
is_admin	Boolean	Admin privileges
is_active	Boolean	Account status
created_at	DateTime	Account creation date
Jobs Table
Column	Type	Description
id	Integer	Primary key
title	String	Job title
company	String	Company name
description	Text	Job description
location	String	Job location
salary_min	Decimal	Minimum salary
salary_max	Decimal	Maximum salary
job_type	String	Full-time, remote, contract
source	String	Manual, indeed, linkedin
posted_date	DateTime	Job posting date
is_active	Boolean	Active status
Saved Jobs Table
Column	Type	Description
user_id	Integer	Foreign key to users
job_id	Integer	Foreign key to jobs
notes	Text	User notes
saved_at	DateTime	When saved
Project Structure
text
Job-Board-Scraper/
├── backend/
│   ├── app/
│   │   ├── core/          # Security, config, celery
│   │   ├── routers/       # API endpoints
│   │   ├── services/      # Business logic
│   │   ├── models.py      # Database models
│   │   ├── schemas.py     # Pydantic schemas
│   │   ├── database.py    # DB connection
│   │   ├── auth.py        # Auth dependencies
│   │   └── main.py        # FastAPI app
│   ├── scripts/           # Utility scripts
│   ├── tests/             # Unit tests
│   ├── requirements.txt
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── api/           # API client
│   │   ├── components/    # React components
│   │   ├── context/       # Auth context
│   │   ├── hooks/         # Custom hooks
│   │   ├── types/         # TypeScript types
│   │   ├── pages/         # Page components
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── package.json
│   └── vite.config.ts
└── README.md
Deployment
Deployed on Render
Backend:

Platform: Render Web Service

Database: Render PostgreSQL

Environment: Python 3.12.8

Frontend:

Platform: Render Static Site

Build: Vite

Environment: Node.js 18+

Environment Variables
Backend:

text
DATABASE_URL=postgresql+asyncpg://...
SECRET_KEY=your-secret-key
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
DEBUG=False
CORS_ORIGINS=https://frontend-url.com,http://localhost:5173
Frontend:

text
VITE_API_URL=https://backend-url.com
Testing
bash
# Backend tests
cd backend
pytest

# Frontend tests
cd frontend
npm test
Future Enhancements
□ Web scraping with Selenium for Indeed and LinkedIn
□ Email notifications for saved job alerts
□ Resume upload and parsing
□ Application tracking
□ Company profiles
□ Job recommendations
□ Mobile app (React Native)
Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

License
MIT License - see LICENSE file for details.

Contact
Author: Vinay Jawahrani

GitHub: @vinay-jawahrani

LinkedIn: [Your LinkedIn URL]

Acknowledgments
FastAPI for the excellent framework

React team for the amazing UI library

All open-source libraries used in this project

Made by Vinay Jawahrani

text

---

## 📝 Shorter Description (For LinkedIn, Resume, Portfolio)

```markdown
# Job Board Scraper

A full-stack job board platform with automated web scraping capabilities. Built with FastAPI (Python) and React + TypeScript.

## Key Features
- 🔐 JWT authentication with bcrypt password hashing
- 💼 Full CRUD operations for job listings
- 🔍 Advanced search and filtering
- 📊 Personal dashboard for saved jobs
- 🤖 Automated scraping from Indeed and LinkedIn
- 📱 Responsive, modern UI with Tailwind CSS
- 🚀 Deployed on Render with PostgreSQL

## Tech Stack
- **Backend**: FastAPI, SQLAlchemy, PostgreSQL, JWT, Celery, Redis
- **Frontend**: React, TypeScript, Vite, Tailwind CSS, React Query
- **Deployment**: Render, GitHub
