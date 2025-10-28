import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
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
import RecruiterDashboard from './pages/recruiter/Dashboard';
import CompanyProfile from './pages/recruiter/CompanyProfile';
import PostJob from './pages/recruiter/PostJob';
import './App.css';

function App() {
  const [jobSeekerDropdown, setJobSeekerDropdown] = useState(false);
  const [recruiterDropdown, setRecruiterDropdown] = useState(false);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.dropdown-container')) {
        setJobSeekerDropdown(false);
        setRecruiterDropdown(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

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
                
                {/* Job Seeker Navigation */}
                <div className="relative dropdown-container">
                  <button 
                    onClick={() => {
                      setJobSeekerDropdown(!jobSeekerDropdown);
                      setRecruiterDropdown(false);
                    }}
                    className="text-gray-700 hover:text-primary-600 font-medium"
                  >
                    Job Seeker ▾
                  </button>
                  {jobSeekerDropdown && (
                    <div className="absolute top-full left-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-2 border border-gray-200 z-50">
                      <Link 
                        to="/dashboard" 
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                        onClick={() => setJobSeekerDropdown(false)}
                      >
                        Dashboard
                      </Link>
                      <Link 
                        to="/dashboard/analytics" 
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                        onClick={() => setJobSeekerDropdown(false)}
                      >
                        Analytics
                      </Link>
                      <Link 
                        to="/dashboard/applications" 
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                        onClick={() => setJobSeekerDropdown(false)}
                      >
                        My Applications
                      </Link>
                      <Link 
                        to="/dashboard/saved-jobs" 
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                        onClick={() => setJobSeekerDropdown(false)}
                      >
                        Saved Jobs
                      </Link>
                    </div>
                  )}
                </div>

                {/* Recruiter Navigation */}
                <div className="relative dropdown-container">
                  <button 
                    onClick={() => {
                      setRecruiterDropdown(!recruiterDropdown);
                      setJobSeekerDropdown(false);
                    }}
                    className="text-gray-700 hover:text-primary-600 font-medium"
                  >
                    Recruiter ▾
                  </button>
                  {recruiterDropdown && (
                    <div className="absolute top-full left-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-2 border border-gray-200 z-50">
                      <Link 
                        to="/recruiter/dashboard" 
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                        onClick={() => setRecruiterDropdown(false)}
                      >
                        Dashboard
                      </Link>
                      <Link 
                        to="/recruiter/post-job" 
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                        onClick={() => setRecruiterDropdown(false)}
                      >
                        Post a Job
                      </Link>
                      <Link 
                        to="/recruiter/company" 
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                        onClick={() => setRecruiterDropdown(false)}
                      >
                        Company Profile
                      </Link>
                    </div>
                  )}
                </div>
                
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
            
            {/* Recruiter Routes */}
            <Route path="/recruiter/dashboard" element={<RecruiterDashboard />} />
            <Route path="/recruiter/company" element={<CompanyProfile />} />
            <Route path="/recruiter/post-job" element={<PostJob />} />
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

