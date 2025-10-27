import { useState } from 'react';
import {
  FaFileUpload,
  FaFilePdf,
  FaFileWord,
  FaDownload,
  FaEye,
  FaTrash,
  FaToggleOn,
  FaToggleOff,
} from 'react-icons/fa';
import { toast } from 'react-toastify';

const ResumeManagement = () => {
  const [uploadedResume, setUploadedResume] = useState(null);
  const [resumeVisibility, setResumeVisibility] = useState(true);
  const [showPreview, setShowPreview] = useState(false);

  // Sample profile data for preview
  const profileData = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    headline: 'Senior Full Stack Developer',
    objective:
      'Experienced software developer with 5+ years of expertise in building scalable web applications using modern technologies.',
    experience: [
      {
        title: 'Senior Full Stack Developer',
        company: 'Tech Corp',
        location: 'San Francisco, CA',
        duration: 'Jan 2021 - Present',
        description:
          'Led development of multiple web applications using React and Node.js. Managed a team of 5 developers.',
        skills: ['React', 'Node.js', 'MongoDB', 'AWS'],
      },
    ],
    education: [
      {
        degree: 'Bachelor of Technology',
        specialization: 'Computer Science Engineering',
        institution: 'MIT University',
        year: '2017 - 2021',
        grade: '8.5 CGPA',
      },
    ],
    skills: {
      technical: ['React', 'Node.js', 'Python', 'AWS'],
      soft: ['Communication', 'Leadership', 'Problem Solving'],
    },
    certifications: [
      {
        name: 'AWS Certified Solutions Architect',
        organization: 'Amazon Web Services',
        year: '2024',
      },
    ],
    projects: [
      {
        title: 'E-commerce Platform',
        description:
          'Built a full-stack e-commerce platform with React, Node.js, and MongoDB',
        technologies: ['React', 'Node.js', 'MongoDB'],
      },
    ],
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ];

    if (!allowedTypes.includes(file.type)) {
      toast.error('Please upload a PDF or Word document');
      return;
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('File size should not exceed 5MB');
      return;
    }

    setUploadedResume({
      name: file.name,
      size: (file.size / 1024).toFixed(2) + ' KB',
      type: file.type,
      uploadDate: new Date().toLocaleDateString(),
    });

    toast.success('Resume uploaded successfully!');
  };

  const handleDeleteResume = () => {
    if (window.confirm('Are you sure you want to delete this resume?')) {
      setUploadedResume(null);
      toast.success('Resume deleted successfully!');
    }
  };

  const handleDownloadResume = () => {
    toast.info('Download functionality will be implemented with backend');
  };

  const getFileIcon = (type) => {
    if (type?.includes('pdf')) {
      return <FaFilePdf className="text-red-500 text-5xl" />;
    }
    return <FaFileWord className="text-blue-500 text-5xl" />;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Resume Management</h1>
          <p className="text-gray-600">
            Upload your resume or preview your profile-generated resume
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <div>
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Upload Resume</h2>

              {!uploadedResume ? (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-primary-500 transition">
                  <FaFileUpload className="text-6xl text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Upload Your Resume
                  </h3>
                  <p className="text-gray-600 mb-6">
                    PDF or Word document (Max 5MB)
                  </p>
                  <label className="inline-block cursor-pointer">
                    <span className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-medium transition">
                      Choose File
                    </span>
                    <input
                      type="file"
                      onChange={handleFileUpload}
                      accept=".pdf,.doc,.docx"
                      className="hidden"
                    />
                  </label>
                </div>
              ) : (
                <div className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center">
                      {getFileIcon(uploadedResume.type)}
                      <div className="ml-4">
                        <h4 className="font-semibold text-gray-900 mb-1">
                          {uploadedResume.name}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {uploadedResume.size} • Uploaded on {uploadedResume.uploadDate}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-3">
                    <button
                      onClick={handleDownloadResume}
                      className="flex-1 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg flex items-center justify-center transition"
                    >
                      <FaDownload className="mr-2" />
                      Download
                    </button>
                    <button
                      onClick={handleDeleteResume}
                      className="px-4 py-2 border border-red-300 text-red-600 hover:bg-red-50 rounded-lg flex items-center transition"
                    >
                      <FaTrash className="mr-2" />
                      Delete
                    </button>
                  </div>

                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <label className="cursor-pointer text-primary-600 hover:text-primary-700 font-medium flex items-center justify-center">
                      <FaFileUpload className="mr-2" />
                      Replace Resume
                      <input
                        type="file"
                        onChange={handleFileUpload}
                        accept=".pdf,.doc,.docx"
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
              )}

              {/* Resume Visibility Settings */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Resume Visibility
                </h3>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">Make resume visible to recruiters</p>
                    <p className="text-sm text-gray-600 mt-1">
                      Recruiters can view and download your resume
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setResumeVisibility(!resumeVisibility);
                      toast.success(
                        `Resume visibility ${!resumeVisibility ? 'enabled' : 'disabled'}`
                      );
                    }}
                    className={`text-4xl ${
                      resumeVisibility ? 'text-primary-600' : 'text-gray-400'
                    }`}
                  >
                    {resumeVisibility ? <FaToggleOn /> : <FaToggleOff />}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Preview Section */}
          <div>
            <div className="bg-white rounded-lg shadow-md p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Resume Preview</h2>
                <button
                  onClick={() => setShowPreview(!showPreview)}
                  className="text-primary-600 hover:text-primary-700 flex items-center font-medium"
                >
                  <FaEye className="mr-2" />
                  {showPreview ? 'Hide' : 'Show'} Preview
                </button>
              </div>

              {showPreview ? (
                <div className="border border-gray-200 rounded-lg p-6 max-h-[600px] overflow-y-auto">
                  {/* Resume Preview Content */}
                  <div className="space-y-6">
                    {/* Header */}
                    <div className="text-center pb-6 border-b-2 border-gray-800">
                      <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        {profileData.name}
                      </h1>
                      <p className="text-lg text-gray-700 mb-3">{profileData.headline}</p>
                      <div className="flex justify-center space-x-4 text-sm text-gray-600">
                        <span>{profileData.email}</span>
                        <span>•</span>
                        <span>{profileData.phone}</span>
                        <span>•</span>
                        <span>{profileData.location}</span>
                      </div>
                    </div>

                    {/* Objective */}
                    <div>
                      <h2 className="text-lg font-bold text-gray-900 mb-2 uppercase tracking-wide border-b border-gray-300 pb-1">
                        Career Objective
                      </h2>
                      <p className="text-gray-700 text-sm">{profileData.objective}</p>
                    </div>

                    {/* Experience */}
                    <div>
                      <h2 className="text-lg font-bold text-gray-900 mb-3 uppercase tracking-wide border-b border-gray-300 pb-1">
                        Work Experience
                      </h2>
                      {profileData.experience.map((exp, index) => (
                        <div key={index} className="mb-4">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h3 className="font-semibold text-gray-900">{exp.title}</h3>
                              <p className="text-gray-700 text-sm">
                                {exp.company}, {exp.location}
                              </p>
                            </div>
                            <span className="text-sm text-gray-600">{exp.duration}</span>
                          </div>
                          <p className="text-gray-700 text-sm mb-2">{exp.description}</p>
                          <div className="flex flex-wrap gap-2">
                            {exp.skills.map((skill, idx) => (
                              <span
                                key={idx}
                                className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Education */}
                    <div>
                      <h2 className="text-lg font-bold text-gray-900 mb-3 uppercase tracking-wide border-b border-gray-300 pb-1">
                        Education
                      </h2>
                      {profileData.education.map((edu, index) => (
                        <div key={index} className="mb-3">
                          <h3 className="font-semibold text-gray-900">
                            {edu.degree} - {edu.specialization}
                          </h3>
                          <p className="text-gray-700 text-sm">{edu.institution}</p>
                          <p className="text-sm text-gray-600">
                            {edu.year} • {edu.grade}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Skills */}
                    <div>
                      <h2 className="text-lg font-bold text-gray-900 mb-3 uppercase tracking-wide border-b border-gray-300 pb-1">
                        Skills
                      </h2>
                      <div className="mb-3">
                        <p className="font-semibold text-gray-900 text-sm mb-2">
                          Technical Skills:
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {profileData.skills.technical.map((skill, index) => (
                            <span
                              key={index}
                              className="text-sm bg-gray-200 text-gray-700 px-3 py-1 rounded"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 text-sm mb-2">Soft Skills:</p>
                        <div className="flex flex-wrap gap-2">
                          {profileData.skills.soft.map((skill, index) => (
                            <span
                              key={index}
                              className="text-sm bg-gray-200 text-gray-700 px-3 py-1 rounded"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Projects */}
                    <div>
                      <h2 className="text-lg font-bold text-gray-900 mb-3 uppercase tracking-wide border-b border-gray-300 pb-1">
                        Projects
                      </h2>
                      {profileData.projects.map((project, index) => (
                        <div key={index} className="mb-3">
                          <h3 className="font-semibold text-gray-900">{project.title}</h3>
                          <p className="text-gray-700 text-sm mb-2">{project.description}</p>
                          <div className="flex flex-wrap gap-2">
                            {project.technologies.map((tech, idx) => (
                              <span
                                key={idx}
                                className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Certifications */}
                    <div>
                      <h2 className="text-lg font-bold text-gray-900 mb-3 uppercase tracking-wide border-b border-gray-300 pb-1">
                        Certifications
                      </h2>
                      {profileData.certifications.map((cert, index) => (
                        <div key={index} className="mb-2">
                          <h3 className="font-semibold text-gray-900 text-sm">{cert.name}</h3>
                          <p className="text-gray-700 text-sm">
                            {cert.organization} • {cert.year}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
                  <FaEye className="text-6xl text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">
                    Click "Show Preview" to see your profile-generated resume
                  </p>
                </div>
              )}

              {showPreview && (
                <div className="mt-6">
                  <button
                    onClick={handleDownloadResume}
                    className="w-full bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-medium flex items-center justify-center transition"
                  >
                    <FaDownload className="mr-2" />
                    Download as PDF
                  </button>
                  <p className="text-sm text-gray-500 text-center mt-2">
                    PDF download functionality will be implemented with backend
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeManagement;
