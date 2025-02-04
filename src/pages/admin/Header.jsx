import { Box, Typography } from '@mui/joy';
import React from 'react';
import { useLocation } from 'react-router-dom';

export default function Header() {
  const location = useLocation();
  const getHeaderText = () => {
    switch (location.pathname) {
      case '/admin/perizinan':
        return 'Permohonan Izin';
      case '/admin':
      case '/admin/':
      case '/users':
      case '/users/':
            return 'Dashboard';
      case '/admin/dataKelas':
        return 'Data Kelas';
      case '/admin/profil':
      case '/users/profil':
        return "Profil"
    }
  };
  return (
    <>
      <Box
        sx={{
          width: '100%',
          borderBottom: '1px solid #B4B4B8',
          alignItems: 'center',
          position: 'sticky',
          height: 40,
          display: 'flex',
          py: 2,
        }}>
        <Typography
          level="tittle-lg"
          component="p"
          style={{ fontFamily: 'poppins' }}
          sx={{
            fontWeight: 'bold',
            ml: 5,
            fontSize: 17,
            color: 'black',
          }}>
          {getHeaderText()}
        </Typography>
      </Box>
    </>
  );
}
