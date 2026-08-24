import { useParams } from 'react-router-dom'
import { useJob } from '../../hooks/useJobs'
import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'

export const JobDetail = () => {
  const { id } = useParams<{ id: string }>()
  const { data: job, isLoading, error } = useJob(Number(id))

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading job details...</p>
        </div>
      </div>
    )
  }

  if (error || !job) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">Job not found</p>
        <Link to="/" className="text-blue-600 hover:underline mt-2 inline-block">
          ← Back to jobs
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6">
        <ArrowLeft className="w-4 h-4 mr-1" />
        Back to jobs
      </Link>

      <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800">{job.title}</h1>
        <p className="text-xl text-gray-600 mt-2">{job.company}</p>

        <div className="flex flex-wrap gap-4 mt-4 text-gray-600">
          {job.location && (
            <span>📍 {job.location}</span>
          )}
          {job.job_type && (
            <span>💼 {job.job_type}</span>
          )}
          {job.salary_min || job.salary_max ? (
            <span>💰 ${job.salary_min?.toLocaleString() || ''} - ${job.salary_max?.toLocaleString() || ''}</span>
          ) : null}
          <span>📅 Posted: {job.posted_date ? new Date(job.posted_date).toLocaleDateString() : 'Recently'}</span>
          {job.source !== 'manual' && (
            <span className="text-sm bg-gray-100 px-2 py-1 rounded-full">Source: {job.source}</span>
          )}
        </div>

        {job.description && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">Description</h2>
            <div className="prose max-w-none text-gray-600 whitespace-pre-wrap">
              {job.description}
            </div>
          </div>
        )}

        {job.source_url && (
          <a
            href={job.source_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Apply Now
          </a>
        )}
      </div>
    </div>
  )
}