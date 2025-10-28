import { useState } from 'react';
import { FaPlus, FaEllipsisV, FaUser, FaBriefcase, FaClock, FaStar, FaEnvelope, FaPhone, FaEdit, FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';

const ATSBoard = () => {
  // Default stages
  const defaultStages = [
    { id: 'new', name: 'New Applications', color: 'blue', order: 1 },
    { id: 'screening', name: 'Screening', color: 'purple', order: 2 },
    { id: 'interview', name: 'Interview', color: 'orange', order: 3 },
    { id: 'offer', name: 'Offer', color: 'green', order: 4 },
    { id: 'hired', name: 'Hired', color: 'emerald', order: 5 },
    { id: 'rejected', name: 'Rejected', color: 'red', order: 6 }
  ];

  // State management
  const [stages, setStages] = useState(defaultStages);
  const [showAddStage, setShowAddStage] = useState(false);
  const [newStageName, setNewStageName] = useState('');
  const [draggedCandidate, setDraggedCandidate] = useState(null);
  const [draggedFromStage, setDraggedFromStage] = useState(null);
  const [selectedJob, setSelectedJob] = useState('all');

  // Sample candidates in different stages
  const [candidates, setCandidates] = useState([
    {
      id: 1,
      name: 'Sarah Johnson',
      title: 'Senior Frontend Developer',
      job: 'Senior Frontend Developer',
      stage: 'new',
      appliedDate: '2025-10-25',
      email: 'sarah.j@email.com',
      phone: '+1 (555) 123-4567',
      experience: '6 years',
      rating: 4.8,
      matchScore: 95,
      avatar: null,
      notes: 'Strong React background',
      lastActivity: '2 days ago'
    },
    {
      id: 2,
      name: 'Michael Chen',
      title: 'Full Stack Engineer',
      job: 'Full Stack Developer',
      stage: 'new',
      appliedDate: '2025-10-26',
      email: 'michael.c@email.com',
      phone: '+1 (555) 234-5678',
      experience: '8 years',
      rating: 4.9,
      matchScore: 92,
      avatar: null,
      notes: 'Impressive portfolio',
      lastActivity: '1 day ago'
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      title: 'UI/UX Designer',
      job: 'UI/UX Designer',
      stage: 'screening',
      appliedDate: '2025-10-20',
      email: 'emily.r@email.com',
      phone: '+1 (555) 345-6789',
      experience: '5 years',
      rating: 4.7,
      matchScore: 88,
      avatar: null,
      notes: 'Great design sense',
      lastActivity: '3 hours ago'
    },
    {
      id: 4,
      name: 'David Kumar',
      title: 'Backend Developer',
      job: 'Backend Developer',
      stage: 'screening',
      appliedDate: '2025-10-22',
      email: 'david.k@email.com',
      phone: '+1 (555) 456-7890',
      experience: '7 years',
      rating: 4.9,
      matchScore: 90,
      avatar: null,
      notes: 'Strong backend skills',
      lastActivity: '1 week ago'
    },
    {
      id: 5,
      name: 'Jessica Martinez',
      title: 'Product Manager',
      job: 'Product Manager',
      stage: 'interview',
      appliedDate: '2025-10-15',
      email: 'jessica.m@email.com',
      phone: '+1 (555) 567-8901',
      experience: '9 years',
      rating: 4.8,
      matchScore: 87,
      avatar: null,
      notes: 'Scheduled for final round',
      lastActivity: '5 days ago'
    },
    {
      id: 6,
      name: 'Alex Thompson',
      title: 'DevOps Engineer',
      job: 'DevOps Engineer',
      stage: 'interview',
      appliedDate: '2025-10-18',
      email: 'alex.t@email.com',
      phone: '+1 (555) 678-9012',
      experience: '6 years',
      rating: 4.7,
      matchScore: 93,
      avatar: null,
      notes: 'Technical interview completed',
      lastActivity: '2 days ago'
    },
    {
      id: 7,
      name: 'Sophie Williams',
      title: 'Data Scientist',
      job: 'Data Scientist',
      stage: 'offer',
      appliedDate: '2025-10-10',
      email: 'sophie.w@email.com',
      phone: '+1 (555) 789-0123',
      experience: '5 years',
      rating: 4.9,
      matchScore: 91,
      avatar: null,
      notes: 'Offer sent, awaiting response',
      lastActivity: '4 days ago'
    },
    {
      id: 8,
      name: 'Ryan Park',
      title: 'Mobile Developer',
      job: 'Mobile Developer',
      stage: 'hired',
      appliedDate: '2025-10-05',
      email: 'ryan.p@email.com',
      phone: '+1 (555) 890-1234',
      experience: '4 years',
      rating: 4.6,
      matchScore: 86,
      avatar: null,
      notes: 'Starting next month',
      lastActivity: '1 day ago'
    },
    {
      id: 9,
      name: 'Linda Chen',
      title: 'QA Engineer',
      job: 'QA Engineer',
      stage: 'hired',
      appliedDate: '2025-10-08',
      email: 'linda.c@email.com',
      phone: '+1 (555) 901-2345',
      experience: '6 years',
      rating: 4.7,
      matchScore: 89,
      avatar: null,
      notes: 'Onboarding in progress',
      lastActivity: '6 hours ago'
    },
    {
      id: 10,
      name: 'James Wilson',
      title: 'Security Engineer',
      job: 'Security Engineer',
      stage: 'rejected',
      appliedDate: '2025-10-12',
      email: 'james.w@email.com',
      phone: '+1 (555) 012-3456',
      experience: '8 years',
      rating: 4.5,
      matchScore: 75,
      avatar: null,
      notes: 'Not a cultural fit',
      lastActivity: '1 week ago'
    }
  ]);

  // Job list for filter
  const jobs = [
    { id: 'all', title: 'All Jobs' },
    { id: '1', title: 'Senior Frontend Developer' },
    { id: '2', title: 'Full Stack Developer' },
    { id: '3', title: 'UI/UX Designer' },
    { id: '4', title: 'Backend Developer' },
    { id: '5', title: 'Product Manager' },
    { id: '6', title: 'DevOps Engineer' }
  ];

  // Get stage color classes
  const getStageColor = (color) => {
    const colors = {
      blue: 'bg-blue-100 border-blue-300 text-blue-800',
      purple: 'bg-purple-100 border-purple-300 text-purple-800',
      orange: 'bg-orange-100 border-orange-300 text-orange-800',
      green: 'bg-green-100 border-green-300 text-green-800',
      emerald: 'bg-emerald-100 border-emerald-300 text-emerald-800',
      red: 'bg-red-100 border-red-300 text-red-800',
      gray: 'bg-gray-100 border-gray-300 text-gray-800'
    };
    return colors[color] || colors.gray;
  };

  // Get candidates for a stage
  const getCandidatesForStage = (stageId) => {
    return candidates.filter(c => {
      const stageMatch = c.stage === stageId;
      const jobMatch = selectedJob === 'all' || c.job === jobs.find(j => j.id === selectedJob)?.title;
      return stageMatch && jobMatch;
    });
  };

  // Drag and drop handlers
  const handleDragStart = (e, candidate, fromStage) => {
    setDraggedCandidate(candidate);
    setDraggedFromStage(fromStage);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, toStageId) => {
    e.preventDefault();
    
    if (draggedCandidate && draggedFromStage !== toStageId) {
      // Update candidate stage
      setCandidates(prev => 
        prev.map(c => 
          c.id === draggedCandidate.id 
            ? { ...c, stage: toStageId }
            : c
        )
      );

      const toStage = stages.find(s => s.id === toStageId);
      toast.success(`${draggedCandidate.name} moved to ${toStage.name}`);
    }

    setDraggedCandidate(null);
    setDraggedFromStage(null);
  };

  // Add custom stage
  const handleAddStage = () => {
    if (newStageName.trim()) {
      const newStage = {
        id: `custom-${Date.now()}`,
        name: newStageName,
        color: 'gray',
        order: stages.length + 1
      };
      setStages([...stages, newStage]);
      setNewStageName('');
      setShowAddStage(false);
      toast.success('Stage added successfully!');
    }
  };

  // Delete custom stage
  const handleDeleteStage = (stageId) => {
    // Don't allow deletion of default stages
    if (defaultStages.some(s => s.id === stageId)) {
      toast.error('Cannot delete default stages');
      return;
    }

    const candidatesInStage = candidates.filter(c => c.stage === stageId);
    if (candidatesInStage.length > 0) {
      toast.error('Cannot delete stage with candidates. Move them first.');
      return;
    }

    setStages(stages.filter(s => s.id !== stageId));
    toast.success('Stage deleted successfully!');
  };

  // Get candidate initials for avatar
  const getInitials = (name) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">ATS Pipeline</h1>
            <p className="text-gray-600">Manage your recruitment pipeline with drag-and-drop</p>
          </div>
          
          {/* Job Filter */}
          <div className="flex items-center gap-4">
            <select
              value={selectedJob}
              onChange={(e) => setSelectedJob(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
            >
              {jobs.map(job => (
                <option key={job.id} value={job.id}>{job.title}</option>
              ))}
            </select>
            
            <button
              onClick={() => setShowAddStage(true)}
              className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 flex items-center gap-2"
            >
              <FaPlus />
              Add Stage
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-6 gap-4">
          {stages.map(stage => {
            const count = getCandidatesForStage(stage.id).length;
            return (
              <div
                key={stage.id}
                className={`p-4 rounded-lg border-2 ${getStageColor(stage.color)}`}
              >
                <div className="text-2xl font-bold mb-1">{count}</div>
                <div className="text-sm font-medium">{stage.name}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Kanban Board */}
      <div className="flex gap-4 overflow-x-auto pb-4">
        {stages.map(stage => {
          const stageCandidates = getCandidatesForStage(stage.id);
          
          return (
            <div
              key={stage.id}
              className="flex-shrink-0 w-80"
            >
              {/* Stage Header */}
              <div
                className={`rounded-t-lg border-2 p-4 ${getStageColor(stage.color)}`}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, stage.id)}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-bold text-lg">{stage.name}</h3>
                    <p className="text-sm opacity-75">{stageCandidates.length} candidates</p>
                  </div>
                  
                  {!defaultStages.some(s => s.id === stage.id) && (
                    <button
                      onClick={() => handleDeleteStage(stage.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <FaTrash />
                    </button>
                  )}
                </div>
              </div>

              {/* Candidates Drop Zone */}
              <div
                className="bg-gray-100 min-h-[600px] p-4 space-y-3 rounded-b-lg border-2 border-t-0 border-gray-300"
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, stage.id)}
              >
                {stageCandidates.length === 0 ? (
                  <div className="text-center text-gray-400 py-8">
                    <p className="text-sm">No candidates</p>
                    <p className="text-xs mt-1">Drag candidates here</p>
                  </div>
                ) : (
                  stageCandidates.map(candidate => (
                    <div
                      key={candidate.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, candidate, stage.id)}
                      className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow cursor-move border border-gray-200 hover:border-primary-400"
                    >
                      {/* Candidate Header */}
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          {/* Avatar */}
                          <div className="w-10 h-10 rounded-full bg-primary-600 text-white flex items-center justify-center font-semibold">
                            {getInitials(candidate.name)}
                          </div>
                          
                          <div>
                            <h4 className="font-semibold text-gray-900">{candidate.name}</h4>
                            <p className="text-xs text-gray-600">{candidate.title}</p>
                          </div>
                        </div>

                        <button className="text-gray-400 hover:text-gray-600">
                          <FaEllipsisV />
                        </button>
                      </div>

                      {/* Match Score */}
                      <div className="mb-3">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-gray-600">Match Score</span>
                          <span className="text-xs font-semibold text-green-600">
                            {candidate.matchScore}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                          <div
                            className="bg-green-500 h-1.5 rounded-full"
                            style={{ width: `${candidate.matchScore}%` }}
                          />
                        </div>
                      </div>

                      {/* Info */}
                      <div className="space-y-2 mb-3">
                        <div className="flex items-center gap-2 text-xs text-gray-600">
                          <FaBriefcase className="text-gray-400" />
                          <span>{candidate.job}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-600">
                          <FaUser className="text-gray-400" />
                          <span>{candidate.experience} experience</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-600">
                          <FaClock className="text-gray-400" />
                          <span>Applied {candidate.appliedDate}</span>
                        </div>
                      </div>

                      {/* Rating */}
                      <div className="flex items-center gap-1 mb-3">
                        {[...Array(5)].map((_, i) => (
                          <FaStar
                            key={i}
                            className={`text-xs ${
                              i < Math.floor(candidate.rating)
                                ? 'text-yellow-400'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                        <span className="text-xs text-gray-600 ml-1">{candidate.rating}</span>
                      </div>

                      {/* Notes */}
                      {candidate.notes && (
                        <div className="bg-yellow-50 border border-yellow-200 rounded p-2 mb-3">
                          <p className="text-xs text-gray-700">{candidate.notes}</p>
                        </div>
                      )}

                      {/* Actions */}
                      <div className="flex gap-2 pt-3 border-t border-gray-200">
                        <button
                          onClick={() => toast.info(`Emailing ${candidate.name}`)}
                          className="flex-1 px-3 py-2 bg-blue-50 text-blue-600 rounded text-xs hover:bg-blue-100 flex items-center justify-center gap-1"
                        >
                          <FaEnvelope />
                          Email
                        </button>
                        <button
                          onClick={() => toast.info(`Calling ${candidate.name}`)}
                          className="flex-1 px-3 py-2 bg-green-50 text-green-600 rounded text-xs hover:bg-green-100 flex items-center justify-center gap-1"
                        >
                          <FaPhone />
                          Call
                        </button>
                        <button
                          onClick={() => toast.info(`Viewing ${candidate.name}'s profile`)}
                          className="flex-1 px-3 py-2 bg-gray-50 text-gray-600 rounded text-xs hover:bg-gray-100 flex items-center justify-center gap-1"
                        >
                          <FaEdit />
                          View
                        </button>
                      </div>

                      {/* Last Activity */}
                      <div className="mt-2 text-xs text-gray-500 text-center">
                        Active {candidate.lastActivity}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Stage Modal */}
      {showAddStage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Add Custom Stage</h3>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Stage Name
              </label>
              <input
                type="text"
                value={newStageName}
                onChange={(e) => setNewStageName(e.target.value)}
                placeholder="e.g., Technical Assessment"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                onKeyPress={(e) => e.key === 'Enter' && handleAddStage()}
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleAddStage}
                className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
              >
                Add Stage
              </button>
              <button
                onClick={() => {
                  setShowAddStage(false);
                  setNewStageName('');
                }}
                className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ATSBoard;
