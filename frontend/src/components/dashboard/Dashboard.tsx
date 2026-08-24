import { useAuth } from '../../hooks/useAuth'  // Changed from '../../context/useAuth'
import { useSavedJobs } from '../../hooks/useJobs'
import { JobCard } from '../jobs/JobCard'
import { Link } from 'react-router-dom'

export const Dashboard = () => {
  const { user } = useAuth()
  const { data: savedJobs, isLoading } = useSavedJobs()

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-600 mt-1">Welcome back, {user?.full_name || 'User'}!</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-sm text-gray-600">Saved Jobs</p>
          <p className="text-3xl font-bold text-gray-800">{savedJobs?.length || 0}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-sm text-gray-600">Account Type</p>
          <p className="text-lg font-semibold text-gray-800">
            {user?.is_admin ? 'Admin' : 'Job Seeker'}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-sm text-gray-600">Member Since</p>
          <p className="text-lg font-semibold text-gray-800">
            {user?.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A'}
          </p>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Saved Jobs</h2>
        {isLoading ? (
          <div className="text-center py-8">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading saved jobs...</p>
          </div>
        ) : savedJobs && savedJobs.length > 0 ? (
          <div className="space-y-4">
            {savedJobs.map((saved: any) => (  // Fixed the type issue
              <JobCard key={saved.job_id} job={saved.job} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <p className="text-gray-600">You haven't saved any jobs yet.</p>
            <Link to="/" className="inline-block mt-4 text-blue-600 hover:underline">
              Browse Jobs →
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default Dashboard