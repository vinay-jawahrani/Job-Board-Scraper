from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

from app.config import settings
from app.database import engine, Base
from app.routers import auth, jobs, scraper

@asynccontextmanager
async def lifespan(app: FastAPI):
    print("🚀 Starting up...")
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    yield
    print("👋 Shutting down...")
    await engine.dispose()

app = FastAPI(
    title=settings.APP_NAME,
    version="1.0.0",
    description="Job Board API with automated scraping",
    lifespan=lifespan,
)

# ========== CORS SETUP ==========
# This must be added BEFORE your routes
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ========== ROUTES ==========
app.include_router(auth.router, prefix="/api/auth", tags=["Authentication"])
app.include_router(jobs.router, prefix="/api/jobs", tags=["Jobs"])
app.include_router(scraper.router, prefix="/api/scraper", tags=["Scraper"])

@app.get("/")
async def root():
    return {
        "message": f"Welcome to {settings.APP_NAME}",
        "docs": "/docs",
        "redoc": "/redoc"
    }

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

@app.get("/api/test-cors")
async def test_cors():
    return {"message": "CORS is working!"}