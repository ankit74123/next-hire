import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  FaBriefcase, 
  FaEdit, 
  FaTrash, 
  FaCopy, 
  FaEye,
  FaChartLine,
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
  FaSearch,
  FaPlus
} from 'react-icons/fa';
import { toast } from 'react-toastify';

const MyJobs = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedJobs, setSelectedJobs] = useState([]);

  // Sample job data
  const [jobs, setJobs] = useState([
    {
      id: 1,
      title: 'Senior Frontend Developer',
      department: 'Engineering',
      location: 'San Francisco, CA',
      workMode: 'Hybrid',
      employmentType: 'Full-time',
      status: 'active',
      postedDate: '2025-10-15',
      expiresDate: '2025-11-15',
      applicationsCount: 45,
      newApplications: 8,
      viewsCount: 234,
      salaryRange: '$120k - $160k',
      isPremium: true,
      isFeatured: false
    },
    {
      id: 2,
      title: 'Full Stack Developer',
      department: 'Engineering',
      location: 'New York, NY',
      workMode: 'Remote',
      employmentType: 'Full-time',
      status: 'active',
      postedDate: '2025-10-20',
      expiresDate: '2025-11-20',
      applicationsCount: 32,
      newApplications: 5,
      viewsCount: 189,
      salaryRange: '$100k - $140k',
      isPremium: false,
      isFeatured: true
    },
    {
      id: 3,
      title: 'UI/UX Designer',
      department: 'Design',
      location: 'Austin, TX',
      workMode: 'On-site',
      employmentType: 'Full-time',
      status: 'active',
      postedDate: '2025-10-22',
      expiresDate: '2025-11-22',
      applicationsCount: 28,
      newApplications: 12,
      viewsCount: 156,
      salaryRange: '$90k - $120k',
      isPremium: false,
      isFeatured: false
    },
    {
      id: 4,
      title: 'Backend Developer',
      department: 'Engineering',
      location: 'Seattle, WA',
      workMode: 'Hybrid',
      employmentType: 'Contract',
      status: 'closed',
      postedDate: '2025-09-01',
      expiresDate: '2025-10-01',
      closedDate: '2025-10-01',
      applicationsCount: 67,
      newApplications: 0,
      viewsCount: 412,
      salaryRange: '$110k - $150k',
      isPremium: false,
      isFeatured: false
    },
    {
      id: 5,
      title: 'Product Manager',
      department: 'Product',
      location: 'Boston, MA',
      workMode: 'Remote',
      employmentType: 'Full-time',
      status: 'draft',
      postedDate: null,
      expiresDate: null,
      applicationsCount: 0,
      newApplications: 0,
      viewsCount: 0,
      salaryRange: '$130k - $170k',
      isPremium: false,
      isFeatured: false
    },
    {
      id: 6,
      title: 'DevOps Engineer',
      department: 'Engineering',
      location: 'San Francisco, CA',
      workMode: 'Hybrid',
      employmentType: 'Full-time',
      status: 'active',
      postedDate: '2025-10-18',
      expiresDate: '2025-11-18',
      applicationsCount: 21,
      newApplications: 3,
      viewsCount: 145,
      salaryRange: '$130k - $170k',
      isPremium: true,
      isFeatured: false
    }
  ]);

  const stats = {
    total: jobs.length,
    active: jobs.filter(j => j.status === 'active').length,
    closed: jobs.filter(j => j.status === 'closed').length,
    draft: jobs.filter(j => j.status === 'draft').length
  };

  const getStatusBadge = (status) => {
    const config = {
      active: { bg: 'bg-green-100', text: 'text-green-800', icon: FaCheckCircle, label: 'Active' },
      closed: { bg: 'bg-gray-100', text: 'text-gray-800', icon: FaTimesCircle, label: 'Closed' },
      draft: { bg: 'bg-yellow-100', text: 'text-yellow-800', icon: FaClock, label: 'Draft' }
    };
    
    const c = config[status] || config.draft;
    return (
      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${c.bg} ${c.text}`}>
        <c.icon /> {c.label}
      </span>
    );
  };

  const handleCloseJob = (jobId) => {
    if (window.confirm('Are you sure you want to close this job posting?')) {
      setJobs(jobs.map(job => 
        job.id === jobId 
          ? { ...job, status: 'closed', closedDate: new Date().toISOString().split('T')[0] }
          : job
      ));
      toast.success('Job posting closed successfully');
    }
  };

  const handleRepostJob = (jobId) => {
    setJobs(jobs.map(job => 
      job.id === jobId 
        ? { 
            ...job, 
            status: 'active', 
            postedDate: new Date().toISOString().split('T')[0],
            expiresDate: new Date(Date.now() + 30*24*60*60*1000).toISOString().split('T')[0],
            closedDate: null
          }
        : job
    ));
    toast.success('Job reposted successfully');
  };

  const handleCloneJob = (jobId) => {
    const jobToClone = jobs.find(j => j.id === jobId);
    if (jobToClone) {
      const clonedJob = {
        ...jobToClone,
        id: Date.now(),
        title: `${jobToClone.title} (Copy)`,
        status: 'draft',
        postedDate: null,
        expiresDate: null,
        applicationsCount: 0,
        newApplications: 0,
        viewsCount: 0
      };
      setJobs([clonedJob, ...jobs]);
      toast.success('Job cloned successfully');
    }
  };

  const handleDeleteJob = (jobId) => {
    if (window.confirm('Are you sure you want to delete this job? This action cannot be undone.')) {
      setJobs(jobs.filter(job => job.id !== jobId));
      toast.success('Job deleted successfully');
    }
  };

  const handleBulkDelete = () => {
    if (selectedJobs.length === 0) {
      toast.warning('Please select jobs to delete');
      return;
    }
    if (window.confirm(`Are you sure you want to delete ${selectedJobs.length} job(s)?`)) {
      setJobs(jobs.filter(job => !selectedJobs.includes(job.id)));
      setSelectedJobs([]);
      toast.success(`${selectedJobs.length} job(s) deleted successfully`);
    }
  };

  const toggleJobSelection = (jobId) => {
    setSelectedJobs(prev => 
      prev.includes(jobId) 
        ? prev.filter(id => id !== jobId)
        : [...prev, jobId]
    );
  };

  const toggleAllJobs = () => {
    if (selectedJobs.length === filteredJobs.length) {
      setSelectedJobs([]);
    } else {
      setSelectedJobs(filteredJobs.map(job => job.id));
    }
  };

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || job.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Jobs</h1>
            <p className="text-gray-600 mt-2">Manage your job postings</p>
          </div>
          <Link
            to="/recruiter/post-job"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 font-medium"
          >
            <FaPlus /> Post New Job
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-gray-600 text-sm font-medium">Total Jobs</h3>
              <FaBriefcase className="text-blue-600 text-xl" />
            </div>
            <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-gray-600 text-sm font-medium">Active</h3>
              <FaCheckCircle className="text-green-600 text-xl" />
            </div>
            <p className="text-3xl font-bold text-green-600">{stats.active}</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-gray-600 text-sm font-medium">Closed</h3>
              <FaTimesCircle className="text-gray-600 text-xl" />
            </div>
            <p className="text-3xl font-bold text-gray-600">{stats.closed}</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-gray-600 text-sm font-medium">Drafts</h3>
              <FaClock className="text-yellow-600 text-xl" />
            </div>
            <p className="text-3xl font-bold text-yellow-600">{stats.draft}</p>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6 border border-gray-200">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by job title, department, or location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex gap-2">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="closed">Closed</option>
                <option value="draft">Draft</option>
              </select>

              {selectedJobs.length > 0 && (
                <button
                  onClick={handleBulkDelete}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center gap-2"
                >
                  <FaTrash /> Delete ({selectedJobs.length})
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Jobs Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left">
                    <input
                      type="checkbox"
                      checked={selectedJobs.length === filteredJobs.length && filteredJobs.length > 0}
                      onChange={toggleAllJobs}
                      className="w-4 h-4 rounded"
                    />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Job Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Applications
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Views
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Posted Date
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredJobs.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="px-6 py-12 text-center text-gray-500">
                      No jobs found. Try adjusting your search or filters.
                    </td>
                  </tr>
                ) : (
                  filteredJobs.map((job) => (
                    <tr key={job.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <input
                          type="checkbox"
                          checked={selectedJobs.includes(job.id)}
                          onChange={() => toggleJobSelection(job.id)}
                          className="w-4 h-4 rounded"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-start gap-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="text-sm font-semibold text-gray-900">{job.title}</h3>
                              {job.isPremium && (
                                <span className="px-2 py-0.5 bg-yellow-100 text-yellow-800 text-xs rounded">Premium</span>
                              )}
                              {job.isFeatured && (
                                <span className="px-2 py-0.5 bg-blue-100 text-blue-800 text-xs rounded">Featured</span>
                              )}
                            </div>
                            <div className="flex flex-wrap gap-2 text-xs text-gray-600">
                              <span>{job.department}</span>
                              <span>•</span>
                              <span>{job.location}</span>
                              <span>•</span>
                              <span>{job.workMode}</span>
                              <span>•</span>
                              <span>{job.employmentType}</span>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">{job.salaryRange}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {getStatusBadge(job.status)}
                      </td>
                      <td className="px-6 py-4">
                        <Link
                          to={`/recruiter/applications?jobId=${job.id}`}
                          className="text-sm font-semibold text-blue-600 hover:text-blue-700"
                        >
                          {job.applicationsCount}
                          {job.newApplications > 0 && (
                            <span className="ml-1 px-2 py-0.5 bg-red-100 text-red-800 text-xs rounded-full">
                              +{job.newApplications} new
                            </span>
                          )}
                        </Link>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <FaEye className="text-gray-400" />
                          {job.viewsCount}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-gray-600">
                          {job.postedDate ? new Date(job.postedDate).toLocaleDateString() : 'Not posted'}
                        </p>
                        {job.status === 'active' && (
                          <p className="text-xs text-gray-500">
                            Expires: {new Date(job.expiresDate).toLocaleDateString()}
                          </p>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          {job.status === 'draft' && (
                            <button
                              onClick={() => navigate(`/recruiter/post-job?edit=${job.id}`)}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                              title="Edit"
                            >
                              <FaEdit />
                            </button>
                          )}
                          
                          {job.status === 'active' && (
                            <>
                              <Link
                                to={`/recruiter/applications?jobId=${job.id}`}
                                className="p-2 text-purple-600 hover:bg-purple-50 rounded"
                                title="View Applications"
                              >
                                <FaChartLine />
                              </Link>
                              <button
                                onClick={() => handleCloseJob(job.id)}
                                className="p-2 text-red-600 hover:bg-red-50 rounded"
                                title="Close Job"
                              >
                                <FaTimesCircle />
                              </button>
                            </>
                          )}
                          
                          {job.status === 'closed' && (
                            <button
                              onClick={() => handleRepostJob(job.id)}
                              className="px-3 py-1 text-xs bg-green-600 text-white rounded hover:bg-green-700"
                            >
                              Repost
                            </button>
                          )}
                          
                          <button
                            onClick={() => handleCloneJob(job.id)}
                            className="p-2 text-gray-600 hover:bg-gray-100 rounded"
                            title="Clone Job"
                          >
                            <FaCopy />
                          </button>
                          
                          <button
                            onClick={() => handleDeleteJob(job.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded"
                            title="Delete"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyJobs;
