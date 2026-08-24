export interface User {
  id: number
  email: string
  full_name: string
  is_admin: boolean
  created_at: string
}

export interface Job {
  id: number
  title: string
  company: string
  description: string | null
  location: string | null
  salary_min: number | null
  salary_max: number | null
  job_type: string | null
  source_url: string | null
  source: string
  posted_date: string | null
  is_active: boolean
  created_at: string
}

export interface JobCreate {
  title: string
  company: string
  description?: string
  location?: string
  salary_min?: number
  salary_max?: number
  job_type?: string
  source_url?: string
}

export interface JobUpdate {
  title?: string
  company?: string
  description?: string
  location?: string
  salary_min?: number
  salary_max?: number
  job_type?: string
  source_url?: string
  is_active?: boolean
}

export interface JobFilters {
  keyword?: string
  location?: string
  job_type?: string
  source?: string
  page?: number
  page_size?: number
  sort_by?: string
  sort_order?: string
}

export interface AuthResponse {
  access_token: string
  token_type: string
  user: User
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterData {
  email: string
  password: string
  full_name: string
}

export interface SavedJob {
  user_id: number
  job_id: number
  notes: string | null
  saved_at: string
  job: Job
}

export interface SavedJobCreate {
  job_id: number
  notes?: string
}

export interface ScrapingLog {
  id: number
  source: string
  jobs_found: number
  jobs_added: number
  jobs_updated: number
  status: 'running' | 'success' | 'failed'
  error_message: string | null
  started_at: string
  completed_at: string | null
}