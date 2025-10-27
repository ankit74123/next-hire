import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FaSearch,
  FaFilter,
  FaCalendarAlt,
  FaBuilding,
  FaMapMarkerAlt,
  FaBriefcase,
  FaClock,
  FaEye,
  FaTimesCircle,
  FaCheckCircle,
  FaHourglassHalf,
  FaFileAlt,
} from 'react-icons/fa';
import { toast } from 'react-toastify';

const MyApplications = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date-desc');
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Sample applications data
  const [applications, setApplications] = useState([
    {
      id: 1,
      jobId: 1,
      jobTitle: 'Senior React Developer',
      company: 'Tech Corp',
      location: 'San Francisco, CA',
      salary: '₹15-25 LPA',
      appliedDate: '2025-10-20',
      status: 'shortlisted',
      timeline: [
        { status: 'applied', date: '2025-10-20', message: 'Application submitted' },
        { status: 'viewed', date: '2025-10-22', message: 'Application viewed by recruiter' },
        { status: 'shortlisted', date: '2025-10-25', message: 'You have been shortlisted' },
      ],
    },
    {
      id: 2,
      jobId: 2,
      jobTitle: 'Full Stack Developer',
      company: 'StartUp Inc',
      location: 'Bangalore, India',
      salary: '₹12-18 LPA',
      appliedDate: '2025-10-18',
      status: 'viewed',
      timeline: [
        { status: 'applied', date: '2025-10-18', message: 'Application submitted' },
        { status: 'viewed', date: '2025-10-19', message: 'Application viewed by recruiter' },
      ],
    },
    {
      id: 3,
      jobId: 3,
      jobTitle: 'Python Developer',
      company: 'Data Solutions',
      location: 'Mumbai, India',
      salary: '₹8-12 LPA',
      appliedDate: '2025-10-15',
      status: 'rejected',
      timeline: [
        { status: 'applied', date: '2025-10-15', message: 'Application submitted' },
        { status: 'viewed', date: '2025-10-16', message: 'Application viewed by recruiter' },
        { status: 'rejected', date: '2025-10-17', message: 'Not selected for this position' },
      ],
    },
    {
      id: 4,
      jobId: 5,
      jobTitle: 'DevOps Engineer',
      company: 'Cloud Systems',
      location: 'Pune, India',
      salary: '₹18-25 LPA',
      appliedDate: '2025-10-12',
      status: 'applied',
      timeline: [
        { status: 'applied', date: '2025-10-12', message: 'Application submitted' },
      ],
    },
    {
      id: 5,
      jobId: 7,
      jobTitle: 'Backend Developer',
      company: 'Tech Solutions',
      location: 'Delhi, India',
      salary: '₹10-15 LPA',
      appliedDate: '2025-10-10',
      status: 'interviewed',
      timeline: [
        { status: 'applied', date: '2025-10-10', message: 'Application submitted' },
        { status: 'viewed', date: '2025-10-11', message: 'Application viewed by recruiter' },
        { status: 'shortlisted', date: '2025-10-14', message: 'You have been shortlisted' },
        { status: 'interviewed', date: '2025-10-18', message: 'Interview completed' },
      ],
    },
    {
      id: 6,
      jobId: 8,
      jobTitle: 'Frontend Developer',
      company: 'Creative Studio',
      location: 'Hyderabad, India',
      salary: '₹8-12 LPA',
      appliedDate: '2025-10-08',
      status: 'withdrawn',
      timeline: [
        { status: 'applied', date: '2025-10-08', message: 'Application submitted' },
        { status: 'withdrawn', date: '2025-10-09', message: 'Application withdrawn by you' },
      ],
    },
  ]);

  const statusColors = {
    applied: { bg: 'bg-blue-100', text: 'text-blue-700', icon: FaFileAlt },
    viewed: { bg: 'bg-purple-100', text: 'text-purple-700', icon: FaEye },
    shortlisted: { bg: 'bg-green-100', text: 'text-green-700', icon: FaCheckCircle },
    interviewed: { bg: 'bg-indigo-100', text: 'text-indigo-700', icon: FaHourglassHalf },
    rejected: { bg: 'bg-red-100', text: 'text-red-700', icon: FaTimesCircle },
    withdrawn: { bg: 'bg-gray-100', text: 'text-gray-700', icon: FaTimesCircle },
  };

  const getStatusLabel = (status) => {
    const labels = {
      applied: 'Applied',
      viewed: 'Viewed',
      shortlisted: 'Shortlisted',
      interviewed: 'Interviewed',
      rejected: 'Rejected',
      withdrawn: 'Withdrawn',
    };
    return labels[status] || status;
  };

  const getTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return `${Math.floor(diffDays / 30)} months ago`;
  };

  const filteredApplications = applications
    .filter((app) => {
      const matchesSearch =
        app.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.company.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      if (sortBy === 'date-desc') {
        return new Date(b.appliedDate) - new Date(a.appliedDate);
      } else if (sortBy === 'date-asc') {
        return new Date(a.appliedDate) - new Date(b.appliedDate);
      } else if (sortBy === 'company') {
        return a.company.localeCompare(b.company);
      }
      return 0;
    });

  const statusCounts = {
    all: applications.length,
    applied: applications.filter((app) => app.status === 'applied').length,
    viewed: applications.filter((app) => app.status === 'viewed').length,
    shortlisted: applications.filter((app) => app.status === 'shortlisted').length,
    interviewed: applications.filter((app) => app.status === 'interviewed').length,
    rejected: applications.filter((app) => app.status === 'rejected').length,
  };

  const handleWithdraw = (applicationId) => {
    if (window.confirm('Are you sure you want to withdraw this application?')) {
      setApplications((prev) =>
        prev.map((app) =>
          app.id === applicationId
            ? {
                ...app,
                status: 'withdrawn',
                timeline: [
                  ...app.timeline,
                  { status: 'withdrawn', date: new Date().toISOString().split('T')[0], message: 'Application withdrawn by you' },
                ],
              }
            : app
        )
      );
      toast.success('Application withdrawn successfully');
      setShowModal(false);
    }
  };

  const openModal = (application) => {
    setSelectedApplication(application);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedApplication(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Applications</h1>
          <p className="text-gray-600">Track and manage your job applications</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow-md p-4">
            <p className="text-gray-600 text-sm mb-1">Total</p>
            <p className="text-2xl font-bold text-gray-900">{statusCounts.all}</p>
          </div>
          <div className="bg-blue-50 rounded-lg shadow-md p-4">
            <p className="text-blue-700 text-sm mb-1">Applied</p>
            <p className="text-2xl font-bold text-blue-700">{statusCounts.applied}</p>
          </div>
          <div className="bg-purple-50 rounded-lg shadow-md p-4">
            <p className="text-purple-700 text-sm mb-1">Viewed</p>
            <p className="text-2xl font-bold text-purple-700">{statusCounts.viewed}</p>
          </div>
          <div className="bg-green-50 rounded-lg shadow-md p-4">
            <p className="text-green-700 text-sm mb-1">Shortlisted</p>
            <p className="text-2xl font-bold text-green-700">{statusCounts.shortlisted}</p>
          </div>
          <div className="bg-indigo-50 rounded-lg shadow-md p-4">
            <p className="text-indigo-700 text-sm mb-1">Interviewed</p>
            <p className="text-2xl font-bold text-indigo-700">{statusCounts.interviewed}</p>
          </div>
          <div className="bg-red-50 rounded-lg shadow-md p-4">
            <p className="text-red-700 text-sm mb-1">Rejected</p>
            <p className="text-2xl font-bold text-red-700">{statusCounts.rejected}</p>
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
                placeholder="Search by job title or company..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            {/* Status Filter */}
            <div className="relative">
              <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent appearance-none"
              >
                <option value="all">All Status</option>
                <option value="applied">Applied</option>
                <option value="viewed">Viewed</option>
                <option value="shortlisted">Shortlisted</option>
                <option value="interviewed">Interviewed</option>
                <option value="rejected">Rejected</option>
                <option value="withdrawn">Withdrawn</option>
              </select>
            </div>

            {/* Sort */}
            <div className="relative">
              <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent appearance-none"
              >
                <option value="date-desc">Newest First</option>
                <option value="date-asc">Oldest First</option>
                <option value="company">Company Name</option>
              </select>
            </div>
          </div>
        </div>

        {/* Applications List */}
        {filteredApplications.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <FaFileAlt className="text-gray-300 text-6xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No Applications Found</h3>
            <p className="text-gray-500 mb-6">
              {searchTerm || statusFilter !== 'all'
                ? 'Try adjusting your filters'
                : 'Start applying to jobs to see them here'}
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
            {filteredApplications.map((application) => {
              const StatusIcon = statusColors[application.status].icon;
              return (
                <div
                  key={application.id}
                  className="bg-white rounded-lg shadow-md hover:shadow-lg transition p-6"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <Link
                            to={`/jobs/${application.jobId}`}
                            className="text-xl font-bold text-gray-900 hover:text-primary-600 transition"
                          >
                            {application.jobTitle}
                          </Link>
                          <p className="text-gray-700 font-medium mt-1">{application.company}</p>
                        </div>
                        <span
                          className={`px-4 py-2 rounded-full text-sm font-medium flex items-center ${statusColors[application.status].bg} ${statusColors[application.status].text}`}
                        >
                          <StatusIcon className="mr-2" />
                          {getStatusLabel(application.status)}
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-4 text-gray-600 text-sm mb-4">
                        <span className="flex items-center">
                          <FaMapMarkerAlt className="mr-2" />
                          {application.location}
                        </span>
                        <span className="flex items-center">
                          <FaBriefcase className="mr-2" />
                          {application.salary}
                        </span>
                        <span className="flex items-center">
                          <FaClock className="mr-2" />
                          Applied {getTimeAgo(application.appliedDate)}
                        </span>
                      </div>

                      {/* Timeline Preview */}
                      <div className="flex items-center gap-2 mb-4">
                        {application.timeline.map((item, index) => (
                          <div key={index} className="flex items-center">
                            <div
                              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                statusColors[item.status]?.bg || 'bg-gray-100'
                              }`}
                            >
                              <span
                                className={`text-xs ${statusColors[item.status]?.text || 'text-gray-600'}`}
                              >
                                {index + 1}
                              </span>
                            </div>
                            {index < application.timeline.length - 1 && (
                              <div className="w-12 h-0.5 bg-gray-200"></div>
                            )}
                          </div>
                        ))}
                      </div>

                      <div className="flex gap-3">
                        <button
                          onClick={() => openModal(application)}
                          className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg font-medium transition text-sm"
                        >
                          View Details
                        </button>
                        <Link
                          to={`/jobs/${application.jobId}`}
                          className="border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg font-medium transition text-sm"
                        >
                          View Job
                        </Link>
                        {application.status !== 'rejected' && application.status !== 'withdrawn' && (
                          <button
                            onClick={() => handleWithdraw(application.id)}
                            className="text-red-600 hover:text-red-700 px-4 py-2 rounded-lg font-medium transition text-sm"
                          >
                            Withdraw
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Application Detail Modal */}
      {showModal && selectedApplication && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white">
              <h2 className="text-2xl font-bold text-gray-900">Application Details</h2>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                ×
              </button>
            </div>

            <div className="p-6">
              {/* Job Info */}
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {selectedApplication.jobTitle}
                </h3>
                <p className="text-gray-700 font-medium mb-2">{selectedApplication.company}</p>
                <div className="flex flex-wrap gap-3 text-gray-600 text-sm">
                  <span className="flex items-center">
                    <FaMapMarkerAlt className="mr-2" />
                    {selectedApplication.location}
                  </span>
                  <span className="flex items-center">
                    <FaBriefcase className="mr-2" />
                    {selectedApplication.salary}
                  </span>
                </div>
              </div>

              {/* Current Status */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-3">Current Status</h4>
                <span
                  className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${statusColors[selectedApplication.status].bg} ${statusColors[selectedApplication.status].text}`}
                >
                  {(() => {
                    const StatusIcon = statusColors[selectedApplication.status].icon;
                    return <StatusIcon className="mr-2" />;
                  })()}
                  {getStatusLabel(selectedApplication.status)}
                </span>
              </div>

              {/* Timeline */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-4">Application Timeline</h4>
                <div className="space-y-4">
                  {selectedApplication.timeline.map((item, index) => {
                    const TimelineIcon = statusColors[item.status]?.icon || FaFileAlt;
                    return (
                      <div key={index} className="flex items-start">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 flex-shrink-0 ${
                            statusColors[item.status]?.bg || 'bg-gray-100'
                          }`}
                        >
                          <TimelineIcon
                            className={statusColors[item.status]?.text || 'text-gray-600'}
                          />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">{item.message}</p>
                          <p className="text-sm text-gray-500">{item.date}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <Link
                  to={`/jobs/${selectedApplication.jobId}`}
                  className="flex-1 bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-semibold transition text-center"
                >
                  View Job Details
                </Link>
                {selectedApplication.status !== 'rejected' &&
                  selectedApplication.status !== 'withdrawn' && (
                    <button
                      onClick={() => handleWithdraw(selectedApplication.id)}
                      className="px-6 py-3 border border-red-300 hover:bg-red-50 text-red-600 rounded-lg font-semibold transition"
                    >
                      Withdraw Application
                    </button>
                  )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyApplications;
