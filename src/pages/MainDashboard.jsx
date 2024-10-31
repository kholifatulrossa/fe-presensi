import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import React from 'react';
import Header from './admin/Header';
import Sidebar from './admin/Sidebar';
import { Outlet } from 'react-router-dom';
import { Typography } from '@mui/joy';
import { useState, useEffect } from 'react';
import axios from 'axios';
import ImageProfile from '../../src/assets/img/images.png'

const DashboardPage = () => {

  const [namaProfil, setNamaProfil] = useState('');
  const [kelasProfil, setKelasProfil] = useState('');

  const dataProfile = async () => {
    const guru_id = localStorage.getItem('guru_id');
    try {
      const response = await axios.get(`http://localhost:8000/api/guru/${guru_id}/`);
      const data = response.data;
      console.log('ini adalah data: ',data)
      setNamaProfil(data.nama); // Set the name profile
      setKelasProfil(data.kelas.nama); // Set the class profile
    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
  };

  useEffect(() => {
    dataProfile(); // Fetch the data when the component mounts
  }, []);

  return (
    <>
      <Box sx={{ display: 'flex', height: '100%', width: '100%', bgcolor: 'white' }}>
        <Sidebar basePath="/admin" nameprofile={namaProfil} classprofile={kelasProfil} photo={ImageProfile}/>
        <Box sx={{ width: '100%', height: 'auto' }}>
          <Header />
          <Outlet />
        </Box>
      </Box>
    </>
  );
};

export default DashboardPage;
