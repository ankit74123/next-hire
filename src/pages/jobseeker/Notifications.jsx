import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FaBell,
  FaCheckCircle,
  FaEye,
  FaBriefcase,
  FaHeart,
  FaCalendar,
  FaCheck,
  FaTrash,
  FaCog,
  FaFilter,
} from 'react-icons/fa';
import { toast } from 'react-toastify';

const Notifications = () => {
  const [filter, setFilter] = useState('all');

  // Sample notifications data
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'application',
      title: 'Application Status Update',
      message: 'Your application for Senior React Developer at Tech Corp has been shortlisted. The recruiter will contact you soon for the next steps.',
      timestamp: '2025-10-27T10:30:00',
      isRead: false,
      icon: FaCheckCircle,
      iconColor: 'text-green-600',
      bgColor: 'bg-green-50',
      link: '/dashboard/applications',
    },
    {
      id: 2,
      type: 'job',
      title: 'New Job Match',
      message: '5 new jobs match your job alert "React Developer Jobs". Check them out before they expire!',
      timestamp: '2025-10-27T09:15:00',
      isRead: false,
      icon: FaBriefcase,
      iconColor: 'text-blue-600',
      bgColor: 'bg-blue-50',
      link: '/jobs',
    },
    {
      id: 3,
      type: 'profile',
      title: 'Profile View',
      message: 'A recruiter from StartUp Inc viewed your profile. Make sure your profile is up to date!',
      timestamp: '2025-10-27T08:45:00',
      isRead: true,
      icon: FaEye,
      iconColor: 'text-purple-600',
      bgColor: 'bg-purple-50',
      link: '/dashboard/profile',
    },
    {
      id: 4,
      type: 'saved',
      title: 'Saved Job Expiring',
      message: 'Your saved job "Full Stack Developer at Innovation Labs" will expire in 2 days. Apply now!',
      timestamp: '2025-10-26T16:20:00',
      isRead: true,
      icon: FaHeart,
      iconColor: 'text-red-600',
      bgColor: 'bg-red-50',
      link: '/dashboard/saved-jobs',
    },
    {
      id: 5,
      type: 'interview',
      title: 'Interview Scheduled',
      message: 'Interview scheduled for DevOps Engineer position on Oct 30, 2025 at 2:00 PM. Check your email for details.',
      timestamp: '2025-10-26T14:00:00',
      isRead: false,
      icon: FaCalendar,
      iconColor: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
      link: '/dashboard/applications',
    },
    {
      id: 6,
      type: 'application',
      title: 'Application Viewed',
      message: 'Your application for Frontend Developer at Creative Studio has been viewed by the recruiter.',
      timestamp: '2025-10-26T11:30:00',
      isRead: true,
      icon: FaEye,
      iconColor: 'text-purple-600',
      bgColor: 'bg-purple-50',
      link: '/dashboard/applications',
    },
    {
      id: 7,
      type: 'job',
      title: 'Job Alert Match',
      message: '3 new remote positions match your preferences. View them now!',
      timestamp: '2025-10-25T15:00:00',
      isRead: true,
      icon: FaBriefcase,
      iconColor: 'text-blue-600',
      bgColor: 'bg-blue-50',
      link: '/jobs',
    },
    {
      id: 8,
      type: 'profile',
      title: 'Complete Your Profile',
      message: 'Your profile is 75% complete. Add work experience to get better job matches.',
      timestamp: '2025-10-25T10:00:00',
      isRead: true,
      icon: FaCheckCircle,
      iconColor: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
      link: '/dashboard/profile',
    },
  ]);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const filteredNotifications = notifications.filter((n) => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !n.isRead;
    return n.type === filter;
  });

  const getFormattedDate = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));

    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
    
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const handleMarkAsRead = (notificationId) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === notificationId ? { ...n, isRead: true } : n))
    );
    toast.success('Marked as read');
  };

  const handleMarkAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    toast.success('All notifications marked as read');
  };

  const handleDelete = (notificationId) => {
    setNotifications((prev) => prev.filter((n) => n.id !== notificationId));
    toast.success('Notification deleted');
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear all notifications?')) {
      setNotifications([]);
      toast.success('All notifications cleared');
    }
  };

  const filterCategories = [
    { value: 'all', label: 'All', count: notifications.length },
    { value: 'unread', label: 'Unread', count: unreadCount },
    { value: 'application', label: 'Applications', count: notifications.filter(n => n.type === 'application').length },
    { value: 'job', label: 'Job Alerts', count: notifications.filter(n => n.type === 'job').length },
    { value: 'profile', label: 'Profile', count: notifications.filter(n => n.type === 'profile').length },
    { value: 'interview', label: 'Interviews', count: notifications.filter(n => n.type === 'interview').length },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Notifications</h1>
            <p className="text-gray-600">
              {unreadCount > 0 
                ? `You have ${unreadCount} unread notification${unreadCount > 1 ? 's' : ''}`
                : 'All caught up!'}
            </p>
          </div>
          <Link
            to="/dashboard/notification-preferences"
            className="flex items-center text-gray-600 hover:text-primary-600 font-medium"
          >
            <FaCog className="mr-2" />
            Preferences
          </Link>
        </div>

        {/* Action Bar */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-2">
              {filterCategories.map((category) => (
                <button
                  key={category.value}
                  onClick={() => setFilter(category.value)}
                  className={`px-4 py-2 rounded-lg font-medium transition ${
                    filter === category.value
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category.label} {category.count > 0 && `(${category.count})`}
                </button>
              ))}
            </div>

            {/* Actions */}
            {notifications.length > 0 && (
              <div className="flex gap-3">
                <button
                  onClick={handleMarkAllAsRead}
                  className="flex items-center text-primary-600 hover:text-primary-700 font-medium text-sm"
                >
                  <FaCheck className="mr-2" />
                  Mark all read
                </button>
                <button
                  onClick={handleClearAll}
                  className="flex items-center text-red-600 hover:text-red-700 font-medium text-sm"
                >
                  <FaTrash className="mr-2" />
                  Clear all
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Notifications List */}
        {filteredNotifications.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <FaBell className="text-gray-300 text-6xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No Notifications</h3>
            <p className="text-gray-500">
              {filter === 'unread' 
                ? 'You have no unread notifications'
                : 'All notifications will appear here'}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredNotifications.map((notification) => {
              const Icon = notification.icon;
              return (
                <div
                  key={notification.id}
                  className={`bg-white rounded-lg shadow-md hover:shadow-lg transition p-6 ${
                    !notification.isRead ? 'border-l-4 border-primary-600' : ''
                  }`}
                >
                  <div className="flex items-start">
                    <div
                      className={`w-12 h-12 rounded-full ${notification.bgColor} flex items-center justify-center mr-4 flex-shrink-0`}
                    >
                      <Icon className={`text-xl ${notification.iconColor}`} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center">
                          <h3 className="font-bold text-gray-900">{notification.title}</h3>
                          {!notification.isRead && (
                            <span className="ml-2 w-2 h-2 bg-primary-600 rounded-full"></span>
                          )}
                        </div>
                        <span className="text-sm text-gray-500 ml-4 flex-shrink-0">
                          {getFormattedDate(notification.timestamp)}
                        </span>
                      </div>

                      <p className="text-gray-700 mb-4">{notification.message}</p>

                      <div className="flex items-center gap-3">
                        <Link
                          to={notification.link}
                          onClick={() => !notification.isRead && handleMarkAsRead(notification.id)}
                          className="text-primary-600 hover:text-primary-700 font-medium text-sm"
                        >
                          View Details →
                        </Link>
                        {!notification.isRead && (
                          <button
                            onClick={() => handleMarkAsRead(notification.id)}
                            className="text-gray-600 hover:text-gray-700 font-medium text-sm flex items-center"
                          >
                            <FaCheck className="mr-1" />
                            Mark as read
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(notification.id)}
                          className="text-red-600 hover:text-red-700 font-medium text-sm flex items-center ml-auto"
                        >
                          <FaTrash className="mr-1" />
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;
