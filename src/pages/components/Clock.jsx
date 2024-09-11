import React, { useState, useEffect } from 'react';
import { Typography, Box, Button } from '@mui/joy';

const Clock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer); // Bersihkan interval saat komponen di-unmount
  }, []);

  return (
    <Box
      sx={{ width: '30vw', py: 2.4 }}
    >
      <Typography variant="h1" color="textPrimary" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '80px', fontWeight: '500' }}>
        {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit',hour12: false })}
      </Typography>
      <Box
      sx={{
        display: 'flex',
        justifyContent: 'center', // Center horizontally
        alignItems: 'center', // Center vertically if needed
        paddingTop: '30px'
      }}
    >
      <Button
        sx={{ 
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '20px 50px',
          backgroundColor: '#4D91FF',
          fontSize: 20,
          fontWeight: 'bold',
          color: 'white',
        }}
      >
        Datang
      </Button>
    </Box>

    </Box>
  );
};

export default Clock;
