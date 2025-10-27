import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  alerts: [],
  loading: false,
  error: null,
};

const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    setAlerts: (state, action) => {
      state.alerts = action.payload;
    },
    addAlert: (state, action) => {
      state.alerts.push(action.payload);
    },
    updateAlert: (state, action) => {
      const { id, updates } = action.payload;
      const alert = state.alerts.find((a) => a.id === id);
      if (alert) {
        Object.assign(alert, updates);
      }
    },
    deleteAlert: (state, action) => {
      state.alerts = state.alerts.filter((a) => a.id !== action.payload);
    },
    toggleAlertStatus: (state, action) => {
      const alert = state.alerts.find((a) => a.id === action.payload);
      if (alert) {
        alert.isActive = !alert.isActive;
      }
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  setAlerts,
  addAlert,
  updateAlert,
  deleteAlert,
  toggleAlertStatus,
  setLoading,
  setError,
} = alertSlice.actions;

export default alertSlice.reducer;
