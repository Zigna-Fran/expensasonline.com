import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import { Lock } from 'lucide-react';
import { useAuth } from '../utils/AuthContext';
import Logo from './Logo';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      login(tokenResponse.access_token);
      navigate('/dashboard');
    },
    onError: (error) => console.error('Login Failed:', error)
  });

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <div className="flex flex-col items-center mb-6">
          <Logo className="w-24 h-24 mb-4" />
          <h1 className="text-3xl font-bold text-gray-800">Expenasas Online</h1>
        </div>
        <h2 className="text-2xl font-bold text-center mb-6">Secure Login</h2>
        <button
          onClick={() => handleGoogleLogin()}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200 flex items-center justify-center"
        >
          <Lock className="w-5 h-5 mr-2" />
          Sign In with Google
        </button>
      </div>
    </div>
  );
};

export default Login;