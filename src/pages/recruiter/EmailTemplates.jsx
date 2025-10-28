import { useState } from 'react';
import { FaPlus, FaEdit, FaTrash, FaCopy, FaPaperPlane, FaFileAlt, FaTimes } from 'react-icons/fa';
import { toast } from 'react-toastify';

const EmailTemplates = () => {
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [showBulkEmailModal, setShowBulkEmailModal] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState(null);
  const [selectedTemplates, setSelectedTemplates] = useState([]);

  // Template form state
  const [templateForm, setTemplateForm] = useState({
    name: '',
    subject: '',
    body: '',
    category: 'general'
  });

  // Bulk email state
  const [bulkEmailForm, setBulkEmailForm] = useState({
    recipients: '',
    template: '',
    customSubject: '',
    customBody: ''
  });

  // Sample templates
  const [templates, setTemplates] = useState([
    {
      id: 1,
      name: 'Interview Invitation',
      subject: 'Interview Invitation for {{jobTitle}} Position',
      body: `Hi {{candidateName}},

We were impressed with your application for the {{jobTitle}} position at {{companyName}}. We would like to invite you for an interview to discuss your qualifications further.

Interview Details:
- Date: {{interviewDate}}
- Time: {{interviewTime}}
- Duration: {{duration}}
- Type: {{interviewType}}
- Meeting Link: {{meetingLink}}

Please confirm your availability by replying to this email.

We look forward to speaking with you!

Best regards,
{{recruiterName}}
{{companyName}} Hiring Team`,
      category: 'interview',
      usageCount: 45,
      lastUsed: '2025-10-28'
    },
    {
      id: 2,
      name: 'Application Received',
      subject: 'Application Received - {{jobTitle}}',
      body: `Hi {{candidateName}},

Thank you for applying to the {{jobTitle}} position at {{companyName}}. We have received your application and our recruitment team will review it carefully.

What happens next:
1. Our team will review your application within 5-7 business days
2. If your profile matches our requirements, we will contact you for an interview
3. You can check your application status in your dashboard

If you have any questions, feel free to reply to this email.

Best regards,
{{companyName}} Hiring Team`,
      category: 'application',
      usageCount: 120,
      lastUsed: '2025-10-27'
    },
    {
      id: 3,
      name: 'Interview Reminder',
      subject: 'Reminder: Your Interview Tomorrow at {{interviewTime}}',
      body: `Hi {{candidateName}},

This is a friendly reminder about your interview scheduled for tomorrow.

Interview Details:
- Position: {{jobTitle}}
- Date: {{interviewDate}}
- Time: {{interviewTime}}
- Interviewer: {{interviewer}}
- Meeting Link: {{meetingLink}}

Tips for the interview:
- Test your video and audio setup 15 minutes before
- Have a copy of your resume handy
- Prepare questions about the role

See you tomorrow!

Best regards,
{{recruiterName}}`,
      category: 'interview',
      usageCount: 67,
      lastUsed: '2025-10-26'
    },
    {
      id: 4,
      name: 'Application Rejection - Polite',
      subject: 'Update on Your Application for {{jobTitle}}',
      body: `Hi {{candidateName}},

Thank you for your interest in the {{jobTitle}} position at {{companyName}} and for taking the time to apply.

After careful consideration of all applications, we have decided to move forward with other candidates whose qualifications more closely match our current needs.

This was a difficult decision as we received many strong applications. We encourage you to apply for future openings that match your skills and experience.

We wish you the best in your job search and future career endeavors.

Best regards,
{{companyName}} Hiring Team`,
      category: 'rejection',
      usageCount: 34,
      lastUsed: '2025-10-25'
    },
    {
      id: 5,
      name: 'Offer Letter Notification',
      subject: 'Job Offer - {{jobTitle}} at {{companyName}}',
      body: `Hi {{candidateName}},

We are delighted to extend an offer for the position of {{jobTitle}} at {{companyName}}!

After careful consideration of your interview performance and qualifications, we believe you would be an excellent addition to our team.

Offer Details:
- Position: {{jobTitle}}
- Department: {{department}}
- Start Date: {{startDate}}
- Salary: {{salary}}
- Benefits: {{benefits}}

Please find the detailed offer letter attached to this email. We would love to have you join us!

To accept this offer, please sign and return the offer letter by {{deadline}}.

If you have any questions about the offer, please don't hesitate to reach out.

Congratulations!

Best regards,
{{recruiterName}}
{{companyName}}`,
      category: 'offer',
      usageCount: 12,
      lastUsed: '2025-10-24'
    },
    {
      id: 6,
      name: 'Interview Feedback Request',
      subject: 'Quick Feedback on Your Interview Experience',
      body: `Hi {{candidateName}},

Thank you for taking the time to interview with us for the {{jobTitle}} position.

We value your time and would appreciate your feedback on the interview experience. This will help us improve our recruitment process.

Please take 2 minutes to share your thoughts:
- How would you rate your overall interview experience? (1-5)
- Was the interview process clear and well-organized?
- Do you have any suggestions for improvement?

Your feedback is confidential and greatly appreciated.

Thank you,
{{companyName}} Hiring Team`,
      category: 'feedback',
      usageCount: 23,
      lastUsed: '2025-10-23'
    }
  ]);

  // Categories
  const categories = [
    { value: 'general', label: 'General', color: 'bg-gray-100 text-gray-800' },
    { value: 'application', label: 'Application', color: 'bg-blue-100 text-blue-800' },
    { value: 'interview', label: 'Interview', color: 'bg-green-100 text-green-800' },
    { value: 'rejection', label: 'Rejection', color: 'bg-red-100 text-red-800' },
    { value: 'offer', label: 'Offer', color: 'bg-purple-100 text-purple-800' },
    { value: 'feedback', label: 'Feedback', color: 'bg-yellow-100 text-yellow-800' }
  ];

  // Get category color
  const getCategoryColor = (category) => {
    const cat = categories.find(c => c.value === category);
    return cat ? cat.color : 'bg-gray-100 text-gray-800';
  };

  // Handle input change
  const handleInputChange = (field, value) => {
    setTemplateForm({ ...templateForm, [field]: value });
  };

  // Create or update template
  const handleSaveTemplate = () => {
    if (!templateForm.name || !templateForm.subject || !templateForm.body) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (editingTemplate) {
      // Update existing template
      setTemplates(templates.map(t => 
        t.id === editingTemplate.id 
          ? { ...t, ...templateForm }
          : t
      ));
      toast.success('Template updated successfully!');
    } else {
      // Create new template
      const newTemplate = {
        id: templates.length + 1,
        ...templateForm,
        usageCount: 0,
        lastUsed: null
      };
      setTemplates([...templates, newTemplate]);
      toast.success('Template created successfully!');
    }

    closeTemplateModal();
  };

  // Delete template
  const handleDeleteTemplate = (templateId) => {
    if (window.confirm('Are you sure you want to delete this template?')) {
      setTemplates(templates.filter(t => t.id !== templateId));
      toast.success('Template deleted');
    }
  };

  // Duplicate template
  const handleDuplicateTemplate = (template) => {
    const newTemplate = {
      ...template,
      id: templates.length + 1,
      name: `${template.name} (Copy)`,
      usageCount: 0,
      lastUsed: null
    };
    setTemplates([...templates, newTemplate]);
    toast.success('Template duplicated!');
  };

  // Open edit modal
  const openEditModal = (template) => {
    setEditingTemplate(template);
    setTemplateForm({
      name: template.name,
      subject: template.subject,
      body: template.body,
      category: template.category
    });
    setShowTemplateModal(true);
  };

  // Close template modal
  const closeTemplateModal = () => {
    setShowTemplateModal(false);
    setEditingTemplate(null);
    setTemplateForm({
      name: '',
      subject: '',
      body: '',
      category: 'general'
    });
  };

  // Send bulk email
  const handleSendBulkEmail = () => {
    if (!bulkEmailForm.recipients || !bulkEmailForm.template) {
      toast.error('Please select recipients and a template');
      return;
    }

    const recipientCount = bulkEmailForm.recipients.split(',').filter(r => r.trim()).length;
    toast.success(`Bulk email sent to ${recipientCount} recipients!`);
    setShowBulkEmailModal(false);
    setBulkEmailForm({
      recipients: '',
      template: '',
      customSubject: '',
      customBody: ''
    });
  };

  // Handle template selection for bulk email
  const handleTemplateSelect = (templateId) => {
    const template = templates.find(t => t.id === parseInt(templateId));
    if (template) {
      setBulkEmailForm({
        ...bulkEmailForm,
        template: templateId,
        customSubject: template.subject,
        customBody: template.body
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Email Templates</h1>
            <p className="text-gray-600">Create and manage email templates for recruitment</p>
          </div>
          
          <div className="flex gap-3">
            <button
              onClick={() => setShowBulkEmailModal(true)}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2"
            >
              <FaPaperPlane />
              Send Bulk Email
            </button>
            <button
              onClick={() => setShowTemplateModal(true)}
              className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 flex items-center gap-2"
            >
              <FaPlus />
              Create Template
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="text-3xl font-bold text-gray-900 mb-1">{templates.length}</div>
            <div className="text-sm text-gray-600">Total Templates</div>
          </div>
          <div className="bg-blue-50 p-6 rounded-lg shadow-sm">
            <div className="text-3xl font-bold text-blue-600 mb-1">
              {templates.filter(t => t.category === 'application').length}
            </div>
            <div className="text-sm text-blue-800">Application</div>
          </div>
          <div className="bg-green-50 p-6 rounded-lg shadow-sm">
            <div className="text-3xl font-bold text-green-600 mb-1">
              {templates.filter(t => t.category === 'interview').length}
            </div>
            <div className="text-sm text-green-800">Interview</div>
          </div>
          <div className="bg-purple-50 p-6 rounded-lg shadow-sm">
            <div className="text-3xl font-bold text-purple-600 mb-1">
              {templates.reduce((sum, t) => sum + t.usageCount, 0)}
            </div>
            <div className="text-sm text-purple-800">Total Usage</div>
          </div>
        </div>
      </div>

      {/* Template Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map(template => (
          <div key={template.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="p-6">
              {/* Header */}
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{template.name}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(template.category)}`}>
                    {categories.find(c => c.value === template.category)?.label}
                  </span>
                </div>
                <FaFileAlt className="text-3xl text-gray-300" />
              </div>

              {/* Subject */}
              <div className="mb-4">
                <p className="text-xs text-gray-600 mb-1">Subject:</p>
                <p className="text-sm font-medium text-gray-900 line-clamp-2">{template.subject}</p>
              </div>

              {/* Body Preview */}
              <div className="mb-4">
                <p className="text-xs text-gray-600 mb-1">Preview:</p>
                <p className="text-sm text-gray-700 line-clamp-3">{template.body}</p>
              </div>

              {/* Stats */}
              <div className="flex items-center justify-between text-xs text-gray-600 mb-4 pb-4 border-b">
                <span>Used {template.usageCount} times</span>
                {template.lastUsed && (
                  <span>Last used: {new Date(template.lastUsed).toLocaleDateString()}</span>
                )}
              </div>

              {/* Actions */}
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => openEditModal(template)}
                  className="px-3 py-2 bg-blue-50 text-blue-600 rounded-lg text-sm hover:bg-blue-100 flex items-center justify-center gap-1"
                >
                  <FaEdit />
                  Edit
                </button>
                <button
                  onClick={() => handleDuplicateTemplate(template)}
                  className="px-3 py-2 bg-green-50 text-green-600 rounded-lg text-sm hover:bg-green-100 flex items-center justify-center gap-1"
                >
                  <FaCopy />
                  Copy
                </button>
                <button
                  onClick={() => handleDeleteTemplate(template.id)}
                  className="px-3 py-2 bg-red-50 text-red-600 rounded-lg text-sm hover:bg-red-100 flex items-center justify-center gap-1"
                >
                  <FaTrash />
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Template Editor Modal */}
      {showTemplateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">
                {editingTemplate ? 'Edit Template' : 'Create New Template'}
              </h2>
              <button
                onClick={closeTemplateModal}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                ×
              </button>
            </div>

            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Template Name *
                  </label>
                  <input
                    type="text"
                    value={templateForm.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    placeholder="e.g., Interview Invitation"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    value={templateForm.category}
                    onChange={(e) => handleInputChange('category', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  >
                    {categories.map(cat => (
                      <option key={cat.value} value={cat.value}>{cat.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Subject *
                  </label>
                  <input
                    type="text"
                    value={templateForm.subject}
                    onChange={(e) => handleInputChange('subject', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    placeholder="Use {{variable}} for dynamic content"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Body *
                  </label>
                  <textarea
                    value={templateForm.body}
                    onChange={(e) => handleInputChange('body', e.target.value)}
                    rows="12"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 font-mono text-sm"
                    placeholder="Email body content. Use {{candidateName}}, {{jobTitle}}, {{companyName}}, etc."
                  />
                </div>

                {/* Variables Guide */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-900 mb-2">Available Variables:</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm text-blue-800">
                    <code>{'{{candidateName}}'}</code>
                    <code>{'{{jobTitle}}'}</code>
                    <code>{'{{companyName}}'}</code>
                    <code>{'{{recruiterName}}'}</code>
                    <code>{'{{interviewDate}}'}</code>
                    <code>{'{{interviewTime}}'}</code>
                    <code>{'{{meetingLink}}'}</code>
                    <code>{'{{salary}}'}</code>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={handleSaveTemplate}
                  className="flex-1 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 font-medium"
                >
                  {editingTemplate ? 'Update Template' : 'Create Template'}
                </button>
                <button
                  onClick={closeTemplateModal}
                  className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-medium"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bulk Email Modal */}
      {showBulkEmailModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Send Bulk Email</h2>
              <button
                onClick={() => setShowBulkEmailModal(false)}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                ×
              </button>
            </div>

            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Recipients (comma-separated emails) *
                  </label>
                  <textarea
                    value={bulkEmailForm.recipients}
                    onChange={(e) => setBulkEmailForm({ ...bulkEmailForm, recipients: e.target.value })}
                    rows="3"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    placeholder="email1@example.com, email2@example.com, email3@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Template *
                  </label>
                  <select
                    value={bulkEmailForm.template}
                    onChange={(e) => handleTemplateSelect(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="">Choose a template...</option>
                    {templates.map(template => (
                      <option key={template.id} value={template.id}>
                        {template.name} ({template.category})
                      </option>
                    ))}
                  </select>
                </div>

                {bulkEmailForm.template && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Subject (Customize if needed)
                      </label>
                      <input
                        type="text"
                        value={bulkEmailForm.customSubject}
                        onChange={(e) => setBulkEmailForm({ ...bulkEmailForm, customSubject: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Body (Customize if needed)
                      </label>
                      <textarea
                        value={bulkEmailForm.customBody}
                        onChange={(e) => setBulkEmailForm({ ...bulkEmailForm, customBody: e.target.value })}
                        rows="10"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 font-mono text-sm"
                      />
                    </div>
                  </>
                )}
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={handleSendBulkEmail}
                  className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium flex items-center justify-center gap-2"
                >
                  <FaPaperPlane />
                  Send to All
                </button>
                <button
                  onClick={() => setShowBulkEmailModal(false)}
                  className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-medium"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmailTemplates;
