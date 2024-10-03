import React, { useState, useEffect } from 'react';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import '@fontsource/poppins';
import Clock from '../components/Clock';
import FourCard from '../components/4card2';
import { Navigate } from 'react-router-dom';
import BasicTable from '../components/Table';

// Function to get formatted date
const getFormattedDate = () => {
  const today = new Date();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = today.toLocaleDateString('id-ID', options); // id-ID for Indonesian locale
  return formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1); // Capitalize first letter
};

export const DashUsers = () => {
  const [currentDate, setCurrentDate] = useState('');

  
  useEffect(() => {
    setCurrentDate(getFormattedDate());
  }, []);
  
  if (localStorage.getItem('token') == null) {
    return <Navigate to={"/"} />
  }

  return (
    <>
      <Box sx={{ backgroundColor: '#F5F5FF', width: 'auto', height: 'auto' }}>
        <Box sx={{ p: 3 }}>
          <Typography
            level="p"
            sx={{
              fontWeight: '600',
              fontSize: 17,
              color: 'black',
              fontFamily: 'Poppins',
            }}
          >
            Selamat Datang, Siswa!
          </Typography>
          <Typography sx={{ color: '#1B1F3B', fontWeight: '440', fontSize: 14.5, fontFamily: 'poppins' }}>
            Silahkan catat presensi terlebih dahulu!
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: { xs: 'start', sm: 'center' },
            mx: 3,
            mb: 2,
            flexWrap: 'wrap',
            gap: 4,
          }}
        >
          <Box sx={{ display: 'flex', gap: 3, alignItems: 'center' }}>
            <Box
              sx={{
                backgroundColor: 'white',
                p: 5,
                borderRadius: 10,
                width: 'auto',
                height: 'auto',
                boxShadow: '2px 2px 10px 2px rgba(0, 0, 0, 0.1)',
              }}
            >
              <Clock />
            </Box>
            <FourCard />
          </Box>
          <Box
            sx={{
              backgroundColor: 'white',
              p: 5,
              borderRadius: 10,
              width: 'auto',
              height: 'auto',
              boxShadow: '2px 2px 10px 2px rgba(0, 0, 0, 0.1)',
            }}
          >
            <BasicTable showFilterButton={true} showSearchButton={false} showPDFExport={false} />
          </Box>
        </Box>
      </Box>
    </>
  );
};
