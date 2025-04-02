import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../utils/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const UserSignup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Hook for navigation

  const handleCreateUser = async (e) => {
    e.preventDefault();
    setError(null);
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert('User Created Successfully');
      navigate('/'); // Redirect to login after successful signup
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-gray-900 text-black dark:text-white p-6">
      <h2 className="text-2xl font-bold mb-4">Register Your Account</h2>
      <form onSubmit={handleCreateUser} className="w-full max-w-sm bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md">
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md"
          />
        </div>

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

        <div className="mb-4">
          <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md"
          />
        </div>

        <div className="mb-4 flex items-center">
          <input type="checkbox" id="terms" className="mr-2" required />
          <label htmlFor="terms" className="text-sm">I agree to the <a href="#" className="text-blue-500">Terms and Conditions</a></label>
        </div>

        <div className="flex justify-between items-center">
          <a href="/login" className="text-blue-500 text-sm">Login</a>
          <button type="submit" className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md">Register</button>
        </div>
      </form>
    </div>
  );
};

export default UserSignup;
