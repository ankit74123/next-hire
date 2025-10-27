import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  jobsList: [],
  currentJob: null,
  filters: {},
  searchQuery: '',
  loading: false,
  error: null,
};

const jobsSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    setJobs: (state, action) => {
      state.jobsList = action.payload;
    },
    setCurrentJob: (state, action) => {
      state.currentJob = action.payload;
    },
    setFilters: (state, action) => {
      state.filters = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    clearFilters: (state) => {
      state.filters = {};
    },
  },
});

export const {
  setJobs,
  setCurrentJob,
  setFilters,
  setSearchQuery,
  clearFilters,
} = jobsSlice.actions;

export default jobsSlice.reducer;
