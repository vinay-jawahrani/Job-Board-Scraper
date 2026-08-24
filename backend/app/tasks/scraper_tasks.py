from app.core.celery_app import celery_app
from app.services.scraper_service import run_scraper
import asyncio

@celery_app.task(name="scrape_jobs")
def scrape_jobs_task(sources: list[str], log_id: int):
    """Celery task to scrape jobs from various sources"""
    asyncio.run(run_scraper(sources, log_id))
    return {"status": "completed", "log_id": log_id}