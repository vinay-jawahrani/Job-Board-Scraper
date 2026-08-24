from sqlalchemy import Column, Integer, String, Text, DateTime, Boolean, ForeignKey, UniqueConstraint, Numeric
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.database import Base

class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), unique=True, nullable=False, index=True)
    password_hash = Column(String(255), nullable=False)
    full_name = Column(String(100))
    is_admin = Column(Boolean, default=False)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    saved_jobs = relationship("SavedJob", back_populates="user", cascade="all, delete-orphan")

class Job(Base):
    __tablename__ = "jobs"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    company = Column(String(255), nullable=False)
    description = Column(Text)
    location = Column(String(255))
    salary_min = Column(Numeric(10, 2))
    salary_max = Column(Numeric(10, 2))
    job_type = Column(String(50))
    source_url = Column(String(500))
    source = Column(String(100))
    external_id = Column(String(255))
    posted_date = Column(DateTime(timezone=True))
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    __table_args__ = (
        UniqueConstraint('source', 'external_id', name='unique_job_per_source'),
    )
    
    saved_by = relationship("SavedJob", back_populates="job")

class SavedJob(Base):
    __tablename__ = "saved_jobs"
    
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), primary_key=True)
    job_id = Column(Integer, ForeignKey("jobs.id", ondelete="CASCADE"), primary_key=True)
    notes = Column(Text)
    saved_at = Column(DateTime(timezone=True), server_default=func.now())
    
    user = relationship("User", back_populates="saved_jobs")
    job = relationship("Job", back_populates="saved_by")

class ScrapingLog(Base):
    __tablename__ = "scraping_logs"
    
    id = Column(Integer, primary_key=True, index=True)
    source = Column(String(100))
    jobs_found = Column(Integer, default=0)
    jobs_added = Column(Integer, default=0)
    jobs_updated = Column(Integer, default=0)
    status = Column(String(50))
    error_message = Column(Text)
    started_at = Column(DateTime(timezone=True), server_default=func.now())
    completed_at = Column(DateTime(timezone=True))