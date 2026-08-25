import { apiClient } from './client'
import type {
  Job,
  JobCreate,
  JobFilters,
  AuthResponse,
  LoginCredentials,
  RegisterData,
  User,
} from '../types'

export const auth = {
  register: (data: RegisterData) =>
    apiClient.post<AuthResponse>('/api/auth/register', data),
  
  login: (data: LoginCredentials) => {
  const formData = new URLSearchParams();
  formData.append('username', data.email);   // FastAPI expects 'username'
  formData.append('password', data.password);
  
  return apiClient.post<AuthResponse>('/api/auth/login', formData, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
},
  
  getMe: () =>
    apiClient.get<User>('/api/auth/me'),
  
  logout: () => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('user')
  },
}

export const jobs = {
  getAll: (filters?: JobFilters) =>
    apiClient.get<Job[]>('/api/jobs', { params: filters }),
  
  getById: (id: number) =>
    apiClient.get<Job>(`/api/jobs/${id}`),
  
  create: (data: JobCreate) =>
    apiClient.post<Job>('/api/jobs', data),
  
  update: (id: number, data: Partial<JobCreate>) =>
    apiClient.put<Job>(`/api/jobs/${id}`, data),
  
  delete: (id: number) =>
    apiClient.delete(`/api/jobs/${id}`),
  
  getStats: () =>
    apiClient.get('/api/jobs/stats/sources'),
}

export const savedJobs = {
  getAll: () =>
    apiClient.get('/api/users/saved-jobs'),
  
  save: (jobId: number, notes?: string) =>
    apiClient.post('/api/users/saved-jobs', { job_id: jobId, notes }),
  
  unsave: (jobId: number) =>
    apiClient.delete(`/api/users/saved-jobs/${jobId}`),
}

export const scraper = {
  trigger: (sources: string[]) =>
    apiClient.post('/api/scraper/trigger', { sources }),
  
  getLogs: (limit: number = 20) =>
    apiClient.get('/api/scraper/logs', { params: { limit } }),
}