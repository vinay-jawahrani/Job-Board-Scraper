from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, or_, func
from typing import Optional

from app.database import get_db
from app.models import Job, User
from app.schemas import JobCreate, JobUpdate, JobResponse
from app.auth import get_current_user, get_current_admin_user

router = APIRouter()

@router.get("/", response_model=list[JobResponse])
async def get_jobs(
    keyword: Optional[str] = None,
    location: Optional[str] = None,
    job_type: Optional[str] = None,
    source: Optional[str] = None,
    page: int = Query(1, ge=1),
    page_size: int = Query(20, ge=1, le=100),
    db: AsyncSession = Depends(get_db)
):
    query = select(Job).where(Job.is_active == True)
    
    if keyword:
        query = query.where(
            or_(
                Job.title.ilike(f"%{keyword}%"),
                Job.company.ilike(f"%{keyword}%"),
                Job.description.ilike(f"%{keyword}%")
            )
        )
    
    if location:
        query = query.where(Job.location.ilike(f"%{location}%"))
    
    if job_type:
        query = query.where(Job.job_type == job_type)
    
    if source:
        query = query.where(Job.source == source)
    
    query = query.offset((page - 1) * page_size).limit(page_size)
    query = query.order_by(Job.posted_date.desc())
    
    result = await db.execute(query)
    jobs = result.scalars().all()
    
    return [JobResponse.model_validate(job) for job in jobs]

@router.get("/{job_id}", response_model=JobResponse)
async def get_job(job_id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Job).where(Job.id == job_id, Job.is_active == True))
    job = result.scalar_one_or_none()
    
    if not job:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Job not found"
        )
    
    return JobResponse.model_validate(job)

@router.post("/", response_model=JobResponse, status_code=status.HTTP_201_CREATED)
async def create_job(
    job_data: JobCreate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    new_job = Job(**job_data.model_dump())
    db.add(new_job)
    await db.commit()
    await db.refresh(new_job)
    return JobResponse.model_validate(new_job)

@router.put("/{job_id}", response_model=JobResponse)
async def update_job(
    job_id: int,
    job_data: JobUpdate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    result = await db.execute(select(Job).where(Job.id == job_id))
    job = result.scalar_one_or_none()
    
    if not job:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Job not found"
        )
    
    update_data = job_data.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(job, field, value)
    
    await db.commit()
    await db.refresh(job)
    return JobResponse.model_validate(job)

@router.delete("/{job_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_job(
    job_id: int,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_admin_user)
):
    result = await db.execute(select(Job).where(Job.id == job_id))
    job = result.scalar_one_or_none()
    
    if not job:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Job not found"
        )
    
    await db.delete(job)
    await db.commit()
    return None

@router.get("/stats/sources")
async def get_job_sources_stats(db: AsyncSession = Depends(get_db)):
    query = select(Job.source, func.count(Job.id)).where(Job.is_active == True).group_by(Job.source)
    result = await db.execute(query)
    stats = result.all()
    return {"sources": [{"source": s[0], "count": s[1]} for s in stats]}