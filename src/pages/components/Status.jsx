import React, { useState, useEffect } from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';

const StatusBox = () => {

  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');

  const date = `${year}-${month}-${day}`

  const [status, setStatus] = useState(null); // Menyimpan status dari API
  const [loading, setLoading] = useState(true); // Menyimpan state loading

  // Simulasi pemanggilan API
  useEffect(() => {
    const fetchStatus = async () => {
      setLoading(true); // Set loading jadi true saat mulai fetch
      try {
        // Simulasi fetch data dari API
        const response = await fetch('https://localhost:3000/status'); // Ganti dengan URL API Anda
        const data = await response.json();
        setStatus(data.status); // Status yang didapatkan dari API
      } catch (error) {
        console.error('Error fetching status:', error);
      } finally {
        setLoading(false); // Selesai fetch, set loading jadi false
      }
    };

    fetchStatus();
  }, []);

  // Jika masih loading, tampilkan loading spinner
  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: 100,
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        width: 300,
        height: 100,
        backgroundColor: status === "hadir" ? 'green' : 'red', // Warna Box sesuai status
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,
        color: 'white', // Warna Typography putih
      }}
    >
      <Typography variant="h6">
        {status === "hadir" ? "Hadir" : "Alpha"}
      </Typography>
    </Box>
  );
};

export default StatusBox;
