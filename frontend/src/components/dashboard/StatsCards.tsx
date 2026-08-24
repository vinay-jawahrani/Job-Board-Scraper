import { useJobs } from '../../hooks/useJobs'
import { Briefcase, Users, Clock, TrendingUp } from 'lucide-react'

interface StatsCardProps {
  title: string
  value: number | string
  icon: React.ReactNode
  color: string
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, icon, color }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600">{title}</p>
          <p className="text-3xl font-bold text-gray-800 mt-1">{value}</p>
        </div>
        <div className={`p-3 rounded-full ${color}`}>
          {icon}
        </div>
      </div>
    </div>
  )
}

export const StatsCards = () => {
  const { data: jobs, isLoading } = useJobs()

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white rounded-lg shadow p-6 animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          </div>
        ))}
      </div>
    )
  }

  const totalJobs = jobs?.length || 0
  const uniqueCompanies = jobs ? new Set(jobs.map(j => j.company)).size : 0
  
  // Fix: Use type assertion or proper typing
  const jobTypes: Record<string, number> = jobs ? jobs.reduce((acc: Record<string, number>, job) => {
    const type = job.job_type || 'Other'
    acc[type] = (acc[type] || 0) + 1
    return acc
  }, {}) : {}
  
  const mostCommonType = Object.entries(jobTypes).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A'

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatsCard
        title="Total Jobs"
        value={totalJobs}
        icon={<Briefcase className="w-6 h-6 text-blue-600" />}
        color="bg-blue-100"
      />
      <StatsCard
        title="Companies"
        value={uniqueCompanies}
        icon={<Users className="w-6 h-6 text-green-600" />}
        color="bg-green-100"
      />
      <StatsCard
        title="Most Common Type"
        value={mostCommonType}
        icon={<Clock className="w-6 h-6 text-purple-600" />}
        color="bg-purple-100"
      />
      <StatsCard
        title="Active Jobs"
        value={jobs?.filter(j => j.is_active).length || 0}
        icon={<TrendingUp className="w-6 h-6 text-orange-600" />}
        color="bg-orange-100"
      />
    </div>
  )
}

export default StatsCards