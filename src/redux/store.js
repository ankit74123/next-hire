import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import profileReducer from './slices/profileSlice';
import jobsReducer from './slices/jobsSlice';
import applicationReducer from './slices/applicationSlice';
import alertReducer from './slices/alertSlice';
import notificationsReducer from './slices/notificationsSlice';
import companyReducer from './slices/companySlice';
import jobPostingReducer from './slices/jobPostingSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    jobs: jobsReducer,
    application: applicationReducer,
    alert: alertReducer,
    notifications: notificationsReducer,
    company: companyReducer,
    jobPosting: jobPostingReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
