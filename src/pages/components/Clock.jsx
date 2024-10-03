import React, { useState, useEffect } from 'react';
import { Typography, Box, Button } from '@mui/joy';
import axios from 'axios';

const getFormattedDate = () => {
  const today = new Date();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = today.toLocaleDateString('id-ID', options);
  return formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
}

const Clock = () => {
  const [time, setTime] = useState(new Date());
  const [currentDate, setCurrentDate] = useState('');
  const [buttonState, setButtonState] = useState('Datang'); // State untuk tombol

  useEffect(() => {
    setCurrentDate(getFormattedDate());
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer); // Bersihkan interval saat komponen di-unmount
  }, []);

  const handleButtonClick = async () => {
    if (buttonState === 'Datang') {
      try {
        const response = await axios.post('http://localhost:3000/api/siswa/kehadiran', {
          siswaId: 1,
          status: 'HADIR'
        }, {
          headers: {
            'Content-Type': 'application/json',
            // Tambahkan header lain jika perlu
          }
        });
      
        // Respons dari API sudah di-parse oleh axios
        const data = response.data;
        
        // Tangani respons dari API jika perlu
        console.log('API Response:', data);
        alert('Berhasil melakukan aksi datang');
      } catch (error) {
        console.error('Error:', error);
        alert('Gagal melakukan aksi datang');
      }      
      
      setButtonState('Pulang');
    } else {
      // Handle case for "Pulang" if needed
      try{
        const response = await axios.post('http://localhost:3000/api/pulang/1', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        })
        const data = await response.json();

        console.log('API Response: ', data);
        alert('Berhasil melakukan aksi pulang')
      }catch(error) {
        console.error('Error: ', error)
        alert("Gagal melakukan aksi pulang")
      }
      alert('Tombol saat ini adalah Pulang');
    }setButtonState('Datang')
  };

  return (
    <Box sx={{ width: '30vw', py: 1 }}>
      <Typography sx={{ display: 'flex', justifyContent: 'center', fontWeight: '500', fontSize: 20, color: 'gray', fontFamily: 'poppins' }}>
        {currentDate}
      </Typography>
      <Typography variant="h1" color="textPrimary" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '80px', fontWeight: '500' }}>
        {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })}
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', paddingTop: '30px' }}>
        <Button
          onClick={handleButtonClick}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '20px 50px',
            backgroundColor: buttonState === 'Datang' ? '#4D91FF' : '#F15C5C',
            fontSize: 20,
            fontWeight: 'bold',
            color: 'white',
            '&:hover': {
              backgroundColor: buttonState === 'Datang' ? '#3D7BD9' : '#D12D2D', // Warna hover yang lebih gelap
            },
          }}
        >
          {buttonState}
        </Button>
      </Box>
    </Box>
  );
};

export default Clock;
