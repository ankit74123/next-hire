import { useState } from 'react';
import { FaBell, FaEnvelope, FaMobile, FaDesktop, FaSave } from 'react-icons/fa';
import { toast } from 'react-toastify';

const NotificationPreferences = () => {
  const [preferences, setPreferences] = useState({
    email: {
      jobAlerts: true,
      applicationUpdates: true,
      profileViews: false,
      recommendations: true,
      newsletter: false,
    },
    push: {
      jobAlerts: true,
      applicationUpdates: true,
      profileViews: true,
      recommendations: false,
      newsletter: false,
    },
    sms: {
      jobAlerts: false,
      applicationUpdates: true,
      profileViews: false,
      recommendations: false,
      newsletter: false,
    },
  });

  const [frequency, setFrequency] = useState({
    jobAlerts: 'instant',
    digest: 'daily',
  });

  const notificationTypes = [
    {
      id: 'jobAlerts',
      title: 'Job Alerts',
      description: 'Get notified when new jobs match your preferences',
    },
    {
      id: 'applicationUpdates',
      title: 'Application Updates',
      description: 'Updates about your job applications and interview schedules',
    },
    {
      id: 'profileViews',
      title: 'Profile Views',
      description: 'When recruiters view your profile',
    },
    {
      id: 'recommendations',
      title: 'Job Recommendations',
      description: 'Personalized job recommendations based on your profile',
    },
    {
      id: 'newsletter',
      title: 'Newsletter & Tips',
      description: 'Career tips, industry news, and platform updates',
    },
  ];

  const channels = [
    { id: 'email', icon: FaEnvelope, label: 'Email', color: 'text-blue-600' },
    { id: 'push', icon: FaBell, label: 'Push', color: 'text-green-600' },
    { id: 'sms', icon: FaMobile, label: 'SMS', color: 'text-purple-600' },
  ];

  const handleToggle = (channel, type) => {
    setPreferences((prev) => ({
      ...prev,
      [channel]: {
        ...prev[channel],
        [type]: !prev[channel][type],
      },
    }));
  };

  const handleFrequencyChange = (type, value) => {
    setFrequency((prev) => ({ ...prev, [type]: value }));
  };

  const handleSave = () => {
    // In real app, save to backend
    toast.success('Notification preferences saved successfully!');
  };

  const handleEnableAll = () => {
    const allEnabled = {
      email: {},
      push: {},
      sms: {},
    };

    notificationTypes.forEach((type) => {
      allEnabled.email[type.id] = true;
      allEnabled.push[type.id] = true;
      allEnabled.sms[type.id] = true;
    });

    setPreferences(allEnabled);
    toast.success('All notifications enabled');
  };

  const handleDisableAll = () => {
    const allDisabled = {
      email: {},
      push: {},
      sms: {},
    };

    notificationTypes.forEach((type) => {
      allDisabled.email[type.id] = false;
      allDisabled.push[type.id] = false;
      allDisabled.sms[type.id] = false;
    });

    setPreferences(allDisabled);
    toast.success('All notifications disabled');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Notification Preferences</h1>
          <p className="text-gray-600">
            Manage how you receive notifications and updates
          </p>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Quick Actions</h3>
              <p className="text-sm text-gray-600">Enable or disable all notifications at once</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleEnableAll}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition"
              >
                Enable All
              </button>
              <button
                onClick={handleDisableAll}
                className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition"
              >
                Disable All
              </button>
            </div>
          </div>
        </div>

        {/* Notification Matrix */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Notification Channels</h3>

          {/* Table Header */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-4 px-4 font-semibold text-gray-900">
                    Notification Type
                  </th>
                  {channels.map((channel) => {
                    const Icon = channel.icon;
                    return (
                      <th key={channel.id} className="text-center py-4 px-4">
                        <div className="flex flex-col items-center">
                          <Icon className={`text-2xl mb-1 ${channel.color}`} />
                          <span className="font-semibold text-gray-900 text-sm">
                            {channel.label}
                          </span>
                        </div>
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {notificationTypes.map((type, index) => (
                  <tr
                    key={type.id}
                    className={`border-b border-gray-100 ${
                      index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                    }`}
                  >
                    <td className="py-4 px-4">
                      <div>
                        <p className="font-medium text-gray-900">{type.title}</p>
                        <p className="text-sm text-gray-600">{type.description}</p>
                      </div>
                    </td>
                    {channels.map((channel) => (
                      <td key={channel.id} className="text-center py-4 px-4">
                        <label className="inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={preferences[channel.id][type.id]}
                            onChange={() => handleToggle(channel.id, type.id)}
                            className="w-5 h-5 text-primary-600 rounded focus:ring-2 focus:ring-primary-500"
                          />
                        </label>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Frequency Settings */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Notification Frequency</h3>

          <div className="space-y-6">
            {/* Job Alerts Frequency */}
            <div>
              <label className="block font-medium text-gray-900 mb-3">
                Job Alerts Frequency
              </label>
              <div className="space-y-2">
                <label className="flex items-center cursor-pointer p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <input
                    type="radio"
                    name="jobAlerts"
                    value="instant"
                    checked={frequency.jobAlerts === 'instant'}
                    onChange={(e) => handleFrequencyChange('jobAlerts', e.target.value)}
                    className="w-4 h-4 text-primary-600"
                  />
                  <div className="ml-3">
                    <p className="font-medium text-gray-900">Instant</p>
                    <p className="text-sm text-gray-600">
                      Get notified immediately when a new job matches
                    </p>
                  </div>
                </label>
                <label className="flex items-center cursor-pointer p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <input
                    type="radio"
                    name="jobAlerts"
                    value="daily"
                    checked={frequency.jobAlerts === 'daily'}
                    onChange={(e) => handleFrequencyChange('jobAlerts', e.target.value)}
                    className="w-4 h-4 text-primary-600"
                  />
                  <div className="ml-3">
                    <p className="font-medium text-gray-900">Daily Digest</p>
                    <p className="text-sm text-gray-600">
                      Receive a summary once per day
                    </p>
                  </div>
                </label>
                <label className="flex items-center cursor-pointer p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <input
                    type="radio"
                    name="jobAlerts"
                    value="weekly"
                    checked={frequency.jobAlerts === 'weekly'}
                    onChange={(e) => handleFrequencyChange('jobAlerts', e.target.value)}
                    className="w-4 h-4 text-primary-600"
                  />
                  <div className="ml-3">
                    <p className="font-medium text-gray-900">Weekly Digest</p>
                    <p className="text-sm text-gray-600">
                      Receive a summary once per week
                    </p>
                  </div>
                </label>
              </div>
            </div>

            {/* Email Digest Frequency */}
            <div>
              <label className="block font-medium text-gray-900 mb-3">
                Email Digest Frequency
              </label>
              <div className="space-y-2">
                <label className="flex items-center cursor-pointer p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <input
                    type="radio"
                    name="digest"
                    value="daily"
                    checked={frequency.digest === 'daily'}
                    onChange={(e) => handleFrequencyChange('digest', e.target.value)}
                    className="w-4 h-4 text-primary-600"
                  />
                  <div className="ml-3">
                    <p className="font-medium text-gray-900">Daily</p>
                    <p className="text-sm text-gray-600">
                      One email per day with all updates
                    </p>
                  </div>
                </label>
                <label className="flex items-center cursor-pointer p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <input
                    type="radio"
                    name="digest"
                    value="weekly"
                    checked={frequency.digest === 'weekly'}
                    onChange={(e) => handleFrequencyChange('digest', e.target.value)}
                    className="w-4 h-4 text-primary-600"
                  />
                  <div className="ml-3">
                    <p className="font-medium text-gray-900">Weekly</p>
                    <p className="text-sm text-gray-600">
                      One email per week with all updates
                    </p>
                  </div>
                </label>
                <label className="flex items-center cursor-pointer p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <input
                    type="radio"
                    name="digest"
                    value="never"
                    checked={frequency.digest === 'never'}
                    onChange={(e) => handleFrequencyChange('digest', e.target.value)}
                    className="w-4 h-4 text-primary-600"
                  />
                  <div className="ml-3">
                    <p className="font-medium text-gray-900">Never</p>
                    <p className="text-sm text-gray-600">
                      Don't send digest emails
                    </p>
                  </div>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end gap-3">
          <button
            onClick={() => window.history.back()}
            className="px-6 py-3 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg font-semibold transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-semibold transition flex items-center"
          >
            <FaSave className="mr-2" />
            Save Preferences
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationPreferences;
