import { useState } from 'react';
import { FaSearch, FaPaperPlane, FaUser, FaClock, FaCheck, FaCheckDouble, FaTimes, FaFileAlt, FaPaperclip } from 'react-icons/fa';
import { toast } from 'react-toastify';

const Messages = () => {
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messageText, setMessageText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showTemplates, setShowTemplates] = useState(false);
  const [filter, setFilter] = useState('all'); // 'all', 'unread', 'archived'

  // Message templates
  const templates = [
    {
      id: 1,
      name: 'Interview Invitation',
      subject: 'Interview Invitation for {{jobTitle}}',
      body: 'Hi {{candidateName}},\n\nWe were impressed with your application for the {{jobTitle}} position. We would like to invite you for an interview.\n\nPlease let us know your availability for the coming week.\n\nBest regards,\nHiring Team'
    },
    {
      id: 2,
      name: 'Application Received',
      subject: 'Application Received - {{jobTitle}}',
      body: 'Hi {{candidateName}},\n\nThank you for applying to the {{jobTitle}} position. We have received your application and our team will review it shortly.\n\nWe will get back to you within 5-7 business days.\n\nBest regards,\nHiring Team'
    },
    {
      id: 3,
      name: 'Interview Reminder',
      subject: 'Reminder: Interview Tomorrow',
      body: 'Hi {{candidateName}},\n\nThis is a friendly reminder about your interview scheduled for tomorrow at {{time}}.\n\nMeeting Link: {{meetingLink}}\n\nLooking forward to speaking with you!\n\nBest regards,\n{{interviewer}}'
    },
    {
      id: 4,
      name: 'Rejection - Polite',
      subject: 'Update on Your Application',
      body: 'Hi {{candidateName}},\n\nThank you for your interest in the {{jobTitle}} position and for taking the time to interview with us.\n\nAfter careful consideration, we have decided to move forward with other candidates whose qualifications more closely match our needs.\n\nWe appreciate your time and wish you the best in your job search.\n\nBest regards,\nHiring Team'
    },
    {
      id: 5,
      name: 'Offer Letter',
      subject: 'Job Offer - {{jobTitle}}',
      body: 'Hi {{candidateName}},\n\nWe are pleased to offer you the position of {{jobTitle}} at our company.\n\nPlease find the detailed offer letter attached. We would love to have you join our team!\n\nPlease let us know your decision by {{deadline}}.\n\nCongratulations!\n\nBest regards,\nHiring Team'
    }
  ];

  // Sample conversations
  const [conversations, setConversations] = useState([
    {
      id: 1,
      candidateName: 'Sarah Johnson',
      candidateEmail: 'sarah.j@email.com',
      jobTitle: 'Senior Frontend Developer',
      lastMessage: 'Thank you for the interview invitation. I am available next Tuesday or Wednesday.',
      timestamp: '2025-10-28T14:30:00',
      unread: true,
      messages: [
        {
          id: 1,
          sender: 'recruiter',
          text: 'Hi Sarah, we were impressed with your application. Would you be available for an interview next week?',
          timestamp: '2025-10-27T10:00:00',
          read: true
        },
        {
          id: 2,
          sender: 'candidate',
          text: 'Thank you for reaching out! Yes, I would love to. I am available Monday through Wednesday.',
          timestamp: '2025-10-27T15:30:00',
          read: true
        },
        {
          id: 3,
          sender: 'recruiter',
          text: 'Great! How about Tuesday at 2 PM for a video call?',
          timestamp: '2025-10-28T09:00:00',
          read: true
        },
        {
          id: 4,
          sender: 'candidate',
          text: 'Thank you for the interview invitation. I am available next Tuesday or Wednesday.',
          timestamp: '2025-10-28T14:30:00',
          read: false
        }
      ]
    },
    {
      id: 2,
      candidateName: 'Michael Chen',
      candidateEmail: 'michael.c@email.com',
      jobTitle: 'Full Stack Developer',
      lastMessage: 'Looking forward to the interview tomorrow!',
      timestamp: '2025-10-27T16:45:00',
      unread: false,
      messages: [
        {
          id: 1,
          sender: 'recruiter',
          text: 'Hi Michael, your interview is scheduled for tomorrow at 10 AM. Meeting link: https://meet.google.com/abc-defg',
          timestamp: '2025-10-27T11:00:00',
          read: true
        },
        {
          id: 2,
          sender: 'candidate',
          text: 'Looking forward to the interview tomorrow!',
          timestamp: '2025-10-27T16:45:00',
          read: true
        }
      ]
    },
    {
      id: 3,
      candidateName: 'Emily Rodriguez',
      candidateEmail: 'emily.r@email.com',
      jobTitle: 'UI/UX Designer',
      lastMessage: 'Could you please share more details about the role?',
      timestamp: '2025-10-26T13:20:00',
      unread: true,
      messages: [
        {
          id: 1,
          sender: 'recruiter',
          text: 'Hi Emily, we came across your portfolio and would like to discuss our UI/UX Designer position.',
          timestamp: '2025-10-26T10:00:00',
          read: true
        },
        {
          id: 2,
          sender: 'candidate',
          text: 'Thank you! I am interested. Could you please share more details about the role?',
          timestamp: '2025-10-26T13:20:00',
          read: false
        }
      ]
    },
    {
      id: 4,
      candidateName: 'David Kumar',
      candidateEmail: 'david.k@email.com',
      jobTitle: 'Backend Developer',
      lastMessage: 'Thank you for considering my application.',
      timestamp: '2025-10-25T11:00:00',
      unread: false,
      messages: [
        {
          id: 1,
          sender: 'recruiter',
          text: 'Hi David, thank you for applying. We will review your application and get back to you soon.',
          timestamp: '2025-10-25T09:00:00',
          read: true
        },
        {
          id: 2,
          sender: 'candidate',
          text: 'Thank you for considering my application.',
          timestamp: '2025-10-25T11:00:00',
          read: true
        }
      ]
    },
    {
      id: 5,
      candidateName: 'Jessica Martinez',
      candidateEmail: 'jessica.m@email.com',
      jobTitle: 'Product Manager',
      lastMessage: 'I accept the offer! When can I start?',
      timestamp: '2025-10-24T15:30:00',
      unread: true,
      messages: [
        {
          id: 1,
          sender: 'recruiter',
          text: 'Hi Jessica, we are pleased to offer you the Product Manager position. Please find the offer letter attached.',
          timestamp: '2025-10-24T10:00:00',
          read: true
        },
        {
          id: 2,
          sender: 'candidate',
          text: 'I accept the offer! When can I start?',
          timestamp: '2025-10-24T15:30:00',
          read: false
        }
      ]
    }
  ]);

  // Filter conversations
  const filteredConversations = conversations.filter(conv => {
    const matchesSearch = 
      conv.candidateName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.candidateEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.jobTitle.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = 
      filter === 'all' || 
      (filter === 'unread' && conv.unread);
    
    return matchesSearch && matchesFilter;
  });

  // Get unread count
  const unreadCount = conversations.filter(c => c.unread).length;

  // Send message
  const handleSendMessage = () => {
    if (!messageText.trim() || !selectedConversation) return;

    const newMessage = {
      id: selectedConversation.messages.length + 1,
      sender: 'recruiter',
      text: messageText,
      timestamp: new Date().toISOString(),
      read: false
    };

    setConversations(conversations.map(conv => {
      if (conv.id === selectedConversation.id) {
        return {
          ...conv,
          messages: [...conv.messages, newMessage],
          lastMessage: messageText,
          timestamp: new Date().toISOString()
        };
      }
      return conv;
    }));

    // Update selected conversation
    setSelectedConversation({
      ...selectedConversation,
      messages: [...selectedConversation.messages, newMessage]
    });

    setMessageText('');
    toast.success('Message sent!');
  };

  // Use template
  const handleUseTemplate = (template) => {
    if (!selectedConversation) {
      toast.warning('Please select a conversation first');
      return;
    }

    let message = template.body;
    message = message.replace('{{candidateName}}', selectedConversation.candidateName);
    message = message.replace('{{jobTitle}}', selectedConversation.jobTitle);
    
    setMessageText(message);
    setShowTemplates(false);
    toast.success('Template applied!');
  };

  // Mark conversation as read
  const handleMarkAsRead = (conversationId) => {
    setConversations(conversations.map(conv => {
      if (conv.id === conversationId) {
        return {
          ...conv,
          unread: false,
          messages: conv.messages.map(msg => ({ ...msg, read: true }))
        };
      }
      return conv;
    }));
  };

  // Select conversation
  const selectConversation = (conversation) => {
    setSelectedConversation(conversation);
    handleMarkAsRead(conversation.id);
  };

  // Format timestamp
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Messages</h1>
            <p className="text-gray-600">Communicate with candidates</p>
          </div>
          
          {unreadCount > 0 && (
            <div className="bg-red-100 text-red-800 px-4 py-2 rounded-lg">
              <span className="font-semibold">{unreadCount}</span> unread message{unreadCount > 1 ? 's' : ''}
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
        {/* Conversations List */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden flex flex-col">
          {/* Search and Filter */}
          <div className="p-4 border-b">
            <div className="relative mb-3">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              />
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={() => setFilter('all')}
                className={`flex-1 px-3 py-1.5 rounded text-sm font-medium ${
                  filter === 'all' 
                    ? 'bg-primary-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilter('unread')}
                className={`flex-1 px-3 py-1.5 rounded text-sm font-medium ${
                  filter === 'unread' 
                    ? 'bg-primary-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Unread ({unreadCount})
              </button>
            </div>
          </div>

          {/* Conversations */}
          <div className="flex-1 overflow-y-auto">
            {filteredConversations.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <FaUser className="mx-auto text-4xl mb-2" />
                <p>No conversations found</p>
              </div>
            ) : (
              filteredConversations.map(conversation => (
                <div
                  key={conversation.id}
                  onClick={() => selectConversation(conversation)}
                  className={`p-4 border-b cursor-pointer hover:bg-gray-50 transition-colors ${
                    selectedConversation?.id === conversation.id ? 'bg-blue-50 border-l-4 border-l-primary-600' : ''
                  } ${conversation.unread ? 'bg-blue-50/30' : ''}`}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 rounded-full bg-primary-600 text-white flex items-center justify-center font-semibold flex-shrink-0">
                      {conversation.candidateName.split(' ').map(n => n[0]).join('')}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-1">
                        <h3 className={`font-semibold text-gray-900 truncate ${conversation.unread ? 'font-bold' : ''}`}>
                          {conversation.candidateName}
                        </h3>
                        <span className="text-xs text-gray-500 flex-shrink-0 ml-2">
                          {formatTime(conversation.timestamp)}
                        </span>
                      </div>
                      
                      <p className="text-sm text-primary-600 mb-1">{conversation.jobTitle}</p>
                      
                      <p className={`text-sm text-gray-600 truncate ${conversation.unread ? 'font-semibold' : ''}`}>
                        {conversation.lastMessage}
                      </p>
                    </div>

                    {conversation.unread && (
                      <div className="w-3 h-3 bg-blue-600 rounded-full flex-shrink-0"></div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Message Thread */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm flex flex-col">
          {selectedConversation ? (
            <>
              {/* Thread Header */}
              <div className="p-4 border-b flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">{selectedConversation.candidateName}</h2>
                  <p className="text-sm text-gray-600">{selectedConversation.candidateEmail} • {selectedConversation.jobTitle}</p>
                </div>
                <button
                  onClick={() => setSelectedConversation(null)}
                  className="lg:hidden text-gray-600 hover:text-gray-900"
                >
                  <FaTimes />
                </button>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {selectedConversation.messages.map(message => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'recruiter' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[70%] ${message.sender === 'recruiter' ? 'order-2' : 'order-1'}`}>
                      <div
                        className={`rounded-lg p-4 ${
                          message.sender === 'recruiter'
                            ? 'bg-primary-600 text-white'
                            : 'bg-gray-100 text-gray-900'
                        }`}
                      >
                        <p className="whitespace-pre-wrap">{message.text}</p>
                      </div>
                      <div className={`flex items-center gap-2 mt-1 text-xs text-gray-500 ${
                        message.sender === 'recruiter' ? 'justify-end' : 'justify-start'
                      }`}>
                        <span>{formatTime(message.timestamp)}</span>
                        {message.sender === 'recruiter' && (
                          message.read ? (
                            <FaCheckDouble className="text-blue-500" />
                          ) : (
                            <FaCheck className="text-gray-400" />
                          )
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="p-4 border-t">
                <div className="flex gap-2 mb-3">
                  <button
                    onClick={() => setShowTemplates(!showTemplates)}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 flex items-center gap-2"
                  >
                    <FaFileAlt />
                    Templates
                  </button>
                  <button
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                  >
                    <FaPaperclip />
                  </button>
                </div>

                {showTemplates && (
                  <div className="mb-3 p-3 bg-gray-50 rounded-lg max-h-48 overflow-y-auto">
                    <h4 className="font-semibold text-gray-900 mb-2">Select Template</h4>
                    <div className="space-y-2">
                      {templates.map(template => (
                        <button
                          key={template.id}
                          onClick={() => handleUseTemplate(template)}
                          className="w-full text-left p-2 bg-white hover:bg-blue-50 rounded border border-gray-200 hover:border-blue-300 transition-colors"
                        >
                          <p className="font-medium text-gray-900">{template.name}</p>
                          <p className="text-xs text-gray-600 truncate">{template.body.substring(0, 60)}...</p>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex gap-2">
                  <textarea
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                    placeholder="Type your message... (Press Enter to send)"
                    rows="3"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 resize-none"
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!messageText.trim()}
                    className="px-6 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    <FaPaperPlane />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-500">
              <div className="text-center">
                <FaUser className="mx-auto text-6xl mb-4 text-gray-300" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No conversation selected</h3>
                <p>Select a conversation from the left to start messaging</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Messages;
