import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  jobs: [],
  drafts: [],
  currentJob: null,
  loading: false,
  error: null,
  filters: {
    status: 'all', // all, active, closed, draft
    search: ''
  }
};

const jobPostingSlice = createSlice({
  name: 'jobPosting',
  initialState,
  reducers: {
    // Set all jobs
    setJobs: (state, action) => {
      state.jobs = action.payload;
      state.error = null;
    },

    // Add new job
    addJob: (state, action) => {
      state.jobs.unshift(action.payload);
    },

    // Update existing job
    updateJob: (state, action) => {
      const index = state.jobs.findIndex(job => job.id === action.payload.id);
      if (index !== -1) {
        state.jobs[index] = { ...state.jobs[index], ...action.payload };
      }
    },

    // Delete job
    deleteJob: (state, action) => {
      state.jobs = state.jobs.filter(job => job.id !== action.payload);
    },

    // Publish job (move from draft to active)
    publishJob: (state, action) => {
      const job = action.payload;
      state.jobs.unshift(job);
      state.drafts = state.drafts.filter(draft => draft.id !== job.id);
    },

    // Close job
    closeJob: (state, action) => {
      const index = state.jobs.findIndex(job => job.id === action.payload);
      if (index !== -1) {
        state.jobs[index].status = 'closed';
        state.jobs[index].closedAt = new Date().toISOString();
      }
    },

    // Repost job
    repostJob: (state, action) => {
      const index = state.jobs.findIndex(job => job.id === action.payload);
      if (index !== -1) {
        state.jobs[index].status = 'active';
        state.jobs[index].postedAt = new Date().toISOString();
        state.jobs[index].closedAt = null;
      }
    },

    // Duplicate job
    duplicateJob: (state, action) => {
      const originalJob = state.jobs.find(job => job.id === action.payload);
      if (originalJob) {
        const duplicatedJob = {
          ...originalJob,
          id: Date.now(),
          jobTitle: `${originalJob.jobTitle} (Copy)`,
          status: 'draft',
          postedAt: new Date().toISOString(),
          applicationsCount: 0
        };
        state.drafts.unshift(duplicatedJob);
      }
    },

    // Draft management
    setDrafts: (state, action) => {
      state.drafts = action.payload;
    },

    addDraft: (state, action) => {
      state.drafts.unshift(action.payload);
    },

    updateDraft: (state, action) => {
      const index = state.drafts.findIndex(draft => draft.id === action.payload.id);
      if (index !== -1) {
        state.drafts[index] = { ...state.drafts[index], ...action.payload };
      }
    },

    deleteDraft: (state, action) => {
      state.drafts = state.drafts.filter(draft => draft.id !== action.payload);
    },

    // Current job
    setCurrentJob: (state, action) => {
      state.currentJob = action.payload;
    },

    clearCurrentJob: (state) => {
      state.currentJob = null;
    },

    // Filters
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },

    clearFilters: (state) => {
      state.filters = initialState.filters;
    },

    // Loading and error states
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

    // Reset state
    resetJobPosting: () => initialState
  }
});

export const {
  setJobs,
  addJob,
  updateJob,
  deleteJob,
  publishJob,
  closeJob,
  repostJob,
  duplicateJob,
  setDrafts,
  addDraft,
  updateDraft,
  deleteDraft,
  setCurrentJob,
  clearCurrentJob,
  setFilters,
  clearFilters,
  setLoading,
  setError,
  clearError,
  resetJobPosting
} = jobPostingSlice.actions;

export default jobPostingSlice.reducer;
