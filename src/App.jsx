import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useState, useEffect, lazy, Suspense } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaBriefcase } from 'react-icons/fa';
import ErrorBoundary from './components/common/ErrorBoundary';
import NotificationCenter from './components/common/NotificationCenter';

// Eager load critical components
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

// Lazy load other components for code splitting
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'));
const JobSearch = lazy(() => import('./pages/JobSearch'));
const JobDetail = lazy(() => import('./pages/JobDetail'));
const Dashboard = lazy(() => import('./pages/jobseeker/Dashboard'));
const Profile = lazy(() => import('./pages/jobseeker/Profile'));
const BasicInfo = lazy(() => import('./pages/jobseeker/BasicInfo'));
const WorkExperience = lazy(() => import('./pages/jobseeker/WorkExperience'));
const Education = lazy(() => import('./pages/jobseeker/Education'));
const Skills = lazy(() => import('./pages/jobseeker/Skills'));
const AdditionalInfo = lazy(() => import('./pages/jobseeker/AdditionalInfo'));
const ResumeManagement = lazy(() => import('./pages/jobseeker/ResumeManagement'));
const JobApplication = lazy(() => import('./pages/jobseeker/JobApplication'));
const MyApplications = lazy(() => import('./pages/jobseeker/MyApplications'));
const SavedJobs = lazy(() => import('./pages/jobseeker/SavedJobs'));
const JobAlerts = lazy(() => import('./pages/jobseeker/JobAlerts'));
const Notifications = lazy(() => import('./pages/jobseeker/Notifications'));
const NotificationPreferences = lazy(() => import('./pages/jobseeker/NotificationPreferences'));
const Analytics = lazy(() => import('./pages/jobseeker/Analytics'));
const RecruiterDashboard = lazy(() => import('./pages/recruiter/Dashboard'));
const CompanyProfile = lazy(() => import('./pages/recruiter/CompanyProfile'));
const PostJob = lazy(() => import('./pages/recruiter/PostJob'));
const MyJobs = lazy(() => import('./pages/recruiter/MyJobs'));
const JobApplications = lazy(() => import('./pages/recruiter/JobApplications'));
const CandidateSearch = lazy(() => import('./pages/recruiter/CandidateSearch'));
const ATSBoard = lazy(() => import('./pages/recruiter/ATSBoard'));
const Interviews = lazy(() => import('./pages/recruiter/Interviews'));
const Messages = lazy(() => import('./pages/recruiter/Messages'));
const EmailTemplates = lazy(() => import('./pages/recruiter/EmailTemplates'));
const CompanyReviews = lazy(() => import('./pages/CompanyReviews'));
const SalaryInsights = lazy(() => import('./pages/SalaryInsights'));
import './App.css';

// Loading fallback component
const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="text-center">
      <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-600 mx-auto mb-4"></div>
      <p className="text-gray-600">Loading...</p>
    </div>
  </div>
);

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
    <ErrorBoundary>
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
                <Link to="/companies" className="text-gray-700 hover:text-primary-600 font-medium">
                  Companies
                </Link>
                <Link to="/salary" className="text-gray-700 hover:text-primary-600 font-medium">
                  Salaries
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
                        to="/recruiter/jobs" 
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                        onClick={() => setRecruiterDropdown(false)}
                      >
                        My Jobs
                      </Link>
                      <Link 
                        to="/recruiter/applications" 
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                        onClick={() => setRecruiterDropdown(false)}
                      >
                        Applications
                      </Link>
                      <Link 
                        to="/recruiter/candidates" 
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                        onClick={() => setRecruiterDropdown(false)}
                      >
                        Search Candidates
                      </Link>
                      <Link 
                        to="/recruiter/ats" 
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                        onClick={() => setRecruiterDropdown(false)}
                      >
                        ATS Pipeline
                      </Link>
                      <Link 
                        to="/recruiter/interviews" 
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                        onClick={() => setRecruiterDropdown(false)}
                      >
                        Interviews
                      </Link>
                      <Link 
                        to="/recruiter/messages" 
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                        onClick={() => setRecruiterDropdown(false)}
                      >
                        Messages
                      </Link>
                      <Link 
                        to="/recruiter/templates" 
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                        onClick={() => setRecruiterDropdown(false)}
                      >
                        Email Templates
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
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/jobs" element={<JobSearch />} />
              <Route path="/jobs/:id" element={<JobDetail />} />
              <Route path="/jobs/:id/apply" element={<JobApplication />} />
              <Route path="/companies" element={<CompanyReviews />} />
              <Route path="/salary" element={<SalaryInsights />} />
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
              <Route path="/recruiter/jobs" element={<MyJobs />} />
              <Route path="/recruiter/applications" element={<JobApplications />} />
              <Route path="/recruiter/candidates" element={<CandidateSearch />} />
              <Route path="/recruiter/ats" element={<ATSBoard />} />
              <Route path="/recruiter/interviews" element={<Interviews />} />
              <Route path="/recruiter/messages" element={<Messages />} />
              <Route path="/recruiter/templates" element={<EmailTemplates />} />
              <Route path="/recruiter/company" element={<CompanyProfile />} />
              <Route path="/recruiter/post-job" element={<PostJob />} />
            </Routes>
          </Suspense>
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
    </ErrorBoundary>
  );
}

export default App;

