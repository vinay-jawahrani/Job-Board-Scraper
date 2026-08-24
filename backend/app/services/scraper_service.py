import asyncio
from typing import List, Tuple
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func

from app.database import AsyncSessionLocal
from app.models import Job, ScrapingLog
from app.schemas import JobCreate

async def run_scraper(sources: List[str], log_id: int):
    async with AsyncSessionLocal() as db:
        try:
            log = await db.get(ScrapingLog, log_id)
            if log:
                log.status = "running"
                await db.commit()
            
            total_found = 0
            total_added = 0
            
            for source in sources:
                if source == "indeed":
                    jobs_found, jobs_added = await scrape_indeed(db)
                elif source == "linkedin":
                    jobs_found, jobs_added = await scrape_linkedin(db)
                else:
                    continue
                
                total_found += jobs_found
                total_added += jobs_added
            
            if log:
                log.status = "success"
                log.jobs_found = total_found
                log.jobs_added = total_added
                log.completed_at = func.now()
                await db.commit()
                
        except Exception as e:
            if log:
                log.status = "failed"
                log.error_message = str(e)
                log.completed_at = func.now()
                await db.commit()
            raise

async def scrape_indeed(db: AsyncSession) -> Tuple[int, int]:
    """Scrape jobs from Indeed"""
    print("🔍 Scraping Indeed...")
    await asyncio.sleep(2)
    
    # TODO: Implement actual Indeed scraping
    # For now, return mock data
    return 10, 5

async def scrape_linkedin(db: AsyncSession) -> Tuple[int, int]:
    """Scrape jobs from LinkedIn"""
    print("🔍 Scraping LinkedIn...")
    await asyncio.sleep(2)
    
    # TODO: Implement actual LinkedIn scraping
    # For now, return mock data
    return 8, 3