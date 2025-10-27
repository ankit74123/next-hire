import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaBriefcase, 
  FaUserTie, 
  FaCalendarAlt, 
  FaEye, 
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
  FaPlus,
  FaSearch,
  FaFileAlt,
  FaChartLine,
  FaUsers
} from 'react-icons/fa';

const RecruiterDashboard = () => {
  const [timeRange, setTimeRange] = useState('week'); // today, week, month

  // Sample data
  const stats = {
    activeJobs: 12,
    totalApplications: 247,
    todayApplications: 8,
    weekApplications: 45,
    monthApplications: 156,
    scheduledInterviews: 5,
    shortlisted: 34,
    profileViews: 1250
  };

  const recentApplications = [
    {
      id: 1,
      candidateName: 'Sarah Johnson',
      jobTitle: 'Senior Frontend Developer',
      appliedDate: '2 hours ago',
      status: 'new',
      experience: '5 years',
      location: 'New York, NY',
      matchScore: 95,
      resume: 'sarah_johnson_resume.pdf'
    },
    {
      id: 2,
      candidateName: 'Michael Chen',
      jobTitle: 'Full Stack Developer',
      appliedDate: '4 hours ago',
      status: 'viewed',
      experience: '3 years',
      location: 'San Francisco, CA',
      matchScore: 88,
      resume: 'michael_chen_resume.pdf'
    },
    {
      id: 3,
      candidateName: 'Emily Rodriguez',
      jobTitle: 'UI/UX Designer',
      appliedDate: '6 hours ago',
      status: 'new',
      experience: '4 years',
      location: 'Austin, TX',
      matchScore: 92,
      resume: 'emily_rodriguez_resume.pdf'
    },
    {
      id: 4,
      candidateName: 'David Kumar',
      jobTitle: 'Backend Developer',
      appliedDate: '1 day ago',
      status: 'shortlisted',
      experience: '6 years',
      location: 'Seattle, WA',
      matchScore: 90,
      resume: 'david_kumar_resume.pdf'
    },
    {
      id: 5,
      candidateName: 'Jessica Martinez',
      jobTitle: 'Senior Frontend Developer',
      appliedDate: '1 day ago',
      status: 'viewed',
      experience: '7 years',
      location: 'Boston, MA',
      matchScore: 94,
      resume: 'jessica_martinez_resume.pdf'
    }
  ];

  const upcomingInterviews = [
    {
      id: 1,
      candidateName: 'John Smith',
      jobTitle: 'Senior Frontend Developer',
      date: 'Today',
      time: '2:00 PM',
      type: 'Technical Round',
      status: 'confirmed'
    },
    {
      id: 2,
      candidateName: 'Anna Williams',
      jobTitle: 'Full Stack Developer',
      date: 'Tomorrow',
      time: '10:00 AM',
      type: 'HR Round',
      status: 'confirmed'
    },
    {
      id: 3,
      candidateName: 'Robert Brown',
      jobTitle: 'Backend Developer',
      date: 'Dec 30',
      time: '3:30 PM',
      type: 'Final Round',
      status: 'pending'
    }
  ];

  const performanceMetrics = [
    {
      label: 'Avg. Time to Hire',
      value: '18 days',
      change: '-3 days',
      trend: 'up',
      icon: FaClock
    },
    {
      label: 'Application Rate',
      value: '45/week',
      change: '+12%',
      trend: 'up',
      icon: FaChartLine
    },
    {
      label: 'Interview Conversion',
      value: '32%',
      change: '+5%',
      trend: 'up',
      icon: FaCheckCircle
    },
    {
      label: 'Offer Acceptance',
      value: '85%',
      change: '+8%',
      trend: 'up',
      icon: FaUsers
    }
  ];

  const getStatusBadge = (status) => {
    const statusConfig = {
      new: { bg: 'bg-blue-100', text: 'text-blue-800', label: 'New' },
      viewed: { bg: 'bg-purple-100', text: 'text-purple-800', label: 'Viewed' },
      shortlisted: { bg: 'bg-green-100', text: 'text-green-800', label: 'Shortlisted' },
      rejected: { bg: 'bg-red-100', text: 'text-red-800', label: 'Rejected' }
    };
    
    const config = statusConfig[status] || statusConfig.new;
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
        {config.label}
      </span>
    );
  };

  const getApplicationsCount = () => {
    switch(timeRange) {
      case 'today': return stats.todayApplications;
      case 'week': return stats.weekApplications;
      case 'month': return stats.monthApplications;
      default: return stats.weekApplications;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Recruiter Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage your jobs and applications</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Active Jobs */}
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <FaBriefcase className="text-blue-600 text-xl" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{stats.activeJobs}</h3>
            <p className="text-gray-600 text-sm mt-1">Active Jobs</p>
            <Link to="/recruiter/jobs" className="text-blue-600 text-sm mt-3 inline-block hover:underline">
              View all jobs →
            </Link>
          </div>

          {/* Applications Received */}
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <FaUserTie className="text-green-600 text-xl" />
              </div>
              <select 
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="text-sm border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
              </select>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{getApplicationsCount()}</h3>
            <p className="text-gray-600 text-sm mt-1">Applications Received</p>
            <Link to="/recruiter/applications" className="text-green-600 text-sm mt-3 inline-block hover:underline">
              View applications →
            </Link>
          </div>

          {/* Scheduled Interviews */}
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <FaCalendarAlt className="text-purple-600 text-xl" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{stats.scheduledInterviews}</h3>
            <p className="text-gray-600 text-sm mt-1">Scheduled Interviews</p>
            <Link to="/recruiter/interviews" className="text-purple-600 text-sm mt-3 inline-block hover:underline">
              View schedule →
            </Link>
          </div>

          {/* Profile Views */}
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <FaEye className="text-orange-600 text-xl" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{stats.profileViews}</h3>
            <p className="text-gray-600 text-sm mt-1">Company Profile Views</p>
            <Link to="/recruiter/company" className="text-orange-600 text-sm mt-3 inline-block hover:underline">
              View company →
            </Link>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8 border border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Link 
              to="/recruiter/post-job"
              className="flex items-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all group"
            >
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3 group-hover:bg-blue-200">
                <FaPlus className="text-blue-600" />
              </div>
              <span className="font-medium text-gray-700 group-hover:text-blue-600">Post New Job</span>
            </Link>

            <Link 
              to="/recruiter/candidates"
              className="flex items-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition-all group"
            >
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3 group-hover:bg-green-200">
                <FaSearch className="text-green-600" />
              </div>
              <span className="font-medium text-gray-700 group-hover:text-green-600">Search Candidates</span>
            </Link>

            <Link 
              to="/recruiter/applications"
              className="flex items-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-all group"
            >
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-3 group-hover:bg-purple-200">
                <FaFileAlt className="text-purple-600" />
              </div>
              <span className="font-medium text-gray-700 group-hover:text-purple-600">Review Applications</span>
            </Link>

            <Link 
              to="/recruiter/company"
              className="flex items-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-orange-500 hover:bg-orange-50 transition-all group"
            >
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mr-3 group-hover:bg-orange-200">
                <FaBriefcase className="text-orange-600" />
              </div>
              <span className="font-medium text-gray-700 group-hover:text-orange-600">Update Company</span>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Applications */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-gray-900">Recent Applications</h2>
                  <Link to="/recruiter/applications" className="text-blue-600 text-sm hover:underline">
                    View All
                  </Link>
                </div>
              </div>
              
              <div className="divide-y divide-gray-200">
                {recentApplications.map((application) => (
                  <div key={application.id} className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-gray-900">{application.candidateName}</h3>
                          {getStatusBadge(application.status)}
                          <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs font-medium">
                            {application.matchScore}% Match
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-1">Applied for: {application.jobTitle}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span>{application.experience} experience</span>
                          <span>•</span>
                          <span>{application.location}</span>
                          <span>•</span>
                          <span>{application.appliedDate}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium transition-colors">
                        View Profile
                      </button>
                      <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm font-medium transition-colors">
                        Download Resume
                      </button>
                      {application.status === 'new' && (
                        <button className="px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 text-sm font-medium transition-colors">
                          Shortlist
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Upcoming Interviews */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-bold text-gray-900">Upcoming Interviews</h2>
              </div>
              <div className="divide-y divide-gray-200">
                {upcomingInterviews.map((interview) => (
                  <div key={interview.id} className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-gray-900 text-sm">{interview.candidateName}</h3>
                        <p className="text-xs text-gray-600 mt-1">{interview.jobTitle}</p>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded ${
                        interview.status === 'confirmed' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {interview.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                      <FaCalendarAlt />
                      <span>{interview.date} at {interview.time}</span>
                    </div>
                    <p className="text-xs text-gray-600 bg-gray-50 px-2 py-1 rounded inline-block">
                      {interview.type}
                    </p>
                  </div>
                ))}
              </div>
              <div className="p-4 border-t border-gray-200">
                <Link to="/recruiter/interviews" className="text-blue-600 text-sm hover:underline">
                  View All Interviews →
                </Link>
              </div>
            </div>

            {/* Performance Metrics */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-bold text-gray-900">Performance Metrics</h2>
              </div>
              <div className="p-4 space-y-4">
                {performanceMetrics.map((metric, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                        <metric.icon className="text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{metric.label}</p>
                        <p className="text-xs text-gray-500">{metric.value}</p>
                      </div>
                    </div>
                    <span className={`text-xs font-medium ${
                      metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {metric.change}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruiterDashboard;
