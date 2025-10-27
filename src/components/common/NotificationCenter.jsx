import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FaBell,
  FaCheckCircle,
  FaEye,
  FaBriefcase,
  FaHeart,
  FaCalendar,
  FaTimes,
  FaCheck,
  FaTrash,
} from 'react-icons/fa';
import { toast } from 'react-toastify';

const NotificationCenter = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [filter, setFilter] = useState('all');

  // Sample notifications data
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'application',
      title: 'Application Status Update',
      message: 'Your application for Senior React Developer at Tech Corp has been shortlisted',
      timestamp: '2025-10-27T10:30:00',
      isRead: false,
      icon: FaCheckCircle,
      iconColor: 'text-green-600',
      link: '/dashboard/applications',
    },
    {
      id: 2,
      type: 'job',
      title: 'New Job Match',
      message: '5 new jobs match your job alert "React Developer Jobs"',
      timestamp: '2025-10-27T09:15:00',
      isRead: false,
      icon: FaBriefcase,
      iconColor: 'text-blue-600',
      link: '/jobs',
    },
    {
      id: 3,
      type: 'profile',
      title: 'Profile View',
      message: 'A recruiter from StartUp Inc viewed your profile',
      timestamp: '2025-10-27T08:45:00',
      isRead: true,
      icon: FaEye,
      iconColor: 'text-purple-600',
      link: '/dashboard/profile',
    },
    {
      id: 4,
      type: 'saved',
      title: 'Saved Job Expiring',
      message: 'Your saved job "Full Stack Developer" will expire in 2 days',
      timestamp: '2025-10-26T16:20:00',
      isRead: true,
      icon: FaHeart,
      iconColor: 'text-red-600',
      link: '/dashboard/saved-jobs',
    },
    {
      id: 5,
      type: 'interview',
      title: 'Interview Scheduled',
      message: 'Interview scheduled for DevOps Engineer position on Oct 30, 2025',
      timestamp: '2025-10-26T14:00:00',
      isRead: false,
      icon: FaCalendar,
      iconColor: 'text-indigo-600',
      link: '/dashboard/applications',
    },
    {
      id: 6,
      type: 'application',
      title: 'Application Viewed',
      message: 'Your application for Frontend Developer has been viewed by the recruiter',
      timestamp: '2025-10-26T11:30:00',
      isRead: true,
      icon: FaEye,
      iconColor: 'text-purple-600',
      link: '/dashboard/applications',
    },
  ]);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const filteredNotifications = notifications.filter((n) => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !n.isRead;
    return n.type === filter;
  });

  const getTimeAgo = (timestamp) => {
    const now = new Date();
    const notifTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now - notifTime) / (1000 * 60));

    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    
    const diffInWeeks = Math.floor(diffInDays / 7);
    return `${diffInWeeks}w ago`;
  };

  const handleMarkAsRead = (notificationId) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === notificationId ? { ...n, isRead: true } : n))
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    toast.success('All notifications marked as read');
  };

  const handleDelete = (notificationId, e) => {
    e.stopPropagation();
    setNotifications((prev) => prev.filter((n) => n.id !== notificationId));
    toast.success('Notification deleted');
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear all notifications?')) {
      setNotifications([]);
      toast.success('All notifications cleared');
    }
  };

  return (
    <div className="relative">
      {/* Bell Icon */}
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="relative p-2 text-gray-600 hover:text-primary-600 hover:bg-gray-100 rounded-lg transition"
      >
        <FaBell className="text-2xl" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {showDropdown && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setShowDropdown(false)}
          ></div>

          {/* Dropdown Panel */}
          <div className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-xl z-50 max-h-[600px] flex flex-col">
            {/* Header */}
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-bold text-gray-900">Notifications</h3>
                <button
                  onClick={() => setShowDropdown(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <FaTimes />
                </button>
              </div>

              {/* Filter Tabs */}
              <div className="flex gap-2 text-sm">
                <button
                  onClick={() => setFilter('all')}
                  className={`px-3 py-1 rounded-full transition ${
                    filter === 'all'
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setFilter('unread')}
                  className={`px-3 py-1 rounded-full transition ${
                    filter === 'unread'
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Unread ({unreadCount})
                </button>
                <button
                  onClick={() => setFilter('application')}
                  className={`px-3 py-1 rounded-full transition ${
                    filter === 'application'
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Applications
                </button>
              </div>
            </div>

            {/* Actions Bar */}
            {notifications.length > 0 && (
              <div className="px-4 py-2 border-b border-gray-200 flex items-center justify-between text-sm">
                <button
                  onClick={handleMarkAllAsRead}
                  className="text-primary-600 hover:text-primary-700 font-medium flex items-center"
                >
                  <FaCheck className="mr-1" />
                  Mark all as read
                </button>
                <button
                  onClick={handleClearAll}
                  className="text-red-600 hover:text-red-700 font-medium flex items-center"
                >
                  <FaTrash className="mr-1" />
                  Clear all
                </button>
              </div>
            )}

            {/* Notifications List */}
            <div className="overflow-y-auto flex-1">
              {filteredNotifications.length === 0 ? (
                <div className="p-8 text-center">
                  <FaBell className="text-gray-300 text-5xl mx-auto mb-3" />
                  <p className="text-gray-500">
                    {filter === 'unread' 
                      ? 'No unread notifications'
                      : 'No notifications yet'}
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {filteredNotifications.map((notification) => {
                    const Icon = notification.icon;
                    return (
                      <Link
                        key={notification.id}
                        to={notification.link}
                        onClick={() => {
                          handleMarkAsRead(notification.id);
                          setShowDropdown(false);
                        }}
                        className={`block p-4 hover:bg-gray-50 transition ${
                          !notification.isRead ? 'bg-blue-50' : ''
                        }`}
                      >
                        <div className="flex items-start">
                          <div
                            className={`w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mr-3 flex-shrink-0 ${notification.iconColor}`}
                          >
                            <Icon className="text-lg" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between mb-1">
                              <p className="font-semibold text-gray-900 text-sm">
                                {notification.title}
                              </p>
                              {!notification.isRead && (
                                <span className="w-2 h-2 bg-primary-600 rounded-full ml-2 flex-shrink-0 mt-1"></span>
                              )}
                            </div>
                            <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                              {notification.message}
                            </p>
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-gray-500">
                                {getTimeAgo(notification.timestamp)}
                              </span>
                              <button
                                onClick={(e) => handleDelete(notification.id, e)}
                                className="text-gray-400 hover:text-red-600 transition"
                              >
                                <FaTimes className="text-sm" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Footer */}
            {notifications.length > 0 && (
              <div className="p-3 border-t border-gray-200">
                <Link
                  to="/dashboard/notifications"
                  onClick={() => setShowDropdown(false)}
                  className="block text-center text-primary-600 hover:text-primary-700 font-medium text-sm"
                >
                  View All Notifications
                </Link>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default NotificationCenter;
