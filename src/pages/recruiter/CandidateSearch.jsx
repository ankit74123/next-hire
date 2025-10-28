import { useState } from 'react';
import { FaSearch, FaFilter, FaSave, FaMapMarkerAlt, FaBriefcase, FaGraduationCap, FaEnvelope, FaPhone, FaStar, FaBookmark, FaEye, FaDownload, FaPaperPlane } from 'react-icons/fa';
import { toast } from 'react-toastify';

const CandidateSearch = () => {
  // State management
  const [searchQuery, setSearchQuery] = useState('');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [selectedCandidates, setSelectedCandidates] = useState([]);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const candidatesPerPage = 12;

  // Filters state
  const [filters, setFilters] = useState({
    location: '',
    minExperience: '',
    maxExperience: '',
    skills: '',
    education: '',
    availability: '',
    salary: ''
  });

  // Saved searches
  const [savedSearches, setSavedSearches] = useState([
    { id: 1, name: 'Senior React Developers', query: 'React', filters: { minExperience: '5', skills: 'React, Redux' } },
    { id: 2, name: 'UI/UX Designers', query: 'UI/UX', filters: { minExperience: '3' } }
  ]);

  // Sample candidates data
  const [candidates] = useState([
    {
      id: 1,
      name: 'Sarah Johnson',
      title: 'Senior Frontend Developer',
      location: 'San Francisco, CA',
      experience: 6,
      education: 'Master\'s in Computer Science',
      skills: ['React', 'TypeScript', 'Node.js', 'Redux', 'Tailwind CSS'],
      currentCompany: 'Tech Corp',
      salary: '$120k',
      availability: 'Immediate',
      email: 'sarah.j@email.com',
      phone: '+1 (555) 123-4567',
      rating: 4.8,
      matchScore: 95,
      resume: 'sarah_johnson_resume.pdf',
      summary: 'Experienced frontend developer with 6+ years of expertise in React and modern web technologies. Led development of multiple enterprise applications.',
      workHistory: [
        { company: 'Tech Corp', role: 'Senior Frontend Developer', duration: '2021 - Present' },
        { company: 'Digital Agency', role: 'Frontend Developer', duration: '2018 - 2021' }
      ],
      lastActive: '2 days ago'
    },
    {
      id: 2,
      name: 'Michael Chen',
      title: 'Full Stack Engineer',
      location: 'Austin, TX',
      experience: 8,
      education: 'Bachelor\'s in Software Engineering',
      skills: ['JavaScript', 'Python', 'React', 'Django', 'AWS', 'Docker'],
      currentCompany: 'Startup Inc',
      salary: '$140k',
      availability: '2 weeks',
      email: 'michael.c@email.com',
      phone: '+1 (555) 234-5678',
      rating: 4.9,
      matchScore: 92,
      resume: 'michael_chen_resume.pdf',
      summary: 'Full stack engineer with strong expertise in both frontend and backend technologies. Passionate about building scalable applications.',
      workHistory: [
        { company: 'Startup Inc', role: 'Senior Full Stack Engineer', duration: '2019 - Present' },
        { company: 'Innovation Labs', role: 'Software Engineer', duration: '2016 - 2019' }
      ],
      lastActive: '1 day ago'
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      title: 'UI/UX Designer',
      location: 'New York, NY',
      experience: 5,
      education: 'Bachelor\'s in Design',
      skills: ['Figma', 'Adobe XD', 'Sketch', 'User Research', 'Prototyping'],
      currentCompany: 'Creative Studio',
      salary: '$95k',
      availability: '1 month',
      email: 'emily.r@email.com',
      phone: '+1 (555) 345-6789',
      rating: 4.7,
      matchScore: 88,
      resume: 'emily_rodriguez_resume.pdf',
      summary: 'Creative UI/UX designer with a strong portfolio of mobile and web applications. Expert in user-centered design principles.',
      workHistory: [
        { company: 'Creative Studio', role: 'Senior UI/UX Designer', duration: '2020 - Present' },
        { company: 'Design Co', role: 'UI/UX Designer', duration: '2018 - 2020' }
      ],
      lastActive: '3 hours ago'
    },
    {
      id: 4,
      name: 'David Kumar',
      title: 'Backend Developer',
      location: 'Seattle, WA',
      experience: 7,
      education: 'Master\'s in Computer Science',
      skills: ['Java', 'Spring Boot', 'PostgreSQL', 'Microservices', 'Kubernetes'],
      currentCompany: 'Enterprise Solutions',
      salary: '$130k',
      availability: 'Immediate',
      email: 'david.k@email.com',
      phone: '+1 (555) 456-7890',
      rating: 4.9,
      matchScore: 90,
      resume: 'david_kumar_resume.pdf',
      summary: 'Backend specialist with extensive experience in building robust microservices architectures and cloud-native applications.',
      workHistory: [
        { company: 'Enterprise Solutions', role: 'Senior Backend Developer', duration: '2019 - Present' },
        { company: 'Software House', role: 'Backend Developer', duration: '2016 - 2019' }
      ],
      lastActive: '1 week ago'
    },
    {
      id: 5,
      name: 'Jessica Martinez',
      title: 'Product Manager',
      location: 'Boston, MA',
      experience: 9,
      education: 'MBA',
      skills: ['Product Strategy', 'Agile', 'User Stories', 'Roadmapping', 'Analytics'],
      currentCompany: 'Product Co',
      salary: '$150k',
      availability: '3 weeks',
      email: 'jessica.m@email.com',
      phone: '+1 (555) 567-8901',
      rating: 4.8,
      matchScore: 87,
      resume: 'jessica_martinez_resume.pdf',
      summary: 'Strategic product manager with proven track record of launching successful products and driving business growth.',
      workHistory: [
        { company: 'Product Co', role: 'Senior Product Manager', duration: '2020 - Present' },
        { company: 'Tech Startup', role: 'Product Manager', duration: '2016 - 2020' }
      ],
      lastActive: '5 days ago'
    },
    {
      id: 6,
      name: 'Alex Thompson',
      title: 'DevOps Engineer',
      location: 'Denver, CO',
      experience: 6,
      education: 'Bachelor\'s in Computer Science',
      skills: ['AWS', 'Docker', 'Kubernetes', 'Jenkins', 'Terraform', 'CI/CD'],
      currentCompany: 'Cloud Services',
      salary: '$125k',
      availability: 'Immediate',
      email: 'alex.t@email.com',
      phone: '+1 (555) 678-9012',
      rating: 4.7,
      matchScore: 93,
      resume: 'alex_thompson_resume.pdf',
      summary: 'DevOps engineer specializing in cloud infrastructure automation and continuous deployment pipelines.',
      workHistory: [
        { company: 'Cloud Services', role: 'Senior DevOps Engineer', duration: '2019 - Present' },
        { company: 'Hosting Provider', role: 'DevOps Engineer', duration: '2017 - 2019' }
      ],
      lastActive: '2 days ago'
    },
    {
      id: 7,
      name: 'Sophie Williams',
      title: 'Data Scientist',
      location: 'Chicago, IL',
      experience: 5,
      education: 'PhD in Statistics',
      skills: ['Python', 'Machine Learning', 'TensorFlow', 'SQL', 'Data Visualization'],
      currentCompany: 'Analytics Corp',
      salary: '$135k',
      availability: '1 month',
      email: 'sophie.w@email.com',
      phone: '+1 (555) 789-0123',
      rating: 4.9,
      matchScore: 91,
      resume: 'sophie_williams_resume.pdf',
      summary: 'Data scientist with strong background in machine learning and statistical modeling. Published researcher.',
      workHistory: [
        { company: 'Analytics Corp', role: 'Senior Data Scientist', duration: '2020 - Present' },
        { company: 'Research Lab', role: 'Data Scientist', duration: '2018 - 2020' }
      ],
      lastActive: '4 days ago'
    },
    {
      id: 8,
      name: 'Ryan Park',
      title: 'Mobile Developer',
      location: 'Los Angeles, CA',
      experience: 4,
      education: 'Bachelor\'s in Computer Science',
      skills: ['React Native', 'iOS', 'Android', 'Swift', 'Kotlin'],
      currentCompany: 'Mobile Apps Inc',
      salary: '$110k',
      availability: '2 weeks',
      email: 'ryan.p@email.com',
      phone: '+1 (555) 890-1234',
      rating: 4.6,
      matchScore: 86,
      resume: 'ryan_park_resume.pdf',
      summary: 'Mobile developer experienced in building cross-platform applications with React Native and native technologies.',
      workHistory: [
        { company: 'Mobile Apps Inc', role: 'Senior Mobile Developer', duration: '2021 - Present' },
        { company: 'App Studio', role: 'Mobile Developer', duration: '2019 - 2021' }
      ],
      lastActive: '1 day ago'
    },
    {
      id: 9,
      name: 'Linda Chen',
      title: 'QA Engineer',
      location: 'Portland, OR',
      experience: 6,
      education: 'Bachelor\'s in Information Technology',
      skills: ['Selenium', 'Jest', 'Cypress', 'Test Automation', 'API Testing'],
      currentCompany: 'Quality Labs',
      salary: '$100k',
      availability: 'Immediate',
      email: 'linda.c@email.com',
      phone: '+1 (555) 901-2345',
      rating: 4.7,
      matchScore: 89,
      resume: 'linda_chen_resume.pdf',
      summary: 'QA engineer specializing in test automation and quality assurance for web and mobile applications.',
      workHistory: [
        { company: 'Quality Labs', role: 'Senior QA Engineer', duration: '2019 - Present' },
        { company: 'Testing Co', role: 'QA Engineer', duration: '2017 - 2019' }
      ],
      lastActive: '6 hours ago'
    },
    {
      id: 10,
      name: 'James Wilson',
      title: 'Security Engineer',
      location: 'Washington, DC',
      experience: 8,
      education: 'Master\'s in Cybersecurity',
      skills: ['Penetration Testing', 'Security Audits', 'OWASP', 'Cryptography', 'Network Security'],
      currentCompany: 'SecureTech',
      salary: '$145k',
      availability: '3 weeks',
      email: 'james.w@email.com',
      phone: '+1 (555) 012-3456',
      rating: 4.9,
      matchScore: 94,
      resume: 'james_wilson_resume.pdf',
      summary: 'Security engineer with extensive experience in application security, penetration testing, and security architecture.',
      workHistory: [
        { company: 'SecureTech', role: 'Senior Security Engineer', duration: '2018 - Present' },
        { company: 'Security Firm', role: 'Security Analyst', duration: '2015 - 2018' }
      ],
      lastActive: '1 week ago'
    },
    {
      id: 11,
      name: 'Maria Garcia',
      title: 'Frontend Developer',
      location: 'Miami, FL',
      experience: 4,
      education: 'Bachelor\'s in Web Development',
      skills: ['Vue.js', 'JavaScript', 'CSS', 'Webpack', 'Responsive Design'],
      currentCompany: 'Web Solutions',
      salary: '$95k',
      availability: 'Immediate',
      email: 'maria.g@email.com',
      phone: '+1 (555) 123-4568',
      rating: 4.5,
      matchScore: 84,
      resume: 'maria_garcia_resume.pdf',
      summary: 'Frontend developer with strong skills in Vue.js and modern web technologies. Focused on creating beautiful user experiences.',
      workHistory: [
        { company: 'Web Solutions', role: 'Frontend Developer', duration: '2020 - Present' },
        { company: 'Digital Agency', role: 'Junior Developer', duration: '2019 - 2020' }
      ],
      lastActive: '2 days ago'
    },
    {
      id: 12,
      name: 'Kevin Brown',
      title: 'Solutions Architect',
      location: 'Atlanta, GA',
      experience: 10,
      education: 'Master\'s in Software Engineering',
      skills: ['System Design', 'Cloud Architecture', 'Microservices', 'AWS', 'Azure'],
      currentCompany: 'Enterprise Tech',
      salary: '$160k',
      availability: '1 month',
      email: 'kevin.b@email.com',
      phone: '+1 (555) 234-5679',
      rating: 5.0,
      matchScore: 96,
      resume: 'kevin_brown_resume.pdf',
      summary: 'Solutions architect with deep expertise in designing scalable enterprise systems and cloud infrastructure.',
      workHistory: [
        { company: 'Enterprise Tech', role: 'Principal Solutions Architect', duration: '2019 - Present' },
        { company: 'Consulting Firm', role: 'Senior Architect', duration: '2015 - 2019' }
      ],
      lastActive: '3 days ago'
    }
  ]);

  // Filter candidates
  const filteredCandidates = candidates.filter(candidate => {
    // Search query filter
    const matchesSearch = searchQuery === '' || 
      candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      candidate.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      candidate.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));

    // Location filter
    const matchesLocation = !filters.location || 
      candidate.location.toLowerCase().includes(filters.location.toLowerCase());

    // Experience filter
    const matchesExperience = 
      (!filters.minExperience || candidate.experience >= parseInt(filters.minExperience)) &&
      (!filters.maxExperience || candidate.experience <= parseInt(filters.maxExperience));

    // Skills filter
    const matchesSkills = !filters.skills || 
      filters.skills.split(',').every(skill => 
        candidate.skills.some(s => s.toLowerCase().includes(skill.trim().toLowerCase()))
      );

    // Education filter
    const matchesEducation = !filters.education || 
      candidate.education.toLowerCase().includes(filters.education.toLowerCase());

    // Availability filter
    const matchesAvailability = !filters.availability || 
      candidate.availability.toLowerCase().includes(filters.availability.toLowerCase());

    return matchesSearch && matchesLocation && matchesExperience && 
           matchesSkills && matchesEducation && matchesAvailability;
  });

  // Pagination
  const indexOfLastCandidate = currentPage * candidatesPerPage;
  const indexOfFirstCandidate = indexOfLastCandidate - candidatesPerPage;
  const currentCandidates = filteredCandidates.slice(indexOfFirstCandidate, indexOfLastCandidate);
  const totalPages = Math.ceil(filteredCandidates.length / candidatesPerPage);

  // Handlers
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handleFilterChange = (field, value) => {
    setFilters({ ...filters, [field]: value });
    setCurrentPage(1);
  };

  const handleSaveSearch = () => {
    const searchName = prompt('Enter a name for this search:');
    if (searchName) {
      const newSearch = {
        id: savedSearches.length + 1,
        name: searchName,
        query: searchQuery,
        filters: { ...filters }
      };
      setSavedSearches([...savedSearches, newSearch]);
      toast.success('Search saved successfully!');
    }
  };

  const handleLoadSearch = (search) => {
    setSearchQuery(search.query);
    setFilters(search.filters);
    setCurrentPage(1);
    toast.success(`Loaded search: ${search.name}`);
  };

  const handleViewProfile = (candidate) => {
    setSelectedCandidate(candidate);
    setShowProfileModal(true);
  };

  const handleDownloadResume = (candidate) => {
    toast.success(`Downloading resume: ${candidate.resume}`);
  };

  const handleSendInvitation = (candidate) => {
    toast.success(`Job invitation sent to ${candidate.name}`);
  };

  const handleAddToFolder = (candidate) => {
    toast.success(`${candidate.name} added to folder`);
  };

  const toggleCandidateSelection = (candidateId) => {
    setSelectedCandidates(prev => 
      prev.includes(candidateId) 
        ? prev.filter(id => id !== candidateId)
        : [...prev, candidateId]
    );
  };

  const handleBulkAction = (action) => {
    if (selectedCandidates.length === 0) {
      toast.warning('Please select candidates first');
      return;
    }

    switch(action) {
      case 'folder':
        toast.success(`${selectedCandidates.length} candidates added to folder`);
        break;
      case 'invite':
        toast.success(`Job invitations sent to ${selectedCandidates.length} candidates`);
        break;
      case 'export':
        toast.success(`Exporting ${selectedCandidates.length} candidates...`);
        break;
      default:
        break;
    }
    setSelectedCandidates([]);
  };

  const clearFilters = () => {
    setFilters({
      location: '',
      minExperience: '',
      maxExperience: '',
      skills: '',
      education: '',
      availability: '',
      salary: ''
    });
    setSearchQuery('');
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Candidate Search</h1>
        <p className="text-gray-600">Search and discover qualified candidates for your positions</p>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex gap-4 mb-4">
          <div className="flex-grow relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, title, or skills (e.g., React AND TypeScript)"
              value={searchQuery}
              onChange={handleSearch}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          <button
            onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
            className={`px-6 py-3 rounded-lg font-medium flex items-center gap-2 ${
              showAdvancedFilters 
                ? 'bg-primary-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <FaFilter />
            Filters
          </button>
          <button
            onClick={handleSaveSearch}
            className="px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 flex items-center gap-2"
          >
            <FaSave />
            Save Search
          </button>
        </div>

        {/* Advanced Filters */}
        {showAdvancedFilters && (
          <div className="border-t pt-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location
                </label>
                <input
                  type="text"
                  placeholder="City, State"
                  value={filters.location}
                  onChange={(e) => handleFilterChange('location', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Min Experience (years)
                </label>
                <input
                  type="number"
                  placeholder="0"
                  value={filters.minExperience}
                  onChange={(e) => handleFilterChange('minExperience', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Max Experience (years)
                </label>
                <input
                  type="number"
                  placeholder="20"
                  value={filters.maxExperience}
                  onChange={(e) => handleFilterChange('maxExperience', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Skills (comma-separated)
                </label>
                <input
                  type="text"
                  placeholder="React, Node.js, Python"
                  value={filters.skills}
                  onChange={(e) => handleFilterChange('skills', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Education
                </label>
                <select
                  value={filters.education}
                  onChange={(e) => handleFilterChange('education', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                >
                  <option value="">Any</option>
                  <option value="bachelor">Bachelor's Degree</option>
                  <option value="master">Master's Degree</option>
                  <option value="phd">PhD</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Availability
                </label>
                <select
                  value={filters.availability}
                  onChange={(e) => handleFilterChange('availability', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                >
                  <option value="">Any</option>
                  <option value="immediate">Immediate</option>
                  <option value="2 weeks">Within 2 weeks</option>
                  <option value="1 month">Within 1 month</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={clearFilters}
                className="px-4 py-2 text-gray-700 hover:text-gray-900 font-medium"
              >
                Clear All Filters
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Saved Searches */}
      {savedSearches.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Saved Searches</h3>
          <div className="flex flex-wrap gap-2">
            {savedSearches.map(search => (
              <button
                key={search.id}
                onClick={() => handleLoadSearch(search)}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 flex items-center gap-2"
              >
                <FaBookmark className="text-primary-600" />
                {search.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Results Header */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-gray-600">
              Found <span className="font-semibold text-gray-900">{filteredCandidates.length}</span> candidates
            </p>
          </div>
          
          {selectedCandidates.length > 0 && (
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-600">
                {selectedCandidates.length} selected
              </span>
              <button
                onClick={() => handleBulkAction('folder')}
                className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700"
              >
                Add to Folder
              </button>
              <button
                onClick={() => handleBulkAction('invite')}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700"
              >
                Send Invitation
              </button>
              <button
                onClick={() => handleBulkAction('export')}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg text-sm hover:bg-gray-700"
              >
                Export
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Candidate Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {currentCandidates.map(candidate => (
          <div
            key={candidate.id}
            className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6 relative"
          >
            {/* Checkbox */}
            <input
              type="checkbox"
              checked={selectedCandidates.includes(candidate.id)}
              onChange={() => toggleCandidateSelection(candidate.id)}
              className="absolute top-4 left-4 w-4 h-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />

            {/* Match Score Badge */}
            <div className="absolute top-4 right-4">
              <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-1 rounded-full">
                {candidate.matchScore}% Match
              </span>
            </div>

            {/* Candidate Info */}
            <div className="mt-6">
              <h3 className="text-lg font-bold text-gray-900 mb-1">{candidate.name}</h3>
              <p className="text-primary-600 font-medium mb-2">{candidate.title}</p>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <FaMapMarkerAlt className="mr-2 text-gray-400" />
                  {candidate.location}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <FaBriefcase className="mr-2 text-gray-400" />
                  {candidate.experience} years experience at {candidate.currentCompany}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <FaGraduationCap className="mr-2 text-gray-400" />
                  {candidate.education}
                </div>
              </div>

              {/* Skills */}
              <div className="mb-4">
                <div className="flex flex-wrap gap-2">
                  {candidate.skills.slice(0, 4).map((skill, index) => (
                    <span
                      key={index}
                      className="bg-blue-50 text-blue-700 text-xs font-medium px-2.5 py-1 rounded"
                    >
                      {skill}
                    </span>
                  ))}
                  {candidate.skills.length > 4 && (
                    <span className="bg-gray-100 text-gray-700 text-xs font-medium px-2.5 py-1 rounded">
                      +{candidate.skills.length - 4} more
                    </span>
                  )}
                </div>
              </div>

              {/* Rating and Status */}
              <div className="flex items-center justify-between mb-4 pb-4 border-b">
                <div className="flex items-center gap-1">
                  <FaStar className="text-yellow-400" />
                  <span className="text-sm font-semibold text-gray-900">{candidate.rating}</span>
                </div>
                <div className="text-xs text-gray-500">
                  Active {candidate.lastActive}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => handleViewProfile(candidate)}
                  className="px-4 py-2 bg-primary-600 text-white rounded-lg text-sm hover:bg-primary-700 flex items-center justify-center gap-2"
                >
                  <FaEye />
                  View Profile
                </button>
                <button
                  onClick={() => handleDownloadResume(candidate)}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200 flex items-center justify-center gap-2"
                >
                  <FaDownload />
                  Resume
                </button>
              </div>
              
              <button
                onClick={() => handleSendInvitation(candidate)}
                className="w-full mt-2 px-4 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700 flex items-center justify-center gap-2"
              >
                <FaPaperPlane />
                Send Job Invitation
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredCandidates.length === 0 && (
        <div className="bg-white rounded-lg shadow-sm p-12 text-center">
          <FaSearch className="mx-auto text-gray-400 text-5xl mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No candidates found</h3>
          <p className="text-gray-600">Try adjusting your search criteria or filters</p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex justify-center items-center gap-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index + 1}
                onClick={() => setCurrentPage(index + 1)}
                className={`px-4 py-2 rounded-lg ${
                  currentPage === index + 1
                    ? 'bg-primary-600 text-white'
                    : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                {index + 1}
              </button>
            ))}
            
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Candidate Profile Modal */}
      {showProfileModal && selectedCandidate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{selectedCandidate.name}</h2>
                <p className="text-primary-600 font-medium">{selectedCandidate.title}</p>
              </div>
              <button
                onClick={() => setShowProfileModal(false)}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                ×
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              {/* Match Score */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-green-900 mb-1">
                      {selectedCandidate.matchScore}% Match Score
                    </h3>
                    <p className="text-sm text-green-700">
                      Highly qualified for your requirements
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={i < Math.floor(selectedCandidate.rating) ? 'text-yellow-400' : 'text-gray-300'}
                      />
                    ))}
                    <span className="ml-2 text-lg font-semibold text-gray-900">
                      {selectedCandidate.rating}
                    </span>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-lg">
                  <FaEnvelope className="text-primary-600 text-xl" />
                  <div>
                    <p className="text-xs text-gray-600">Email</p>
                    <p className="font-medium text-gray-900">{selectedCandidate.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-lg">
                  <FaPhone className="text-primary-600 text-xl" />
                  <div>
                    <p className="text-xs text-gray-600">Phone</p>
                    <p className="font-medium text-gray-900">{selectedCandidate.phone}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-lg">
                  <FaMapMarkerAlt className="text-primary-600 text-xl" />
                  <div>
                    <p className="text-xs text-gray-600">Location</p>
                    <p className="font-medium text-gray-900">{selectedCandidate.location}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-lg">
                  <FaBriefcase className="text-primary-600 text-xl" />
                  <div>
                    <p className="text-xs text-gray-600">Availability</p>
                    <p className="font-medium text-gray-900">{selectedCandidate.availability}</p>
                  </div>
                </div>
              </div>

              {/* Summary */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Professional Summary</h3>
                <p className="text-gray-700 leading-relaxed">{selectedCandidate.summary}</p>
              </div>

              {/* Work History */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Work History</h3>
                <div className="space-y-3">
                  {selectedCandidate.workHistory.map((work, index) => (
                    <div key={index} className="flex items-start gap-3 bg-gray-50 p-4 rounded-lg">
                      <FaBriefcase className="text-primary-600 mt-1" />
                      <div>
                        <h4 className="font-semibold text-gray-900">{work.role}</h4>
                        <p className="text-gray-700">{work.company}</p>
                        <p className="text-sm text-gray-600">{work.duration}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Skills */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedCandidate.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-800 px-3 py-1.5 rounded-full text-sm font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Similar Candidates */}
              <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-blue-900 mb-2">Similar Candidates</h3>
                <p className="text-sm text-blue-700 mb-3">
                  Found 8 similar candidates with matching skills and experience
                </p>
                <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                  View Similar Candidates →
                </button>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-4 gap-3">
                <button
                  onClick={() => {
                    handleSendInvitation(selectedCandidate);
                    setShowProfileModal(false);
                  }}
                  className="px-4 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 font-medium flex items-center justify-center gap-2"
                >
                  <FaPaperPlane />
                  Send Invitation
                </button>
                <button
                  onClick={() => {
                    handleAddToFolder(selectedCandidate);
                  }}
                  className="px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium flex items-center justify-center gap-2"
                >
                  <FaBookmark />
                  Add to Folder
                </button>
                <button
                  onClick={() => handleDownloadResume(selectedCandidate)}
                  className="px-4 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 font-medium flex items-center justify-center gap-2"
                >
                  <FaDownload />
                  Download Resume
                </button>
                <button
                  className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
                >
                  Add Notes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CandidateSearch;
