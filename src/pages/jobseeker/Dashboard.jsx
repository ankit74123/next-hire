import { Link } from 'react-router-dom';
import { 
  FaBriefcase, 
  FaFileAlt, 
  FaEye, 
  FaHeart, 
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
  FaChartLine
} from 'react-icons/fa';

const Dashboard = () => {
  // Sample data
  const stats = [
    {
      label: 'Applications',
      value: '12',
      icon: <FaFileAlt className="text-3xl" />,
      color: 'bg-blue-500',
      change: '+3 this week',
      link: '/dashboard/applications'
    },
    {
      label: 'Profile Views',
      value: '145',
      icon: <FaEye className="text-3xl" />,
      color: 'bg-green-500',
      change: '+12 this week',
      link: '/dashboard/profile'
    },
    {
      label: 'Saved Jobs',
      value: '8',
      icon: <FaHeart className="text-3xl" />,
      color: 'bg-red-500',
      change: '2 expiring soon',
      link: '/dashboard/saved-jobs'
    },
    {
      label: 'Interviews',
      value: '3',
      icon: <FaBriefcase className="text-3xl" />,
      color: 'bg-purple-500',
      change: '1 upcoming',
      link: '/dashboard/applications'
    },
  ];

  const recentApplications = [
    {
      id: 1,
      job: 'Senior React Developer',
      company: 'Tech Corp',
      appliedDate: '2 days ago',
      status: 'Under Review',
      statusColor: 'bg-yellow-100 text-yellow-800',
      icon: <FaClock />
    },
    {
      id: 2,
      job: 'Full Stack Engineer',
      company: 'Innovation Labs',
      appliedDate: '5 days ago',
      status: 'Shortlisted',
      statusColor: 'bg-green-100 text-green-800',
      icon: <FaCheckCircle />
    },
    {
      id: 3,
      job: 'Frontend Developer',
      company: 'Digital Solutions',
      appliedDate: '1 week ago',
      status: 'Rejected',
      statusColor: 'bg-red-100 text-red-800',
      icon: <FaTimesCircle />
    },
  ];

  const recommendedJobs = [
    {
      id: 1,
      title: 'React.js Developer',
      company: 'StartUp Inc',
      location: 'Remote',
      salary: '$100k - $130k',
      match: '95%',
      logo: '🚀'
    },
    {
      id: 2,
      title: 'JavaScript Engineer',
      company: 'Code Masters',
      location: 'San Francisco',
      salary: '$110k - $140k',
      match: '92%',
      logo: '💻'
    },
    {
      id: 3,
      title: 'UI/UX Developer',
      company: 'Design Hub',
      location: 'New York',
      salary: '$95k - $120k',
      match: '88%',
      logo: '🎨'
    },
  ];

  const profileCompletion = 75;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, John! 👋
          </h1>
          <p className="text-gray-600">
            Here's what's happening with your job search
          </p>
        </div>

        {/* Profile Completion Alert */}
        {profileCompletion < 100 && (
          <div className="bg-primary-50 border border-primary-200 rounded-lg p-6 mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  Complete Your Profile
                </h3>
                <p className="text-gray-600 text-sm">
                  Your profile is {profileCompletion}% complete. Complete it to get better job matches!
                </p>
              </div>
              <Link
                to="/dashboard/profile"
                className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-lg font-medium transition whitespace-nowrap"
              >
                Complete Profile
              </Link>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-primary-600 h-3 rounded-full transition-all duration-500"
                style={{ width: `${profileCompletion}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Link
              key={index}
              to={stat.link}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`${stat.color} text-white p-3 rounded-lg`}>
                  {stat.icon}
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-gray-900">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              </div>
              <div className="text-xs text-gray-500 flex items-center">
                <FaChartLine className="mr-1" />
                {stat.change}
              </div>
            </Link>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent Applications */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">
                  Recent Applications
                </h2>
                <Link
                  to="/dashboard/applications"
                  className="text-primary-600 hover:text-primary-700 font-medium text-sm"
                >
                  View All
                </Link>
              </div>

              <div className="space-y-4">
                {recentApplications.map((app) => (
                  <div
                    key={app.id}
                    className="border border-gray-200 rounded-lg p-4 hover:border-primary-300 transition"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">
                          {app.job}
                        </h3>
                        <p className="text-sm text-gray-600 mb-2">
                          {app.company}
                        </p>
                        <p className="text-xs text-gray-500">
                          Applied {app.appliedDate}
                        </p>
                      </div>
                      <span
                        className={`${app.statusColor} px-3 py-1 rounded-full text-xs font-medium flex items-center`}
                      >
                        {app.icon}
                        <span className="ml-1">{app.status}</span>
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {recentApplications.length === 0 && (
                <div className="text-center py-12">
                  <FaFileAlt className="text-6xl text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">No applications yet</p>
                  <Link
                    to="/jobs"
                    className="text-primary-600 hover:text-primary-700 font-medium"
                  >
                    Browse Jobs
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Recommended Jobs */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">
                  Recommended
                </h2>
                <Link
                  to="/jobs"
                  className="text-primary-600 hover:text-primary-700 font-medium text-sm"
                >
                  View All
                </Link>
              </div>

              <div className="space-y-4">
                {recommendedJobs.map((job) => (
                  <div
                    key={job.id}
                    className="border border-gray-200 rounded-lg p-4 hover:border-primary-300 transition cursor-pointer"
                  >
                    <div className="flex items-start mb-3">
                      <div className="text-3xl mr-3">{job.logo}</div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 text-sm mb-1">
                          {job.title}
                        </h3>
                        <p className="text-xs text-gray-600">{job.company}</p>
                      </div>
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded font-medium">
                        {job.match}
                      </span>
                    </div>
                    <div className="text-xs text-gray-600 space-y-1">
                      <p>📍 {job.location}</p>
                      <p>💰 {job.salary}</p>
                    </div>
                    <button className="w-full mt-3 bg-primary-600 hover:bg-primary-700 text-white py-2 rounded text-sm font-medium transition">
                      Apply Now
                    </button>
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

export default Dashboard;
