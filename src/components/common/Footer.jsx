import { Link } from 'react-router-dom';
import {
  FaBriefcase,
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaInstagram,
} from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <FaBriefcase className="text-primary-500 text-2xl" />
              <span className="text-xl font-bold text-white">JobPortal</span>
            </div>
            <p className="text-sm mb-4">
              Your trusted partner in finding the perfect job or candidate.
              Connect with opportunities that match your skills and ambitions.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-primary-500 transition"
              >
                <FaFacebook className="text-xl" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-primary-500 transition"
              >
                <FaTwitter className="text-xl" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-primary-500 transition"
              >
                <FaLinkedin className="text-xl" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-primary-500 transition"
              >
                <FaInstagram className="text-xl" />
              </a>
            </div>
          </div>

          {/* For Job Seekers */}
          <div>
            <h3 className="text-white font-semibold mb-4">For Job Seekers</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/jobs" className="hover:text-primary-500 transition">
                  Browse Jobs
                </Link>
              </li>
              <li>
                <Link
                  to="/companies"
                  className="hover:text-primary-500 transition"
                >
                  Browse Companies
                </Link>
              </li>
              <li>
                <Link
                  to="/salary-insights"
                  className="hover:text-primary-500 transition"
                >
                  Salary Insights
                </Link>
              </li>
              <li>
                <Link
                  to="/career-advice"
                  className="hover:text-primary-500 transition"
                >
                  Career Advice
                </Link>
              </li>
              <li>
                <Link
                  to="/resume-builder"
                  className="hover:text-primary-500 transition"
                >
                  Resume Builder
                </Link>
              </li>
            </ul>
          </div>

          {/* For Employers */}
          <div>
            <h3 className="text-white font-semibold mb-4">For Employers</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/post-job"
                  className="hover:text-primary-500 transition"
                >
                  Post a Job
                </Link>
              </li>
              <li>
                <Link
                  to="/search-candidates"
                  className="hover:text-primary-500 transition"
                >
                  Search Candidates
                </Link>
              </li>
              <li>
                <Link
                  to="/pricing"
                  className="hover:text-primary-500 transition"
                >
                  Pricing Plans
                </Link>
              </li>
              <li>
                <Link
                  to="/recruiter-resources"
                  className="hover:text-primary-500 transition"
                >
                  Resources
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/about" className="hover:text-primary-500 transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-primary-500 transition"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-primary-500 transition">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-primary-500 transition">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="hover:text-primary-500 transition"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
          <p>
            © {currentYear} JobPortal. All rights reserved. | Built with React
            & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
