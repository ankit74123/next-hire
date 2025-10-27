import { useState } from 'react';
import {
  FaProjectDiagram,
  FaCertificate,
  FaTrophy,
  FaLink,
  FaPlus,
  FaEdit,
  FaTrash,
  FaSave,
  FaTimes,
  FaGithub,
  FaLinkedin,
  FaGlobe,
  FaHeart,
} from 'react-icons/fa';
import { toast } from 'react-toastify';

const AdditionalInfo = () => {
  const [activeTab, setActiveTab] = useState('projects');

  // Projects State
  const [projects, setProjects] = useState([
    {
      id: 1,
      title: 'E-commerce Platform',
      description: 'Built a full-stack e-commerce platform with React, Node.js, and MongoDB',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      link: 'https://github.com/username/ecommerce',
      startDate: '2024-01',
      endDate: '2024-06',
    },
  ]);

  // Certifications State
  const [certifications, setCertifications] = useState([
    {
      id: 1,
      name: 'AWS Certified Solutions Architect',
      organization: 'Amazon Web Services',
      issueDate: '2024-03',
      expiryDate: '2027-03',
      credentialId: 'ABC123XYZ',
      credentialUrl: 'https://aws.amazon.com/verify',
    },
  ]);

  // Awards State
  const [awards, setAwards] = useState([
    {
      id: 1,
      title: 'Best Innovation Award',
      organization: 'Tech Conference 2024',
      date: '2024-05',
      description: 'Awarded for innovative solution in AI/ML domain',
    },
  ]);

  // Portfolio Links State
  const [portfolioLinks, setPortfolioLinks] = useState([
    { id: 1, platform: 'GitHub', url: 'https://github.com/username', icon: 'FaGithub' },
    { id: 2, platform: 'LinkedIn', url: 'https://linkedin.com/in/username', icon: 'FaLinkedin' },
  ]);

  // Hobbies State
  const [hobbies, setHobbies] = useState(['Photography', 'Reading', 'Traveling', 'Coding']);

  // Form States
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [showCertificationForm, setShowCertificationForm] = useState(false);
  const [showAwardForm, setShowAwardForm] = useState(false);
  const [showPortfolioForm, setShowPortfolioForm] = useState(false);
  const [hobbyInput, setHobbyInput] = useState('');

  const [editingProjectId, setEditingProjectId] = useState(null);
  const [editingCertificationId, setEditingCertificationId] = useState(null);
  const [editingAwardId, setEditingAwardId] = useState(null);
  const [editingPortfolioId, setEditingPortfolioId] = useState(null);

  const [projectFormData, setProjectFormData] = useState({
    title: '',
    description: '',
    technologies: [],
    link: '',
    startDate: '',
    endDate: '',
  });

  const [certificationFormData, setCertificationFormData] = useState({
    name: '',
    organization: '',
    issueDate: '',
    expiryDate: '',
    credentialId: '',
    credentialUrl: '',
  });

  const [awardFormData, setAwardFormData] = useState({
    title: '',
    organization: '',
    date: '',
    description: '',
  });

  const [portfolioFormData, setPortfolioFormData] = useState({
    platform: 'GitHub',
    url: '',
    icon: 'FaGithub',
  });

  const [techInput, setTechInput] = useState('');

  const portfolioPlatforms = [
    { name: 'GitHub', icon: 'FaGithub' },
    { name: 'LinkedIn', icon: 'FaLinkedin' },
    { name: 'Portfolio Website', icon: 'FaGlobe' },
    { name: 'Behance', icon: 'FaGlobe' },
    { name: 'Dribbble', icon: 'FaGlobe' },
    { name: 'Other', icon: 'FaLink' },
  ];

  // Project Handlers
  const handleProjectSubmit = (e) => {
    e.preventDefault();
    if (!projectFormData.title.trim() || !projectFormData.description.trim()) {
      toast.error('Title and description are required');
      return;
    }

    if (editingProjectId) {
      setProjects((prev) =>
        prev.map((proj) =>
          proj.id === editingProjectId ? { ...projectFormData, id: editingProjectId } : proj
        )
      );
      toast.success('Project updated successfully!');
    } else {
      setProjects((prev) => [...prev, { ...projectFormData, id: Date.now() }]);
      toast.success('Project added successfully!');
    }
    resetProjectForm();
  };

  const handleAddTechnology = () => {
    if (techInput.trim() && !projectFormData.technologies.includes(techInput.trim())) {
      setProjectFormData((prev) => ({
        ...prev,
        technologies: [...prev.technologies, techInput.trim()],
      }));
      setTechInput('');
    }
  };

  const handleRemoveTechnology = (tech) => {
    setProjectFormData((prev) => ({
      ...prev,
      technologies: prev.technologies.filter((t) => t !== tech),
    }));
  };

  const resetProjectForm = () => {
    setProjectFormData({
      title: '',
      description: '',
      technologies: [],
      link: '',
      startDate: '',
      endDate: '',
    });
    setTechInput('');
    setEditingProjectId(null);
    setShowProjectForm(false);
  };

  // Certification Handlers
  const handleCertificationSubmit = (e) => {
    e.preventDefault();
    if (!certificationFormData.name.trim() || !certificationFormData.organization.trim()) {
      toast.error('Name and organization are required');
      return;
    }

    if (editingCertificationId) {
      setCertifications((prev) =>
        prev.map((cert) =>
          cert.id === editingCertificationId
            ? { ...certificationFormData, id: editingCertificationId }
            : cert
        )
      );
      toast.success('Certification updated successfully!');
    } else {
      setCertifications((prev) => [...prev, { ...certificationFormData, id: Date.now() }]);
      toast.success('Certification added successfully!');
    }
    resetCertificationForm();
  };

  const resetCertificationForm = () => {
    setCertificationFormData({
      name: '',
      organization: '',
      issueDate: '',
      expiryDate: '',
      credentialId: '',
      credentialUrl: '',
    });
    setEditingCertificationId(null);
    setShowCertificationForm(false);
  };

  // Award Handlers
  const handleAwardSubmit = (e) => {
    e.preventDefault();
    if (!awardFormData.title.trim()) {
      toast.error('Award title is required');
      return;
    }

    if (editingAwardId) {
      setAwards((prev) =>
        prev.map((award) =>
          award.id === editingAwardId ? { ...awardFormData, id: editingAwardId } : award
        )
      );
      toast.success('Award updated successfully!');
    } else {
      setAwards((prev) => [...prev, { ...awardFormData, id: Date.now() }]);
      toast.success('Award added successfully!');
    }
    resetAwardForm();
  };

  const resetAwardForm = () => {
    setAwardFormData({
      title: '',
      organization: '',
      date: '',
      description: '',
    });
    setEditingAwardId(null);
    setShowAwardForm(false);
  };

  // Portfolio Handlers
  const handlePortfolioSubmit = (e) => {
    e.preventDefault();
    if (!portfolioFormData.url.trim()) {
      toast.error('URL is required');
      return;
    }

    if (editingPortfolioId) {
      setPortfolioLinks((prev) =>
        prev.map((link) =>
          link.id === editingPortfolioId ? { ...portfolioFormData, id: editingPortfolioId } : link
        )
      );
      toast.success('Portfolio link updated successfully!');
    } else {
      setPortfolioLinks((prev) => [...prev, { ...portfolioFormData, id: Date.now() }]);
      toast.success('Portfolio link added successfully!');
    }
    resetPortfolioForm();
  };

  const resetPortfolioForm = () => {
    setPortfolioFormData({
      platform: 'GitHub',
      url: '',
      icon: 'FaGithub',
    });
    setEditingPortfolioId(null);
    setShowPortfolioForm(false);
  };

  // Hobbies Handlers
  const handleAddHobby = () => {
    if (hobbyInput.trim() && !hobbies.includes(hobbyInput.trim())) {
      setHobbies((prev) => [...prev, hobbyInput.trim()]);
      setHobbyInput('');
      toast.success('Hobby added!');
    }
  };

  const handleRemoveHobby = (hobby) => {
    setHobbies((prev) => prev.filter((h) => h !== hobby));
    toast.success('Hobby removed!');
  };

  const getIcon = (iconName) => {
    const icons = {
      FaGithub: <FaGithub className="text-2xl" />,
      FaLinkedin: <FaLinkedin className="text-2xl" />,
      FaGlobe: <FaGlobe className="text-2xl" />,
      FaLink: <FaLink className="text-2xl" />,
    };
    return icons[iconName] || <FaLink className="text-2xl" />;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Additional Information</h1>
          <p className="text-gray-600">
            Add projects, certifications, awards, and portfolio links
          </p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-md mb-8">
          <div className="flex border-b overflow-x-auto">
            {[
              { id: 'projects', label: 'Projects', icon: <FaProjectDiagram /> },
              { id: 'certifications', label: 'Certifications', icon: <FaCertificate /> },
              { id: 'awards', label: 'Awards', icon: <FaTrophy /> },
              { id: 'portfolio', label: 'Portfolio', icon: <FaLink /> },
              { id: 'hobbies', label: 'Hobbies', icon: <FaHeart /> },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-6 py-4 font-medium whitespace-nowrap transition ${
                  activeTab === tab.id
                    ? 'text-primary-600 border-b-2 border-primary-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Tab */}
        {activeTab === 'projects' && (
          <div>
            {!showProjectForm && (
              <button
                onClick={() => setShowProjectForm(true)}
                className="mb-6 bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-medium flex items-center transition"
              >
                <FaPlus className="mr-2" />
                Add Project
              </button>
            )}

            {showProjectForm && (
              <div className="bg-white rounded-lg shadow-md p-8 mb-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900">
                    {editingProjectId ? 'Edit Project' : 'Add New Project'}
                  </h3>
                  <button onClick={resetProjectForm} className="text-gray-500 hover:text-gray-700">
                    <FaTimes className="text-2xl" />
                  </button>
                </div>

                <form onSubmit={handleProjectSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Project Title <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={projectFormData.title}
                      onChange={(e) =>
                        setProjectFormData((prev) => ({ ...prev, title: e.target.value }))
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                      placeholder="e.g., E-commerce Platform"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      value={projectFormData.description}
                      onChange={(e) =>
                        setProjectFormData((prev) => ({ ...prev, description: e.target.value }))
                      }
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 resize-none"
                      placeholder="Describe your project, key features, and your role..."
                      maxLength={500}
                    />
                    <p className="text-gray-400 text-sm text-right mt-1">
                      {projectFormData.description.length}/500
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Technologies Used
                    </label>
                    <div className="flex gap-2 mb-3">
                      <input
                        type="text"
                        value={techInput}
                        onChange={(e) => setTechInput(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleAddTechnology();
                          }
                        }}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                        placeholder="e.g., React, Node.js"
                      />
                      <button
                        type="button"
                        onClick={handleAddTechnology}
                        className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg"
                      >
                        Add
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {projectFormData.technologies.map((tech, index) => (
                        <span
                          key={index}
                          className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm flex items-center"
                        >
                          {tech}
                          <button
                            type="button"
                            onClick={() => handleRemoveTechnology(tech)}
                            className="ml-2 text-primary-900 hover:text-red-600"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Project Link (GitHub, Live URL, etc.)
                    </label>
                    <input
                      type="url"
                      value={projectFormData.link}
                      onChange={(e) =>
                        setProjectFormData((prev) => ({ ...prev, link: e.target.value }))
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                      placeholder="https://"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Start Date
                      </label>
                      <input
                        type="month"
                        value={projectFormData.startDate}
                        onChange={(e) =>
                          setProjectFormData((prev) => ({ ...prev, startDate: e.target.value }))
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        End Date (Leave empty if ongoing)
                      </label>
                      <input
                        type="month"
                        value={projectFormData.endDate}
                        onChange={(e) =>
                          setProjectFormData((prev) => ({ ...prev, endDate: e.target.value }))
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end space-x-4 pt-4">
                    <button
                      type="button"
                      onClick={resetProjectForm}
                      className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg flex items-center"
                    >
                      <FaSave className="mr-2" />
                      {editingProjectId ? 'Update' : 'Save'} Project
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Projects List */}
            <div className="space-y-6">
              {projects.map((project) => (
                <div key={project.id} className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {project.title}
                      </h3>
                      <p className="text-gray-700 mb-3">{project.description}</p>
                      {project.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-3">
                          {project.technologies.map((tech, index) => (
                            <span
                              key={index}
                              className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary-600 hover:text-primary-700 text-sm flex items-center mb-2"
                        >
                          <FaLink className="mr-1" />
                          View Project
                        </a>
                      )}
                      <p className="text-sm text-gray-500">
                        {project.startDate} - {project.endDate || 'Present'}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => {
                          setProjectFormData(project);
                          setEditingProjectId(project.id);
                          setShowProjectForm(true);
                        }}
                        className="p-2 text-primary-600 hover:bg-primary-50 rounded-lg"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm('Delete this project?')) {
                            setProjects((prev) => prev.filter((p) => p.id !== project.id));
                            toast.success('Project deleted!');
                          }
                        }}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Certifications Tab */}
        {activeTab === 'certifications' && (
          <div>
            {!showCertificationForm && (
              <button
                onClick={() => setShowCertificationForm(true)}
                className="mb-6 bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-medium flex items-center transition"
              >
                <FaPlus className="mr-2" />
                Add Certification
              </button>
            )}

            {showCertificationForm && (
              <div className="bg-white rounded-lg shadow-md p-8 mb-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900">
                    {editingCertificationId ? 'Edit Certification' : 'Add New Certification'}
                  </h3>
                  <button
                    onClick={resetCertificationForm}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <FaTimes className="text-2xl" />
                  </button>
                </div>

                <form onSubmit={handleCertificationSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Certification Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={certificationFormData.name}
                      onChange={(e) =>
                        setCertificationFormData((prev) => ({ ...prev, name: e.target.value }))
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                      placeholder="e.g., AWS Certified Solutions Architect"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Issuing Organization <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={certificationFormData.organization}
                      onChange={(e) =>
                        setCertificationFormData((prev) => ({
                          ...prev,
                          organization: e.target.value,
                        }))
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                      placeholder="e.g., Amazon Web Services"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Issue Date
                      </label>
                      <input
                        type="month"
                        value={certificationFormData.issueDate}
                        onChange={(e) =>
                          setCertificationFormData((prev) => ({
                            ...prev,
                            issueDate: e.target.value,
                          }))
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Expiry Date (if applicable)
                      </label>
                      <input
                        type="month"
                        value={certificationFormData.expiryDate}
                        onChange={(e) =>
                          setCertificationFormData((prev) => ({
                            ...prev,
                            expiryDate: e.target.value,
                          }))
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Credential ID
                    </label>
                    <input
                      type="text"
                      value={certificationFormData.credentialId}
                      onChange={(e) =>
                        setCertificationFormData((prev) => ({
                          ...prev,
                          credentialId: e.target.value,
                        }))
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                      placeholder="Certificate number or ID"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Credential URL
                    </label>
                    <input
                      type="url"
                      value={certificationFormData.credentialUrl}
                      onChange={(e) =>
                        setCertificationFormData((prev) => ({
                          ...prev,
                          credentialUrl: e.target.value,
                        }))
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                      placeholder="https://"
                    />
                  </div>

                  <div className="flex justify-end space-x-4 pt-4">
                    <button
                      type="button"
                      onClick={resetCertificationForm}
                      className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg flex items-center"
                    >
                      <FaSave className="mr-2" />
                      {editingCertificationId ? 'Update' : 'Save'} Certification
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Certifications List */}
            <div className="space-y-6">
              {certifications.map((cert) => (
                <div key={cert.id} className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{cert.name}</h3>
                      <p className="text-gray-700 font-medium mb-2">{cert.organization}</p>
                      <p className="text-sm text-gray-600 mb-2">
                        Issued: {cert.issueDate}
                        {cert.expiryDate && ` • Expires: ${cert.expiryDate}`}
                      </p>
                      {cert.credentialId && (
                        <p className="text-sm text-gray-600 mb-2">
                          Credential ID: {cert.credentialId}
                        </p>
                      )}
                      {cert.credentialUrl && (
                        <a
                          href={cert.credentialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary-600 hover:text-primary-700 text-sm flex items-center"
                        >
                          <FaLink className="mr-1" />
                          View Credential
                        </a>
                      )}
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => {
                          setCertificationFormData(cert);
                          setEditingCertificationId(cert.id);
                          setShowCertificationForm(true);
                        }}
                        className="p-2 text-primary-600 hover:bg-primary-50 rounded-lg"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm('Delete this certification?')) {
                            setCertifications((prev) => prev.filter((c) => c.id !== cert.id));
                            toast.success('Certification deleted!');
                          }
                        }}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Awards Tab */}
        {activeTab === 'awards' && (
          <div>
            {!showAwardForm && (
              <button
                onClick={() => setShowAwardForm(true)}
                className="mb-6 bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-medium flex items-center transition"
              >
                <FaPlus className="mr-2" />
                Add Award
              </button>
            )}

            {showAwardForm && (
              <div className="bg-white rounded-lg shadow-md p-8 mb-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900">
                    {editingAwardId ? 'Edit Award' : 'Add New Award'}
                  </h3>
                  <button onClick={resetAwardForm} className="text-gray-500 hover:text-gray-700">
                    <FaTimes className="text-2xl" />
                  </button>
                </div>

                <form onSubmit={handleAwardSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Award Title <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={awardFormData.title}
                      onChange={(e) =>
                        setAwardFormData((prev) => ({ ...prev, title: e.target.value }))
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                      placeholder="e.g., Best Innovation Award"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Issuing Organization
                    </label>
                    <input
                      type="text"
                      value={awardFormData.organization}
                      onChange={(e) =>
                        setAwardFormData((prev) => ({ ...prev, organization: e.target.value }))
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                      placeholder="e.g., Tech Conference 2024"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                    <input
                      type="month"
                      value={awardFormData.date}
                      onChange={(e) =>
                        setAwardFormData((prev) => ({ ...prev, date: e.target.value }))
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      value={awardFormData.description}
                      onChange={(e) =>
                        setAwardFormData((prev) => ({ ...prev, description: e.target.value }))
                      }
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 resize-none"
                      placeholder="Describe what the award was for..."
                      maxLength={300}
                    />
                    <p className="text-gray-400 text-sm text-right mt-1">
                      {awardFormData.description.length}/300
                    </p>
                  </div>

                  <div className="flex justify-end space-x-4 pt-4">
                    <button
                      type="button"
                      onClick={resetAwardForm}
                      className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg flex items-center"
                    >
                      <FaSave className="mr-2" />
                      {editingAwardId ? 'Update' : 'Save'} Award
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Awards List */}
            <div className="space-y-6">
              {awards.map((award) => (
                <div key={award.id} className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <FaTrophy className="text-yellow-500 text-2xl mr-3" />
                        <h3 className="text-xl font-semibold text-gray-900">{award.title}</h3>
                      </div>
                      {award.organization && (
                        <p className="text-gray-700 font-medium mb-2">{award.organization}</p>
                      )}
                      {award.date && <p className="text-sm text-gray-600 mb-2">{award.date}</p>}
                      {award.description && (
                        <p className="text-gray-700 mt-3">{award.description}</p>
                      )}
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => {
                          setAwardFormData(award);
                          setEditingAwardId(award.id);
                          setShowAwardForm(true);
                        }}
                        className="p-2 text-primary-600 hover:bg-primary-50 rounded-lg"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm('Delete this award?')) {
                            setAwards((prev) => prev.filter((a) => a.id !== award.id));
                            toast.success('Award deleted!');
                          }
                        }}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Portfolio Tab */}
        {activeTab === 'portfolio' && (
          <div>
            {!showPortfolioForm && (
              <button
                onClick={() => setShowPortfolioForm(true)}
                className="mb-6 bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-medium flex items-center transition"
              >
                <FaPlus className="mr-2" />
                Add Portfolio Link
              </button>
            )}

            {showPortfolioForm && (
              <div className="bg-white rounded-lg shadow-md p-8 mb-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900">
                    {editingPortfolioId ? 'Edit Portfolio Link' : 'Add Portfolio Link'}
                  </h3>
                  <button
                    onClick={resetPortfolioForm}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <FaTimes className="text-2xl" />
                  </button>
                </div>

                <form onSubmit={handlePortfolioSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Platform
                    </label>
                    <select
                      value={portfolioFormData.platform}
                      onChange={(e) => {
                        const selected = portfolioPlatforms.find((p) => p.name === e.target.value);
                        setPortfolioFormData((prev) => ({
                          ...prev,
                          platform: e.target.value,
                          icon: selected?.icon || 'FaLink',
                        }));
                      }}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    >
                      {portfolioPlatforms.map((platform) => (
                        <option key={platform.name} value={platform.name}>
                          {platform.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      URL <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="url"
                      value={portfolioFormData.url}
                      onChange={(e) =>
                        setPortfolioFormData((prev) => ({ ...prev, url: e.target.value }))
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                      placeholder="https://"
                    />
                  </div>

                  <div className="flex justify-end space-x-4 pt-4">
                    <button
                      type="button"
                      onClick={resetPortfolioForm}
                      className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg flex items-center"
                    >
                      <FaSave className="mr-2" />
                      {editingPortfolioId ? 'Update' : 'Save'} Link
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Portfolio Links List */}
            <div className="grid md:grid-cols-2 gap-6">
              {portfolioLinks.map((link) => (
                <div key={link.id} className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center flex-1">
                      <div className="text-primary-600 mr-4">{getIcon(link.icon)}</div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 mb-1">{link.platform}</h4>
                        <a
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-primary-600 hover:text-primary-700 break-all"
                        >
                          {link.url}
                        </a>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => {
                          setPortfolioFormData(link);
                          setEditingPortfolioId(link.id);
                          setShowPortfolioForm(true);
                        }}
                        className="p-2 text-primary-600 hover:bg-primary-50 rounded-lg"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm('Delete this link?')) {
                            setPortfolioLinks((prev) => prev.filter((l) => l.id !== link.id));
                            toast.success('Link deleted!');
                          }
                        }}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Hobbies Tab */}
        {activeTab === 'hobbies' && (
          <div>
            <div className="bg-white rounded-lg shadow-md p-8 mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Add Hobbies & Interests</h3>
              <div className="flex gap-2 mb-6">
                <input
                  type="text"
                  value={hobbyInput}
                  onChange={(e) => setHobbyInput(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddHobby();
                    }
                  }}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  placeholder="e.g., Photography, Reading, Traveling"
                />
                <button
                  onClick={handleAddHobby}
                  className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg flex items-center"
                >
                  <FaPlus className="mr-2" />
                  Add
                </button>
              </div>

              <div className="flex flex-wrap gap-3">
                {hobbies.map((hobby, index) => (
                  <span
                    key={index}
                    className="bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-medium flex items-center"
                  >
                    <FaHeart className="mr-2" />
                    {hobby}
                    <button
                      onClick={() => handleRemoveHobby(hobby)}
                      className="ml-3 text-primary-900 hover:text-red-600 text-lg"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>

              {hobbies.length === 0 && (
                <p className="text-gray-500 text-center py-8">
                  No hobbies added yet. Add your interests above.
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdditionalInfo;
