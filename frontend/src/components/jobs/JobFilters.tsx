import { useState } from 'react'
import { Search } from 'lucide-react'  // Remove X if unused

interface JobFiltersProps {
  onFilterChange: (filters: any) => void
}

export const JobFilters: React.FC<JobFiltersProps> = ({ onFilterChange }) => {
  const [keyword, setKeyword] = useState('')
  const [location, setLocation] = useState('')
  const [jobType, setJobType] = useState('')

  const handleSearch = () => {
    const filters: any = {}
    if (keyword) filters.keyword = keyword
    if (location) filters.location = location
    if (jobType) filters.job_type = jobType
    onFilterChange(filters)
  }

  const clearFilters = () => {
    setKeyword('')
    setLocation('')
    setJobType('')
    onFilterChange({})
  }

  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Search Input */}
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Search jobs, companies..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          />
        </div>

        {/* Location Filter */}
        <div className="md:w-48">
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Location"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          />
        </div>

        {/* Job Type Filter */}
        <div className="md:w-48">
          <select
            value={jobType}
            onChange={(e) => setJobType(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white"
          >
            <option value="">All Types</option>
            <option value="full-time">Full Time</option>
            <option value="part-time">Part Time</option>
            <option value="contract">Contract</option>
            <option value="remote">Remote</option>
            <option value="internship">Internship</option>
          </select>
        </div>

        {/* Buttons */}
        <div className="flex gap-2">
          <button
            onClick={handleSearch}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Search
          </button>
          <button
            onClick={clearFilters}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  )
}