import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEnvelope, FaArrowLeft } from 'react-icons/fa';
import { toast } from 'react-toastify';
import Input from '../components/common/Input';
import Button from '../components/common/Button';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const validate = () => {
    if (!email) {
      return 'Email is required';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return 'Please enter a valid email';
    }
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    try {
      // API call would go here
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      setEmailSent(true);
      toast.success('Password reset email sent! Please check your inbox.');
    } catch (error) {
      toast.error('Failed to send reset email. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (emailSent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 text-center">
          <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-green-100">
            <FaEnvelope className="h-10 w-10 text-green-600" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Check your email</h2>
            <p className="mt-4 text-gray-600">
              We've sent a password reset link to
            </p>
            <p className="mt-1 font-medium text-gray-900">{email}</p>
            <p className="mt-4 text-sm text-gray-500">
              Didn't receive the email? Check your spam folder or
            </p>
            <button
              onClick={() => setEmailSent(false)}
              className="mt-2 text-primary-600 hover:text-primary-500 font-medium"
            >
              try another email address
            </button>
          </div>
          <Link
            to="/login"
            className="flex items-center justify-center text-primary-600 hover:text-primary-500 font-medium"
          >
            <FaArrowLeft className="mr-2" />
            Back to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-4xl font-bold text-gray-900">Forgot Password?</h2>
          <p className="mt-2 text-sm text-gray-600">
            No worries, we'll send you reset instructions
          </p>
        </div>

        {/* Form */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <Input
            label="Email Address"
            type="email"
            name="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError('');
            }}
            placeholder="Enter your registered email"
            error={error}
            icon={FaEnvelope}
            required
          />

          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            loading={loading}
          >
            Send Reset Link
          </Button>

          <div className="text-center">
            <Link
              to="/login"
              className="flex items-center justify-center text-sm text-primary-600 hover:text-primary-500 font-medium"
            >
              <FaArrowLeft className="mr-2" />
              Back to Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
