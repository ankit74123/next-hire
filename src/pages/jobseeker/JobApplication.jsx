import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaCheckCircle, FaArrowLeft, FaFileAlt, FaPaperclip, FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';

const JobApplication = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [step, setStep] = useState('form'); // 'form' or 'confirmation'
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    resumeId: '',
    coverLetter: '',
    expectedSalary: '',
    noticePeriod: '',
    willingToRelocate: '',
    availableForInterview: '',
    screeningAnswers: [],
  });

  const [additionalDocs, setAdditionalDocs] = useState([]);
  const [errors, setErrors] = useState({});

  // Sample data (would come from API)
  const job = {
    id: parseInt(id),
    title: 'Senior React Developer',
    company: 'Tech Corp',
    location: 'San Francisco, CA',
    salary: '₹15-25 LPA',
  };

  const savedResumes = [
    { id: '1', name: 'Resume_2025_Frontend.pdf', lastUpdated: '2025-10-20' },
    { id: '2', name: 'Resume_Full_Stack.pdf', lastUpdated: '2025-09-15' },
    { id: '3', name: 'Resume_ReactDeveloper.pdf', lastUpdated: '2025-10-25' },
  ];

  const screeningQuestions = [
    { id: 1, question: 'How many years of experience do you have with React.js?', required: true },
    { id: 2, question: 'Are you comfortable with remote work?', required: true },
    { id: 3, question: 'What is your expected salary range?', required: false },
  ];

  useEffect(() => {
    // Initialize screening answers
    const initialAnswers = screeningQuestions.map(q => ({
      questionId: q.id,
      answer: '',
    }));
    setFormData(prev => ({ ...prev, screeningAnswers: initialAnswers }));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleScreeningAnswerChange = (questionId, value) => {
    setFormData(prev => ({
      ...prev,
      screeningAnswers: prev.screeningAnswers.map(ans =>
        ans.questionId === questionId ? { ...ans, answer: value } : ans
      ),
    }));
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    const validFiles = files.filter(file => {
      const isValidType = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(file.type);
      const isValidSize = file.size <= 5 * 1024 * 1024; // 5MB
      
      if (!isValidType) {
        toast.error(`${file.name} is not a valid file type. Only PDF and DOC files are allowed.`);
        return false;
      }
      if (!isValidSize) {
        toast.error(`${file.name} is too large. Maximum size is 5MB.`);
        return false;
      }
      return true;
    });

    setAdditionalDocs(prev => [...prev, ...validFiles]);
  };

  const removeDocument = (index) => {
    setAdditionalDocs(prev => prev.filter((_, i) => i !== index));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.resumeId) {
      newErrors.resumeId = 'Please select a resume';
    }

    if (!formData.coverLetter.trim()) {
      newErrors.coverLetter = 'Cover letter is required';
    } else if (formData.coverLetter.trim().length < 50) {
      newErrors.coverLetter = 'Cover letter must be at least 50 characters';
    }

    if (!formData.expectedSalary) {
      newErrors.expectedSalary = 'Expected salary is required';
    }

    if (!formData.noticePeriod) {
      newErrors.noticePeriod = 'Notice period is required';
    }

    if (!formData.willingToRelocate) {
      newErrors.willingToRelocate = 'Please specify your relocation preference';
    }

    if (!formData.availableForInterview) {
      newErrors.availableForInterview = 'Please specify your availability';
    }

    // Validate screening questions
    screeningQuestions.forEach(question => {
      const answer = formData.screeningAnswers.find(ans => ans.questionId === question.id);
      if (question.required && (!answer || !answer.answer.trim())) {
        newErrors[`screening_${question.id}`] = 'This question is required';
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setStep('confirmation');
      toast.success('Application submitted successfully!');
    }, 2000);
  };

  const handleQuickApply = async () => {
    if (!formData.resumeId) {
      toast.error('Please select a resume for quick apply');
      return;
    }

    setIsSubmitting(true);

    // Simulate API call with minimal data
    setTimeout(() => {
      setIsSubmitting(false);
      setStep('confirmation');
      toast.success('Quick application submitted successfully!');
    }, 1500);
  };

  if (step === 'confirmation') {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaCheckCircle className="text-green-600 text-5xl" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Application Submitted!</h1>
            <p className="text-lg text-gray-700 mb-2">
              Your application for <span className="font-semibold">{job.title}</span> at{' '}
              <span className="font-semibold">{job.company}</span> has been submitted successfully.
            </p>
            <p className="text-gray-600 mb-8">
              You will receive updates on your application status via email and notifications.
            </p>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8 text-left">
              <h3 className="font-semibold text-gray-900 mb-2">What's Next?</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>The recruiter will review your application</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>You'll be notified if you're shortlisted</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>Track your application status in the dashboard</span>
                </li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate('/dashboard/applications')}
                className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-lg font-semibold transition"
              >
                View My Applications
              </button>
              <button
                onClick={() => navigate('/jobs')}
                className="border border-gray-300 hover:bg-gray-50 text-gray-700 px-8 py-3 rounded-lg font-semibold transition"
              >
                Browse More Jobs
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <button
          onClick={() => navigate(`/jobs/${id}`)}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
        >
          <FaArrowLeft className="mr-2" />
          Back to Job Details
        </button>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Apply for {job.title}</h1>
          <p className="text-gray-600">
            {job.company} • {job.location}
          </p>
        </div>

        {/* Application Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Resume Selection */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Select Resume *</h2>
            <div className="space-y-3">
              {savedResumes.map((resume) => (
                <label
                  key={resume.id}
                  className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition ${
                    formData.resumeId === resume.id
                      ? 'border-primary-600 bg-primary-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="resumeId"
                    value={resume.id}
                    checked={formData.resumeId === resume.id}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-primary-600"
                  />
                  <div className="ml-4 flex-1">
                    <div className="flex items-center">
                      <FaFileAlt className="text-gray-400 mr-2" />
                      <span className="font-medium text-gray-900">{resume.name}</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">Last updated: {resume.lastUpdated}</p>
                  </div>
                </label>
              ))}
            </div>
            {errors.resumeId && <p className="text-red-600 text-sm mt-2">{errors.resumeId}</p>}

            {/* Quick Apply Button */}
            <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Quick Apply</p>
                  <p className="text-sm text-gray-600">Apply with selected resume only</p>
                </div>
                <button
                  type="button"
                  onClick={handleQuickApply}
                  disabled={isSubmitting || !formData.resumeId}
                  className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-lg font-medium transition disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Submitting...' : 'Quick Apply'}
                </button>
              </div>
            </div>
          </div>

          {/* Cover Letter */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <label className="block text-xl font-bold text-gray-900 mb-4">
              Cover Letter *
            </label>
            <textarea
              name="coverLetter"
              value={formData.coverLetter}
              onChange={handleInputChange}
              rows="8"
              placeholder="Introduce yourself and explain why you're a great fit for this role..."
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none ${
                errors.coverLetter ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            <div className="flex justify-between items-center mt-2">
              <p className="text-sm text-gray-500">{formData.coverLetter.length} characters (minimum 50)</p>
              {errors.coverLetter && <p className="text-red-600 text-sm">{errors.coverLetter}</p>}
            </div>
          </div>

          {/* Screening Questions */}
          {screeningQuestions.length > 0 && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Screening Questions</h2>
              <div className="space-y-4">
                {screeningQuestions.map((question, index) => (
                  <div key={question.id}>
                    <label className="block text-gray-900 font-medium mb-2">
                      {index + 1}. {question.question}
                      {question.required && <span className="text-red-600 ml-1">*</span>}
                    </label>
                    <textarea
                      value={
                        formData.screeningAnswers.find(ans => ans.questionId === question.id)?.answer || ''
                      }
                      onChange={(e) => handleScreeningAnswerChange(question.id, e.target.value)}
                      rows="3"
                      placeholder="Your answer..."
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none ${
                        errors[`screening_${question.id}`] ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors[`screening_${question.id}`] && (
                      <p className="text-red-600 text-sm mt-1">{errors[`screening_${question.id}`]}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Additional Information */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Additional Information</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Expected Salary */}
              <div>
                <label className="block text-gray-900 font-medium mb-2">
                  Expected Salary (LPA) *
                </label>
                <input
                  type="text"
                  name="expectedSalary"
                  value={formData.expectedSalary}
                  onChange={handleInputChange}
                  placeholder="e.g., 15-20"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                    errors.expectedSalary ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.expectedSalary && (
                  <p className="text-red-600 text-sm mt-1">{errors.expectedSalary}</p>
                )}
              </div>

              {/* Notice Period */}
              <div>
                <label className="block text-gray-900 font-medium mb-2">
                  Notice Period *
                </label>
                <select
                  name="noticePeriod"
                  value={formData.noticePeriod}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                    errors.noticePeriod ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select notice period</option>
                  <option value="immediate">Immediate</option>
                  <option value="15-days">15 Days</option>
                  <option value="1-month">1 Month</option>
                  <option value="2-months">2 Months</option>
                  <option value="3-months">3 Months</option>
                </select>
                {errors.noticePeriod && (
                  <p className="text-red-600 text-sm mt-1">{errors.noticePeriod}</p>
                )}
              </div>

              {/* Willing to Relocate */}
              <div>
                <label className="block text-gray-900 font-medium mb-2">
                  Willing to Relocate? *
                </label>
                <select
                  name="willingToRelocate"
                  value={formData.willingToRelocate}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                    errors.willingToRelocate ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select option</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                  <option value="depends">Depends on location</option>
                </select>
                {errors.willingToRelocate && (
                  <p className="text-red-600 text-sm mt-1">{errors.willingToRelocate}</p>
                )}
              </div>

              {/* Availability for Interview */}
              <div>
                <label className="block text-gray-900 font-medium mb-2">
                  Availability for Interview *
                </label>
                <select
                  name="availableForInterview"
                  value={formData.availableForInterview}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                    errors.availableForInterview ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select availability</option>
                  <option value="immediate">Immediately</option>
                  <option value="1-week">Within 1 week</option>
                  <option value="2-weeks">Within 2 weeks</option>
                  <option value="flexible">Flexible</option>
                </select>
                {errors.availableForInterview && (
                  <p className="text-red-600 text-sm mt-1">{errors.availableForInterview}</p>
                )}
              </div>
            </div>
          </div>

          {/* Additional Documents */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Additional Documents (Optional)</h2>
            <p className="text-gray-600 mb-4">Upload any additional documents (certificates, portfolio, etc.)</p>
            
            <label className="inline-flex items-center px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg cursor-pointer transition">
              <FaPaperclip className="mr-2" />
              <span>Upload Files</span>
              <input
                type="file"
                multiple
                accept=".pdf,.doc,.docx"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>

            {additionalDocs.length > 0 && (
              <div className="mt-4 space-y-2">
                {additionalDocs.map((doc, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <FaFileAlt className="text-gray-400 mr-3" />
                      <span className="text-gray-900">{doc.name}</span>
                      <span className="text-gray-500 text-sm ml-3">
                        ({(doc.size / 1024).toFixed(2)} KB)
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeDocument(index)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <FaTrash />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary-600 hover:bg-primary-700 text-white py-4 rounded-lg font-semibold text-lg transition disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Submitting Application...' : 'Submit Application'}
            </button>
            <p className="text-center text-gray-600 text-sm mt-4">
              By submitting this application, you agree to our terms and conditions.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JobApplication;
