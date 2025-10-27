import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FaSearch,
  FaMapMarkerAlt,
  FaFilter,
  FaTimes,
  FaSave,
  FaBriefcase,
  FaDollarSign,
  FaClock,
  FaIndustry,
  FaBuilding,
  FaHome,
  FaUsers,
  FaTh,
  FaList,
  FaSortAmountDown,
} from 'react-icons/fa';
import { toast } from 'react-toastify';
import JobCard from '../components/common/JobCard';
import JobCardSkeleton from '../components/common/JobCardSkeleton';
import Pagination from '../components/common/Pagination';

const JobSearch = () => {
  const navigate = useNavigate();
  const [searchKeyword, setSearchKeyword] = useState('');
  const [location, setLocation] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [savedSearches, setSavedSearches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [gridView, setGridView] = useState(true);
  const [sortBy, setSortBy] = useState('relevance');
  const [currentPage, setCurrentPage] = useState(1);
  const [savedJobs, setSavedJobs] = useState([]);
  const jobsPerPage = 9;

  // Sample job data
  const [allJobs] = useState([
    {
      id: 1,
      title: 'Senior React Developer',
      company: 'Tech Corp',
      companyLogo: null,
      location: 'San Francisco, CA',
      experience: '3-5 years',
      salary: '₹15-25 LPA',
      jobType: 'Full-time',
      workMode: 'Remote',
      skills: ['React', 'Node.js', 'TypeScript', 'AWS', 'Docker'],
      postedDate: '2025-10-25',
      applicants: 45,
    },
    {
      id: 2,
      title: 'Full Stack Developer',
      company: 'StartUp Inc',
      companyLogo: null,
      location: 'Bangalore, India',
      experience: '2-4 years',
      salary: '₹12-18 LPA',
      jobType: 'Full-time',
      workMode: 'Hybrid',
      skills: ['React', 'Node.js', 'MongoDB', 'Express'],
      postedDate: '2025-10-26',
      applicants: 32,
    },
    {
      id: 3,
      title: 'Python Developer',
      company: 'Data Solutions',
      companyLogo: null,
      location: 'Mumbai, India',
      experience: '1-3 years',
      salary: '₹8-12 LPA',
      jobType: 'Full-time',
      workMode: 'On-site',
      skills: ['Python', 'Django', 'PostgreSQL', 'Redis'],
      postedDate: '2025-10-24',
      applicants: 28,
    },
    {
      id: 4,
      title: 'UI/UX Designer',
      company: 'Creative Agency',
      companyLogo: null,
      location: 'Remote',
      experience: '2-5 years',
      salary: '₹10-15 LPA',
      jobType: 'Contract',
      workMode: 'Remote',
      skills: ['Figma', 'Adobe XD', 'Sketch', 'Prototyping'],
      postedDate: '2025-10-27',
      applicants: 52,
    },
    {
      id: 5,
      title: 'DevOps Engineer',
      company: 'Cloud Systems',
      companyLogo: null,
      location: 'Pune, India',
      experience: '3-6 years',
      salary: '₹18-28 LPA',
      jobType: 'Full-time',
      workMode: 'Hybrid',
      skills: ['AWS', 'Docker', 'Kubernetes', 'Jenkins', 'Terraform'],
      postedDate: '2025-10-23',
      applicants: 38,
    },
    {
      id: 6,
      title: 'Mobile App Developer',
      company: 'App Innovators',
      companyLogo: null,
      location: 'Hyderabad, India',
      experience: '2-4 years',
      salary: '₹12-20 LPA',
      jobType: 'Full-time',
      workMode: 'On-site',
      skills: ['React Native', 'Flutter', 'iOS', 'Android'],
      postedDate: '2025-10-26',
      applicants: 41,
    },
    {
      id: 7,
      title: 'Data Scientist',
      company: 'AI Labs',
      companyLogo: null,
      location: 'Bangalore, India',
      experience: '3-7 years',
      salary: '₹20-35 LPA',
      jobType: 'Full-time',
      workMode: 'Remote',
      skills: ['Python', 'Machine Learning', 'TensorFlow', 'Data Analysis'],
      postedDate: '2025-10-22',
      applicants: 67,
    },
    {
      id: 8,
      title: 'Frontend Developer Intern',
      company: 'StartUp Hub',
      companyLogo: null,
      location: 'Delhi, India',
      experience: '0-1 years',
      salary: '₹3-5 LPA',
      jobType: 'Internship',
      workMode: 'Hybrid',
      skills: ['HTML', 'CSS', 'JavaScript', 'React'],
      postedDate: '2025-10-27',
      applicants: 125,
    },
    {
      id: 9,
      title: 'Backend Developer',
      company: 'Enterprise Solutions',
      companyLogo: null,
      location: 'Noida, India',
      experience: '4-8 years',
      salary: '₹18-30 LPA',
      jobType: 'Full-time',
      workMode: 'On-site',
      skills: ['Java', 'Spring Boot', 'Microservices', 'MySQL'],
      postedDate: '2025-10-25',
      applicants: 43,
    },
    {
      id: 10,
      title: 'Product Manager',
      company: 'Product Co',
      companyLogo: null,
      location: 'Mumbai, India',
      experience: '5-10 years',
      salary: '₹25-40 LPA',
      jobType: 'Full-time',
      workMode: 'Hybrid',
      skills: ['Product Management', 'Agile', 'Analytics', 'Leadership'],
      postedDate: '2025-10-24',
      applicants: 89,
    },
    {
      id: 11,
      title: 'QA Engineer',
      company: 'Quality First',
      companyLogo: null,
      location: 'Chennai, India',
      experience: '2-5 years',
      salary: '₹10-18 LPA',
      jobType: 'Full-time',
      workMode: 'Remote',
      skills: ['Selenium', 'Automation Testing', 'Java', 'API Testing'],
      postedDate: '2025-10-26',
      applicants: 36,
    },
    {
      id: 12,
      title: 'Business Analyst',
      company: 'Consulting Firm',
      companyLogo: null,
      location: 'Gurgaon, India',
      experience: '3-6 years',
      salary: '₹15-25 LPA',
      jobType: 'Full-time',
      workMode: 'On-site',
      skills: ['Business Analysis', 'SQL', 'Excel', 'Tableau'],
      postedDate: '2025-10-23',
      applicants: 54,
    },
  ]);

  const [filteredJobs, setFilteredJobs] = useState(allJobs);

  // Filter states
  const [filters, setFilters] = useState({
    salaryMin: 0,
    salaryMax: 50,
    experienceLevel: [],
    jobType: [],
    workMode: [],
    industry: [],
    postedDate: 'all',
    companyType: [],
    locationRadius: 25,
  });

  const [appliedFilters, setAppliedFilters] = useState([]);

  // Filter options
  const experienceLevels = [
    'Entry Level (0-2 years)',
    'Mid Level (2-5 years)',
    'Senior Level (5-10 years)',
    'Lead/Manager (10+ years)',
  ];

  const jobTypes = ['Full-time', 'Part-time', 'Contract', 'Internship', 'Freelance'];

  const workModes = ['Remote', 'On-site', 'Hybrid'];

  const industries = [
    'Information Technology',
    'Finance & Banking',
    'Healthcare',
    'E-commerce',
    'Education',
    'Manufacturing',
    'Consulting',
    'Media & Entertainment',
    'Real Estate',
    'Retail',
  ];

  const companyTypes = ['Startup', 'MNC', 'Product Based', 'Service Based', 'Government'];

  const postedDateOptions = [
    { value: 'all', label: 'Any Time' },
    { value: '24h', label: 'Last 24 Hours' },
    { value: '7d', label: 'Last 7 Days' },
    { value: '30d', label: 'Last 30 Days' },
  ];

  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => {
      if (Array.isArray(prev[filterType])) {
        // Toggle checkbox
        if (prev[filterType].includes(value)) {
          return {
            ...prev,
            [filterType]: prev[filterType].filter((item) => item !== value),
          };
        } else {
          return {
            ...prev,
            [filterType]: [...prev[filterType], value],
          };
        }
      } else {
        // Regular input
        return { ...prev, [filterType]: value };
      }
    });
  };

  const handleApplyFilters = () => {
    const applied = [];

    // Add salary filter
    if (filters.salaryMin > 0 || filters.salaryMax < 50) {
      applied.push({
        type: 'salary',
        label: `₹${filters.salaryMin}L - ₹${filters.salaryMax}L`,
      });
    }

    // Add experience filter
    filters.experienceLevel.forEach((level) => {
      applied.push({ type: 'experienceLevel', label: level });
    });

    // Add job type filter
    filters.jobType.forEach((type) => {
      applied.push({ type: 'jobType', label: type });
    });

    // Add work mode filter
    filters.workMode.forEach((mode) => {
      applied.push({ type: 'workMode', label: mode });
    });

    // Add industry filter
    filters.industry.forEach((ind) => {
      applied.push({ type: 'industry', label: ind });
    });

    // Add company type filter
    filters.companyType.forEach((type) => {
      applied.push({ type: 'companyType', label: type });
    });

    // Add posted date filter
    if (filters.postedDate !== 'all') {
      const dateLabel = postedDateOptions.find((opt) => opt.value === filters.postedDate)?.label;
      applied.push({ type: 'postedDate', label: dateLabel });
    }

    setAppliedFilters(applied);
    setShowFilters(false);
    toast.success(`${applied.length} filters applied`);
  };

  const handleRemoveFilter = (filterToRemove) => {
    setAppliedFilters((prev) => prev.filter((filter) => filter !== filterToRemove));

    // Update filter state
    setFilters((prev) => {
      if (filterToRemove.type === 'salary') {
        return { ...prev, salaryMin: 0, salaryMax: 50 };
      } else if (Array.isArray(prev[filterToRemove.type])) {
        return {
          ...prev,
          [filterToRemove.type]: prev[filterToRemove.type].filter(
            (item) => item !== filterToRemove.label
          ),
        };
      } else if (filterToRemove.type === 'postedDate') {
        return { ...prev, postedDate: 'all' };
      }
      return prev;
    });

    toast.info('Filter removed');
  };

  const handleClearAllFilters = () => {
    setFilters({
      salaryMin: 0,
      salaryMax: 50,
      experienceLevel: [],
      jobType: [],
      workMode: [],
      industry: [],
      postedDate: 'all',
      companyType: [],
      locationRadius: 25,
    });
    setAppliedFilters([]);
    toast.info('All filters cleared');
  };

  const handleSaveSearch = () => {
    if (!searchKeyword && !location && appliedFilters.length === 0) {
      toast.error('Please enter search criteria to save');
      return;
    }

    const searchName = prompt('Enter a name for this search:');
    if (searchName) {
      const newSearch = {
        id: Date.now(),
        name: searchName,
        keyword: searchKeyword,
        location: location,
        filters: { ...filters },
        appliedFilters: [...appliedFilters],
      };
      setSavedSearches((prev) => [...prev, newSearch]);
      toast.success('Search saved successfully!');
    }
  };

  const handleLoadSavedSearch = (savedSearch) => {
    setSearchKeyword(savedSearch.keyword);
    setLocation(savedSearch.location);
    setFilters(savedSearch.filters);
    setAppliedFilters(savedSearch.appliedFilters);
    toast.success(`Loaded: ${savedSearch.name}`);
  };

  const handleDeleteSavedSearch = (id) => {
    setSavedSearches((prev) => prev.filter((search) => search.id !== id));
    toast.success('Saved search deleted');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setLoading(true);
    toast.info('Searching for jobs...');
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setCurrentPage(1);
    }, 1000);
  };

  const handleSaveJob = (jobId) => {
    if (savedJobs.includes(jobId)) {
      setSavedJobs(savedJobs.filter((id) => id !== jobId));
      toast.info('Job removed from saved');
    } else {
      setSavedJobs([...savedJobs, jobId]);
      toast.success('Job saved successfully!');
    }
  };

  const handleQuickApply = (jobId) => {
    navigate(`/jobs/${jobId}/apply`);
  };

  const handleSort = (value) => {
    setSortBy(value);
    let sorted = [...filteredJobs];
    
    switch (value) {
      case 'date':
        sorted.sort((a, b) => new Date(b.postedDate) - new Date(a.postedDate));
        break;
      case 'salary':
        sorted.sort((a, b) => {
          const salaryA = parseInt(a.salary.match(/\d+/)[0]);
          const salaryB = parseInt(b.salary.match(/\d+/)[0]);
          return salaryB - salaryA;
        });
        break;
      case 'relevance':
      default:
        // Keep original order
        break;
    }
    
    setFilteredJobs(sorted);
    toast.info(`Sorted by ${value}`);
  };

  // Pagination
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Search Header */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          <h1 className="text-4xl font-bold mb-6">Find Your Dream Job</h1>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="bg-white rounded-lg shadow-lg p-4">
            <div className="grid md:grid-cols-12 gap-4">
              {/* Keyword Search */}
              <div className="md:col-span-5 flex items-center border-r border-gray-200">
                <FaSearch className="text-gray-400 ml-3 mr-3" />
                <input
                  type="text"
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                  placeholder="Job title, keywords, or company"
                  className="flex-1 py-3 text-gray-900 outline-none"
                />
              </div>

              {/* Location Search */}
              <div className="md:col-span-5 flex items-center border-r border-gray-200">
                <FaMapMarkerAlt className="text-gray-400 ml-3 mr-3" />
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="City, state, or remote"
                  className="flex-1 py-3 text-gray-900 outline-none"
                />
              </div>

              {/* Search Button */}
              <div className="md:col-span-2">
                <button
                  type="submit"
                  className="w-full bg-primary-600 hover:bg-primary-700 text-white py-3 rounded-lg font-medium transition"
                >
                  Search
                </button>
              </div>
            </div>
          </form>

          {/* Quick Actions */}
          <div className="flex items-center space-x-4 mt-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition"
            >
              <FaFilter className="mr-2" />
              Advanced Filters
            </button>
            <button
              onClick={handleSaveSearch}
              className="flex items-center bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition"
            >
              <FaSave className="mr-2" />
              Save Search
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-6xl py-8">
        {/* Applied Filters */}
        {appliedFilters.length > 0 && (
          <div className="mb-6">
            <div className="bg-white rounded-lg shadow-md p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-900">Applied Filters:</h3>
                <button
                  onClick={handleClearAllFilters}
                  className="text-sm text-red-600 hover:text-red-700"
                >
                  Clear All
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {appliedFilters.map((filter, index) => (
                  <span
                    key={index}
                    className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-medium flex items-center"
                  >
                    {filter.label}
                    <button
                      onClick={() => handleRemoveFilter(filter)}
                      className="ml-2 text-primary-900 hover:text-red-600"
                    >
                      <FaTimes />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Filters Panel */}
        {showFilters && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Advanced Filters</h2>
              <button
                onClick={() => setShowFilters(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FaTimes className="text-2xl" />
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Salary Range */}
              <div>
                <div className="flex items-center mb-3">
                  <FaDollarSign className="text-primary-600 mr-2" />
                  <label className="font-semibold text-gray-900">Salary Range (LPA)</label>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-gray-600 mb-1 block">
                      Minimum: ₹{filters.salaryMin}L
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="50"
                      value={filters.salaryMin}
                      onChange={(e) =>
                        handleFilterChange('salaryMin', parseInt(e.target.value))
                      }
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-600 mb-1 block">
                      Maximum: ₹{filters.salaryMax}L
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="50"
                      value={filters.salaryMax}
                      onChange={(e) =>
                        handleFilterChange('salaryMax', parseInt(e.target.value))
                      }
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
                    />
                  </div>
                </div>
              </div>

              {/* Experience Level */}
              <div>
                <div className="flex items-center mb-3">
                  <FaBriefcase className="text-primary-600 mr-2" />
                  <label className="font-semibold text-gray-900">Experience Level</label>
                </div>
                <div className="space-y-2">
                  {experienceLevels.map((level) => (
                    <label key={level} className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filters.experienceLevel.includes(level)}
                        onChange={() => handleFilterChange('experienceLevel', level)}
                        className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                      />
                      <span className="ml-2 text-gray-700">{level}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Job Type */}
              <div>
                <div className="flex items-center mb-3">
                  <FaClock className="text-primary-600 mr-2" />
                  <label className="font-semibold text-gray-900">Job Type</label>
                </div>
                <div className="space-y-2">
                  {jobTypes.map((type) => (
                    <label key={type} className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filters.jobType.includes(type)}
                        onChange={() => handleFilterChange('jobType', type)}
                        className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                      />
                      <span className="ml-2 text-gray-700">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Work Mode */}
              <div>
                <div className="flex items-center mb-3">
                  <FaHome className="text-primary-600 mr-2" />
                  <label className="font-semibold text-gray-900">Work Mode</label>
                </div>
                <div className="space-y-2">
                  {workModes.map((mode) => (
                    <label key={mode} className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filters.workMode.includes(mode)}
                        onChange={() => handleFilterChange('workMode', mode)}
                        className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                      />
                      <span className="ml-2 text-gray-700">{mode}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Industry */}
              <div>
                <div className="flex items-center mb-3">
                  <FaIndustry className="text-primary-600 mr-2" />
                  <label className="font-semibold text-gray-900">Industry</label>
                </div>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {industries.map((industry) => (
                    <label key={industry} className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filters.industry.includes(industry)}
                        onChange={() => handleFilterChange('industry', industry)}
                        className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                      />
                      <span className="ml-2 text-gray-700">{industry}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Company Type */}
              <div>
                <div className="flex items-center mb-3">
                  <FaBuilding className="text-primary-600 mr-2" />
                  <label className="font-semibold text-gray-900">Company Type</label>
                </div>
                <div className="space-y-2">
                  {companyTypes.map((type) => (
                    <label key={type} className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filters.companyType.includes(type)}
                        onChange={() => handleFilterChange('companyType', type)}
                        className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                      />
                      <span className="ml-2 text-gray-700">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Posted Date */}
              <div>
                <div className="flex items-center mb-3">
                  <FaClock className="text-primary-600 mr-2" />
                  <label className="font-semibold text-gray-900">Posted Date</label>
                </div>
                <select
                  value={filters.postedDate}
                  onChange={(e) => handleFilterChange('postedDate', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                >
                  {postedDateOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Location Radius */}
              <div>
                <div className="flex items-center mb-3">
                  <FaMapMarkerAlt className="text-primary-600 mr-2" />
                  <label className="font-semibold text-gray-900">Location Radius</label>
                </div>
                <div>
                  <label className="text-sm text-gray-600 mb-1 block">
                    Within {filters.locationRadius} km
                  </label>
                  <input
                    type="range"
                    min="5"
                    max="100"
                    step="5"
                    value={filters.locationRadius}
                    onChange={(e) =>
                      handleFilterChange('locationRadius', parseInt(e.target.value))
                    }
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
                  />
                </div>
              </div>
            </div>

            {/* Apply Filters Button */}
            <div className="flex justify-end space-x-4 mt-8 pt-6 border-t">
              <button
                onClick={handleClearAllFilters}
                className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium transition"
              >
                Clear All
              </button>
              <button
                onClick={handleApplyFilters}
                className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition"
              >
                Apply Filters
              </button>
            </div>
          </div>
        )}

        {/* Saved Searches */}
        {savedSearches.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
              <FaSave className="mr-2 text-primary-600" />
              Saved Searches
            </h3>
            <div className="space-y-3">
              {savedSearches.map((search) => (
                <div
                  key={search.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{search.name}</h4>
                    <p className="text-sm text-gray-600">
                      {search.keyword || 'Any'} • {search.location || 'Anywhere'} •{' '}
                      {search.appliedFilters.length} filters
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleLoadSavedSearch(search)}
                      className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg text-sm transition"
                    >
                      Load
                    </button>
                    <button
                      onClick={() => handleDeleteSavedSearch(search.id)}
                      className="px-4 py-2 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg text-sm transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Search Results Placeholder */}
        <div>
          {/* Results Header */}
          <div className="bg-white rounded-lg shadow-md p-4 mb-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between">
              <div className="mb-4 md:mb-0">
                <h3 className="text-lg font-semibold text-gray-900">
                  {filteredJobs.length} Jobs Found
                </h3>
                <p className="text-sm text-gray-600">
                  Page {currentPage} of {totalPages}
                </p>
              </div>

              <div className="flex items-center space-x-4">
                {/* Sort Dropdown */}
                <div className="flex items-center">
                  <FaSortAmountDown className="text-gray-500 mr-2" />
                  <select
                    value={sortBy}
                    onChange={(e) => handleSort(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 text-sm"
                  >
                    <option value="relevance">Relevance</option>
                    <option value="date">Newest First</option>
                    <option value="salary">Highest Salary</option>
                  </select>
                </div>

                {/* View Toggle */}
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setGridView(true)}
                    className={`p-2 rounded-lg transition ${
                      gridView
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                    title="Grid View"
                  >
                    <FaTh />
                  </button>
                  <button
                    onClick={() => setGridView(false)}
                    className={`p-2 rounded-lg transition ${
                      !gridView
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                    title="List View"
                  >
                    <FaList />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Job Listings */}
          {loading ? (
            <div className={gridView ? 'grid md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
              {[...Array(6)].map((_, index) => (
                <JobCardSkeleton key={index} gridView={gridView} />
              ))}
            </div>
          ) : filteredJobs.length > 0 ? (
            <>
              <div className={gridView ? 'grid md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
                {currentJobs.map((job) => (
                  <JobCard
                    key={job.id}
                    job={job}
                    gridView={gridView}
                    isSaved={savedJobs.includes(job.id)}
                    onSave={handleSaveJob}
                    onQuickApply={handleQuickApply}
                  />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              )}
            </>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-12 text-center">
              <FaSearch className="text-6xl text-gray-300 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">No Jobs Found</h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your search criteria or filters to find more results
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobSearch;
