import { useState } from 'react';
import { FaGraduationCap, FaPlus, FaEdit, FaTrash, FaSave, FaTimes } from 'react-icons/fa';
import { toast } from 'react-toastify';

const Education = () => {
  const [educationList, setEducationList] = useState([
    {
      id: 1,
      degree: 'Bachelor of Technology',
      specialization: 'Computer Science Engineering',
      institution: 'MIT University',
      location: 'Cambridge, MA',
      startYear: '2017',
      endYear: '2021',
      currentlyStudying: false,
      grade: '8.5',
      gradeType: 'CGPA',
      achievements: 'Published 2 research papers, Won inter-college coding competition',
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    degree: '',
    specialization: '',
    institution: '',
    location: '',
    startYear: '',
    endYear: '',
    currentlyStudying: false,
    grade: '',
    gradeType: 'CGPA',
    achievements: '',
  });
  const [errors, setErrors] = useState({});

  const degrees = [
    'High School',
    'Diploma',
    'Associate Degree',
    'Bachelor of Technology (B.Tech)',
    'Bachelor of Engineering (B.E.)',
    'Bachelor of Science (B.Sc)',
    'Bachelor of Arts (B.A.)',
    'Bachelor of Commerce (B.Com)',
    'Bachelor of Business Administration (BBA)',
    'Master of Technology (M.Tech)',
    'Master of Engineering (M.E.)',
    'Master of Science (M.Sc)',
    'Master of Arts (M.A.)',
    'Master of Commerce (M.Com)',
    'Master of Business Administration (MBA)',
    'Doctor of Philosophy (Ph.D.)',
    'Other',
  ];

  const gradeTypes = ['CGPA', 'Percentage', 'GPA'];

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

  const validate = () => {
    const newErrors = {};

    if (!formData.degree) {
      newErrors.degree = 'Degree is required';
    }

    if (!formData.specialization.trim()) {
      newErrors.specialization = 'Specialization/Stream is required';
    }

    if (!formData.institution.trim()) {
      newErrors.institution = 'Institution name is required';
    }

    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
    }

    if (!formData.startYear) {
      newErrors.startYear = 'Start year is required';
    }

    if (!formData.currentlyStudying && !formData.endYear) {
      newErrors.endYear = 'End year is required';
    }

    if (!formData.grade.trim()) {
      newErrors.grade = 'Grade/Score is required';
    } else {
      const gradeValue = parseFloat(formData.grade);
      if (isNaN(gradeValue)) {
        newErrors.grade = 'Grade must be a number';
      } else if (formData.gradeType === 'CGPA' && (gradeValue < 0 || gradeValue > 10)) {
        newErrors.grade = 'CGPA must be between 0 and 10';
      } else if (formData.gradeType === 'Percentage' && (gradeValue < 0 || gradeValue > 100)) {
        newErrors.grade = 'Percentage must be between 0 and 100';
      } else if (formData.gradeType === 'GPA' && (gradeValue < 0 || gradeValue > 4)) {
        newErrors.grade = 'GPA must be between 0 and 4';
      }
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
      // Update existing education
      setEducationList((prev) =>
        prev.map((edu) =>
          edu.id === editingId ? { ...formData, id: editingId } : edu
        )
      );
      toast.success('Education updated successfully!');
    } else {
      // Add new education
      const newEducation = {
        ...formData,
        id: Date.now(),
      };
      setEducationList((prev) => [...prev, newEducation]);
      toast.success('Education added successfully!');
    }

    resetForm();
  };

  const handleEdit = (education) => {
    setFormData(education);
    setEditingId(education.id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this education record?')) {
      setEducationList((prev) => prev.filter((edu) => edu.id !== id));
      toast.success('Education deleted successfully!');
    }
  };

  const resetForm = () => {
    setFormData({
      degree: '',
      specialization: '',
      institution: '',
      location: '',
      startYear: '',
      endYear: '',
      currentlyStudying: false,
      grade: '',
      gradeType: 'CGPA',
      achievements: '',
    });
    setErrors({});
    setEditingId(null);
    setShowForm(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Education</h1>
          <p className="text-gray-600">Add your educational qualifications</p>
        </div>

        {/* Add New Button */}
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="mb-8 bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-medium flex items-center transition"
          >
            <FaPlus className="mr-2" />
            Add Education
          </button>
        )}

        {/* Form */}
        {showForm && (
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {editingId ? 'Edit Education' : 'Add New Education'}
              </h2>
              <button
                onClick={resetForm}
                className="text-gray-500 hover:text-gray-700"
              >
                <FaTimes className="text-2xl" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Degree */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Degree <span className="text-red-500">*</span>
                </label>
                <select
                  name="degree"
                  value={formData.degree}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border ${
                    errors.degree ? 'border-red-500' : 'border-gray-300'
                  } rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent`}
                >
                  <option value="">Select Degree</option>
                  {degrees.map((degree) => (
                    <option key={degree} value={degree}>
                      {degree}
                    </option>
                  ))}
                </select>
                {errors.degree && (
                  <p className="text-red-500 text-sm mt-1">{errors.degree}</p>
                )}
              </div>

              {/* Specialization */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Specialization/Stream <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="specialization"
                  value={formData.specialization}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border ${
                    errors.specialization ? 'border-red-500' : 'border-gray-300'
                  } rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent`}
                  placeholder="e.g., Computer Science, Electronics, Commerce"
                />
                {errors.specialization && (
                  <p className="text-red-500 text-sm mt-1">{errors.specialization}</p>
                )}
              </div>

              {/* Institution and Location */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Institution Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="institution"
                    value={formData.institution}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border ${
                      errors.institution ? 'border-red-500' : 'border-gray-300'
                    } rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent`}
                    placeholder="University/College name"
                  />
                  {errors.institution && (
                    <p className="text-red-500 text-sm mt-1">{errors.institution}</p>
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

              {/* Duration */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Start Year <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="startYear"
                    value={formData.startYear}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border ${
                      errors.startYear ? 'border-red-500' : 'border-gray-300'
                    } rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent`}
                  >
                    <option value="">Select Year</option>
                    {years.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                  {errors.startYear && (
                    <p className="text-red-500 text-sm mt-1">{errors.startYear}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    End Year {!formData.currentlyStudying && <span className="text-red-500">*</span>}
                  </label>
                  <select
                    name="endYear"
                    value={formData.endYear}
                    onChange={handleChange}
                    disabled={formData.currentlyStudying}
                    className={`w-full px-4 py-3 border ${
                      errors.endYear ? 'border-red-500' : 'border-gray-300'
                    } rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                      formData.currentlyStudying ? 'bg-gray-100' : ''
                    }`}
                  >
                    <option value="">Select Year</option>
                    {years.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                  {errors.endYear && (
                    <p className="text-red-500 text-sm mt-1">{errors.endYear}</p>
                  )}
                </div>
              </div>

              {/* Currently Studying Checkbox */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="currentlyStudying"
                  checked={formData.currentlyStudying}
                  onChange={handleChange}
                  className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                />
                <label className="ml-2 text-sm text-gray-700">
                  I am currently studying here
                </label>
              </div>

              {/* Grade */}
              <div className="grid md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Grade/Score <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="grade"
                    value={formData.grade}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border ${
                      errors.grade ? 'border-red-500' : 'border-gray-300'
                    } rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent`}
                    placeholder="e.g., 8.5, 85, 3.5"
                  />
                  {errors.grade && (
                    <p className="text-red-500 text-sm mt-1">{errors.grade}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Grade Type
                  </label>
                  <select
                    name="gradeType"
                    value={formData.gradeType}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    {gradeTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Achievements */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Achievements (Optional)
                </label>
                <textarea
                  name="achievements"
                  value={formData.achievements}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                  placeholder="Awards, honors, publications, projects, or any other notable achievements during this education..."
                  maxLength={500}
                />
                <p className="text-gray-400 text-sm text-right mt-1">
                  {formData.achievements.length}/500
                </p>
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
                  {editingId ? 'Update' : 'Save'} Education
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Education List */}
        <div className="space-y-6">
          {educationList
            .sort((a, b) => {
              // Sort by start year descending (most recent first)
              return parseInt(b.startYear) - parseInt(a.startYear);
            })
            .map((education) => (
              <div
                key={education.id}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">
                      {education.degree}
                    </h3>
                    <p className="text-lg text-gray-700 font-medium mb-1">
                      {education.specialization}
                    </p>
                    <p className="text-base text-gray-600 mb-1">
                      {education.institution}
                    </p>
                    <p className="text-sm text-gray-600 mb-2">
                      📍 {education.location}
                    </p>
                    <div className="flex items-center text-sm text-gray-500 space-x-4">
                      <span>
                        📅 {education.startYear} -{' '}
                        {education.currentlyStudying ? 'Present' : education.endYear}
                      </span>
                      <span>
                        🎓 {education.grade} {education.gradeType}
                      </span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(education)}
                      className="p-2 text-primary-600 hover:bg-primary-50 rounded-lg transition"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(education.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>

                {education.achievements && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <p className="text-sm font-medium text-gray-700 mb-2">
                      Achievements:
                    </p>
                    <p className="text-gray-700 whitespace-pre-line">
                      {education.achievements}
                    </p>
                  </div>
                )}
              </div>
            ))}

          {educationList.length === 0 && !showForm && (
            <div className="bg-white rounded-lg shadow-md p-12 text-center">
              <FaGraduationCap className="text-6xl text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600 mb-4">No education records added yet</p>
              <button
                onClick={() => setShowForm(true)}
                className="text-primary-600 hover:text-primary-700 font-medium"
              >
                Add your first education
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Education;
