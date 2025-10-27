// Validation patterns
export const VALIDATION_PATTERNS = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phone: /^[0-9]{10}$/,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  url: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
};

// Validation functions
export const validateEmail = (email) => {
  return VALIDATION_PATTERNS.email.test(email);
};

export const validatePhone = (phone) => {
  return VALIDATION_PATTERNS.phone.test(phone);
};

export const validatePassword = (password) => {
  return VALIDATION_PATTERNS.password.test(password);
};

export const validateURL = (url) => {
  return VALIDATION_PATTERNS.url.test(url);
};

// Error messages
export const ERROR_MESSAGES = {
  required: 'This field is required',
  email: 'Please enter a valid email address',
  phone: 'Please enter a valid 10-digit phone number',
  password:
    'Password must be at least 8 characters with uppercase, lowercase, number and special character',
  url: 'Please enter a valid URL',
  minLength: (min) => `Must be at least ${min} characters`,
  maxLength: (max) => `Must not exceed ${max} characters`,
};
