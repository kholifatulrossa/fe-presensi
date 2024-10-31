import React, { useEffect, useState } from 'react';
import Sidebar from './admin/Sidebar';
import Header from './admin/Header';
import Box from '@mui/joy/Box';
import { Outlet } from 'react-router-dom';
import axios from 'axios';
import '@fontsource/poppins'

export const Dashboard = () => {
  const [namaProfil, setNamaProfil] = useState('');
  const [kelasProfil, setKelasProfil] = useState('');

  const dataProfile = async () => {
    const siswa_id = localStorage.getItem('siswa_id');
    try {
      const response = await axios.get(`http://localhost:8000/api/siswa/${siswa_id}/`);
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
        <Sidebar showDashboardOnly={true} basePath="/users" nameprofile={namaProfil} classprofile={kelasProfil}/>
        <Box sx={{ width: '100%', height: 'auto' }}>
          <Header />
          <Outlet />
        </Box>
      </Box>
    </>
  );
};
