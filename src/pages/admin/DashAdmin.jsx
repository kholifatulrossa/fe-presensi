import React from 'react';
import { Box, Typography } from '@mui/joy';
import Clock from '../components/Clock';
import { useTheme } from '@mui/joy/styles';
import CustomTable from '../components/Table';
import FourCard from '../components/FourCard';

export const MainDash = () => {
  return (
    <>
      <Box sx={{ backgroundColor: '#F5F5FF', height: 'auto' }}>
        <Box sx={{ p: 3 }}>
          <Typography
            level="p"
            sx={{
              fontWeight: '600',
              fontSize: 17,
              color: 'black',
              fontFamily: 'Poppins',
            }}>
            Selamat Datang, Admin!
          </Typography>
          <Typography sx={{ color: '#1B1F3B', fontWeight: '440', fontSize: 14.5, fontFamily: 'poppins' }}>Silahkan catat presensi terlebih dahulu!</Typography>
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
          }}>
          <Box
            sx={{
              backgroundColor: 'white',
              p: 5,
              borderRadius: 10,
              width: 'auto',
              height: 'auto',
              boxShadow: '2px 2px 10px 2px rgba(0, 0, 0, 0.1)',
            }}>
            <Clock />
          </Box>
          <Box
            sx={{
              backgroundColor: 'white',
              p: 5,
              borderRadius: 10,
              width: '100%',
              height: 'auto',
              boxShadow: '2px 2px 10px 2px rgba(0, 0, 0, 0.1)',
              color: 'black',
            }}>
            <FourCard />
          </Box>
          <Box
            sx={{
              backgroundColor: 'white',
              p: 5,
              borderRadius: 10,
              width: '100%',
              height: 'auto',
              boxShadow: '2px 2px 10px 2px rgba(0, 0, 0, 0.1)',
              color: 'black',
            }}>
            <CustomTable />
          </Box>
        </Box>
      </Box>
    </>
  );
};
export default MainDash;
