import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCreateJob } from '../../hooks/useJobs'
// Remove: import toast from 'react-hot-toast'

export const CreateJob = () => {
  const navigate = useNavigate()
  const createJob = useCreateJob()
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    description: '',
    location: '',
    salary_min: '',
    salary_max: '',
    job_type: '',
    source_url: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const data = {
      title: formData.title,
      company: formData.company,
      description: formData.description || undefined,
      location: formData.location || undefined,
      salary_min: formData.salary_min ? parseFloat(formData.salary_min) : undefined,
      salary_max: formData.salary_max ? parseFloat(formData.salary_max) : undefined,
      job_type: formData.job_type || undefined,
      source_url: formData.source_url || undefined,
    }

    createJob.mutate(data, {
      onSuccess: () => {
        navigate('/')
      }
    })
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Post a New Job</h1>
      
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Job Title *
          </label>
          <input
            type="text"
            required
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            placeholder="e.g., Senior Software Engineer"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Company *
          </label>
          <input
            type="text"
            required
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            placeholder="e.g., Google"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Location
          </label>
          <input
            type="text"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            placeholder="e.g., San Francisco, CA"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Min Salary ($)
            </label>
            <input
              type="number"
              value={formData.salary_min}
              onChange={(e) => setFormData({ ...formData, salary_min: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              placeholder="50000"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Max Salary ($)
            </label>
            <input
              type="number"
              value={formData.salary_max}
              onChange={(e) => setFormData({ ...formData, salary_max: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              placeholder="80000"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Job Type
          </label>
          <select
            value={formData.job_type}
            onChange={(e) => setFormData({ ...formData, job_type: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white"
          >
            <option value="">Select type</option>
            <option value="full-time">Full Time</option>
            <option value="part-time">Part Time</option>
            <option value="contract">Contract</option>
            <option value="remote">Remote</option>
            <option value="internship">Internship</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={6}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            placeholder="Job description, requirements, benefits..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Application URL
          </label>
          <input
            type="url"
            value={formData.source_url}
            onChange={(e) => setFormData({ ...formData, source_url: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            placeholder="https://example.com/apply"
          />
        </div>

        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            disabled={createJob.isPending}
            className="flex-1 py-2 px-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {createJob.isPending ? 'Creating...' : 'Post Job'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/')}
            className="px-6 py-2 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}