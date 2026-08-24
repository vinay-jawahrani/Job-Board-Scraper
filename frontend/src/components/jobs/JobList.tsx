import { useState } from 'react'
import { useJobs } from '../../hooks/useJobs'
import { JobCard } from './JobCard'
import { JobFilters } from './JobFilters'
import { Search } from 'lucide-react'

export const JobList = () => {
  const [filters, setFilters] = useState({})
  const { data: jobs, isLoading, error } = useJobs(filters)

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading jobs...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">Failed to load jobs. Please try again.</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Retry
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center flex-wrap gap-4">
        <h1 className="text-3xl font-bold text-gray-800">Job Listings</h1>
        <span className="text-gray-600 bg-white px-4 py-2 rounded-lg shadow-sm">
          {jobs?.length || 0} jobs found
        </span>
      </div>

      <JobFilters onFilterChange={setFilters} />

      <div className="space-y-4">
        {jobs && jobs.length > 0 ? (
          jobs.map((job) => <JobCard key={job.id} job={job} />)
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-700">No jobs found</h3>
            <p className="text-gray-500 mt-2">Try adjusting your filters</p>
          </div>
        )}
      </div>
    </div>
  )
}