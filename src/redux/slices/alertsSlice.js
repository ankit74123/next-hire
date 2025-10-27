import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  alerts: [],
  loading: false,
  error: null,
};

const alertsSlice = createSlice({
  name: 'alerts',
  initialState,
  reducers: {
    setAlerts: (state, action) => {
      state.alerts = action.payload;
    },
    addAlert: (state, action) => {
      state.alerts.push(action.payload);
    },
    updateAlert: (state, action) => {
      const { id, data } = action.payload;
      const alert = state.alerts.find((a) => a.id === id);
      if (alert) {
        Object.assign(alert, data);
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
  },
});

export const {
  setAlerts,
  addAlert,
  updateAlert,
  deleteAlert,
  toggleAlertStatus,
} = alertsSlice.actions;

export default alertsSlice.reducer;
