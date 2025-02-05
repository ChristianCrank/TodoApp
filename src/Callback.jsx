//src/Callback.jsx
import { useAuth } from "react-oidc-context";
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Callback = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    console.log('Auth state:', {
      isLoading: auth.isLoading,
      isAuthenticated: auth.isAuthenticated,
      error: auth.error
    });
    
    if (auth.isAuthenticated) {
      console.log('User data:', auth.user);
      navigate('/todos');
    } else if (auth.error) {
      console.error('Authentication error:', auth.error);
      navigate('/');
    }
  }, [auth, navigate]);

  return <div>Processing authentication...</div>;
};

export default Callback;