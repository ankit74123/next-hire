import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBriefcase, FaBell, FaUser, FaBars, FaTimes } from 'react-icons/fa';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isAuthenticated = false;
  const user = null;
  const unreadCount = 0;

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="container-custom py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <FaBriefcase className="text-primary-600 text-3xl" />
            <span className="text-2xl font-bold text-gray-800">JobPortal</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/jobs"
              className="text-gray-700 hover:text-primary-600 font-medium transition"
            >
              Find Jobs
            </Link>
            <Link
              to="/companies"
              className="text-gray-700 hover:text-primary-600 font-medium transition"
            >
              Companies
            </Link>
            <Link
              to="/services"
              className="text-gray-700 hover:text-primary-600 font-medium transition"
            >
              Services
            </Link>

            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                {/* Notifications */}
                <Link
                  to="/notifications"
                  className="relative text-gray-700 hover:text-primary-600"
                >
                  <FaBell className="text-2xl" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </Link>

                {/* Profile */}
                <Link
                  to="/dashboard"
                  className="flex items-center space-x-2 text-gray-700 hover:text-primary-600"
                >
                  <FaUser className="text-xl" />
                  <span className="font-medium">{user?.name || 'Profile'}</span>
                </Link>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-primary-600 font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700 text-2xl"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-4">
            <Link
              to="/jobs"
              className="block text-gray-700 hover:text-primary-600 font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Find Jobs
            </Link>
            <Link
              to="/companies"
              className="block text-gray-700 hover:text-primary-600 font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Companies
            </Link>
            <Link
              to="/services"
              className="block text-gray-700 hover:text-primary-600 font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Services
            </Link>

            {isAuthenticated ? (
              <>
                <Link
                  to="/notifications"
                  className="block text-gray-700 hover:text-primary-600 font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Notifications {unreadCount > 0 && `(${unreadCount})`}
                </Link>
                <Link
                  to="/dashboard"
                  className="block text-gray-700 hover:text-primary-600 font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block text-gray-700 hover:text-primary-600 font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition text-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
