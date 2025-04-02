import React, { useState } from 'react';
import { auth } from '../../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';

const UserLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); 
  const handleSignIn = async (e) => {
    e.preventDefault();
    setError(null); 
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setMessage('Signed in successfully');
      setTimeout(() => {
        navigate('/dashboard');
      },2000);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-gray-900 text-black dark:text-white p-6">
      <h2 className="text-2xl font-bold mb-4">Sign In</h2>
      <form onSubmit={handleSignIn} className="w-full max-w-sm bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md">
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        {message && <p className="text-green-500 text-sm mb-2">{message}</p>}
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md"
          />
        </div>

        <div className="flex justify-between items-center">
          <a href="/signup" className="text-blue-500 text-sm">Sign Up</a>
          <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md">Sign In</button>
        </div>
      </form>
    </div>
  );
};

export default UserLogin;
