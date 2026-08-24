import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { jobs, savedJobs } from '../api/endpoints'
import type { JobFilters, JobCreate } from '../types'
import toast from 'react-hot-toast'

// ... rest of the code
export const useJobs = (filters?: JobFilters) => {
  return useQuery({
    queryKey: ['jobs', filters],
    queryFn: () => jobs.getAll(filters).then(res => res.data),
  })
}

export const useJob = (id: number) => {
  return useQuery({
    queryKey: ['job', id],
    queryFn: () => jobs.getById(id).then(res => res.data),
    enabled: !!id,
  })
}

export const useCreateJob = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (data: JobCreate) => jobs.create(data).then(res => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['jobs'] })
      toast.success('Job created successfully!')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.detail || 'Failed to create job')
    },
  })
}

export const useUpdateJob = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<JobCreate> }) =>
      jobs.update(id, data).then(res => res.data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['jobs'] })
      queryClient.invalidateQueries({ queryKey: ['job', variables.id] })
      toast.success('Job updated successfully!')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.detail || 'Failed to update job')
    },
  })
}

export const useDeleteJob = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (id: number) => jobs.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['jobs'] })
      toast.success('Job deleted successfully!')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.detail || 'Failed to delete job')
    },
  })
}

export const useSavedJobs = () => {
  return useQuery({
    queryKey: ['saved-jobs'],
    queryFn: () => savedJobs.getAll().then(res => res.data),
  })
}

export const useSaveJob = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ jobId, notes }: { jobId: number; notes?: string }) =>
      savedJobs.save(jobId, notes).then(res => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['saved-jobs'] })
      toast.success('Job saved!')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.detail || 'Failed to save job')
    },
  })
}

export const useUnsaveJob = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (jobId: number) => savedJobs.unsave(jobId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['saved-jobs'] })
      toast.success('Job removed from saved!')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.detail || 'Failed to unsave job')
    },
  })
}