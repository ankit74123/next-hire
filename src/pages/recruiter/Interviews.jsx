import { useState } from 'react';
import { FaCalendar, FaClock, FaVideo, FaPhone, FaMapMarkerAlt, FaUser, FaEdit, FaTrash, FaTimes, FaPlus, FaEnvelope } from 'react-icons/fa';
import { toast } from 'react-toastify';

const Interviews = () => {
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);
  const [selectedInterview, setSelectedInterview] = useState(null);
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'calendar'
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  // Interview form state
  const [interviewForm, setInterviewForm] = useState({
    candidateName: '',
    candidateEmail: '',
    jobTitle: '',
    date: '',
    time: '',
    duration: '60',
    type: 'video',
    interviewer: '',
    location: '',
    meetingLink: '',
    notes: ''
  });

  // Sample interviewers
  const interviewers = [
    { id: 1, name: 'John Smith - Tech Lead' },
    { id: 2, name: 'Sarah Williams - HR Manager' },
    { id: 3, name: 'Mike Johnson - Senior Developer' },
    { id: 4, name: 'Emily Davis - Product Manager' }
  ];

  // Sample candidates for quick scheduling
  const candidates = [
    { id: 1, name: 'Sarah Johnson', email: 'sarah.j@email.com', job: 'Senior Frontend Developer' },
    { id: 2, name: 'Michael Chen', email: 'michael.c@email.com', job: 'Full Stack Developer' },
    { id: 3, name: 'Emily Rodriguez', email: 'emily.r@email.com', job: 'UI/UX Designer' }
  ];

  // Sample interviews
  const [interviews, setInterviews] = useState([
    {
      id: 1,
      candidateName: 'Sarah Johnson',
      candidateEmail: 'sarah.j@email.com',
      jobTitle: 'Senior Frontend Developer',
      date: '2025-10-29',
      time: '10:00',
      duration: 60,
      type: 'video',
      interviewer: 'John Smith - Tech Lead',
      meetingLink: 'https://meet.google.com/abc-defg-hij',
      status: 'scheduled',
      notes: 'Technical round - focus on React and system design'
    },
    {
      id: 2,
      candidateName: 'Michael Chen',
      candidateEmail: 'michael.c@email.com',
      jobTitle: 'Full Stack Developer',
      date: '2025-10-29',
      time: '14:00',
      duration: 60,
      type: 'video',
      interviewer: 'Mike Johnson - Senior Developer',
      meetingLink: 'https://zoom.us/j/123456789',
      status: 'scheduled',
      notes: 'Backend architecture discussion'
    },
    {
      id: 3,
      candidateName: 'Emily Rodriguez',
      candidateEmail: 'emily.r@email.com',
      jobTitle: 'UI/UX Designer',
      date: '2025-10-30',
      time: '11:00',
      duration: 45,
      type: 'video',
      interviewer: 'Emily Davis - Product Manager',
      meetingLink: 'https://meet.google.com/xyz-abcd-efg',
      status: 'scheduled',
      notes: 'Portfolio review and design thinking'
    },
    {
      id: 4,
      candidateName: 'David Kumar',
      candidateEmail: 'david.k@email.com',
      jobTitle: 'Backend Developer',
      date: '2025-10-30',
      time: '15:30',
      duration: 60,
      type: 'phone',
      interviewer: 'John Smith - Tech Lead',
      status: 'scheduled',
      notes: 'Initial phone screening'
    },
    {
      id: 5,
      candidateName: 'Jessica Martinez',
      candidateEmail: 'jessica.m@email.com',
      jobTitle: 'Product Manager',
      date: '2025-10-31',
      time: '10:00',
      duration: 90,
      type: 'in-person',
      interviewer: 'Sarah Williams - HR Manager',
      location: 'Office - Conference Room A',
      status: 'scheduled',
      notes: 'Final round with leadership team'
    },
    {
      id: 6,
      candidateName: 'Alex Thompson',
      candidateEmail: 'alex.t@email.com',
      jobTitle: 'DevOps Engineer',
      date: '2025-10-28',
      time: '13:00',
      duration: 60,
      type: 'video',
      interviewer: 'Mike Johnson - Senior Developer',
      meetingLink: 'https://meet.google.com/klm-nopq-rst',
      status: 'completed',
      notes: 'Went well, recommend for next round'
    }
  ]);

  // Get interview type icon and color
  const getInterviewTypeInfo = (type) => {
    const types = {
      video: { icon: FaVideo, color: 'text-blue-600', bg: 'bg-blue-100' },
      phone: { icon: FaPhone, color: 'text-green-600', bg: 'bg-green-100' },
      'in-person': { icon: FaMapMarkerAlt, color: 'text-purple-600', bg: 'bg-purple-100' }
    };
    return types[type] || types.video;
  };

  // Get status badge
  const getStatusBadge = (status) => {
    const badges = {
      scheduled: 'bg-blue-100 text-blue-800',
      completed: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800',
      rescheduled: 'bg-yellow-100 text-yellow-800'
    };
    return badges[status] || badges.scheduled;
  };

  // Handle form input change
  const handleInputChange = (field, value) => {
    setInterviewForm({ ...interviewForm, [field]: value });
  };

  // Handle candidate selection for quick scheduling
  const handleCandidateSelect = (candidate) => {
    setInterviewForm({
      ...interviewForm,
      candidateName: candidate.name,
      candidateEmail: candidate.email,
      jobTitle: candidate.job
    });
  };

  // Schedule interview
  const handleScheduleInterview = () => {
    if (!interviewForm.candidateName || !interviewForm.date || !interviewForm.time || !interviewForm.interviewer) {
      toast.error('Please fill in all required fields');
      return;
    }

    const newInterview = {
      id: interviews.length + 1,
      ...interviewForm,
      duration: parseInt(interviewForm.duration),
      status: 'scheduled'
    };

    setInterviews([...interviews, newInterview]);
    setShowScheduleModal(false);
    setInterviewForm({
      candidateName: '',
      candidateEmail: '',
      jobTitle: '',
      date: '',
      time: '',
      duration: '60',
      type: 'video',
      interviewer: '',
      location: '',
      meetingLink: '',
      notes: ''
    });
    toast.success(`Interview scheduled with ${newInterview.candidateName}`);
  };

  // Reschedule interview
  const handleRescheduleInterview = () => {
    if (!selectedInterview || !interviewForm.date || !interviewForm.time) {
      toast.error('Please select new date and time');
      return;
    }

    setInterviews(interviews.map(interview => 
      interview.id === selectedInterview.id
        ? { ...interview, date: interviewForm.date, time: interviewForm.time, status: 'rescheduled' }
        : interview
    ));

    setShowRescheduleModal(false);
    setSelectedInterview(null);
    toast.success('Interview rescheduled successfully');
  };

  // Cancel interview
  const handleCancelInterview = (interviewId) => {
    if (window.confirm('Are you sure you want to cancel this interview?')) {
      setInterviews(interviews.map(interview => 
        interview.id === interviewId
          ? { ...interview, status: 'cancelled' }
          : interview
      ));
      toast.success('Interview cancelled');
    }
  };

  // Delete interview
  const handleDeleteInterview = (interviewId) => {
    if (window.confirm('Are you sure you want to delete this interview?')) {
      setInterviews(interviews.filter(interview => interview.id !== interviewId));
      toast.success('Interview deleted');
    }
  };

  // Mark as completed
  const handleMarkCompleted = (interviewId) => {
    setInterviews(interviews.map(interview => 
      interview.id === interviewId
        ? { ...interview, status: 'completed' }
        : interview
    ));
    toast.success('Interview marked as completed');
  };

  // Send reminder email
  const handleSendReminder = (interview) => {
    toast.success(`Reminder sent to ${interview.candidateName}`);
  };

  // Open reschedule modal
  const openRescheduleModal = (interview) => {
    setSelectedInterview(interview);
    setInterviewForm({
      ...interviewForm,
      date: interview.date,
      time: interview.time
    });
    setShowRescheduleModal(true);
  };

  // Filter interviews by date
  const getInterviewsByDate = (date) => {
    return interviews.filter(interview => interview.date === date);
  };

  // Get upcoming interviews
  const upcomingInterviews = interviews
    .filter(interview => interview.status === 'scheduled' && new Date(interview.date) >= new Date())
    .sort((a, b) => new Date(a.date + ' ' + a.time) - new Date(b.date + ' ' + b.time));

  // Get today's interviews
  const todayInterviews = getInterviewsByDate(new Date().toISOString().split('T')[0]);

  // Stats
  const stats = {
    total: interviews.length,
    scheduled: interviews.filter(i => i.status === 'scheduled').length,
    completed: interviews.filter(i => i.status === 'completed').length,
    today: todayInterviews.length
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Interview Management</h1>
            <p className="text-gray-600">Schedule and manage candidate interviews</p>
          </div>
          
          <div className="flex gap-3">
            <div className="flex bg-white rounded-lg shadow-sm">
              <button
                onClick={() => setViewMode('list')}
                className={`px-4 py-2 rounded-l-lg ${
                  viewMode === 'list' 
                    ? 'bg-primary-600 text-white' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                List View
              </button>
              <button
                onClick={() => setViewMode('calendar')}
                className={`px-4 py-2 rounded-r-lg ${
                  viewMode === 'calendar' 
                    ? 'bg-primary-600 text-white' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Calendar View
              </button>
            </div>
            
            <button
              onClick={() => setShowScheduleModal(true)}
              className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 flex items-center gap-2"
            >
              <FaPlus />
              Schedule Interview
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="text-3xl font-bold text-gray-900 mb-1">{stats.total}</div>
            <div className="text-sm text-gray-600">Total Interviews</div>
          </div>
          <div className="bg-blue-50 p-6 rounded-lg shadow-sm">
            <div className="text-3xl font-bold text-blue-600 mb-1">{stats.scheduled}</div>
            <div className="text-sm text-blue-800">Scheduled</div>
          </div>
          <div className="bg-green-50 p-6 rounded-lg shadow-sm">
            <div className="text-3xl font-bold text-green-600 mb-1">{stats.completed}</div>
            <div className="text-sm text-green-800">Completed</div>
          </div>
          <div className="bg-purple-50 p-6 rounded-lg shadow-sm">
            <div className="text-3xl font-bold text-purple-600 mb-1">{stats.today}</div>
            <div className="text-sm text-purple-800">Today's Interviews</div>
          </div>
        </div>
      </div>

      {/* List View */}
      {viewMode === 'list' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Upcoming Interviews */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-xl font-bold text-gray-900">Upcoming Interviews</h2>
            
            {upcomingInterviews.length === 0 ? (
              <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                <FaCalendar className="mx-auto text-gray-400 text-5xl mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No upcoming interviews</h3>
                <p className="text-gray-600 mb-4">Schedule an interview to get started</p>
                <button
                  onClick={() => setShowScheduleModal(true)}
                  className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                >
                  Schedule Interview
                </button>
              </div>
            ) : (
              upcomingInterviews.map(interview => {
                const typeInfo = getInterviewTypeInfo(interview.type);
                const TypeIcon = typeInfo.icon;
                
                return (
                  <div key={interview.id} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-grow">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-bold text-gray-900">{interview.candidateName}</h3>
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadge(interview.status)}`}>
                            {interview.status}
                          </span>
                        </div>
                        <p className="text-primary-600 font-medium mb-2">{interview.jobTitle}</p>
                      </div>
                      
                      <div className={`p-3 rounded-full ${typeInfo.bg}`}>
                        <TypeIcon className={`text-xl ${typeInfo.color}`} />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center gap-2 text-gray-600">
                        <FaCalendar className="text-gray-400" />
                        <span className="text-sm">{new Date(interview.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <FaClock className="text-gray-400" />
                        <span className="text-sm">{interview.time} ({interview.duration} min)</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <FaUser className="text-gray-400" />
                        <span className="text-sm">{interview.interviewer}</span>
                      </div>
                      {interview.type === 'video' && interview.meetingLink && (
                        <div className="flex items-center gap-2">
                          <a
                            href={interview.meetingLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
                          >
                            <FaVideo />
                            Join Meeting
                          </a>
                        </div>
                      )}
                      {interview.type === 'in-person' && interview.location && (
                        <div className="flex items-center gap-2 text-gray-600">
                          <FaMapMarkerAlt className="text-gray-400" />
                          <span className="text-sm">{interview.location}</span>
                        </div>
                      )}
                    </div>

                    {interview.notes && (
                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
                        <p className="text-sm text-gray-700">{interview.notes}</p>
                      </div>
                    )}

                    <div className="flex gap-2 pt-4 border-t">
                      <button
                        onClick={() => handleSendReminder(interview)}
                        className="flex-1 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg text-sm hover:bg-blue-100 flex items-center justify-center gap-2"
                      >
                        <FaEnvelope />
                        Send Reminder
                      </button>
                      <button
                        onClick={() => openRescheduleModal(interview)}
                        className="flex-1 px-4 py-2 bg-yellow-50 text-yellow-600 rounded-lg text-sm hover:bg-yellow-100 flex items-center justify-center gap-2"
                      >
                        <FaEdit />
                        Reschedule
                      </button>
                      {interview.status === 'scheduled' && (
                        <button
                          onClick={() => handleMarkCompleted(interview.id)}
                          className="flex-1 px-4 py-2 bg-green-50 text-green-600 rounded-lg text-sm hover:bg-green-100"
                        >
                          Mark Done
                        </button>
                      )}
                      <button
                        onClick={() => handleCancelInterview(interview.id)}
                        className="px-4 py-2 bg-red-50 text-red-600 rounded-lg text-sm hover:bg-red-100"
                      >
                        <FaTimes />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Sidebar - Quick Actions */}
          <div className="space-y-6">
            {/* Today's Schedule */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Today's Schedule</h3>
              {todayInterviews.length === 0 ? (
                <p className="text-gray-600 text-sm">No interviews scheduled for today</p>
              ) : (
                <div className="space-y-3">
                  {todayInterviews.map(interview => (
                    <div key={interview.id} className="border-l-4 border-blue-500 pl-3">
                      <p className="font-medium text-gray-900">{interview.candidateName}</p>
                      <p className="text-sm text-gray-600">{interview.time} - {interview.jobTitle}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Schedule */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Schedule</h3>
              <p className="text-sm text-gray-600 mb-4">Select a candidate to schedule</p>
              <div className="space-y-2">
                {candidates.map(candidate => (
                  <button
                    key={candidate.id}
                    onClick={() => {
                      handleCandidateSelect(candidate);
                      setShowScheduleModal(true);
                    }}
                    className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <p className="font-medium text-gray-900">{candidate.name}</p>
                    <p className="text-sm text-gray-600">{candidate.job}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Completed This Week */}
            <div className="bg-green-50 rounded-lg p-6">
              <h3 className="text-lg font-bold text-green-900 mb-2">This Week</h3>
              <div className="text-3xl font-bold text-green-600 mb-1">{stats.completed}</div>
              <p className="text-sm text-green-800">Interviews Completed</p>
            </div>
          </div>
        </div>
      )}

      {/* Calendar View */}
      {viewMode === 'calendar' && (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Select Date</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Interviews on {new Date(selectedDate).toLocaleDateString()}
          </h3>

          {getInterviewsByDate(selectedDate).length === 0 ? (
            <div className="text-center py-12">
              <FaCalendar className="mx-auto text-gray-400 text-5xl mb-4" />
              <p className="text-gray-600">No interviews scheduled for this date</p>
            </div>
          ) : (
            <div className="space-y-4">
              {getInterviewsByDate(selectedDate)
                .sort((a, b) => a.time.localeCompare(b.time))
                .map(interview => {
                  const typeInfo = getInterviewTypeInfo(interview.type);
                  const TypeIcon = typeInfo.icon;
                  
                  return (
                    <div key={interview.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                      <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-full ${typeInfo.bg}`}>
                          <TypeIcon className={`${typeInfo.color}`} />
                        </div>
                        
                        <div className="flex-grow">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-bold text-gray-900">{interview.time}</h4>
                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusBadge(interview.status)}`}>
                              {interview.status}
                            </span>
                          </div>
                          <p className="text-gray-900 font-medium">{interview.candidateName}</p>
                          <p className="text-sm text-gray-600">{interview.jobTitle} • {interview.interviewer}</p>
                        </div>

                        <div className="flex gap-2">
                          <button
                            onClick={() => openRescheduleModal(interview)}
                            className="p-2 text-yellow-600 hover:bg-yellow-50 rounded"
                          >
                            <FaEdit />
                          </button>
                          <button
                            onClick={() => handleDeleteInterview(interview.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          )}
        </div>
      )}

      {/* Schedule Interview Modal */}
      {showScheduleModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Schedule Interview</h2>
              <button
                onClick={() => setShowScheduleModal(false)}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                ×
              </button>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Candidate Name *
                  </label>
                  <input
                    type="text"
                    value={interviewForm.candidateName}
                    onChange={(e) => handleInputChange('candidateName', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    placeholder="Enter candidate name"
                  />
                </div>

                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Candidate Email
                  </label>
                  <input
                    type="email"
                    value={interviewForm.candidateEmail}
                    onChange={(e) => handleInputChange('candidateEmail', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    placeholder="candidate@email.com"
                  />
                </div>

                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Job Title
                  </label>
                  <input
                    type="text"
                    value={interviewForm.jobTitle}
                    onChange={(e) => handleInputChange('jobTitle', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    placeholder="e.g., Senior Frontend Developer"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date *
                  </label>
                  <input
                    type="date"
                    value={interviewForm.date}
                    onChange={(e) => handleInputChange('date', e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Time *
                  </label>
                  <input
                    type="time"
                    value={interviewForm.time}
                    onChange={(e) => handleInputChange('time', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Duration (minutes)
                  </label>
                  <select
                    value={interviewForm.duration}
                    onChange={(e) => handleInputChange('duration', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="30">30 minutes</option>
                    <option value="45">45 minutes</option>
                    <option value="60">1 hour</option>
                    <option value="90">1.5 hours</option>
                    <option value="120">2 hours</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Interview Type *
                  </label>
                  <select
                    value={interviewForm.type}
                    onChange={(e) => handleInputChange('type', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="video">Video Call</option>
                    <option value="phone">Phone Call</option>
                    <option value="in-person">In-Person</option>
                  </select>
                </div>

                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Interviewer *
                  </label>
                  <select
                    value={interviewForm.interviewer}
                    onChange={(e) => handleInputChange('interviewer', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="">Select interviewer</option>
                    {interviewers.map(interviewer => (
                      <option key={interviewer.id} value={interviewer.name}>
                        {interviewer.name}
                      </option>
                    ))}
                  </select>
                </div>

                {interviewForm.type === 'video' && (
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Meeting Link
                    </label>
                    <input
                      type="url"
                      value={interviewForm.meetingLink}
                      onChange={(e) => handleInputChange('meetingLink', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                      placeholder="https://meet.google.com/..."
                    />
                  </div>
                )}

                {interviewForm.type === 'in-person' && (
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Location
                    </label>
                    <input
                      type="text"
                      value={interviewForm.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                      placeholder="Office address or room number"
                    />
                  </div>
                )}

                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Notes
                  </label>
                  <textarea
                    value={interviewForm.notes}
                    onChange={(e) => handleInputChange('notes', e.target.value)}
                    rows="3"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    placeholder="Interview focus, topics to cover, etc."
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={handleScheduleInterview}
                  className="flex-1 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 font-medium"
                >
                  Schedule Interview
                </button>
                <button
                  onClick={() => setShowScheduleModal(false)}
                  className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-medium"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Reschedule Modal */}
      {showRescheduleModal && selectedInterview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="bg-white border-b px-6 py-4 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-900">Reschedule Interview</h2>
              <button
                onClick={() => setShowRescheduleModal(false)}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                ×
              </button>
            </div>

            <div className="p-6">
              <p className="text-gray-700 mb-4">
                Rescheduling interview with <strong>{selectedInterview.candidateName}</strong>
              </p>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    New Date
                  </label>
                  <input
                    type="date"
                    value={interviewForm.date}
                    onChange={(e) => handleInputChange('date', e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    New Time
                  </label>
                  <input
                    type="time"
                    value={interviewForm.time}
                    onChange={(e) => handleInputChange('time', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={handleRescheduleInterview}
                  className="flex-1 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 font-medium"
                >
                  Confirm Reschedule
                </button>
                <button
                  onClick={() => setShowRescheduleModal(false)}
                  className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-medium"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Interviews;
