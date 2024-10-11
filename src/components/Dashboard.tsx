import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEncryption } from '../utils/EncryptionContext';
import { useAuth } from '../utils/AuthContext';
import { fetchSecureData } from '../services/api';
import Logo from './Logo';

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { encrypt, decrypt } = useEncryption();
  const [secureData, setSecureData] = useState<string>('');

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const loadSecureData = async () => {
      try {
        const encryptedData = await fetchSecureData();
        const decryptedData = decrypt(encryptedData);
        setSecureData(decryptedData);
      } catch (error) {
        console.error('Error fetching secure data:', error);
      }
    };

    loadSecureData();
  }, [user, navigate, decrypt]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Logo className="w-12 h-12 mr-4" />
            <h1 className="text-2xl font-bold text-gray-800">Expenasas Online</h1>
          </div>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition duration-200"
          >
            Logout
          </button>
        </div>
        <p className="mb-4">Welcome, {user.name}!</p>
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Secure Data:</h2>
          <p className="bg-gray-100 p-4 rounded">{secureData}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;