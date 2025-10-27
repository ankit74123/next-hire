import { useSelector } from 'react-redux';

const useAuth = () => {
  const { user, token, isAuthenticated, loading, error } = useSelector(
    (state) => state.auth
  );

  return {
    user,
    token,
    isAuthenticated,
    loading,
    error,
    isJobSeeker: user?.role === 'jobseeker',
    isRecruiter: user?.role === 'recruiter',
    isAdmin: user?.role === 'admin',
  };
};

export default useAuth;
