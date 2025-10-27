import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  applications: [],
  savedJobs: [],
  currentApplication: null,
  loading: false,
  error: null,
  submitting: false,
};

const applicationSlice = createSlice({
  name: 'application',
  initialState,
  reducers: {
    setApplications: (state, action) => {
      state.applications = action.payload;
    },
    addApplication: (state, action) => {
      state.applications.push(action.payload);
    },
    setCurrentApplication: (state, action) => {
      state.currentApplication = action.payload;
    },
    updateApplicationStatus: (state, action) => {
      const { id, status } = action.payload;
      const application = state.applications.find((app) => app.id === id);
      if (application) {
        application.status = status;
      }
    },
    withdrawApplication: (state, action) => {
      const application = state.applications.find((app) => app.id === action.payload);
      if (application) {
        application.status = 'withdrawn';
      }
    },
    setSubmitting: (state, action) => {
      state.submitting = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setSavedJobs: (state, action) => {
      state.savedJobs = action.payload;
    },
    addSavedJob: (state, action) => {
      state.savedJobs.push(action.payload);
    },
    removeSavedJob: (state, action) => {
      state.savedJobs = state.savedJobs.filter(
        (job) => job.id !== action.payload
      );
    },
  },
});

export const {
  setApplications,
  addApplication,
  setCurrentApplication,
  updateApplicationStatus,
  withdrawApplication,
  setSubmitting,
  setLoading,
  setError,
  setSavedJobs,
  addSavedJob,
  removeSavedJob,
} = applicationSlice.actions;

export default applicationSlice.reducer;
