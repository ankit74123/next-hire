import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaBriefcase, 
  FaMapMarkerAlt, 
  FaDollarSign, 
  FaCheckCircle,
  FaArrowLeft,
  FaArrowRight,
  FaSave,
  FaEye
} from 'react-icons/fa';
import { toast } from 'react-toastify';

const PostJob = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 7;

  const [formData, setFormData] = useState({
    // Step 1: Basic Details
    jobTitle: '',
    department: '',
    employmentType: 'Full-time',
    numberOfOpenings: 1,
    
    // Step 2: Job Description
    jobDescription: '',
    responsibilities: '',
    
    // Step 3: Requirements
    requiredSkills: [],
    skillInput: '',
    minExperience: '',
    maxExperience: '',
    education: 'Bachelor\'s Degree',
    
    // Step 4: Location and Work Mode
    location: '',
    workMode: 'On-site',
    
    // Step 5: Salary and Benefits
    salaryMin: '',
    salaryMax: '',
    currency: 'USD',
    salaryPeriod: 'Year',
    benefits: [],
    benefitInput: '',
    
    // Step 6: Screening Questions
    screeningQuestions: [],
    questionText: '',
    
    // Step 7: Posting Options
    jobDuration: '30',
    isPremium: false,
    isFeatured: false,
    isUrgent: false
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const addSkill = () => {
    if (formData.skillInput.trim()) {
      setFormData(prev => ({
        ...prev,
        requiredSkills: [...prev.requiredSkills, prev.skillInput.trim()],
        skillInput: ''
      }));
    }
  };

  const removeSkill = (index) => {
    setFormData(prev => ({
      ...prev,
      requiredSkills: prev.requiredSkills.filter((_, i) => i !== index)
    }));
  };

  const addBenefit = () => {
    if (formData.benefitInput.trim()) {
      setFormData(prev => ({
        ...prev,
        benefits: [...prev.benefits, prev.benefitInput.trim()],
        benefitInput: ''
      }));
    }
  };

  const removeBenefit = (index) => {
    setFormData(prev => ({
      ...prev,
      benefits: prev.benefits.filter((_, i) => i !== index)
    }));
  };

  const addScreeningQuestion = () => {
    if (formData.questionText.trim()) {
      setFormData(prev => ({
        ...prev,
        screeningQuestions: [...prev.screeningQuestions, { 
          id: Date.now(), 
          question: prev.questionText.trim(),
          required: true 
        }],
        questionText: ''
      }));
    }
  };

  const removeScreeningQuestion = (id) => {
    setFormData(prev => ({
      ...prev,
      screeningQuestions: prev.screeningQuestions.filter(q => q.id !== id)
    }));
  };

  const validateStep = (step) => {
    const newErrors = {};

    switch(step) {
      case 1:
        if (!formData.jobTitle.trim()) newErrors.jobTitle = 'Job title is required';
        if (!formData.department.trim()) newErrors.department = 'Department is required';
        if (formData.numberOfOpenings < 1) newErrors.numberOfOpenings = 'At least 1 opening required';
        break;
      case 2:
        if (!formData.jobDescription.trim() || formData.jobDescription.length < 100) {
          newErrors.jobDescription = 'Job description must be at least 100 characters';
        }
        if (!formData.responsibilities.trim()) {
          newErrors.responsibilities = 'Responsibilities are required';
        }
        break;
      case 3:
        if (formData.requiredSkills.length === 0) {
          newErrors.requiredSkills = 'At least one skill is required';
        }
        if (!formData.minExperience) newErrors.minExperience = 'Minimum experience is required';
        break;
      case 4:
        if (!formData.location.trim()) newErrors.location = 'Location is required';
        break;
      case 5:
        if (!formData.salaryMin) newErrors.salaryMin = 'Minimum salary is required';
        if (!formData.salaryMax) newErrors.salaryMax = 'Maximum salary is required';
        if (parseFloat(formData.salaryMin) >= parseFloat(formData.salaryMax)) {
          newErrors.salaryMax = 'Maximum salary must be greater than minimum';
        }
        break;
      default:
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, totalSteps));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSaveDraft = () => {
    toast.success('Job saved as draft!');
    setTimeout(() => navigate('/recruiter/jobs'), 1500);
  };

  const handlePreview = () => {
    if (validateStep(currentStep)) {
      // Would open preview modal in real app
      toast.info('Preview functionality coming soon!');
    }
  };

  const handlePublish = () => {
    if (validateStep(currentStep)) {
      toast.success('Job posted successfully!');
      setTimeout(() => navigate('/recruiter/dashboard'), 1500);
    }
  };

  const renderStepContent = () => {
    switch(currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Basic Details</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Job Title *
              </label>
              <input
                type="text"
                value={formData.jobTitle}
                onChange={(e) => handleInputChange('jobTitle', e.target.value)}
                placeholder="e.g. Senior Frontend Developer"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.jobTitle ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.jobTitle && <p className="text-red-500 text-sm mt-1">{errors.jobTitle}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Department *
              </label>
              <input
                type="text"
                value={formData.department}
                onChange={(e) => handleInputChange('department', e.target.value)}
                placeholder="e.g. Engineering, Marketing, Sales"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.department ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.department && <p className="text-red-500 text-sm mt-1">{errors.department}</p>}
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Employment Type *
                </label>
                <select
                  value={formData.employmentType}
                  onChange={(e) => handleInputChange('employmentType', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option>Full-time</option>
                  <option>Part-time</option>
                  <option>Contract</option>
                  <option>Internship</option>
                  <option>Temporary</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Number of Openings *
                </label>
                <input
                  type="number"
                  min="1"
                  value={formData.numberOfOpenings}
                  onChange={(e) => handleInputChange('numberOfOpenings', parseInt(e.target.value))}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.numberOfOpenings ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.numberOfOpenings && <p className="text-red-500 text-sm mt-1">{errors.numberOfOpenings}</p>}
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Job Description</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Job Description * (min 100 characters)
              </label>
              <textarea
                value={formData.jobDescription}
                onChange={(e) => handleInputChange('jobDescription', e.target.value)}
                rows={8}
                placeholder="Describe the role, what the candidate will do, team structure, company culture..."
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.jobDescription ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              <div className="flex justify-between mt-1">
                {errors.jobDescription && <p className="text-red-500 text-sm">{errors.jobDescription}</p>}
                <p className="text-gray-500 text-sm ml-auto">{formData.jobDescription.length} characters</p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Key Responsibilities *
              </label>
              <textarea
                value={formData.responsibilities}
                onChange={(e) => handleInputChange('responsibilities', e.target.value)}
                rows={6}
                placeholder="• Lead frontend development&#10;• Collaborate with design team&#10;• Mentor junior developers&#10;• Review code and ensure quality"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.responsibilities ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.responsibilities && <p className="text-red-500 text-sm mt-1">{errors.responsibilities}</p>}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Requirements</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Required Skills * (Add at least one)
              </label>
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={formData.skillInput}
                  onChange={(e) => handleInputChange('skillInput', e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                  placeholder="e.g. React, Node.js, Python"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={addSkill}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Add
                </button>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-2">
                {formData.requiredSkills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm flex items-center gap-2"
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={() => removeSkill(index)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
              {errors.requiredSkills && <p className="text-red-500 text-sm">{errors.requiredSkills}</p>}
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Minimum Experience (years) *
                </label>
                <input
                  type="number"
                  min="0"
                  value={formData.minExperience}
                  onChange={(e) => handleInputChange('minExperience', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.minExperience ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.minExperience && <p className="text-red-500 text-sm mt-1">{errors.minExperience}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Maximum Experience (years)
                </label>
                <input
                  type="number"
                  min="0"
                  value={formData.maxExperience}
                  onChange={(e) => handleInputChange('maxExperience', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Education Requirement
              </label>
              <select
                value={formData.education}
                onChange={(e) => handleInputChange('education', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option>High School</option>
                <option>Associate Degree</option>
                <option>Bachelor's Degree</option>
                <option>Master's Degree</option>
                <option>PhD</option>
                <option>No Formal Education Required</option>
              </select>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Location & Work Mode</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Job Location *
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                placeholder="e.g. San Francisco, CA or Multiple Locations"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.location ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Work Mode
              </label>
              <div className="grid grid-cols-3 gap-4">
                {['On-site', 'Remote', 'Hybrid'].map((mode) => (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => handleInputChange('workMode', mode)}
                    className={`p-4 border-2 rounded-lg text-center font-medium transition-all ${
                      formData.workMode === mode
                        ? 'border-blue-600 bg-blue-50 text-blue-700'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Salary & Benefits</h2>
            
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Currency
                </label>
                <select
                  value={formData.currency}
                  onChange={(e) => handleInputChange('currency', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option>USD</option>
                  <option>EUR</option>
                  <option>GBP</option>
                  <option>INR</option>
                  <option>CAD</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Minimum Salary *
                </label>
                <input
                  type="number"
                  value={formData.salaryMin}
                  onChange={(e) => handleInputChange('salaryMin', e.target.value)}
                  placeholder="50000"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.salaryMin ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.salaryMin && <p className="text-red-500 text-sm mt-1">{errors.salaryMin}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Maximum Salary *
                </label>
                <input
                  type="number"
                  value={formData.salaryMax}
                  onChange={(e) => handleInputChange('salaryMax', e.target.value)}
                  placeholder="80000"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.salaryMax ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.salaryMax && <p className="text-red-500 text-sm mt-1">{errors.salaryMax}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Salary Period
              </label>
              <select
                value={formData.salaryPeriod}
                onChange={(e) => handleInputChange('salaryPeriod', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option>Hour</option>
                <option>Day</option>
                <option>Month</option>
                <option>Year</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Benefits (Optional)
              </label>
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={formData.benefitInput}
                  onChange={(e) => handleInputChange('benefitInput', e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addBenefit())}
                  placeholder="e.g. Health Insurance, 401(k), Remote Work"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={addBenefit}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Add
                </button>
              </div>
              
              <div className="space-y-2">
                {formData.benefits.map((benefit, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <span className="text-gray-700">✓ {benefit}</span>
                    <button
                      type="button"
                      onClick={() => removeBenefit(index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Screening Questions</h2>
            <p className="text-gray-600">Add custom questions to screen candidates (Optional)</p>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Add Question
              </label>
              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  value={formData.questionText}
                  onChange={(e) => handleInputChange('questionText', e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addScreeningQuestion())}
                  placeholder="e.g. How many years of React experience do you have?"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={addScreeningQuestion}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Add Question
                </button>
              </div>
              
              <div className="space-y-3">
                {formData.screeningQuestions.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    No screening questions added yet. You can skip this step.
                  </div>
                ) : (
                  formData.screeningQuestions.map((q, index) => (
                    <div
                      key={q.id}
                      className="flex items-start justify-between p-4 bg-gray-50 rounded-lg border border-gray-200"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-gray-700">Q{index + 1}:</span>
                          <span className="text-gray-900">{q.question}</span>
                        </div>
                        <span className="text-xs text-gray-500">Required question</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeScreeningQuestion(q.id)}
                        className="text-red-600 hover:text-red-800 ml-4"
                      >
                        Remove
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        );

      case 7:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Posting Options</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Job Posting Duration
              </label>
              <select
                value={formData.jobDuration}
                onChange={(e) => handleInputChange('jobDuration', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="7">7 days</option>
                <option value="15">15 days</option>
                <option value="30">30 days</option>
                <option value="60">60 days</option>
                <option value="90">90 days</option>
              </select>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900">Premium Features</h3>
              
              <label className="flex items-start p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                <input
                  type="checkbox"
                  checked={formData.isPremium}
                  onChange={(e) => handleInputChange('isPremium', e.target.checked)}
                  className="mt-1 mr-4 w-5 h-5"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-gray-900">Premium Job Posting</span>
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded">+$99</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Get 3x more visibility and appear at the top of search results
                  </p>
                </div>
              </label>

              <label className="flex items-start p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                <input
                  type="checkbox"
                  checked={formData.isFeatured}
                  onChange={(e) => handleInputChange('isFeatured', e.target.checked)}
                  className="mt-1 mr-4 w-5 h-5"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-gray-900">Featured Job</span>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">+$49</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Display on homepage and get highlighted with a badge
                  </p>
                </div>
              </label>

              <label className="flex items-start p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                <input
                  type="checkbox"
                  checked={formData.isUrgent}
                  onChange={(e) => handleInputChange('isUrgent', e.target.checked)}
                  className="mt-1 mr-4 w-5 h-5"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-gray-900">Urgent Hiring</span>
                    <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded">+$29</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Add "Urgent" badge and send push notifications to matching candidates
                  </p>
                </div>
              </label>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-900 mb-2">Cost Summary</h4>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-blue-800">Base job posting:</span>
                  <span className="font-medium text-blue-900">$0</span>
                </div>
                {formData.isPremium && (
                  <div className="flex justify-between">
                    <span className="text-blue-800">Premium posting:</span>
                    <span className="font-medium text-blue-900">$99</span>
                  </div>
                )}
                {formData.isFeatured && (
                  <div className="flex justify-between">
                    <span className="text-blue-800">Featured job:</span>
                    <span className="font-medium text-blue-900">$49</span>
                  </div>
                )}
                {formData.isUrgent && (
                  <div className="flex justify-between">
                    <span className="text-blue-800">Urgent hiring:</span>
                    <span className="font-medium text-blue-900">$29</span>
                  </div>
                )}
                <div className="flex justify-between pt-2 border-t border-blue-300">
                  <span className="font-semibold text-blue-900">Total:</span>
                  <span className="font-bold text-blue-900 text-lg">
                    ${(formData.isPremium ? 99 : 0) + (formData.isFeatured ? 49 : 0) + (formData.isUrgent ? 29 : 0)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/recruiter/dashboard')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
          >
            <FaArrowLeft /> Back to Dashboard
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Post a New Job</h1>
          <p className="text-gray-600 mt-2">Fill in the details to create a job posting</p>
        </div>

        {/* Progress Indicator */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            {[1, 2, 3, 4, 5, 6, 7].map((step) => (
              <div key={step} className="flex flex-col items-center flex-1">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                    step < currentStep
                      ? 'bg-green-500 text-white'
                      : step === currentStep
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {step < currentStep ? <FaCheckCircle /> : step}
                </div>
                <span className={`text-xs mt-2 text-center ${
                  step === currentStep ? 'text-blue-600 font-medium' : 'text-gray-500'
                }`}>
                  {step === 1 && 'Basic'}
                  {step === 2 && 'Description'}
                  {step === 3 && 'Requirements'}
                  {step === 4 && 'Location'}
                  {step === 5 && 'Salary'}
                  {step === 6 && 'Questions'}
                  {step === 7 && 'Options'}
                </span>
                {step < 7 && (
                  <div className={`h-1 w-full mt-2 ${
                    step < currentStep ? 'bg-green-500' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-6 border border-gray-200">
          {renderStepContent()}
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex gap-3">
            <button
              onClick={handleSaveDraft}
              className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 flex items-center gap-2 font-medium"
            >
              <FaSave /> Save as Draft
            </button>
            {currentStep === totalSteps && (
              <button
                onClick={handlePreview}
                className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 flex items-center gap-2 font-medium border border-gray-300"
              >
                <FaEye /> Preview
              </button>
            )}
          </div>

          <div className="flex gap-3">
            {currentStep > 1 && (
              <button
                onClick={prevStep}
                className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 flex items-center gap-2 font-medium"
              >
                <FaArrowLeft /> Previous
              </button>
            )}
            
            {currentStep < totalSteps ? (
              <button
                onClick={nextStep}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 font-medium"
              >
                Next <FaArrowRight />
              </button>
            ) : (
              <button
                onClick={handlePublish}
                className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2 font-semibold"
              >
                <FaCheckCircle /> Publish Job
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostJob;
