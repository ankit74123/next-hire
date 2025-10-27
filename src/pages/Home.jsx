import { Link } from 'react-router-dom';
import { FaSearch, FaMapMarkerAlt, FaBriefcase, FaBuilding, FaUsers, FaCheckCircle, FaStar } from 'react-icons/fa';

const Home = () => {
  // Sample data
  const jobCategories = [
    { name: 'Technology', count: 1250, icon: '💻' },
    { name: 'Healthcare', count: 890, icon: '🏥' },
    { name: 'Finance', count: 670, icon: '💰' },
    { name: 'Education', count: 540, icon: '📚' },
    { name: 'Marketing', count: 780, icon: '📱' },
    { name: 'Design', count: 420, icon: '🎨' },
    { name: 'Sales', count: 650, icon: '📊' },
    { name: 'Engineering', count: 920, icon: '⚙️' },
  ];

  const featuredJobs = [
    {
      id: 1,
      title: 'Senior React Developer',
      company: 'Tech Corp',
      location: 'Remote',
      salary: '$120k - $150k',
      type: 'Full-time',
      logo: '🚀',
    },
    {
      id: 2,
      title: 'Product Manager',
      company: 'Innovation Inc',
      location: 'New York, NY',
      salary: '$130k - $160k',
      type: 'Full-time',
      logo: '💡',
    },
    {
      id: 3,
      title: 'UI/UX Designer',
      company: 'Design Studio',
      location: 'San Francisco, CA',
      salary: '$90k - $120k',
      type: 'Full-time',
      logo: '🎨',
    },
    {
      id: 4,
      title: 'Data Scientist',
      company: 'Data Analytics Co',
      location: 'Boston, MA',
      salary: '$110k - $140k',
      type: 'Full-time',
      logo: '📊',
    },
  ];

  const topCompanies = [
    { name: 'Google', jobs: 45, logo: '🔍' },
    { name: 'Microsoft', jobs: 38, logo: '💻' },
    { name: 'Amazon', jobs: 52, logo: '📦' },
    { name: 'Apple', jobs: 28, logo: '🍎' },
    { name: 'Meta', jobs: 31, logo: '📘' },
    { name: 'Netflix', jobs: 22, logo: '🎬' },
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Software Engineer',
      company: 'Tech Corp',
      text: 'I found my dream job within 2 weeks! The platform is easy to use and has great opportunities.',
      avatar: '👩‍💻',
    },
    {
      name: 'Michael Chen',
      role: 'Product Manager',
      company: 'Innovation Inc',
      text: 'The best job portal I have used. Got multiple interview calls and landed an amazing position!',
      avatar: '👨‍💼',
    },
    {
      name: 'Emily Davis',
      role: 'UX Designer',
      company: 'Design Studio',
      text: 'Highly recommended! The job recommendations were spot-on and the application process was smooth.',
      avatar: '👩‍🎨',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Find Your Dream Job Today
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-100">
              Thousands of jobs waiting for you. Start your career journey now!
            </p>

            {/* Search Bar */}
            <div className="bg-white rounded-lg shadow-lg p-4 flex flex-col md:flex-row gap-4">
              <div className="flex-1 flex items-center border-r border-gray-300 px-4">
                <FaSearch className="text-gray-400 mr-3" />
                <input
                  type="text"
                  placeholder="Job title, keywords, or company"
                  className="w-full outline-none text-gray-700"
                />
              </div>
              <div className="flex-1 flex items-center px-4">
                <FaMapMarkerAlt className="text-gray-400 mr-3" />
                <input
                  type="text"
                  placeholder="City or state"
                  className="w-full outline-none text-gray-700"
                />
              </div>
              <Link 
                to="/jobs"
                className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-lg font-semibold transition"
              >
                Search Jobs
              </Link>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
              <div>
                <div className="text-4xl font-bold">10K+</div>
                <div className="text-primary-200">Jobs Available</div>
              </div>
              <div>
                <div className="text-4xl font-bold">5K+</div>
                <div className="text-primary-200">Companies</div>
              </div>
              <div>
                <div className="text-4xl font-bold">50K+</div>
                <div className="text-primary-200">Candidates</div>
              </div>
              <div>
                <div className="text-4xl font-bold">15K+</div>
                <div className="text-primary-200">New Jobs</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Job Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Browse by Category
            </h2>
            <p className="text-xl text-gray-600">
              Explore jobs by popular categories
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {jobCategories.map((category, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition cursor-pointer group"
              >
                <div className="text-4xl mb-3">{category.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition">
                  {category.name}
                </h3>
                <p className="text-gray-600">{category.count} jobs available</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Jobs Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Featured Jobs
            </h2>
            <p className="text-xl text-gray-600">
              Hand-picked opportunities from top companies
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredJobs.map((job) => (
              <div
                key={job.id}
                className="bg-white p-6 rounded-lg shadow hover:shadow-xl transition border border-gray-200"
              >
                <div className="flex items-center mb-4">
                  <div className="text-4xl mr-4">{job.logo}</div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{job.company}</h3>
                    <div className="flex items-center text-sm text-gray-600">
                      <FaMapMarkerAlt className="mr-1" />
                      {job.location}
                    </div>
                  </div>
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  {job.title}
                </h4>
                <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                  <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded">
                    {job.type}
                  </span>
                  <span className="font-semibold">{job.salary}</span>
                </div>
                <button className="w-full bg-primary-600 hover:bg-primary-700 text-white py-2 rounded-lg font-medium transition">
                  Apply Now
                </button>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              to="/jobs"
              className="inline-block bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-lg font-semibold transition"
            >
              View All Jobs
            </Link>
          </div>
        </div>
      </section>

      {/* Top Companies Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Top Companies Hiring
            </h2>
            <p className="text-xl text-gray-600">
              Explore opportunities at leading organizations
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {topCompanies.map((company, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition cursor-pointer text-center"
              >
                <div className="text-5xl mb-3">{company.logo}</div>
                <h3 className="font-semibold text-gray-900 mb-1">{company.name}</h3>
                <p className="text-sm text-gray-600">{company.jobs} open positions</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Success Stories
            </h2>
            <p className="text-xl text-gray-600">
              Hear from people who found their dream jobs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-lg shadow-lg"
              >
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">"{testimonial.text}"</p>
                <div className="flex items-center">
                  <div className="text-4xl mr-4">{testimonial.avatar}</div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">
                      {testimonial.role} at {testimonial.company}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-primary-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Take the Next Step?
          </h2>
          <p className="text-xl mb-8 text-primary-100">
            Join thousands of job seekers and find your perfect match today
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="bg-white text-primary-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition"
            >
              Get Started Free
            </Link>
            <Link
              to="/jobs"
              className="bg-primary-700 hover:bg-primary-800 text-white px-8 py-3 rounded-lg font-semibold transition border-2 border-white"
            >
              Browse Jobs
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
