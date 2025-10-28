import { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { 
  FaUser, 
  FaEnvelope, 
  FaPhone,
  FaMapMarkerAlt,
  FaBriefcase,
  FaGraduationCap,
  FaStar,
  FaDownload,
  FaEye,
  FaCheckCircle,
  FaTimesCircle,
  FaCalendarAlt,
  FaSearch,
  FaFilter,
  FaFileExport
} from 'react-icons/fa';
import { toast } from 'react-toastify';

const JobApplications = () => {
  const [searchParams] = useSearchParams();
  const jobIdFromUrl = searchParams.get('jobId');
  
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedJobFilter, setSelectedJobFilter] = useState(jobIdFromUrl || 'all');
  const [selectedApplications, setSelectedApplications] = useState([]);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);

  // Sample jobs data
  const jobs = [
    { id: 1, title: 'Senior Frontend Developer' },
    { id: 2, title: 'Full Stack Developer' },
    { id: 3, title: 'UI/UX Designer' },
    { id: 4, title: 'Backend Developer' },
    { id: 6, title: 'DevOps Engineer' }
  ];

  // Sample applications data
  const [applications, setApplications] = useState([
    {
      id: 1,
      jobId: 1,
      jobTitle: 'Senior Frontend Developer',
      candidateName: 'Sarah Johnson',
      email: 'sarah.johnson@email.com',
      phone: '+1 (555) 123-4567',
      location: 'San Francisco, CA',
      experience: '5 years',
      education: 'Bachelor\'s in Computer Science',
      skills: ['React', 'TypeScript', 'Node.js', 'CSS'],
      appliedDate: '2025-10-25',
      status: 'new',
      rating: 0,
      resume: 'sarah_johnson_resume.pdf',
      coverLetter: 'I am excited to apply...',
      matchScore: 95
    },
    {
      id: 2,
      jobId: 1,
      jobTitle: 'Senior Frontend Developer',
      candidateName: 'Michael Chen',
      email: 'michael.chen@email.com',
      phone: '+1 (555) 234-5678',
      location: 'New York, NY',
      experience: '6 years',
      education: 'Master\'s in Software Engineering',
      skills: ['React', 'Vue', 'Angular', 'JavaScript'],
      appliedDate: '2025-10-24',
      status: 'viewed',
      rating: 4,
      resume: 'michael_chen_resume.pdf',
      coverLetter: 'With 6 years of experience...',
      matchScore: 92
    },
    {
      id: 3,
      jobId: 1,
      jobTitle: 'Senior Frontend Developer',
      candidateName: 'Emily Rodriguez',
      email: 'emily.rodriguez@email.com',
      phone: '+1 (555) 345-6789',
      location: 'Austin, TX',
      experience: '4 years',
      education: 'Bachelor\'s in Computer Science',
      skills: ['React', 'Redux', 'TypeScript', 'GraphQL'],
      appliedDate: '2025-10-23',
      status: 'shortlisted',
      rating: 5,
      resume: 'emily_rodriguez_resume.pdf',
      coverLetter: 'I have been working with React...',
      matchScore: 89
    },
    {
      id: 4,
      jobId: 2,
      jobTitle: 'Full Stack Developer',
      candidateName: 'David Kumar',
      email: 'david.kumar@email.com',
      phone: '+1 (555) 456-7890',
      location: 'Seattle, WA',
      experience: '7 years',
      education: 'Bachelor\'s in Information Technology',
      skills: ['Node.js', 'React', 'MongoDB', 'AWS'],
      appliedDate: '2025-10-22',
      status: 'interviewed',
      rating: 5,
      resume: 'david_kumar_resume.pdf',
      coverLetter: 'I am a passionate full stack developer...',
      matchScore: 94
    },
    {
      id: 5,
      jobId: 2,
      jobTitle: 'Full Stack Developer',
      candidateName: 'Jessica Martinez',
      email: 'jessica.martinez@email.com',
      phone: '+1 (555) 567-8901',
      location: 'Boston, MA',
      experience: '3 years',
      education: 'Bachelor\'s in Computer Science',
      skills: ['Python', 'Django', 'React', 'PostgreSQL'],
      appliedDate: '2025-10-21',
      status: 'rejected',
      rating: 2,
      resume: 'jessica_martinez_resume.pdf',
      coverLetter: 'Although I have only 3 years...',
      matchScore: 78
    },
    {
      id: 6,
      jobId: 3,
      jobTitle: 'UI/UX Designer',
      candidateName: 'Alex Thompson',
      email: 'alex.thompson@email.com',
      phone: '+1 (555) 678-9012',
      location: 'Los Angeles, CA',
      experience: '5 years',
      education: 'Bachelor\'s in Design',
      skills: ['Figma', 'Sketch', 'Adobe XD', 'Prototyping'],
      appliedDate: '2025-10-26',
      status: 'new',
      rating: 0,
      resume: 'alex_thompson_resume.pdf',
      coverLetter: 'I am a creative designer...',
      matchScore: 91
    }
  ]);

  const stats = {
    total: applications.length,
    new: applications.filter(a => a.status === 'new').length,
    viewed: applications.filter(a => a.status === 'viewed').length,
    shortlisted: applications.filter(a => a.status === 'shortlisted').length,
    interviewed: applications.filter(a => a.status === 'interviewed').length,
    rejected: applications.filter(a => a.status === 'rejected').length
  };

  const getStatusBadge = (status) => {
    const config = {
      new: { bg: 'bg-blue-100', text: 'text-blue-800', label: 'New' },
      viewed: { bg: 'bg-purple-100', text: 'text-purple-800', label: 'Viewed' },
      shortlisted: { bg: 'bg-green-100', text: 'text-green-800', label: 'Shortlisted' },
      interviewed: { bg: 'bg-orange-100', text: 'text-orange-800', label: 'Interviewed' },
      rejected: { bg: 'bg-red-100', text: 'text-red-800', label: 'Rejected' }
    };
    
    const c = config[status] || config.new;
    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${c.bg} ${c.text}`}>
        {c.label}
      </span>
    );
  };

  const handleStatusChange = (applicationId, newStatus) => {
    setApplications(applications.map(app =>
      app.id === applicationId ? { ...app, status: newStatus } : app
    ));
    toast.success(`Status updated to ${newStatus}`);
  };

  const handleRating = (applicationId, rating) => {
    setApplications(applications.map(app =>
      app.id === applicationId ? { ...app, rating } : app
    ));
    toast.success(`Rating updated: ${rating} stars`);
  };

  const handleBulkAction = (action) => {
    if (selectedApplications.length === 0) {
      toast.warning('Please select applications first');
      return;
    }

    switch(action) {
      case 'shortlist':
        setApplications(applications.map(app =>
          selectedApplications.includes(app.id) ? { ...app, status: 'shortlisted' } : app
        ));
        toast.success(`${selectedApplications.length} application(s) shortlisted`);
        break;
      case 'reject':
        if (window.confirm(`Are you sure you want to reject ${selectedApplications.length} application(s)?`)) {
          setApplications(applications.map(app =>
            selectedApplications.includes(app.id) ? { ...app, status: 'rejected' } : app
          ));
          toast.success(`${selectedApplications.length} application(s) rejected`);
        }
        break;
      case 'email':
        toast.info('Email functionality coming soon!');
        break;
      default:
        break;
    }
    setSelectedApplications([]);
  };

  const handleExportCSV = () => {
    toast.success('Exporting applications to CSV...');
    // Would implement actual CSV export here
  };

  const toggleApplicationSelection = (appId) => {
    setSelectedApplications(prev =>
      prev.includes(appId) ? prev.filter(id => id !== appId) : [...prev, appId]
    );
  };

  const toggleAllApplications = () => {
    if (selectedApplications.length === filteredApplications.length) {
      setSelectedApplications([]);
    } else {
      setSelectedApplications(filteredApplications.map(app => app.id));
    }
  };

  const openDetailModal = (application) => {
    // Mark as viewed when opening
    if (application.status === 'new') {
      handleStatusChange(application.id, 'viewed');
    }
    setSelectedApplication(application);
    setShowDetailModal(true);
  };

  const filteredApplications = applications.filter(app => {
    const matchesSearch = 
      app.candidateName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
    const matchesJob = selectedJobFilter === 'all' || app.jobId === parseInt(selectedJobFilter);
    return matchesSearch && matchesStatus && matchesJob;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Job Applications</h1>
          <p className="text-gray-600 mt-2">Review and manage candidate applications</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
            <p className="text-gray-600 text-xs font-medium mb-1">Total</p>
            <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
            <p className="text-blue-600 text-xs font-medium mb-1">New</p>
            <p className="text-2xl font-bold text-blue-600">{stats.new}</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
            <p className="text-purple-600 text-xs font-medium mb-1">Viewed</p>
            <p className="text-2xl font-bold text-purple-600">{stats.viewed}</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
            <p className="text-green-600 text-xs font-medium mb-1">Shortlisted</p>
            <p className="text-2xl font-bold text-green-600">{stats.shortlisted}</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
            <p className="text-orange-600 text-xs font-medium mb-1">Interviewed</p>
            <p className="text-2xl font-bold text-orange-600">{stats.interviewed}</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
            <p className="text-red-600 text-xs font-medium mb-1">Rejected</p>
            <p className="text-2xl font-bold text-red-600">{stats.rejected}</p>
          </div>
        </div>

        {/* Filters and Actions */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6 border border-gray-200">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="flex-1">
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by name, email, or skills..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <select
              value={selectedJobFilter}
              onChange={(e) => setSelectedJobFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Jobs</option>
              {jobs.map(job => (
                <option key={job.id} value={job.id}>{job.title}</option>
              ))}
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              <option value="new">New</option>
              <option value="viewed">Viewed</option>
              <option value="shortlisted">Shortlisted</option>
              <option value="interviewed">Interviewed</option>
              <option value="rejected">Rejected</option>
            </select>

            <button
              onClick={handleExportCSV}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 flex items-center gap-2 whitespace-nowrap"
            >
              <FaFileExport /> Export CSV
            </button>
          </div>

          {selectedApplications.length > 0 && (
            <div className="flex gap-2 pt-4 border-t border-gray-200">
              <span className="text-sm text-gray-600 py-2">
                {selectedApplications.length} selected
              </span>
              <button
                onClick={() => handleBulkAction('shortlist')}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm flex items-center gap-2"
              >
                <FaCheckCircle /> Shortlist
              </button>
              <button
                onClick={() => handleBulkAction('reject')}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm flex items-center gap-2"
              >
                <FaTimesCircle /> Reject
              </button>
              <button
                onClick={() => handleBulkAction('email')}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm flex items-center gap-2"
              >
                <FaEnvelope /> Send Email
              </button>
            </div>
          )}
        </div>

        {/* Applications List */}
        <div className="space-y-4">
          {filteredApplications.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-12 text-center border border-gray-200">
              <p className="text-gray-500">No applications found matching your criteria.</p>
            </div>
          ) : (
            filteredApplications.map((application) => (
              <div
                key={application.id}
                className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <input
                    type="checkbox"
                    checked={selectedApplications.includes(application.id)}
                    onChange={() => toggleApplicationSelection(application.id)}
                    className="mt-1 w-5 h-5 rounded"
                  />

                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">
                            {application.candidateName}
                          </h3>
                          {getStatusBadge(application.status)}
                          <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs font-medium">
                            {application.matchScore}% Match
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">
                          Applied for: <span className="font-medium">{application.jobTitle}</span>
                        </p>
                        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                          <span className="flex items-center gap-1">
                            <FaEnvelope className="text-gray-400" />
                            {application.email}
                          </span>
                          <span className="flex items-center gap-1">
                            <FaPhone className="text-gray-400" />
                            {application.phone}
                          </span>
                          <span className="flex items-center gap-1">
                            <FaMapMarkerAlt className="text-gray-400" />
                            {application.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <FaBriefcase className="text-gray-400" />
                            {application.experience}
                          </span>
                          <span className="flex items-center gap-1">
                            <FaGraduationCap className="text-gray-400" />
                            {application.education}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            onClick={() => handleRating(application.id, star)}
                            className={`${
                              star <= application.rating
                                ? 'text-yellow-400'
                                : 'text-gray-300'
                            } hover:text-yellow-400 transition-colors`}
                          >
                            <FaStar />
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {application.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <p className="text-xs text-gray-500">
                        Applied: {new Date(application.appliedDate).toLocaleDateString()}
                      </p>

                      <div className="flex gap-2">
                        <button
                          onClick={() => openDetailModal(application)}
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm flex items-center gap-2"
                        >
                          <FaEye /> View Details
                        </button>

                        <button
                          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm flex items-center gap-2"
                        >
                          <FaDownload /> Resume
                        </button>

                        <select
                          value={application.status}
                          onChange={(e) => handleStatusChange(application.id, e.target.value)}
                          className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="new">New</option>
                          <option value="viewed">Viewed</option>
                          <option value="shortlisted">Shortlisted</option>
                          <option value="interviewed">Interviewed</option>
                          <option value="rejected">Rejected</option>
                        </select>

                        <button
                          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm flex items-center gap-2"
                        >
                          <FaCalendarAlt /> Schedule Interview
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Application Detail Modal */}
      {showDetailModal && selectedApplication && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Application Details</h2>
              <button
                onClick={() => setShowDetailModal(false)}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                ×
              </button>
            </div>

            <div className="p-6">
              {/* Candidate Info */}
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {selectedApplication.candidateName}
                </h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Email</p>
                    <p className="font-medium">{selectedApplication.email}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Phone</p>
                    <p className="font-medium">{selectedApplication.phone}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Location</p>
                    <p className="font-medium">{selectedApplication.location}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Experience</p>
                    <p className="font-medium">{selectedApplication.experience}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Education</p>
                    <p className="font-medium">{selectedApplication.education}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Applied For</p>
                    <p className="font-medium">{selectedApplication.jobTitle}</p>
                  </div>
                </div>
              </div>

              {/* Skills */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-3">Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedApplication.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Cover Letter */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-3">Cover Letter</h4>
                <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">
                  {selectedApplication.coverLetter}
                </p>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                  Shortlist Candidate
                </button>
                <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Schedule Interview
                </button>
                <button className="flex-1 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700">
                  Download Resume
                </button>
                <button className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
                  Reject
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobApplications;
