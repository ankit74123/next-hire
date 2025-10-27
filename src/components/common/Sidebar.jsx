import { Link, useLocation } from 'react-router-dom';
import {
  FaTachometerAlt,
  FaUser,
  FaBriefcase,
  FaFileAlt,
  FaBell,
  FaBookmark,
  FaChartLine,
  FaCog,
} from 'react-icons/fa';

const Sidebar = ({ userRole = 'jobseeker' }) => {
  const location = useLocation();

  const jobSeekerLinks = [
    { path: '/dashboard', label: 'Dashboard', icon: FaTachometerAlt },
    { path: '/profile', label: 'My Profile', icon: FaUser },
    { path: '/jobs', label: 'Find Jobs', icon: FaBriefcase },
    { path: '/applications', label: 'My Applications', icon: FaFileAlt },
    { path: '/saved-jobs', label: 'Saved Jobs', icon: FaBookmark },
    { path: '/alerts', label: 'Job Alerts', icon: FaBell },
    { path: '/analytics', label: 'Analytics', icon: FaChartLine },
    { path: '/settings', label: 'Settings', icon: FaCog },
  ];

  const recruiterLinks = [
    { path: '/recruiter/dashboard', label: 'Dashboard', icon: FaTachometerAlt },
    { path: '/recruiter/company', label: 'Company Profile', icon: FaUser },
    { path: '/recruiter/post-job', label: 'Post Job', icon: FaBriefcase },
    { path: '/recruiter/jobs', label: 'Manage Jobs', icon: FaFileAlt },
    { path: '/recruiter/candidates', label: 'Search Candidates', icon: FaUser },
    { path: '/recruiter/applications', label: 'Applications', icon: FaFileAlt },
    { path: '/recruiter/analytics', label: 'Analytics', icon: FaChartLine },
    { path: '/recruiter/settings', label: 'Settings', icon: FaCog },
  ];

  const links = userRole === 'recruiter' ? recruiterLinks : jobSeekerLinks;

  const isActive = (path) => location.pathname === path;

  return (
    <aside className="bg-white shadow-lg h-full min-h-screen w-64 fixed left-0 top-16 overflow-y-auto">
      <nav className="py-6">
        <ul className="space-y-1">
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className={`flex items-center space-x-3 px-6 py-3 transition ${
                    isActive(link.path)
                      ? 'bg-primary-50 text-primary-600 border-r-4 border-primary-600'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-primary-600'
                  }`}
                >
                  <Icon className="text-xl" />
                  <span className="font-medium">{link.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
