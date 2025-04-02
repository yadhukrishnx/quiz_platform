import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logotext.png'; // Ensure the correct path

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <img src={logo} alt="Logo" className="w-32 h-auto dark:brightness-0 dark:invert mb-6" />
      <h1 className="text-6xl font-bold text-red-600">404</h1>
      <p className="text-lg font-medium mt-2">Oops! The page you are looking for does not exist.</p>
      <button
        onClick={() => navigate('/')}
        className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white text-lg rounded-lg shadow-md"
      >
        Go Home
      </button>
    </div>
  );
};

export default NotFound;
