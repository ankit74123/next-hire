import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaBriefcase } from 'react-icons/fa';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import JobSearch from './pages/JobSearch';
import JobDetail from './pages/JobDetail';
import Dashboard from './pages/jobseeker/Dashboard';
import Profile from './pages/jobseeker/Profile';
import BasicInfo from './pages/jobseeker/BasicInfo';
import WorkExperience from './pages/jobseeker/WorkExperience';
import Education from './pages/jobseeker/Education';
import Skills from './pages/jobseeker/Skills';
import AdditionalInfo from './pages/jobseeker/AdditionalInfo';
import ResumeManagement from './pages/jobseeker/ResumeManagement';
import JobApplication from './pages/jobseeker/JobApplication';
import MyApplications from './pages/jobseeker/MyApplications';
import SavedJobs from './pages/jobseeker/SavedJobs';
import JobAlerts from './pages/jobseeker/JobAlerts';
import Notifications from './pages/jobseeker/Notifications';
import NotificationPreferences from './pages/jobseeker/NotificationPreferences';
import Analytics from './pages/jobseeker/Analytics';
import NotificationCenter from './components/common/NotificationCenter';
import './App.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        {/* Simple Header */}
        <header className="bg-white shadow-md sticky top-0 z-50">
          <nav className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <Link to="/" className="flex items-center space-x-2">
                <FaBriefcase className="text-primary-600 text-3xl" />
                <span className="text-2xl font-bold text-gray-800">JobPortal</span>
              </Link>

              {/* Navigation Links */}
              <div className="flex items-center space-x-6">
                <Link to="/" className="text-gray-700 hover:text-primary-600 font-medium">
                  Home
                </Link>
                <Link to="/jobs" className="text-gray-700 hover:text-primary-600 font-medium">
                  Find Jobs
                </Link>
                <Link to="/dashboard" className="text-gray-700 hover:text-primary-600 font-medium">
                  Dashboard
                </Link>
                <Link to="/dashboard/analytics" className="text-gray-700 hover:text-primary-600 font-medium">
                  Analytics
                </Link>
                <Link to="/dashboard/applications" className="text-gray-700 hover:text-primary-600 font-medium">
                  My Applications
                </Link>
                <Link to="/dashboard/saved-jobs" className="text-gray-700 hover:text-primary-600 font-medium">
                  Saved Jobs
                </Link>
                
                {/* Notification Center */}
                <NotificationCenter />
                
                <Link to="/login" className="text-gray-700 hover:text-primary-600 font-medium">
                  Login
                </Link>
                <Link to="/register" className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 font-medium">
                  Register
                </Link>
              </div>
            </div>
          </nav>
        </header>

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/jobs" element={<JobSearch />} />
            <Route path="/jobs/:id" element={<JobDetail />} />
            <Route path="/jobs/:id/apply" element={<JobApplication />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/applications" element={<MyApplications />} />
            <Route path="/dashboard/saved-jobs" element={<SavedJobs />} />
            <Route path="/dashboard/job-alerts" element={<JobAlerts />} />
            <Route path="/dashboard/notifications" element={<Notifications />} />
            <Route path="/dashboard/notification-preferences" element={<NotificationPreferences />} />
            <Route path="/dashboard/analytics" element={<Analytics />} />
            <Route path="/dashboard/profile" element={<Profile />} />
            <Route path="/dashboard/profile/basic-info" element={<BasicInfo />} />
            <Route path="/dashboard/profile/work-experience" element={<WorkExperience />} />
            <Route path="/dashboard/profile/education" element={<Education />} />
            <Route path="/dashboard/profile/skills" element={<Skills />} />
            <Route path="/dashboard/profile/additional-info" element={<AdditionalInfo />} />
            <Route path="/dashboard/profile/resume" element={<ResumeManagement />} />
          </Routes>
        </main>
        
        {/* Simple Footer */}
        <footer className="bg-gray-800 text-white py-8 mt-auto">
          <div className="container mx-auto px-4 text-center">
            <p>&copy; 2025 JobPortal. All rights reserved.</p>
          </div>
        </footer>
        
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          closeOnClick
          pauseOnHover
          theme="light"
        />
      </div>
    </Router>
  );
}

export default App;

