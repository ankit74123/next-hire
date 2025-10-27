// App constants
export const APP_NAME = import.meta.env.VITE_APP_NAME || 'JobPortal';
export const APP_VERSION = import.meta.env.VITE_APP_VERSION || '1.0.0';

// API Configuration
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

// Pagination
export const JOBS_PER_PAGE = parseInt(import.meta.env.VITE_JOBS_PER_PAGE) || 20;
export const APPLICATIONS_PER_PAGE = parseInt(import.meta.env.VITE_APPLICATIONS_PER_PAGE) || 10;

// File Upload
export const MAX_FILE_SIZE = parseInt(import.meta.env.VITE_MAX_FILE_SIZE) || 5242880; // 5MB
export const ALLOWED_FILE_TYPES = import.meta.env.VITE_ALLOWED_FILE_TYPES?.split(',') || [
  '.pdf',
  '.doc',
  '.docx',
  '.jpg',
  '.jpeg',
  '.png',
];

// User Roles
export const USER_ROLES = {
  JOB_SEEKER: 'jobseeker',
  RECRUITER: 'recruiter',
  ADMIN: 'admin',
};

// Application Status
export const APPLICATION_STATUS = {
  APPLIED: 'applied',
  VIEWED: 'viewed',
  SHORTLISTED: 'shortlisted',
  REJECTED: 'rejected',
  INTERVIEWED: 'interviewed',
  SELECTED: 'selected',
};

// Job Types
export const JOB_TYPES = {
  FULL_TIME: 'full-time',
  PART_TIME: 'part-time',
  CONTRACT: 'contract',
  INTERNSHIP: 'internship',
  FREELANCE: 'freelance',
};

// Work Modes
export const WORK_MODES = {
  OFFICE: 'office',
  REMOTE: 'remote',
  HYBRID: 'hybrid',
};

// Experience Levels
export const EXPERIENCE_LEVELS = [
  { label: 'Fresher (0-1 years)', value: '0-1' },
  { label: 'Entry Level (1-3 years)', value: '1-3' },
  { label: 'Mid Level (3-5 years)', value: '3-5' },
  { label: 'Senior Level (5-10 years)', value: '5-10' },
  { label: 'Expert (10+ years)', value: '10+' },
];

// Salary Ranges
export const SALARY_RANGES = [
  { label: '0-3 LPA', value: '0-300000' },
  { label: '3-6 LPA', value: '300000-600000' },
  { label: '6-10 LPA', value: '600000-1000000' },
  { label: '10-15 LPA', value: '1000000-1500000' },
  { label: '15-25 LPA', value: '1500000-2500000' },
  { label: '25+ LPA', value: '2500000-99999999' },
];

// Education Levels
export const EDUCATION_LEVELS = [
  '10th',
  '12th',
  'Diploma',
  'Bachelor\'s Degree',
  'Master\'s Degree',
  'PhD',
];

// Toast Messages
export const TOAST_MESSAGES = {
  LOGIN_SUCCESS: 'Login successful! Welcome back.',
  LOGOUT_SUCCESS: 'Logged out successfully',
  REGISTER_SUCCESS: 'Registration successful! Please verify your email.',
  PROFILE_UPDATED: 'Profile updated successfully',
  APPLICATION_SUBMITTED: 'Application submitted successfully',
  JOB_SAVED: 'Job saved successfully',
  JOB_REMOVED: 'Job removed from saved list',
  ERROR: 'Something went wrong. Please try again.',
};
