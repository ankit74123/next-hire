import { useState } from 'react';
import {
  FaBell,
  FaPlus,
  FaEdit,
  FaTrash,
  FaPause,
  FaPlay,
  FaSearch,
  FaMapMarkerAlt,
  FaBriefcase,
  FaDollarSign,
  FaTimes,
  FaCheck,
} from 'react-icons/fa';
import { toast } from 'react-toastify';

const JobAlerts = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingAlert, setEditingAlert] = useState(null);
  
  const [formData, setFormData] = useState({
    title: '',
    keywords: '',
    location: '',
    experience: '',
    salary: '',
    jobType: '',
    workMode: '',
    frequency: 'daily',
  });

  // Sample alerts data
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      title: 'React Developer Jobs',
      keywords: 'React, JavaScript, TypeScript',
      location: 'San Francisco, CA',
      experience: '3-5 years',
      salary: '$100k+',
      jobType: 'Full-time',
      workMode: 'Remote',
      frequency: 'daily',
      isActive: true,
      matchingJobs: 12,
      createdDate: '2025-10-20',
    },
    {
      id: 2,
      title: 'Senior Frontend Developer',
      keywords: 'Frontend, React, Vue, Angular',
      location: 'Remote',
      experience: '5+ years',
      salary: '$120k+',
      jobType: 'Full-time',
      workMode: 'Remote',
      frequency: 'instant',
      isActive: true,
      matchingJobs: 8,
      createdDate: '2025-10-15',
    },
    {
      id: 3,
      title: 'Full Stack Developer',
      keywords: 'Full Stack, Node.js, Python',
      location: 'New York, NY',
      experience: '2-4 years',
      salary: '$90k+',
      jobType: 'Full-time',
      workMode: 'Hybrid',
      frequency: 'weekly',
      isActive: false,
      matchingJobs: 5,
      createdDate: '2025-10-10',
    },
  ]);

  const frequencies = [
    { value: 'instant', label: 'Instant' },
    { value: 'daily', label: 'Daily Digest' },
    { value: 'weekly', label: 'Weekly Digest' },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateAlert = () => {
    if (!formData.title || !formData.keywords) {
      toast.error('Please fill in alert title and keywords');
      return;
    }

    const newAlert = {
      id: Date.now(),
      ...formData,
      isActive: true,
      matchingJobs: Math.floor(Math.random() * 20) + 1,
      createdDate: new Date().toISOString().split('T')[0],
    };

    setAlerts([newAlert, ...alerts]);
    toast.success('Job alert created successfully!');
    resetForm();
  };

  const handleUpdateAlert = () => {
    if (!formData.title || !formData.keywords) {
      toast.error('Please fill in alert title and keywords');
      return;
    }

    setAlerts((prev) =>
      prev.map((alert) =>
        alert.id === editingAlert.id
          ? { ...alert, ...formData, matchingJobs: Math.floor(Math.random() * 20) + 1 }
          : alert
      )
    );
    toast.success('Job alert updated successfully!');
    resetForm();
  };

  const handleEditAlert = (alert) => {
    setEditingAlert(alert);
    setFormData({
      title: alert.title,
      keywords: alert.keywords,
      location: alert.location,
      experience: alert.experience,
      salary: alert.salary,
      jobType: alert.jobType,
      workMode: alert.workMode,
      frequency: alert.frequency,
    });
    setShowCreateModal(true);
  };

  const handleDeleteAlert = (alertId) => {
    if (window.confirm('Are you sure you want to delete this alert?')) {
      setAlerts((prev) => prev.filter((alert) => alert.id !== alertId));
      toast.success('Job alert deleted');
    }
  };

  const handleToggleAlert = (alertId) => {
    setAlerts((prev) =>
      prev.map((alert) =>
        alert.id === alertId ? { ...alert, isActive: !alert.isActive } : alert
      )
    );
    const alert = alerts.find((a) => a.id === alertId);
    toast.success(`Alert ${alert?.isActive ? 'paused' : 'activated'}`);
  };

  const resetForm = () => {
    setFormData({
      title: '',
      keywords: '',
      location: '',
      experience: '',
      salary: '',
      jobType: '',
      workMode: '',
      frequency: 'daily',
    });
    setEditingAlert(null);
    setShowCreateModal(false);
  };

  const activeAlertsCount = alerts.filter((a) => a.isActive).length;
  const totalMatchingJobs = alerts.reduce((sum, alert) => sum + alert.matchingJobs, 0);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Job Alerts</h1>
            <p className="text-gray-600">
              Get notified when new jobs match your preferences
            </p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-semibold transition flex items-center"
          >
            <FaPlus className="mr-2" />
            Create Alert
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Total Alerts</p>
                <p className="text-3xl font-bold text-gray-900">{alerts.length}</p>
              </div>
              <FaBell className="text-primary-600 text-4xl" />
            </div>
          </div>
          <div className="bg-green-50 rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-700 text-sm mb-1">Active Alerts</p>
                <p className="text-3xl font-bold text-green-700">{activeAlertsCount}</p>
              </div>
              <FaPlay className="text-green-600 text-4xl" />
            </div>
          </div>
          <div className="bg-blue-50 rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-700 text-sm mb-1">Matching Jobs</p>
                <p className="text-3xl font-bold text-blue-700">{totalMatchingJobs}</p>
              </div>
              <FaBriefcase className="text-blue-600 text-4xl" />
            </div>
          </div>
        </div>

        {/* Alerts List */}
        {alerts.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <FaBell className="text-gray-300 text-6xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No Job Alerts</h3>
            <p className="text-gray-500 mb-6">
              Create your first job alert to get notified about relevant opportunities
            </p>
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-semibold transition"
            >
              Create Your First Alert
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {alerts.map((alert) => (
              <div
                key={alert.id}
                className={`bg-white rounded-lg shadow-md hover:shadow-lg transition p-6 ${
                  !alert.isActive ? 'opacity-60' : ''
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <h3 className="text-xl font-bold text-gray-900 mr-3">{alert.title}</h3>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          alert.isActive
                            ? 'bg-green-100 text-green-700'
                            : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {alert.isActive ? 'Active' : 'Paused'}
                      </span>
                    </div>

                    <div className="grid md:grid-cols-2 gap-3 mb-3">
                      <div className="flex items-center text-gray-600 text-sm">
                        <FaSearch className="mr-2 text-gray-400" />
                        <span className="font-medium">Keywords:</span>
                        <span className="ml-2">{alert.keywords}</span>
                      </div>
                      {alert.location && (
                        <div className="flex items-center text-gray-600 text-sm">
                          <FaMapMarkerAlt className="mr-2 text-gray-400" />
                          <span>{alert.location}</span>
                        </div>
                      )}
                      {alert.experience && (
                        <div className="flex items-center text-gray-600 text-sm">
                          <FaBriefcase className="mr-2 text-gray-400" />
                          <span>{alert.experience}</span>
                        </div>
                      )}
                      {alert.salary && (
                        <div className="flex items-center text-gray-600 text-sm">
                          <FaDollarSign className="mr-2 text-gray-400" />
                          <span>{alert.salary}</span>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-2 mb-3">
                      {alert.jobType && (
                        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-medium">
                          {alert.jobType}
                        </span>
                      )}
                      {alert.workMode && (
                        <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-medium">
                          {alert.workMode}
                        </span>
                      )}
                      <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium">
                        {frequencies.find((f) => f.value === alert.frequency)?.label}
                      </span>
                    </div>

                    <div className="flex items-center text-sm">
                      <span className="text-gray-500">Created on {alert.createdDate}</span>
                      <span className="mx-2 text-gray-300">•</span>
                      <span className="text-primary-600 font-medium">
                        {alert.matchingJobs} matching jobs
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 ml-4">
                    <button
                      onClick={() => handleToggleAlert(alert.id)}
                      className={`p-2 rounded-lg transition ${
                        alert.isActive
                          ? 'text-yellow-600 hover:bg-yellow-50'
                          : 'text-green-600 hover:bg-green-50'
                      }`}
                      title={alert.isActive ? 'Pause alert' : 'Activate alert'}
                    >
                      {alert.isActive ? <FaPause className="text-xl" /> : <FaPlay className="text-xl" />}
                    </button>
                    <button
                      onClick={() => handleEditAlert(alert)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                      title="Edit alert"
                    >
                      <FaEdit className="text-xl" />
                    </button>
                    <button
                      onClick={() => handleDeleteAlert(alert.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                      title="Delete alert"
                    >
                      <FaTrash className="text-xl" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Create/Edit Alert Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white">
              <h2 className="text-2xl font-bold text-gray-900">
                {editingAlert ? 'Edit Job Alert' : 'Create Job Alert'}
              </h2>
              <button
                onClick={resetForm}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                <FaTimes />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Alert Title */}
              <div>
                <label className="block text-gray-900 font-medium mb-2">
                  Alert Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="e.g., React Developer Jobs in San Francisco"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              {/* Keywords */}
              <div>
                <label className="block text-gray-900 font-medium mb-2">
                  Keywords *
                </label>
                <input
                  type="text"
                  name="keywords"
                  value={formData.keywords}
                  onChange={handleInputChange}
                  placeholder="e.g., React, JavaScript, TypeScript"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Separate multiple keywords with commas
                </p>
              </div>

              {/* Location */}
              <div>
                <label className="block text-gray-900 font-medium mb-2">Location</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="e.g., San Francisco, CA or Remote"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              {/* Experience & Salary */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-900 font-medium mb-2">Experience</label>
                  <input
                    type="text"
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    placeholder="e.g., 3-5 years"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-gray-900 font-medium mb-2">Minimum Salary</label>
                  <input
                    type="text"
                    name="salary"
                    value={formData.salary}
                    onChange={handleInputChange}
                    placeholder="e.g., $100k+"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Job Type & Work Mode */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-900 font-medium mb-2">Job Type</label>
                  <select
                    name="jobType"
                    value={formData.jobType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="">Any</option>
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                    <option value="Internship">Internship</option>
                    <option value="Freelance">Freelance</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-900 font-medium mb-2">Work Mode</label>
                  <select
                    name="workMode"
                    value={formData.workMode}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="">Any</option>
                    <option value="Remote">Remote</option>
                    <option value="On-site">On-site</option>
                    <option value="Hybrid">Hybrid</option>
                  </select>
                </div>
              </div>

              {/* Frequency */}
              <div>
                <label className="block text-gray-900 font-medium mb-2">
                  Notification Frequency
                </label>
                <div className="space-y-2">
                  {frequencies.map((freq) => (
                    <label key={freq.value} className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="frequency"
                        value={freq.value}
                        checked={formData.frequency === freq.value}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-primary-600"
                      />
                      <span className="ml-3 text-gray-900">{freq.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button
                  onClick={editingAlert ? handleUpdateAlert : handleCreateAlert}
                  className="flex-1 bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-semibold transition flex items-center justify-center"
                >
                  <FaCheck className="mr-2" />
                  {editingAlert ? 'Update Alert' : 'Create Alert'}
                </button>
                <button
                  onClick={resetForm}
                  className="px-6 py-3 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg font-semibold transition"
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

export default JobAlerts;
