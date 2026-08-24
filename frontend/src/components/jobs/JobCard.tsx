import { Link } from 'react-router-dom'
import type { Job } from '../../types'
import { MapPin, Building2, Clock, ExternalLink } from 'lucide-react'

// Add the missing interface
interface JobCardProps {
  job: Job
}

export const JobCard: React.FC<JobCardProps> = ({ job }) => {
  const formatSalary = (min: number | null, max: number | null) => {
    if (!min && !max) return 'Not specified'
    if (min && !max) return `$${min.toLocaleString()}`
    if (!min && max) return `$${max.toLocaleString()}`
    return `$${min?.toLocaleString()} - $${max?.toLocaleString()}`
  }

  const formatDate = (date: string | null) => {
    if (!date) return 'Recently posted'
    const d = new Date(date)
    const now = new Date()
    const diff = Math.floor((now.getTime() - d.getTime()) / (1000 * 60 * 60 * 24))
    if (diff === 0) return 'Today'
    if (diff === 1) return 'Yesterday'
    if (diff < 7) return `${diff} days ago`
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <Link to={`/jobs/${job.id}`}>
            <h3 className="text-xl font-semibold text-gray-800 hover:text-blue-600 transition-colors">
              {job.title}
            </h3>
          </Link>
          <div className="flex items-center mt-2 space-x-4 flex-wrap">
            <span className="flex items-center text-gray-600">
              <Building2 className="w-4 h-4 mr-1" />
              {job.company}
            </span>
            {job.location && (
              <span className="flex items-center text-gray-600">
                <MapPin className="w-4 h-4 mr-1" />
                {job.location}
              </span>
            )}
            {job.job_type && (
              <span className="flex items-center text-gray-600">
                <Clock className="w-4 h-4 mr-1" />
                {job.job_type}
              </span>
            )}
          </div>
          <div className="mt-3 flex items-center space-x-4">
            <span className="text-green-600 font-semibold">
              {formatSalary(job.salary_min, job.salary_max)}
            </span>
            <span className="text-sm text-gray-500">
              Posted {formatDate(job.posted_date)}
            </span>
            {job.source !== 'manual' && (
              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                {job.source}
              </span>
            )}
          </div>
          {job.description && (
            <p className="mt-3 text-gray-600 text-sm line-clamp-2">
              {job.description}
            </p>
          )}
        </div>
        {job.source_url && (
          <a
            href={job.source_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-blue-600 hover:text-blue-700 ml-4"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
        )}
      </div>
    </div>
  )
}