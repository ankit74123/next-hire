import { useState } from 'react';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaCamera, FaSave } from 'react-icons/fa';
import { toast } from 'react-toastify';

const BasicInfo = () => {
  const [formData, setFormData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    headline: 'Senior Full Stack Developer',
    objective: 'Experienced developer seeking challenging opportunities in web development...',
    employmentStatus: 'employed',
    noticePeriod: '30',
  });

  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }

    // Auto-save after 1 second of no typing
    clearTimeout(window.autoSaveTimer);
    window.autoSaveTimer = setTimeout(() => {
      autoSave();
    }, 1000);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size should be less than 5MB');
        return;
      }

      if (!file.type.startsWith('image/')) {
        toast.error('Please upload an image file');
        return;
      }

      setProfileImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }

    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
    }

    if (!formData.headline.trim()) {
      newErrors.headline = 'Professional headline is required';
    }

    if (!formData.objective.trim()) {
      newErrors.objective = 'Career objective is required';
    } else if (formData.objective.length < 50) {
      newErrors.objective = 'Career objective should be at least 50 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const autoSave = () => {
    // Simulate auto-save
    console.log('Auto-saving...', formData);
    toast.success('Changes saved automatically', { autoClose: 1000 });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      toast.error('Please fix all errors before saving');
      return;
    }

    setIsSaving(true);

    try {
      // TODO: API call to save data
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success('Profile updated successfully!');
    } catch (error) {
      toast.error('Failed to update profile');
    } finally {
      setIsSaving(false);
    }
  };

  const completionPercentage = () => {
    let completed = 0;
    const totalFields = 9;

    if (formData.firstName) completed++;
    if (formData.lastName) completed++;
    if (formData.email) completed++;
    if (formData.phone) completed++;
    if (formData.location) completed++;
    if (formData.headline) completed++;
    if (formData.objective && formData.objective.length >= 50) completed++;
    if (formData.employmentStatus) completed++;
    if (profileImage || imagePreview) completed++;

    return Math.round((completed / totalFields) * 100);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Basic Information</h1>
          <p className="text-gray-600">Tell us about yourself</p>
        </div>

        {/* Completion Progress */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-gray-700">Profile Completion</span>
            <span className="text-sm font-semibold text-primary-600">
              {completionPercentage()}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-primary-600 h-3 rounded-full transition-all duration-500"
              style={{ width: `${completionPercentage()}%` }}
            ></div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-8">
          {/* Profile Photo */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-4">
              Profile Photo
            </label>
            <div className="flex items-center space-x-6">
              <div className="relative">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Profile"
                    className="w-32 h-32 rounded-full object-cover border-4 border-gray-200"
                  />
                ) : (
                  <div className="w-32 h-32 rounded-full bg-primary-100 flex items-center justify-center text-4xl font-bold text-primary-600 border-4 border-gray-200">
                    {formData.firstName[0]}
                    {formData.lastName[0]}
                  </div>
                )}
                <label
                  htmlFor="profile-photo"
                  className="absolute bottom-0 right-0 bg-primary-600 text-white p-3 rounded-full cursor-pointer hover:bg-primary-700 transition shadow-lg"
                >
                  <FaCamera />
                </label>
                <input
                  id="profile-photo"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-2">
                  Upload a professional photo (Max 5MB)
                </p>
                <p className="text-xs text-gray-500">
                  Supported formats: JPG, PNG, GIF
                </p>
              </div>
            </div>
          </div>

          {/* Personal Details */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Details</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {/* First Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  First Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-3 border ${
                      errors.firstName ? 'border-red-500' : 'border-gray-300'
                    } rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent`}
                    placeholder="Enter first name"
                  />
                </div>
                {errors.firstName && (
                  <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
                )}
              </div>

              {/* Last Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-3 border ${
                      errors.lastName ? 'border-red-500' : 'border-gray-300'
                    } rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent`}
                    placeholder="Enter last name"
                  />
                </div>
                {errors.lastName && (
                  <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-3 border ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    } rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent`}
                    placeholder="your.email@example.com"
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-3 border ${
                      errors.phone ? 'border-red-500' : 'border-gray-300'
                    } rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent`}
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                )}
              </div>

              {/* Location */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-3 border ${
                      errors.location ? 'border-red-500' : 'border-gray-300'
                    } rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent`}
                    placeholder="City, State/Country"
                  />
                </div>
                {errors.location && (
                  <p className="text-red-500 text-sm mt-1">{errors.location}</p>
                )}
              </div>
            </div>
          </div>

          {/* Professional Details */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Professional Details
            </h3>

            {/* Resume Headline */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Professional Headline <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="headline"
                value={formData.headline}
                onChange={handleChange}
                className={`w-full px-4 py-3 border ${
                  errors.headline ? 'border-red-500' : 'border-gray-300'
                } rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent`}
                placeholder="e.g., Senior Full Stack Developer"
                maxLength={100}
              />
              <div className="flex justify-between mt-1">
                {errors.headline ? (
                  <p className="text-red-500 text-sm">{errors.headline}</p>
                ) : (
                  <p className="text-gray-500 text-sm">
                    Your professional title or role
                  </p>
                )}
                <p className="text-gray-400 text-sm">
                  {formData.headline.length}/100
                </p>
              </div>
            </div>

            {/* Career Objective */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Career Objective <span className="text-red-500">*</span>
              </label>
              <textarea
                name="objective"
                value={formData.objective}
                onChange={handleChange}
                rows={5}
                className={`w-full px-4 py-3 border ${
                  errors.objective ? 'border-red-500' : 'border-gray-300'
                } rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none`}
                placeholder="Write a brief summary about your career goals and what you're looking for..."
                maxLength={500}
              />
              <div className="flex justify-between mt-1">
                {errors.objective ? (
                  <p className="text-red-500 text-sm">{errors.objective}</p>
                ) : (
                  <p className="text-gray-500 text-sm">
                    Minimum 50 characters
                  </p>
                )}
                <p className="text-gray-400 text-sm">
                  {formData.objective.length}/500
                </p>
              </div>
            </div>

            {/* Employment Status */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Employment Status <span className="text-red-500">*</span>
                </label>
                <select
                  name="employmentStatus"
                  value={formData.employmentStatus}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="employed">Currently Employed</option>
                  <option value="unemployed">Unemployed</option>
                  <option value="student">Student</option>
                  <option value="freelancer">Freelancer</option>
                </select>
              </div>

              {/* Notice Period */}
              {formData.employmentStatus === 'employed' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Notice Period (Days)
                  </label>
                  <select
                    name="noticePeriod"
                    value={formData.noticePeriod}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="0">Immediate</option>
                    <option value="15">15 Days</option>
                    <option value="30">30 Days</option>
                    <option value="60">60 Days</option>
                    <option value="90">90 Days</option>
                  </select>
                </div>
              )}
            </div>
          </div>

          {/* Auto-save indicator */}
          <div className="mb-6">
            <p className="text-sm text-gray-500 italic flex items-center">
              <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
              Changes are saved automatically
            </p>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSaving ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Saving...
                </>
              ) : (
                <>
                  <FaSave className="mr-2" />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BasicInfo;
