import { useSavedJobs } from '../../hooks/useJobs'
import { JobCard } from '../jobs/JobCard'
import { Link } from 'react-router-dom'
import { Bookmark } from 'lucide-react'

export const SavedJobs = () => {
  const { data: savedJobs, isLoading } = useSavedJobs()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading saved jobs...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center gap-2 mb-6">
        <Bookmark className="w-6 h-6 text-blue-600" />
        <h1 className="text-2xl font-bold text-gray-800">Saved Jobs</h1>
        <span className="ml-2 text-sm text-gray-500">({savedJobs?.length || 0})</span>
      </div>

      {savedJobs && savedJobs.length > 0 ? (
        <div className="space-y-4">
          {savedJobs.map((saved: any) => (
            <JobCard key={saved.job_id} job={saved.job} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <Bookmark className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-gray-700">No saved jobs yet</h3>
          <p className="text-gray-500 mt-2">Start saving jobs you're interested in!</p>
          <Link
            to="/"
            className="inline-block mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Browse Jobs
          </Link>
        </div>
      )}
    </div>
  )
}

export default SavedJobs