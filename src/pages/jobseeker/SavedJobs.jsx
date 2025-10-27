import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FaSearch,
  FaFilter,
  FaMapMarkerAlt,
  FaBriefcase,
  FaDollarSign,
  FaClock,
  FaBookmark,
  FaTrash,
  FaHeart,
  FaSortAmountDown,
} from 'react-icons/fa';
import { toast } from 'react-toastify';

const SavedJobs = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBy, setFilterBy] = useState('all');
  const [sortBy, setSortBy] = useState('date-desc');

  // Sample saved jobs data
  const [savedJobs, setSavedJobs] = useState([
    {
      id: 1,
      title: 'Senior React Developer',
      company: 'Tech Corp',
      companyLogo: null,
      location: 'San Francisco, CA',
      experience: '3-5 years',
      salary: '₹15-25 LPA',
      jobType: 'Full-time',
      workMode: 'Remote',
      skills: ['React', 'Node.js', 'TypeScript', 'AWS', 'Docker'],
      postedDate: '2025-10-25',
      savedDate: '2025-10-26',
      applicants: 45,
      hasApplied: false,
    },
    {
      id: 4,
      title: 'UI/UX Designer',
      company: 'Creative Agency',
      companyLogo: null,
      location: 'Remote',
      experience: '2-5 years',
      salary: '₹10-15 LPA',
      jobType: 'Contract',
      workMode: 'Remote',
      skills: ['Figma', 'Adobe XD', 'Sketch', 'Prototyping'],
      postedDate: '2025-10-27',
      savedDate: '2025-10-27',
      applicants: 52,
      hasApplied: false,
    },
    {
      id: 5,
      title: 'DevOps Engineer',
      company: 'Cloud Systems',
      companyLogo: null,
      location: 'Pune, India',
      experience: '3-6 years',
      salary: '₹18-25 LPA',
      jobType: 'Full-time',
      workMode: 'Hybrid',
      skills: ['AWS', 'Docker', 'Kubernetes', 'CI/CD', 'Jenkins'],
      postedDate: '2025-10-23',
      savedDate: '2025-10-24',
      applicants: 38,
      hasApplied: true,
    },
    {
      id: 6,
      title: 'Mobile App Developer',
      company: 'App Innovators',
      companyLogo: null,
      location: 'Hyderabad, India',
      experience: '2-4 years',
      salary: '₹12-20 LPA',
      jobType: 'Full-time',
      workMode: 'On-site',
      skills: ['React Native', 'Flutter', 'iOS', 'Android'],
      postedDate: '2025-10-26',
      savedDate: '2025-10-26',
      applicants: 41,
      hasApplied: false,
    },
    {
      id: 9,
      title: 'Data Scientist',
      company: 'Analytics Hub',
      companyLogo: null,
      location: 'Bangalore, India',
      experience: '2-5 years',
      salary: '₹15-22 LPA',
      jobType: 'Full-time',
      workMode: 'Hybrid',
      skills: ['Python', 'Machine Learning', 'TensorFlow', 'SQL'],
      postedDate: '2025-10-22',
      savedDate: '2025-10-23',
      applicants: 67,
      hasApplied: false,
    },
    {
      id: 11,
      title: 'QA Engineer',
      company: 'Quality First',
      companyLogo: null,
      location: 'Chennai, India',
      experience: '1-3 years',
      salary: '₹6-10 LPA',
      jobType: 'Full-time',
      workMode: 'On-site',
      skills: ['Selenium', 'Jest', 'Cypress', 'Testing'],
      postedDate: '2025-10-21',
      savedDate: '2025-10-22',
      applicants: 29,
      hasApplied: true,
    },
  ]);

  const getJobTypeBadgeColor = (type) => {
    const colors = {
      'Full-time': 'bg-green-100 text-green-700',
      'Part-time': 'bg-blue-100 text-blue-700',
      'Contract': 'bg-yellow-100 text-yellow-700',
      'Internship': 'bg-purple-100 text-purple-700',
      'Freelance': 'bg-pink-100 text-pink-700',
    };
    return colors[type] || 'bg-gray-100 text-gray-700';
  };

  const getWorkModeBadgeColor = (mode) => {
    const colors = {
      'Remote': 'bg-blue-100 text-blue-700',
      'On-site': 'bg-gray-100 text-gray-700',
      'Hybrid': 'bg-purple-100 text-purple-700',
    };
    return colors[mode] || 'bg-gray-100 text-gray-700';
  };

  const getPostedTimeAgo = (postedDate) => {
    const now = new Date();
    const posted = new Date(postedDate);
    const diffTime = Math.abs(now - posted);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return `${Math.floor(diffDays / 30)} months ago`;
  };

  const filteredJobs = savedJobs
    .filter((job) => {
      const matchesSearch =
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.skills.some((skill) => skill.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesFilter =
        filterBy === 'all' ||
        (filterBy === 'applied' && job.hasApplied) ||
        (filterBy === 'not-applied' && !job.hasApplied) ||
        (filterBy === 'remote' && job.workMode === 'Remote') ||
        (filterBy === 'full-time' && job.jobType === 'Full-time');

      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      if (sortBy === 'date-desc') {
        return new Date(b.savedDate) - new Date(a.savedDate);
      } else if (sortBy === 'date-asc') {
        return new Date(a.savedDate) - new Date(b.savedDate);
      } else if (sortBy === 'salary') {
        const aSalary = parseInt(a.salary.match(/\d+/)[0]);
        const bSalary = parseInt(b.salary.match(/\d+/)[0]);
        return bSalary - aSalary;
      }
      return 0;
    });

  const handleRemove = (jobId) => {
    setSavedJobs((prev) => prev.filter((job) => job.id !== jobId));
    toast.success('Job removed from saved');
  };

  const handleApply = (jobId) => {
    navigate(`/jobs/${jobId}/apply`);
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to remove all saved jobs?')) {
      setSavedJobs([]);
      toast.success('All saved jobs removed');
    }
  };

  const appliedCount = savedJobs.filter((job) => job.hasApplied).length;
  const notAppliedCount = savedJobs.filter((job) => !job.hasApplied).length;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Saved Jobs</h1>
            <p className="text-gray-600">
              You have {savedJobs.length} saved {savedJobs.length === 1 ? 'job' : 'jobs'}
            </p>
          </div>
          {savedJobs.length > 0 && (
            <button
              onClick={handleClearAll}
              className="flex items-center text-red-600 hover:text-red-700 font-medium"
            >
              <FaTrash className="mr-2" />
              Clear All
            </button>
          )}
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Total Saved</p>
                <p className="text-3xl font-bold text-gray-900">{savedJobs.length}</p>
              </div>
              <FaBookmark className="text-primary-600 text-4xl" />
            </div>
          </div>
          <div className="bg-green-50 rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-700 text-sm mb-1">Already Applied</p>
                <p className="text-3xl font-bold text-green-700">{appliedCount}</p>
              </div>
              <FaHeart className="text-green-600 text-4xl" />
            </div>
          </div>
          <div className="bg-blue-50 rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-700 text-sm mb-1">Not Applied</p>
                <p className="text-3xl font-bold text-blue-700">{notAppliedCount}</p>
              </div>
              <FaBriefcase className="text-blue-600 text-4xl" />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search saved jobs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            {/* Filter */}
            <div className="relative">
              <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <select
                value={filterBy}
                onChange={(e) => setFilterBy(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent appearance-none"
              >
                <option value="all">All Jobs</option>
                <option value="applied">Already Applied</option>
                <option value="not-applied">Not Applied</option>
                <option value="remote">Remote Only</option>
                <option value="full-time">Full-time Only</option>
              </select>
            </div>

            {/* Sort */}
            <div className="relative">
              <FaSortAmountDown className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent appearance-none"
              >
                <option value="date-desc">Recently Saved</option>
                <option value="date-asc">Oldest First</option>
                <option value="salary">Highest Salary</option>
              </select>
            </div>
          </div>
        </div>

        {/* Jobs List */}
        {filteredJobs.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <FaBookmark className="text-gray-300 text-6xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No Saved Jobs</h3>
            <p className="text-gray-500 mb-6">
              {searchTerm || filterBy !== 'all'
                ? 'No jobs match your filters'
                : 'Start saving jobs to view them here'}
            </p>
            <Link
              to="/jobs"
              className="inline-block bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-semibold transition"
            >
              Browse Jobs
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredJobs.map((job) => (
              <div
                key={job.id}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition p-6"
              >
                <div className="flex items-start justify-between">
                  <div className="flex flex-1">
                    {/* Company Logo */}
                    <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                      {job.companyLogo ? (
                        <img
                          src={job.companyLogo}
                          alt={job.company}
                          className="w-12 h-12 object-contain"
                        />
                      ) : (
                        <span className="text-2xl font-bold text-gray-400">
                          {job.company.charAt(0)}
                        </span>
                      )}
                    </div>

                    {/* Job Details */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <Link
                            to={`/jobs/${job.id}`}
                            className="text-xl font-bold text-gray-900 hover:text-primary-600 transition"
                          >
                            {job.title}
                          </Link>
                          <p className="text-gray-700 font-medium mt-1">{job.company}</p>
                        </div>
                        {job.hasApplied && (
                          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium">
                            Applied
                          </span>
                        )}
                      </div>

                      <div className="flex flex-wrap gap-4 text-gray-600 text-sm mb-3">
                        <span className="flex items-center">
                          <FaMapMarkerAlt className="mr-2" />
                          {job.location}
                        </span>
                        <span className="flex items-center">
                          <FaBriefcase className="mr-2" />
                          {job.experience}
                        </span>
                        <span className="flex items-center">
                          <FaDollarSign className="mr-2" />
                          {job.salary}
                        </span>
                        <span className="flex items-center">
                          <FaClock className="mr-2" />
                          Posted {getPostedTimeAgo(job.postedDate)}
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${getJobTypeBadgeColor(
                            job.jobType
                          )}`}
                        >
                          {job.jobType}
                        </span>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${getWorkModeBadgeColor(
                            job.workMode
                          )}`}
                        >
                          {job.workMode}
                        </span>
                      </div>

                      {job.skills && job.skills.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {job.skills.slice(0, 5).map((skill, index) => (
                            <span
                              key={index}
                              className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs"
                            >
                              {skill}
                            </span>
                          ))}
                          {job.skills.length > 5 && (
                            <span className="text-gray-500 text-xs px-2 py-1">
                              +{job.skills.length - 5} more
                            </span>
                          )}
                        </div>
                      )}

                      <p className="text-sm text-gray-500 mb-4">
                        Saved on {new Date(job.savedDate).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric', 
                          year: 'numeric' 
                        })}
                      </p>

                      <div className="flex gap-3">
                        {!job.hasApplied && (
                          <button
                            onClick={() => handleApply(job.id)}
                            className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-lg font-medium transition"
                          >
                            Apply Now
                          </button>
                        )}
                        <Link
                          to={`/jobs/${job.id}`}
                          className="border border-gray-300 hover:bg-gray-50 text-gray-700 px-6 py-2 rounded-lg font-medium transition"
                        >
                          View Details
                        </Link>
                        <button
                          onClick={() => handleRemove(job.id)}
                          className="text-red-600 hover:text-red-700 px-4 py-2 rounded-lg font-medium transition flex items-center"
                        >
                          <FaTrash className="mr-2" />
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedJobs;
