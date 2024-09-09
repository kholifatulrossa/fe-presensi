import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import React from 'react';
import Header from './admin/Header';
import Sidebar from './admin/Sidebar';
import { Outlet } from 'react-router-dom';

const DashboardPage = () => {
  return (
    <>
      <Box sx={{ display: 'flex', height: '100%', width: '100vw', bgcolor: 'white' }}>
        <Sidebar />
        <Box sx={{ width: '100%', height: 'auto' }}>
          <Header />
          <Outlet />
        </Box>
      </Box>
    </>
  );
};

export default DashboardPage;
