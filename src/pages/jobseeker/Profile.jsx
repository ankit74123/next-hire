import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaUser, 
  FaBriefcase, 
  FaGraduationCap, 
  FaCertificate,
  FaTools,
  FaFileAlt,
  FaEdit
} from 'react-icons/fa';

const Profile = () => {
  const [activeSection, setActiveSection] = useState('basic');

  const profileSections = [
    { id: 'basic', label: 'Basic Information', icon: <FaUser /> },
    { id: 'experience', label: 'Work Experience', icon: <FaBriefcase /> },
    { id: 'education', label: 'Education', icon: <FaGraduationCap /> },
    { id: 'skills', label: 'Skills', icon: <FaTools /> },
    { id: 'certifications', label: 'Certifications', icon: <FaCertificate /> },
    { id: 'resume', label: 'Resume', icon: <FaFileAlt /> },
  ];

  // Sample profile data
  const profile = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    headline: 'Senior Full Stack Developer',
    summary: 'Experienced developer with 5+ years in building scalable web applications...',
    experience: [
      {
        id: 1,
        title: 'Senior Developer',
        company: 'Tech Corp',
        location: 'San Francisco, CA',
        startDate: 'Jan 2021',
        endDate: 'Present',
        current: true,
        description: 'Leading development of React-based applications...',
      },
      {
        id: 2,
        title: 'Full Stack Developer',
        company: 'StartUp Inc',
        location: 'Remote',
        startDate: 'Jun 2019',
        endDate: 'Dec 2020',
        current: false,
        description: 'Developed and maintained multiple web applications...',
      },
    ],
    education: [
      {
        id: 1,
        degree: 'Bachelor of Science in Computer Science',
        institution: 'University of California',
        location: 'Berkeley, CA',
        year: '2019',
        gpa: '3.8/4.0',
      },
    ],
    skills: [
      'React.js',
      'Node.js',
      'JavaScript',
      'TypeScript',
      'Python',
      'MongoDB',
      'PostgreSQL',
      'AWS',
      'Docker',
      'Git',
    ],
    certifications: [
      {
        id: 1,
        name: 'AWS Certified Solutions Architect',
        issuer: 'Amazon Web Services',
        date: 'Jan 2023',
        credentialId: 'ABC123',
      },
    ],
  };

  const profileCompletion = 75;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Profile</h1>
          <p className="text-gray-600">Manage your profile information</p>
        </div>

        {/* Profile Completion */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Profile Completion: {profileCompletion}%
              </h3>
              <p className="text-sm text-gray-600">
                Complete your profile to increase visibility to recruiters
              </p>
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-primary-600 h-3 rounded-full transition-all"
              style={{ width: `${profileCompletion}%` }}
            ></div>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-4 sticky top-24">
              <nav className="space-y-2">
                {profileSections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center px-4 py-3 rounded-lg transition ${
                      activeSection === section.id
                        ? 'bg-primary-600 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <span className="mr-3">{section.icon}</span>
                    <span className="font-medium">{section.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Basic Information */}
            {activeSection === 'basic' && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Basic Information</h2>
                  <Link 
                    to="/dashboard/profile/basic-info"
                    className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg flex items-center transition"
                  >
                    <FaEdit className="mr-2" />
                    Edit
                  </Link>
                </div>

                <div className="space-y-6">
                  {/* Profile Photo */}
                  <div className="flex items-center">
                    <div className="w-24 h-24 rounded-full bg-primary-100 flex items-center justify-center text-3xl font-bold text-primary-600 mr-6">
                      JD
                    </div>
                    <div>
                      <button className="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg text-sm font-medium transition">
                        Change Photo
                      </button>
                    </div>
                  </div>

                  {/* Fields */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name
                      </label>
                      <p className="text-gray-900">{profile.name}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email
                      </label>
                      <p className="text-gray-900">{profile.email}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone
                      </label>
                      <p className="text-gray-900">{profile.phone}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Location
                      </label>
                      <p className="text-gray-900">{profile.location}</p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Professional Headline
                    </label>
                    <p className="text-gray-900">{profile.headline}</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Professional Summary
                    </label>
                    <p className="text-gray-900">{profile.summary}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Work Experience */}
            {activeSection === 'experience' && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Work Experience</h2>
                  <Link 
                    to="/dashboard/profile/work-experience"
                    className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg transition"
                  >
                    + Add Experience
                  </Link>
                </div>

                <div className="space-y-6">
                  {profile.experience.map((exp) => (
                    <div key={exp.id} className="border border-gray-200 rounded-lg p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{exp.title}</h3>
                          <p className="text-gray-700 font-medium">{exp.company}</p>
                          <p className="text-sm text-gray-600">{exp.location}</p>
                          <p className="text-sm text-gray-500 mt-1">
                            {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                          </p>
                        </div>
                        <button className="text-primary-600 hover:text-primary-700">
                          <FaEdit />
                        </button>
                      </div>
                      <p className="text-gray-700">{exp.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Education */}
            {activeSection === 'education' && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Education</h2>
                  <Link 
                    to="/dashboard/profile/education"
                    className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg transition"
                  >
                    + Add Education
                  </Link>
                </div>

                <div className="space-y-6">
                  {profile.education.map((edu) => (
                    <div key={edu.id} className="border border-gray-200 rounded-lg p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{edu.degree}</h3>
                          <p className="text-gray-700 font-medium">{edu.institution}</p>
                          <p className="text-sm text-gray-600">{edu.location}</p>
                          <p className="text-sm text-gray-500 mt-1">
                            Graduated {edu.year} • GPA: {edu.gpa}
                          </p>
                        </div>
                        <button className="text-primary-600 hover:text-primary-700">
                          <FaEdit />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Skills */}
            {activeSection === 'skills' && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Skills</h2>
                  <Link
                    to="/dashboard/profile/skills"
                    className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg transition"
                  >
                    + Add Skill
                  </Link>
                </div>

                <div className="flex flex-wrap gap-3">
                  {profile.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-primary-100 text-primary-700 px-4 py-2 rounded-full font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Certifications */}
            {activeSection === 'certifications' && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Certifications</h2>
                  <Link
                    to="/dashboard/profile/additional-info"
                    className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg transition"
                  >
                    + Add Certification
                  </Link>
                </div>

                <div className="space-y-6">
                  {profile.certifications.map((cert) => (
                    <div key={cert.id} className="border border-gray-200 rounded-lg p-6">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{cert.name}</h3>
                          <p className="text-gray-700 font-medium">{cert.issuer}</p>
                          <p className="text-sm text-gray-500 mt-1">
                            Issued {cert.date} • Credential ID: {cert.credentialId}
                          </p>
                        </div>
                        <button className="text-primary-600 hover:text-primary-700">
                          <FaEdit />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Resume */}
            {activeSection === 'resume' && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Resume</h2>
                
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
                  <FaFileAlt className="text-6xl text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">Upload your resume (PDF, DOC, DOCX)</p>
                  <Link
                    to="/dashboard/profile/resume"
                    className="inline-block bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-lg transition"
                  >
                    Upload Resume
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
