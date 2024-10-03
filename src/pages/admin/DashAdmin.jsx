import React from 'react';
import { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/joy';
import Clock from '../components/Clock';
import FourCard from '../components/4card2';
import BasicTable from '../components/Table';  // Import your BasicTable component
import axios from 'axios';

export const MainDash = () => {
  const [tableData, setTableData] = useState([]); // State to hold the table data

  useEffect(() => {
    // Fetch data from API
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/kehadiran');
        setTableData(response.data); // Assume the response contains an array of rows
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Box sx={{ backgroundColor: '#F5F5FF', height: 'auto', width: 'auto' }}>
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
        }}>
        <Box sx={{ display: 'flex', gap: 3, alignItems: 'center' }}>
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
          }}>
          <BasicTable data={tableData} /> {/* Pass the fetched data as a prop */}
        </Box>
      </Box>
    </Box>
  );
};

export default MainDash;
