import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logotext.png'; // Ensure correct import path
import { auth } from '../../utils/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';

const Dashboard = () => {
  const [username, setUsername] = useState('User');
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUsername(currentUser.email.split('@')[0] || 'User'); // Use Firebase display name if available
      } else {
        navigate('/');
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/'); // Redirect to login after logout
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-gray-900 text-black dark:text-white p-6">
      <img src={logo} alt="Logo" className="w-20 h-auto dark:brightness-0 dark:invert mb-4" />
      <main className="p-4 text-center">
        <h1 className="text-3xl font-bold">Welcome, {username}!</h1>
        <p className="animate-pulse text-lg font-semibold mt-2">Enjoy your dashboard experience.</p>
        <button onClick={handleLogout} className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg">Logout</button>
      </main>
    </div>
  );
};

export default Dashboard;
