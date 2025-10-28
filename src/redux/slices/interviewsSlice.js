import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  interviews: [],
  upcomingInterviews: [],
  completedInterviews: [],
  selectedInterview: null,
  interviewers: [],
  filters: {
    status: 'all', // 'all', 'scheduled', 'completed', 'cancelled'
    type: 'all', // 'all', 'video', 'phone', 'in-person'
    date: null
  },
  loading: false,
  error: null
};

const interviewsSlice = createSlice({
  name: 'interviews',
  initialState,
  reducers: {
    // Interview Management
    setInterviews: (state, action) => {
      state.interviews = action.payload;
      state.upcomingInterviews = action.payload.filter(
        i => i.status === 'scheduled' && new Date(i.date) >= new Date()
      );
      state.completedInterviews = action.payload.filter(i => i.status === 'completed');
    },
    
    addInterview: (state, action) => {
      state.interviews.push(action.payload);
      if (action.payload.status === 'scheduled') {
        state.upcomingInterviews.push(action.payload);
      }
    },
    
    updateInterview: (state, action) => {
      const index = state.interviews.findIndex(i => i.id === action.payload.id);
      if (index !== -1) {
        state.interviews[index] = { ...state.interviews[index], ...action.payload };
      }
      
      // Update upcoming interviews
      state.upcomingInterviews = state.interviews.filter(
        i => i.status === 'scheduled' && new Date(i.date) >= new Date()
      );
      
      // Update completed interviews
      state.completedInterviews = state.interviews.filter(i => i.status === 'completed');
    },
    
    deleteInterview: (state, action) => {
      state.interviews = state.interviews.filter(i => i.id !== action.payload);
      state.upcomingInterviews = state.upcomingInterviews.filter(i => i.id !== action.payload);
      state.completedInterviews = state.completedInterviews.filter(i => i.id !== action.payload);
    },
    
    // Schedule Interview
    scheduleInterview: (state, action) => {
      const newInterview = {
        ...action.payload,
        status: 'scheduled',
        createdAt: new Date().toISOString()
      };
      state.interviews.push(newInterview);
      state.upcomingInterviews.push(newInterview);
    },
    
    // Reschedule Interview
    rescheduleInterview: (state, action) => {
      const { id, date, time } = action.payload;
      const interview = state.interviews.find(i => i.id === id);
      if (interview) {
        interview.date = date;
        interview.time = time;
        interview.status = 'rescheduled';
        interview.rescheduledAt = new Date().toISOString();
      }
      
      // Update upcoming interviews
      state.upcomingInterviews = state.interviews.filter(
        i => i.status === 'scheduled' && new Date(i.date) >= new Date()
      );
    },
    
    // Cancel Interview
    cancelInterview: (state, action) => {
      const interview = state.interviews.find(i => i.id === action.payload);
      if (interview) {
        interview.status = 'cancelled';
        interview.cancelledAt = new Date().toISOString();
      }
      
      // Remove from upcoming
      state.upcomingInterviews = state.upcomingInterviews.filter(i => i.id !== action.payload);
    },
    
    // Mark as Completed
    markAsCompleted: (state, action) => {
      const interview = state.interviews.find(i => i.id === action.payload);
      if (interview) {
        interview.status = 'completed';
        interview.completedAt = new Date().toISOString();
        state.completedInterviews.push(interview);
      }
      
      // Remove from upcoming
      state.upcomingInterviews = state.upcomingInterviews.filter(i => i.id !== action.payload);
    },
    
    // Add Interview Notes
    addInterviewNotes: (state, action) => {
      const { id, notes } = action.payload;
      const interview = state.interviews.find(i => i.id === id);
      if (interview) {
        interview.notes = notes;
      }
    },
    
    // Add Interview Feedback
    addInterviewFeedback: (state, action) => {
      const { id, feedback } = action.payload;
      const interview = state.interviews.find(i => i.id === id);
      if (interview) {
        if (!interview.feedback) {
          interview.feedback = [];
        }
        interview.feedback.push({
          ...feedback,
          createdAt: new Date().toISOString()
        });
      }
    },
    
    // Selected Interview
    setSelectedInterview: (state, action) => {
      state.selectedInterview = action.payload;
    },
    
    clearSelectedInterview: (state) => {
      state.selectedInterview = null;
    },
    
    // Interviewers Management
    setInterviewers: (state, action) => {
      state.interviewers = action.payload;
    },
    
    addInterviewer: (state, action) => {
      state.interviewers.push(action.payload);
    },
    
    removeInterviewer: (state, action) => {
      state.interviewers = state.interviewers.filter(i => i.id !== action.payload);
    },
    
    // Filters
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    
    clearFilters: (state) => {
      state.filters = initialState.filters;
    },
    
    // Send Reminder
    sendInterviewReminder: (state, action) => {
      const interview = state.interviews.find(i => i.id === action.payload);
      if (interview) {
        interview.reminderSent = true;
        interview.reminderSentAt = new Date().toISOString();
      }
    },
    
    // Loading and Error
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    
    clearError: (state) => {
      state.error = null;
    },
    
    // Reset
    resetInterviews: (state) => {
      return initialState;
    }
  }
});

export const {
  setInterviews,
  addInterview,
  updateInterview,
  deleteInterview,
  scheduleInterview,
  rescheduleInterview,
  cancelInterview,
  markAsCompleted,
  addInterviewNotes,
  addInterviewFeedback,
  setSelectedInterview,
  clearSelectedInterview,
  setInterviewers,
  addInterviewer,
  removeInterviewer,
  setFilters,
  clearFilters,
  sendInterviewReminder,
  setLoading,
  setError,
  clearError,
  resetInterviews
} = interviewsSlice.actions;

export default interviewsSlice.reducer;
