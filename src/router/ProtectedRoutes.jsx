import React, { useEffect } from 'react';
import { useLocation, Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const status = localStorage.getItem('status'); // Check local storage for the status
  const location = useLocation(); // Get the current location

  useEffect(() => {
    const currentPath = location.pathname;

    if (currentPath === '/users') {
      // If URL is /users, remove guru_id from localStorage
      localStorage.removeItem('guru_id');
    } else if (currentPath === '/admin') {
      // If URL is /admin, remove siswa_id from localStorage
      localStorage.removeItem('siswa_id');
    }

    // If both guru_id and siswa_id are missing, redirect to login
    const guruId = localStorage.getItem('guru_id');
    const siswaId = localStorage.getItem('siswa_id');
    if (!guruId && !siswaId) {
      localStorage.removeItem('status');
    }
  }, [location]);

  // If the status is not 'success', redirect to login page
  if (status !== 'success') {
    return <Navigate to="/" />;
  }

  // If the user is logged in, render the children
  return children;
};

export default ProtectedRoute;
