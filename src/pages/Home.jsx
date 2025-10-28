import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { FaSearch, FaMapMarkerAlt, FaBriefcase, FaBuilding, FaUsers, FaCheckCircle, FaStar, FaArrowRight } from 'react-icons/fa';

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    
    // Auto-rotate testimonials
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
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
      <section className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-purple-800 text-white py-20 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className={`max-w-4xl mx-auto text-center transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
              Find Your Dream Job Today
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-100 animate-slide-up">
              Thousands of jobs waiting for you. Start your career journey now!
            </p>

            {/* Search Bar */}
            <div className="bg-white rounded-2xl shadow-2xl p-4 flex flex-col md:flex-row gap-4 transform hover:scale-105 transition-all duration-300">
              <div className="flex-1 flex items-center border-r border-gray-300 px-4">
                <FaSearch className="text-gray-400 mr-3" />
                <input
                  type="text"
                  placeholder="Job title, keywords, or company"
                  className="w-full outline-none text-gray-700 placeholder-gray-400"
                />
              </div>
              <div className="flex-1 flex items-center px-4">
                <FaMapMarkerAlt className="text-gray-400 mr-3" />
                <input
                  type="text"
                  placeholder="City or state"
                  className="w-full outline-none text-gray-700 placeholder-gray-400"
                />
              </div>
              <Link 
                to="/jobs"
                className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105 flex items-center justify-center gap-2"
              >
                Search Jobs
                <FaArrowRight className="animate-bounce-x" />
              </Link>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
              {[
                { value: '10K+', label: 'Jobs Available', delay: 'delay-100' },
                { value: '5K+', label: 'Companies', delay: 'delay-200' },
                { value: '50K+', label: 'Candidates', delay: 'delay-300' },
                { value: '15K+', label: 'New Jobs', delay: 'delay-500' }
              ].map((stat, index) => (
                <div key={index} className={`animate-scale-in ${stat.delay}`}>
                  <div className="text-4xl font-bold">{stat.value}</div>
                  <div className="text-primary-200">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Job Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in">
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
                className="bg-white p-6 rounded-xl shadow hover:shadow-xl transition-all duration-300 cursor-pointer group hover-lift animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-4xl mb-3 transform group-hover:scale-110 transition-transform duration-300">
                  {category.icon}
                </div>
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
      <section className="py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Featured Jobs
            </h2>
            <p className="text-xl text-gray-600">
              Hand-picked opportunities from top companies
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredJobs.map((job, index) => (
              <div
                key={job.id}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover-lift group animate-scale-in"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className="flex items-center mb-4">
                  <div className="text-4xl mr-4 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                    {job.logo}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 group-hover:text-primary-600 transition">
                      {job.company}
                    </h3>
                    <div className="flex items-center text-sm text-gray-600">
                      <FaMapMarkerAlt className="mr-1" />
                      {job.location}
                    </div>
                  </div>
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition">
                  {job.title}
                </h4>
                <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                  <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full">
                    {job.type}
                  </span>
                  <span className="font-semibold text-green-600">{job.salary}</span>
                </div>
                <button className="w-full bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105">
                  Apply Now
                </button>
              </div>
            ))}
          </div>

          <div className="text-center mt-10 animate-fade-in delay-500">
            <Link
              to="/jobs"
              className="inline-block bg-gradient-to-r from-primary-600 to-purple-600 hover:from-primary-700 hover:to-purple-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg"
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
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer text-center hover-lift group animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-5xl mb-3 transform group-hover:scale-125 group-hover:rotate-12 transition-all duration-300">
                  {company.logo}
                </div>
                <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-primary-600 transition">
                  {company.name}
                </h3>
                <p className="text-sm text-gray-600">{company.jobs} open positions</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gradient-to-br from-primary-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Success Stories
            </h2>
            <p className="text-xl text-gray-600">
              Hear from people who found their dream jobs
            </p>
          </div>

          {/* Carousel Container */}
          <div className="relative max-w-4xl mx-auto">
            <div className="overflow-hidden">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${activeTestimonial * 100}%)` }}
              >
                {testimonials.map((testimonial, index) => (
                  <div
                    key={index}
                    className="w-full flex-shrink-0 px-4"
                  >
                    <div className="bg-white p-8 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300">
                      <div className="flex items-center mb-4">
                        {[...Array(5)].map((_, i) => (
                          <FaStar key={i} className="text-yellow-400 animate-pulse" style={{ animationDelay: `${i * 0.1}s` }} />
                        ))}
                      </div>
                      <p className="text-gray-700 text-lg mb-6 italic leading-relaxed">
                        "{testimonial.text}"
                      </p>
                      <div className="flex items-center">
                        <div className="text-5xl mr-4 animate-float">{testimonial.avatar}</div>
                        <div>
                          <h4 className="font-semibold text-gray-900 text-lg">{testimonial.name}</h4>
                          <p className="text-sm text-gray-600">
                            {testimonial.role} at {testimonial.company}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Carousel Indicators */}
            <div className="flex justify-center gap-2 mt-6">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === activeTestimonial 
                      ? 'bg-primary-600 w-8' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 bg-gradient-to-r from-primary-600 via-primary-700 to-purple-700 text-white relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl font-bold mb-4 animate-fade-in">
            Ready to Take the Next Step?
          </h2>
          <p className="text-xl mb-8 text-primary-100 animate-slide-up">
            Join thousands of job seekers and find your perfect match today
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-scale-in delay-300">
            <Link
              to="/register"
              className="bg-white text-primary-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              Get Started Free
            </Link>
            <Link
              to="/jobs"
              className="bg-primary-700 hover:bg-primary-800 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 border-2 border-white hover:scale-105 hover:shadow-xl"
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
