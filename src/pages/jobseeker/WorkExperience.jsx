import { useState } from 'react';
import { FaBriefcase, FaPlus, FaEdit, FaTrash, FaSave, FaTimes } from 'react-icons/fa';
import { toast } from 'react-toastify';

const WorkExperience = () => {
  const [experiences, setExperiences] = useState([
    {
      id: 1,
      title: 'Senior Full Stack Developer',
      company: 'Tech Corp',
      location: 'San Francisco, CA',
      startMonth: '01',
      startYear: '2021',
      endMonth: '12',
      endYear: '2024',
      currentlyWorking: false,
      description: 'Led development of multiple web applications using React and Node.js. Managed a team of 5 developers.',
      skills: ['React', 'Node.js', 'MongoDB', 'AWS'],
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    startMonth: '',
    startYear: '',
    endMonth: '',
    endYear: '',
    currentlyWorking: false,
    description: '',
    skills: [],
  });
  const [skillInput, setSkillInput] = useState('');
  const [errors, setErrors] = useState({});

  const months = [
    { value: '01', label: 'January' },
    { value: '02', label: 'February' },
    { value: '03', label: 'March' },
    { value: '04', label: 'April' },
    { value: '05', label: 'May' },
    { value: '06', label: 'June' },
    { value: '07', label: 'July' },
    { value: '08', label: 'August' },
    { value: '09', label: 'September' },
    { value: '10', label: 'October' },
    { value: '11', label: 'November' },
    { value: '12', label: 'December' },
  ];

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 50 }, (_, i) => currentYear - i);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleAddSkill = () => {
    if (skillInput.trim() && !formData.skills.includes(skillInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        skills: [...prev.skills, skillInput.trim()],
      }));
      setSkillInput('');
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill !== skillToRemove),
    }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Job title is required';
    }

    if (!formData.company.trim()) {
      newErrors.company = 'Company name is required';
    }

    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
    }

    if (!formData.startMonth || !formData.startYear) {
      newErrors.startDate = 'Start date is required';
    }

    if (!formData.currentlyWorking && (!formData.endMonth || !formData.endYear)) {
      newErrors.endDate = 'End date is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Job description is required';
    } else if (formData.description.length < 50) {
      newErrors.description = 'Description should be at least 50 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) {
      toast.error('Please fix all errors');
      return;
    }

    if (editingId) {
      // Update existing experience
      setExperiences((prev) =>
        prev.map((exp) =>
          exp.id === editingId ? { ...formData, id: editingId } : exp
        )
      );
      toast.success('Experience updated successfully!');
    } else {
      // Add new experience
      const newExperience = {
        ...formData,
        id: Date.now(),
      };
      setExperiences((prev) => [...prev, newExperience]);
      toast.success('Experience added successfully!');
    }

    resetForm();
  };

  const handleEdit = (experience) => {
    setFormData(experience);
    setEditingId(experience.id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this experience?')) {
      setExperiences((prev) => prev.filter((exp) => exp.id !== id));
      toast.success('Experience deleted successfully!');
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      company: '',
      location: '',
      startMonth: '',
      startYear: '',
      endMonth: '',
      endYear: '',
      currentlyWorking: false,
      description: '',
      skills: [],
    });
    setSkillInput('');
    setErrors({});
    setEditingId(null);
    setShowForm(false);
  };

  const formatDate = (month, year) => {
    const monthName = months.find((m) => m.value === month)?.label || '';
    return `${monthName} ${year}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Work Experience</h1>
          <p className="text-gray-600">Add your professional work experience</p>
        </div>

        {/* Add New Button */}
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="mb-8 bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-medium flex items-center transition"
          >
            <FaPlus className="mr-2" />
            Add Work Experience
          </button>
        )}

        {/* Form */}
        {showForm && (
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {editingId ? 'Edit Experience' : 'Add New Experience'}
              </h2>
              <button
                onClick={resetForm}
                className="text-gray-500 hover:text-gray-700"
              >
                <FaTimes className="text-2xl" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Job Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Job Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border ${
                    errors.title ? 'border-red-500' : 'border-gray-300'
                  } rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent`}
                  placeholder="e.g., Senior Software Engineer"
                />
                {errors.title && (
                  <p className="text-red-500 text-sm mt-1">{errors.title}</p>
                )}
              </div>

              {/* Company and Location */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Company Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border ${
                      errors.company ? 'border-red-500' : 'border-gray-300'
                    } rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent`}
                    placeholder="Company name"
                  />
                  {errors.company && (
                    <p className="text-red-500 text-sm mt-1">{errors.company}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border ${
                      errors.location ? 'border-red-500' : 'border-gray-300'
                    } rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent`}
                    placeholder="City, State/Country"
                  />
                  {errors.location && (
                    <p className="text-red-500 text-sm mt-1">{errors.location}</p>
                  )}
                </div>
              </div>

              {/* Start Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Start Date <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <select
                    name="startMonth"
                    value={formData.startMonth}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="">Select Month</option>
                    {months.map((month) => (
                      <option key={month.value} value={month.value}>
                        {month.label}
                      </option>
                    ))}
                  </select>
                  <select
                    name="startYear"
                    value={formData.startYear}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="">Select Year</option>
                    {years.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                </div>
                {errors.startDate && (
                  <p className="text-red-500 text-sm mt-1">{errors.startDate}</p>
                )}
              </div>

              {/* Currently Working Checkbox */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="currentlyWorking"
                  checked={formData.currentlyWorking}
                  onChange={handleChange}
                  className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                />
                <label className="ml-2 text-sm text-gray-700">
                  I currently work here
                </label>
              </div>

              {/* End Date */}
              {!formData.currentlyWorking && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    End Date <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <select
                      name="endMonth"
                      value={formData.endMonth}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="">Select Month</option>
                      {months.map((month) => (
                        <option key={month.value} value={month.value}>
                          {month.label}
                        </option>
                      ))}
                    </select>
                    <select
                      name="endYear"
                      value={formData.endYear}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="">Select Year</option>
                      {years.map((year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                  </div>
                  {errors.endDate && (
                    <p className="text-red-500 text-sm mt-1">{errors.endDate}</p>
                  )}
                </div>
              )}

              {/* Job Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Job Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={6}
                  className={`w-full px-4 py-3 border ${
                    errors.description ? 'border-red-500' : 'border-gray-300'
                  } rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none`}
                  placeholder="Describe your responsibilities, achievements, and key contributions..."
                  maxLength={1000}
                />
                <div className="flex justify-between mt-1">
                  {errors.description ? (
                    <p className="text-red-500 text-sm">{errors.description}</p>
                  ) : (
                    <p className="text-gray-500 text-sm">Minimum 50 characters</p>
                  )}
                  <p className="text-gray-400 text-sm">
                    {formData.description.length}/1000
                  </p>
                </div>
              </div>

              {/* Skills Used */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Skills Used
                </label>
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddSkill();
                      }
                    }}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Type a skill and press Enter"
                  />
                  <button
                    type="button"
                    onClick={handleAddSkill}
                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-medium flex items-center"
                    >
                      {skill}
                      <button
                        type="button"
                        onClick={() => handleRemoveSkill(skill)}
                        className="ml-2 text-primary-900 hover:text-red-600"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex justify-end space-x-4 pt-4">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium flex items-center transition"
                >
                  <FaSave className="mr-2" />
                  {editingId ? 'Update' : 'Save'} Experience
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Experience List */}
        <div className="space-y-6">
          {experiences.map((experience) => (
            <div
              key={experience.id}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">
                    {experience.title}
                  </h3>
                  <p className="text-lg text-gray-700 font-medium mb-1">
                    {experience.company}
                  </p>
                  <p className="text-sm text-gray-600 mb-2">
                    📍 {experience.location}
                  </p>
                  <p className="text-sm text-gray-500">
                    {formatDate(experience.startMonth, experience.startYear)} -{' '}
                    {experience.currentlyWorking
                      ? 'Present'
                      : formatDate(experience.endMonth, experience.endYear)}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(experience)}
                    className="p-2 text-primary-600 hover:bg-primary-50 rounded-lg transition"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(experience.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>

              <p className="text-gray-700 mb-4 whitespace-pre-line">
                {experience.description}
              </p>

              {experience.skills.length > 0 && (
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">
                    Skills Used:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {experience.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}

          {experiences.length === 0 && !showForm && (
            <div className="bg-white rounded-lg shadow-md p-12 text-center">
              <FaBriefcase className="text-6xl text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600 mb-4">No work experience added yet</p>
              <button
                onClick={() => setShowForm(true)}
                className="text-primary-600 hover:text-primary-700 font-medium"
              >
                Add your first experience
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WorkExperience;
