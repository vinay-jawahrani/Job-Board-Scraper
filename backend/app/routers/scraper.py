from fastapi import APIRouter, Depends, HTTPException, status, BackgroundTasks
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from typing import List

from app.database import get_db
from app.models import ScrapingLog, User
from app.auth import get_current_admin_user
from app.services.scraper_service import run_scraper

router = APIRouter()

@router.post("/trigger")
async def trigger_scraping(
    background_tasks: BackgroundTasks,
    sources: List[str] = ["indeed", "linkedin"],
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_admin_user)
):
    log = ScrapingLog(
        source=",".join(sources),
        status="running"
    )
    db.add(log)
    await db.commit()
    await db.refresh(log)
    
    background_tasks.add_task(run_scraper, sources, log.id)
    
    return {
        "message": "Scraping started",
        "log_id": log.id,
        "status": "running"
    }

@router.get("/logs")
async def get_scraping_logs(
    limit: int = 20,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_admin_user)
):
    query = select(ScrapingLog).order_by(ScrapingLog.started_at.desc()).limit(limit)
    result = await db.execute(query)
    logs = result.scalars().all()
    return logs