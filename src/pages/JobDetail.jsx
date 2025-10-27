import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  FaMapMarkerAlt,
  FaBriefcase,
  FaDollarSign,
  FaClock,
  FaUsers,
  FaBuilding,
  FaIndustry,
  FaCalendar,
  FaBookmark,
  FaRegBookmark,
  FaShare,
  FaFlag,
  FaChevronRight,
  FaStar,
  FaExternalLinkAlt,
} from 'react-icons/fa';
import { toast } from 'react-toastify';
import JobCard from '../components/common/JobCard';

const JobDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isSaved, setIsSaved] = useState(false);

  // Sample job data (in real app, fetch from API using id)
  const job = {
    id: parseInt(id),
    title: 'Senior React Developer',
    company: 'Tech Corp',
    companyLogo: null,
    location: 'San Francisco, CA',
    experience: '3-5 years',
    salary: '₹15-25 LPA',
    jobType: 'Full-time',
    workMode: 'Remote',
    skills: ['React', 'Node.js', 'TypeScript', 'AWS', 'Docker', 'Redux', 'GraphQL', 'Jest'],
    postedDate: '2025-10-25',
    applicants: 45,
    openings: 3,
    description: `We are looking for an experienced Senior React Developer to join our growing team. You will be responsible for developing and maintaining high-quality web applications using React and related technologies.

This is an excellent opportunity to work on challenging projects with a talented team in a fast-paced environment. We offer competitive compensation, flexible working hours, and opportunities for professional growth.`,
    responsibilities: [
      'Design and develop user-facing features using React.js',
      'Build reusable components and front-end libraries for future use',
      'Translate designs and wireframes into high-quality code',
      'Optimize components for maximum performance across devices',
      'Collaborate with backend developers and designers',
      'Mentor junior developers and conduct code reviews',
      'Stay up-to-date with emerging trends and technologies',
    ],
    requirements: [
      'Bachelor\'s degree in Computer Science or related field',
      '3-5 years of experience with React.js and its core principles',
      'Strong proficiency in JavaScript, including ES6+ features',
      'Experience with state management libraries (Redux, MobX)',
      'Familiarity with RESTful APIs and GraphQL',
      'Knowledge of modern authorization mechanisms (JWT, OAuth)',
      'Experience with testing frameworks (Jest, React Testing Library)',
      'Excellent problem-solving and communication skills',
    ],
    benefits: [
      'Competitive salary and performance bonuses',
      'Health insurance for employee and family',
      'Flexible working hours and remote work options',
      'Professional development budget',
      'Annual team retreats',
      'Modern office with gaming room and cafe',
      'Stock options for senior positions',
      'Paid time off and sick leaves',
    ],
    companyInfo: {
      name: 'Tech Corp',
      about: 'Tech Corp is a leading technology company specializing in cutting-edge web and mobile applications. With over 500 employees globally, we are committed to innovation and excellence in software development.',
      size: '500-1000 employees',
      industry: 'Information Technology',
      founded: '2010',
      website: 'https://techcorp.example.com',
      locations: ['San Francisco, CA', 'New York, NY', 'Austin, TX', 'Remote'],
      workingHours: '9:00 AM - 6:00 PM (Flexible)',
      rating: 4.2,
      reviews: 187,
    },
  };

  // Similar jobs
  const similarJobs = [
    {
      id: 2,
      title: 'Full Stack Developer',
      company: 'StartUp Inc',
      location: 'Bangalore, India',
      experience: '2-4 years',
      salary: '₹12-18 LPA',
      jobType: 'Full-time',
      workMode: 'Hybrid',
      skills: ['React', 'Node.js', 'MongoDB', 'Express'],
      postedDate: '2025-10-26',
      applicants: 32,
    },
    {
      id: 6,
      title: 'Mobile App Developer',
      company: 'App Innovators',
      location: 'Hyderabad, India',
      experience: '2-4 years',
      salary: '₹12-20 LPA',
      jobType: 'Full-time',
      workMode: 'On-site',
      skills: ['React Native', 'Flutter', 'iOS', 'Android'],
      postedDate: '2025-10-26',
      applicants: 41,
    },
    {
      id: 4,
      title: 'UI/UX Designer',
      company: 'Creative Agency',
      location: 'Remote',
      experience: '2-5 years',
      salary: '₹10-15 LPA',
      jobType: 'Contract',
      workMode: 'Remote',
      skills: ['Figma', 'Adobe XD', 'Sketch', 'Prototyping'],
      postedDate: '2025-10-27',
      applicants: 52,
    },
  ];

  const handleSaveJob = () => {
    setIsSaved(!isSaved);
    toast.success(isSaved ? 'Job removed from saved' : 'Job saved successfully!');
  };

  const handleApply = () => {
    navigate(`/jobs/${id}/apply`);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: job.title,
        text: `Check out this job: ${job.title} at ${job.company}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Job link copied to clipboard!');
    }
  };

  const handleReport = () => {
    toast.info('Report job functionality will be implemented');
  };

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

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Breadcrumb */}
        <nav className="flex items-center text-sm text-gray-600 mb-6">
          <Link to="/" className="hover:text-primary-600">Home</Link>
          <FaChevronRight className="mx-2 text-xs" />
          <Link to="/jobs" className="hover:text-primary-600">Jobs</Link>
          <FaChevronRight className="mx-2 text-xs" />
          <span className="text-gray-900">{job.title}</span>
        </nav>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Job Header */}
            <div className="bg-white rounded-lg shadow-md p-8 mb-6">
              <div className="flex items-start justify-between mb-6">
                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-gray-900 mb-3">{job.title}</h1>
                  <h2 className="text-xl text-gray-700 font-medium mb-4">{job.company}</h2>
                  
                  <div className="flex flex-wrap gap-3 mb-4">
                    <span className={`px-4 py-2 rounded-full text-sm font-medium ${getJobTypeBadgeColor(job.jobType)}`}>
                      {job.jobType}
                    </span>
                    <span className={`px-4 py-2 rounded-full text-sm font-medium ${getWorkModeBadgeColor(job.workMode)}`}>
                      {job.workMode}
                    </span>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 text-gray-700">
                    <div className="flex items-center">
                      <FaMapMarkerAlt className="text-gray-400 mr-3" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center">
                      <FaBriefcase className="text-gray-400 mr-3" />
                      <span>{job.experience}</span>
                    </div>
                    <div className="flex items-center">
                      <FaDollarSign className="text-gray-400 mr-3" />
                      <span>{job.salary}</span>
                    </div>
                    <div className="flex items-center">
                      <FaClock className="text-gray-400 mr-3" />
                      <span>{getPostedTimeAgo(job.postedDate)}</span>
                    </div>
                    <div className="flex items-center">
                      <FaUsers className="text-gray-400 mr-3" />
                      <span>{job.applicants} applicants</span>
                    </div>
                    <div className="flex items-center">
                      <FaCalendar className="text-gray-400 mr-3" />
                      <span>{job.openings} openings</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 pt-6 border-t">
                <button
                  onClick={handleApply}
                  className="flex-1 md:flex-none bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-lg font-semibold transition"
                >
                  Apply Now
                </button>
                <button
                  onClick={handleSaveJob}
                  className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition flex items-center"
                >
                  {isSaved ? <FaBookmark className="text-primary-600 mr-2" /> : <FaRegBookmark className="mr-2" />}
                  {isSaved ? 'Saved' : 'Save Job'}
                </button>
                <button
                  onClick={handleShare}
                  className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition flex items-center"
                >
                  <FaShare className="mr-2" />
                  Share
                </button>
                <button
                  onClick={handleReport}
                  className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition flex items-center text-red-600"
                >
                  <FaFlag className="mr-2" />
                  Report
                </button>
              </div>
            </div>

            {/* Job Description */}
            <div className="bg-white rounded-lg shadow-md p-8 mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Job Description</h3>
              <p className="text-gray-700 whitespace-pre-line leading-relaxed">{job.description}</p>
            </div>

            {/* Key Responsibilities */}
            <div className="bg-white rounded-lg shadow-md p-8 mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Key Responsibilities</h3>
              <ul className="space-y-3">
                {job.responsibilities.map((item, index) => (
                  <li key={index} className="flex items-start text-gray-700">
                    <span className="text-primary-600 mr-3 mt-1">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Requirements */}
            <div className="bg-white rounded-lg shadow-md p-8 mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Requirements & Qualifications</h3>
              <ul className="space-y-3">
                {job.requirements.map((item, index) => (
                  <li key={index} className="flex items-start text-gray-700">
                    <span className="text-primary-600 mr-3 mt-1">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Skills Required */}
            <div className="bg-white rounded-lg shadow-md p-8 mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Skills Required</h3>
              <div className="flex flex-wrap gap-3">
                {job.skills.map((skill, index) => (
                  <span key={index} className="bg-primary-100 text-primary-700 px-4 py-2 rounded-lg font-medium">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Benefits */}
            <div className="bg-white rounded-lg shadow-md p-8 mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Benefits & Perks</h3>
              <ul className="space-y-3">
                {job.benefits.map((item, index) => (
                  <li key={index} className="flex items-start text-gray-700">
                    <span className="text-green-600 mr-3 mt-1">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Similar Jobs */}
            <div className="bg-white rounded-lg shadow-md p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Similar Jobs</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {similarJobs.map((similarJob) => (
                  <JobCard
                    key={similarJob.id}
                    job={similarJob}
                    gridView={true}
                    isSaved={false}
                    onSave={() => toast.success('Job saved!')}
                    onQuickApply={() => toast.success('Applied!')}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Sticky Container */}
            <div className="sticky top-24 space-y-6">
              {/* Company Information */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">About Company</h3>
                
                {/* Company Logo */}
                <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  {job.companyLogo ? (
                    <img src={job.companyLogo} alt={job.companyInfo.name} className="w-16 h-16 object-contain" />
                  ) : (
                    <span className="text-3xl font-bold text-gray-400">{job.companyInfo.name.charAt(0)}</span>
                  )}
                </div>

                <h4 className="text-lg font-semibold text-gray-900 text-center mb-4">{job.companyInfo.name}</h4>

                <p className="text-gray-700 text-sm mb-4 leading-relaxed">{job.companyInfo.about}</p>

                {/* Company Details */}
                <div className="space-y-3 mb-4">
                  <div className="flex items-center text-sm">
                    <FaUsers className="text-gray-400 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{job.companyInfo.size}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <FaIndustry className="text-gray-400 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{job.companyInfo.industry}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <FaCalendar className="text-gray-400 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">Founded in {job.companyInfo.founded}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <FaClock className="text-gray-400 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{job.companyInfo.workingHours}</span>
                  </div>
                </div>

                {/* Office Locations */}
                <div className="mb-4">
                  <p className="text-sm font-semibold text-gray-900 mb-2">Office Locations:</p>
                  <div className="space-y-2">
                    {job.companyInfo.locations.map((location, index) => (
                      <div key={index} className="flex items-center text-sm text-gray-700">
                        <FaMapMarkerAlt className="text-gray-400 mr-2 text-xs" />
                        <span>{location}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Company Rating */}
                <div className="flex items-center justify-between mb-4 p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div className="flex items-center mb-1">
                      <FaStar className="text-yellow-400 mr-1" />
                      <span className="font-semibold text-gray-900">{job.companyInfo.rating}</span>
                    </div>
                    <p className="text-xs text-gray-600">{job.companyInfo.reviews} reviews</p>
                  </div>
                  <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">
                    View Reviews
                  </button>
                </div>

                {/* Company Website */}
                <a
                  href={job.companyInfo.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-gray-100 hover:bg-gray-200 text-gray-900 py-2 rounded-lg font-medium transition flex items-center justify-center"
                >
                  <FaExternalLinkAlt className="mr-2 text-sm" />
                  Visit Website
                </a>
              </div>

              {/* Quick Apply Box */}
              <div className="bg-primary-50 border-2 border-primary-200 rounded-lg p-6">
                <h4 className="text-lg font-bold text-gray-900 mb-2">Ready to Apply?</h4>
                <p className="text-sm text-gray-700 mb-4">
                  Take the next step in your career journey
                </p>
                <button
                  onClick={handleApply}
                  className="w-full bg-primary-600 hover:bg-primary-700 text-white py-3 rounded-lg font-semibold transition"
                >
                  Apply Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sticky Apply Button */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg p-4 z-50">
        <div className="flex gap-3">
          <button
            onClick={handleSaveJob}
            className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
          >
            {isSaved ? <FaBookmark className="text-primary-600" /> : <FaRegBookmark />}
          </button>
          <button
            onClick={handleApply}
            className="flex-1 bg-primary-600 hover:bg-primary-700 text-white py-3 rounded-lg font-semibold transition"
          >
            Apply Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobDetail;
