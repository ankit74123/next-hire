import { useState } from 'react';
import {
  FaEye,
  FaDownload,
  FaSearch,
  FaChartLine,
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
  FaCalendar,
  FaTrophy,
  FaLightbulb,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Analytics = () => {
  const [dateRange, setDateRange] = useState('30days');

  // Sample analytics data
  const profileStats = {
    views: 145,
    viewsChange: '+12%',
    downloads: 23,
    downloadsChange: '+5%',
    searchAppearances: 89,
    searchChange: '+8%',
    profileStrength: 75,
  };

  const applicationStats = {
    total: 12,
    applied: 4,
    viewed: 3,
    shortlisted: 2,
    interviewed: 1,
    rejected: 2,
    responseRate: 67,
  };

  const viewsData = [
    { date: 'Oct 20', views: 12 },
    { date: 'Oct 21', views: 15 },
    { date: 'Oct 22', views: 11 },
    { date: 'Oct 23', views: 18 },
    { date: 'Oct 24', views: 14 },
    { date: 'Oct 25', views: 20 },
    { date: 'Oct 26', views: 16 },
    { date: 'Oct 27', views: 19 },
  ];

  const topCompanies = [
    { name: 'Tech Corp', views: 8, logo: '🏢' },
    { name: 'StartUp Inc', views: 6, logo: '🚀' },
    { name: 'Innovation Labs', views: 5, logo: '💡' },
    { name: 'Digital Solutions', views: 4, logo: '💻' },
    { name: 'Cloud Systems', views: 3, logo: '☁️' },
  ];

  const suggestions = [
    {
      id: 1,
      title: 'Complete Your Work Experience',
      description: 'Add detailed work experience to increase profile strength',
      impact: 'High',
      action: 'Complete Now',
      link: '/dashboard/profile/work-experience',
    },
    {
      id: 2,
      title: 'Add More Skills',
      description: 'Add technical and soft skills to match more jobs',
      impact: 'Medium',
      action: 'Add Skills',
      link: '/dashboard/profile/skills',
    },
    {
      id: 3,
      title: 'Upload Your Resume',
      description: 'Upload a professional resume to apply faster',
      impact: 'High',
      action: 'Upload Resume',
      link: '/dashboard/profile/resume',
    },
    {
      id: 4,
      title: 'Create Job Alerts',
      description: 'Get notified when new jobs match your preferences',
      impact: 'Medium',
      action: 'Create Alert',
      link: '/dashboard/job-alerts',
    },
  ];

  const matchingJobs = [
    { title: 'Senior React Developer', match: 95, company: 'Tech Corp', salary: '₹15-25 LPA' },
    { title: 'Full Stack Engineer', match: 92, company: 'StartUp Inc', salary: '₹12-18 LPA' },
    { title: 'Frontend Developer', match: 88, company: 'Digital Agency', salary: '₹10-15 LPA' },
  ];

  const maxViews = Math.max(...viewsData.map((d) => d.views));

  const getImpactColor = (impact) => {
    const colors = {
      High: 'text-red-600 bg-red-100',
      Medium: 'text-yellow-600 bg-yellow-100',
      Low: 'text-green-600 bg-green-100',
    };
    return colors[impact] || 'text-gray-600 bg-gray-100';
  };

  const getStatusColor = (status) => {
    const colors = {
      applied: 'bg-blue-500',
      viewed: 'bg-purple-500',
      shortlisted: 'bg-green-500',
      interviewed: 'bg-indigo-500',
      rejected: 'bg-red-500',
    };
    return colors[status] || 'bg-gray-500';
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Analytics & Insights</h1>
            <p className="text-gray-600">Track your job search performance and get personalized recommendations</p>
          </div>

          {/* Date Range Selector */}
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="7days">Last 7 Days</option>
            <option value="30days">Last 30 Days</option>
            <option value="90days">Last 90 Days</option>
            <option value="all">All Time</option>
          </select>
        </div>

        {/* Profile Statistics Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Profile Views */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <FaEye className="text-blue-600 text-2xl" />
              </div>
              <span className="text-green-600 text-sm font-semibold">{profileStats.viewsChange}</span>
            </div>
            <p className="text-gray-600 text-sm mb-1">Profile Views</p>
            <p className="text-3xl font-bold text-gray-900">{profileStats.views}</p>
          </div>

          {/* Resume Downloads */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <FaDownload className="text-green-600 text-2xl" />
              </div>
              <span className="text-green-600 text-sm font-semibold">{profileStats.downloadsChange}</span>
            </div>
            <p className="text-gray-600 text-sm mb-1">Resume Downloads</p>
            <p className="text-3xl font-bold text-gray-900">{profileStats.downloads}</p>
          </div>

          {/* Search Appearances */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <FaSearch className="text-purple-600 text-2xl" />
              </div>
              <span className="text-green-600 text-sm font-semibold">{profileStats.searchChange}</span>
            </div>
            <p className="text-gray-600 text-sm mb-1">Search Appearances</p>
            <p className="text-3xl font-bold text-gray-900">{profileStats.searchAppearances}</p>
          </div>

          {/* Profile Strength */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <FaTrophy className="text-yellow-600 text-2xl" />
              </div>
              <span className="text-gray-600 text-sm font-semibold">Good</span>
            </div>
            <p className="text-gray-600 text-sm mb-1">Profile Strength</p>
            <div className="flex items-end">
              <p className="text-3xl font-bold text-gray-900">{profileStats.profileStrength}%</p>
              <Link to="/dashboard/profile" className="text-sm text-primary-600 hover:text-primary-700 ml-2 mb-1">
                Improve
              </Link>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          {/* Profile Views Chart */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Profile Views Trend</h2>
              <FaChartLine className="text-primary-600 text-xl" />
            </div>

            {/* Simple Bar Chart */}
            <div className="space-y-4">
              {viewsData.map((data, index) => (
                <div key={index} className="flex items-center">
                  <span className="text-sm text-gray-600 w-16">{data.date}</span>
                  <div className="flex-1 ml-4">
                    <div className="relative h-8 bg-gray-100 rounded-lg overflow-hidden">
                      <div
                        className="absolute top-0 left-0 h-full bg-primary-600 rounded-lg transition-all duration-500"
                        style={{ width: `${(data.views / maxViews) * 100}%` }}
                      ></div>
                      <span className="absolute inset-0 flex items-center justify-end pr-3 text-sm font-semibold text-gray-900">
                        {data.views}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Profile Strength Score */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Profile Strength</h2>

            {/* Circular Progress */}
            <div className="flex justify-center mb-6">
              <div className="relative w-40 h-40">
                <svg className="transform -rotate-90 w-40 h-40">
                  <circle
                    cx="80"
                    cy="80"
                    r="70"
                    stroke="currentColor"
                    strokeWidth="12"
                    fill="transparent"
                    className="text-gray-200"
                  />
                  <circle
                    cx="80"
                    cy="80"
                    r="70"
                    stroke="currentColor"
                    strokeWidth="12"
                    fill="transparent"
                    strokeDasharray={`${2 * Math.PI * 70}`}
                    strokeDashoffset={`${2 * Math.PI * 70 * (1 - profileStats.profileStrength / 100)}`}
                    className="text-primary-600"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-4xl font-bold text-gray-900">{profileStats.profileStrength}%</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Basic Info</span>
                <span className="font-semibold text-green-600">✓ Complete</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Work Experience</span>
                <span className="font-semibold text-yellow-600">50% Done</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Skills</span>
                <span className="font-semibold text-green-600">✓ Complete</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Resume</span>
                <span className="font-semibold text-red-600">Pending</span>
              </div>
            </div>

            <Link
              to="/dashboard/profile"
              className="mt-6 w-full bg-primary-600 hover:bg-primary-700 text-white py-2 rounded-lg font-semibold transition text-center block"
            >
              Complete Profile
            </Link>
          </div>
        </div>

        {/* Application Analytics */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Applications by Status */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Applications by Status</h2>

            <div className="flex items-center justify-center mb-6">
              {/* Simple Donut Chart */}
              <div className="relative w-48 h-48">
                <svg className="transform -rotate-90 w-48 h-48">
                  {/* Background circle */}
                  <circle
                    cx="96"
                    cy="96"
                    r="80"
                    stroke="currentColor"
                    strokeWidth="24"
                    fill="transparent"
                    className="text-gray-200"
                  />
                  {/* Status segments */}
                  {(() => {
                    const total = applicationStats.total;
                    const circumference = 2 * Math.PI * 80;
                    let offset = 0;

                    return Object.entries(applicationStats)
                      .filter(([key]) => key !== 'total' && key !== 'responseRate')
                      .map(([status, count], index) => {
                        const percentage = (count / total) * 100;
                        const strokeDasharray = circumference;
                        const strokeDashoffset = circumference - (circumference * percentage) / 100;
                        const currentOffset = offset;
                        offset += (percentage / 100) * circumference;

                        return (
                          <circle
                            key={status}
                            cx="96"
                            cy="96"
                            r="80"
                            stroke="currentColor"
                            strokeWidth="24"
                            fill="transparent"
                            strokeDasharray={strokeDasharray}
                            strokeDashoffset={strokeDashoffset}
                            className={getStatusColor(status)}
                            style={{
                              strokeDashoffset: circumference - currentOffset,
                            }}
                            strokeLinecap="round"
                          />
                        );
                      });
                  })()}
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-4xl font-bold text-gray-900">{applicationStats.total}</span>
                  <span className="text-sm text-gray-600">Total</span>
                </div>
              </div>
            </div>

            {/* Legend */}
            <div className="grid grid-cols-2 gap-3">
              {Object.entries(applicationStats)
                .filter(([key]) => key !== 'total' && key !== 'responseRate')
                .map(([status, count]) => (
                  <div key={status} className="flex items-center">
                    <div className={`w-3 h-3 rounded-full ${getStatusColor(status)} mr-2`}></div>
                    <span className="text-sm text-gray-700 capitalize">
                      {status}: {count}
                    </span>
                  </div>
                ))}
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-gray-700">
                <span className="font-semibold">Response Rate:</span>{' '}
                <span className="text-primary-600 font-bold">{applicationStats.responseRate}%</span>
              </p>
            </div>
          </div>

          {/* Companies Viewing Profile */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Top Companies Viewing Your Profile</h2>

            <div className="space-y-4">
              {topCompanies.map((company, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-2xl mr-3">
                      {company.logo}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{company.name}</p>
                      <p className="text-sm text-gray-600">{company.views} views</p>
                    </div>
                  </div>
                  <div className="w-16">
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary-600 rounded-full"
                        style={{ width: `${(company.views / topCompanies[0].views) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Link
              to="/dashboard/applications"
              className="mt-6 w-full border border-gray-300 hover:bg-gray-50 text-gray-700 py-2 rounded-lg font-semibold transition text-center block"
            >
              View All Companies
            </Link>
          </div>
        </div>

        {/* Suggested Improvements */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center mb-6">
            <FaLightbulb className="text-yellow-500 text-2xl mr-3" />
            <h2 className="text-xl font-bold text-gray-900">Suggested Improvements</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {suggestions.map((suggestion) => (
              <div key={suggestion.id} className="border border-gray-200 rounded-lg p-4 hover:border-primary-300 transition">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-semibold text-gray-900">{suggestion.title}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getImpactColor(suggestion.impact)}`}>
                    {suggestion.impact}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-4">{suggestion.description}</p>
                <Link
                  to={suggestion.link}
                  className="text-primary-600 hover:text-primary-700 font-medium text-sm"
                >
                  {suggestion.action} →
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Jobs Matching Profile */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Jobs Matching Your Profile</h2>

          <div className="space-y-3">
            {matchingJobs.map((job, index) => (
              <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-primary-300 transition">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">{job.title}</h3>
                  <p className="text-sm text-gray-600">
                    {job.company} • {job.salary}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-2xl font-bold text-green-600">{job.match}%</p>
                    <p className="text-xs text-gray-600">Match</p>
                  </div>
                  <Link
                    to="/jobs"
                    className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg font-medium transition text-sm whitespace-nowrap"
                  >
                    Apply Now
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <Link
            to="/jobs"
            className="mt-6 w-full border border-gray-300 hover:bg-gray-50 text-gray-700 py-2 rounded-lg font-semibold transition text-center block"
          >
            View All Matching Jobs
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
