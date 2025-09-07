import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import { useAuth } from '../hooks/useAuth';

const Login = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleSuccess = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <Link to="/" className="text-2xl font-bold text-primary">
            News Horizon
          </Link>
          <p className="text-muted-foreground mt-2">
            Sign in to your account to access personalized features
          </p>
        </div>

        <AuthForm mode="login" onSuccess={handleSuccess} />

        <div className="text-center text-sm">
          <span className="text-muted-foreground">Don't have an account? </span>
          <Link 
            to="/register" 
            className="text-primary hover:underline font-medium"
          >
            Create one here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
