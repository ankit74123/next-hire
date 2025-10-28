import { FaMapMarkerAlt, FaBriefcase, FaDollarSign, FaClock, FaBookmark, FaRegBookmark, FaUsers } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const JobCard = ({ job, onSave, isSaved = false, onQuickApply, gridView = true }) => {
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

  if (!gridView) {
    // List View
    return (
      <div className="bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 p-6 mb-4 hover-lift border border-gray-100 group">
        <div className="flex items-start justify-between">
          <div className="flex flex-1">
            {/* Company Logo */}
            <div className="w-16 h-16 bg-gradient-to-br from-primary-50 to-purple-50 rounded-xl flex items-center justify-center mr-4 flex-shrink-0 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
              {job.companyLogo ? (
                <img src={job.companyLogo} alt={job.company} className="w-12 h-12 object-contain" />
              ) : (
                <span className="text-2xl font-bold text-primary-600">{job.company.charAt(0)}</span>
              )}
            </div>

            {/* Job Info */}
            <div className="flex-1">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <Link 
                    to={`/jobs/${job.id}`}
                    className="text-xl font-semibold text-gray-900 hover:text-primary-600 transition-colors duration-200"
                  >
                    {job.title}
                  </Link>
                  <p className="text-gray-700 font-medium mt-1">{job.company}</p>
                </div>
                <button
                  onClick={() => onSave(job.id)}
                  className="text-2xl text-gray-400 hover:text-primary-600 transition-all duration-300 hover:scale-125"
                  title={isSaved ? 'Remove from saved' : 'Save job'}
                >
                  {isSaved ? <FaBookmark className="text-primary-600 animate-pulse" /> : <FaRegBookmark />}
                </button>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-3">
                <span className="flex items-center hover:text-primary-600 transition">
                  <FaBriefcase className="mr-2" />
                  {job.experience}
                </span>
                <span className="flex items-center hover:text-green-600 transition">
                  <FaDollarSign className="mr-2" />
                  {job.salary}
                </span>
                <span className="flex items-center hover:text-blue-600 transition">
                  <FaMapMarkerAlt className="mr-2" />
                  {job.location}
                </span>
                <span className="flex items-center hover:text-purple-600 transition">
                  <FaClock className="mr-2" />
                  {getPostedTimeAgo(job.postedDate)}
                </span>
                {job.applicants && (
                  <span className="flex items-center hover:text-orange-600 transition">
                    <FaUsers className="mr-2" />
                    {job.applicants} applicants
                  </span>
                )}
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                <span className={`px-3 py-1 rounded-full text-xs font-medium transform hover:scale-110 transition-transform duration-200 ${getJobTypeBadgeColor(job.jobType)}`}>
                  {job.jobType}
                </span>
                <span className={`px-3 py-1 rounded-full text-xs font-medium transform hover:scale-110 transition-transform duration-200 ${getWorkModeBadgeColor(job.workMode)}`}>
                  {job.workMode}
                </span>
              </div>

              {job.skills && job.skills.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {job.skills.slice(0, 5).map((skill, index) => (
                    <span 
                      key={index} 
                      className="bg-gradient-to-r from-gray-50 to-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs hover:from-primary-50 hover:to-purple-50 hover:text-primary-700 transition-all duration-200 cursor-default transform hover:scale-105"
                    >
                      {skill}
                    </span>
                  ))}
                  {job.skills.length > 5 && (
                    <span className="text-gray-500 text-xs px-2 py-1 hover:text-gray-700 transition">+{job.skills.length - 5} more</span>
                  )}
                </div>
              )}

              <button
                onClick={() => onQuickApply(job.id)}
                className="bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white px-6 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
              >
                Quick Apply
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Grid View
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 p-6 flex flex-col h-full hover-lift border border-gray-100 group animate-fade-in">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center">
          <div className="w-12 h-12 bg-gradient-to-br from-primary-50 to-purple-50 rounded-xl flex items-center justify-center mr-3 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
            {job.companyLogo ? (
              <img src={job.companyLogo} alt={job.company} className="w-10 h-10 object-contain" />
            ) : (
              <span className="text-xl font-bold text-primary-600">{job.company.charAt(0)}</span>
            )}
          </div>
          <div>
            <p className="text-gray-700 text-sm font-semibold group-hover:text-primary-600 transition">{job.company}</p>
            <span className="text-xs text-gray-500">{getPostedTimeAgo(job.postedDate)}</span>
          </div>
        </div>
        <button
          onClick={() => onSave(job.id)}
          className="text-xl text-gray-400 hover:text-primary-600 transition-all duration-300 hover:scale-125"
          title={isSaved ? 'Remove from saved' : 'Save job'}
        >
          {isSaved ? <FaBookmark className="text-primary-600 animate-pulse" /> : <FaRegBookmark />}
        </button>
      </div>

      {/* Job Title */}
      <Link 
        to={`/jobs/${job.id}`}
        className="text-lg font-semibold text-gray-900 hover:text-primary-600 transition-all duration-200 mb-3 block group-hover:translate-x-1"
      >
        {job.title}
      </Link>

      {/* Job Details */}
      <div className="space-y-2 mb-4 text-sm text-gray-600">
        <div className="flex items-center hover:text-blue-600 transition">
          <FaMapMarkerAlt className="mr-2 text-gray-400 group-hover:text-blue-500 transition" />
          <span>{job.location}</span>
        </div>
        <div className="flex items-center hover:text-primary-600 transition">
          <FaBriefcase className="mr-2 text-gray-400 group-hover:text-primary-500 transition" />
          <span>{job.experience}</span>
        </div>
        <div className="flex items-center hover:text-green-600 transition">
          <FaDollarSign className="mr-2 text-gray-400 group-hover:text-green-500 transition" />
          <span>{job.salary}</span>
        </div>
        {job.applicants && (
          <div className="flex items-center hover:text-orange-600 transition">
            <FaUsers className="mr-2 text-gray-400 group-hover:text-orange-500 transition" />
            <span>{job.applicants} applicants</span>
          </div>
        )}
      </div>

      {/* Badges */}
      <div className="flex flex-wrap gap-2 mb-4">
        <span className={`px-3 py-1 rounded-full text-xs font-medium transform hover:scale-110 transition-transform duration-200 ${getJobTypeBadgeColor(job.jobType)}`}>
          {job.jobType}
        </span>
        <span className={`px-3 py-1 rounded-full text-xs font-medium transform hover:scale-110 transition-transform duration-200 ${getWorkModeBadgeColor(job.workMode)}`}>
          {job.workMode}
        </span>
      </div>

      {/* Skills */}
      {job.skills && job.skills.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {job.skills.slice(0, 4).map((skill, index) => (
            <span 
              key={index} 
              className="bg-gradient-to-r from-gray-50 to-gray-100 text-gray-700 px-2 py-1 rounded text-xs hover:from-primary-50 hover:to-purple-50 hover:text-primary-700 transition-all duration-200 cursor-default transform hover:scale-105"
            >
              {skill}
            </span>
          ))}
          {job.skills.length > 4 && (
            <span className="text-gray-500 text-xs px-2 py-1 hover:text-gray-700 transition">+{job.skills.length - 4}</span>
          )}
        </div>
      )}

      {/* Apply Button */}
      <button
        onClick={() => onQuickApply(job.id)}
        className="mt-auto w-full bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
      >
        Quick Apply
      </button>
    </div>
  );
};

export default JobCard;
