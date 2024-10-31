import React, { useState, useEffect } from 'react';
import { Typography, Box, Button } from '@mui/joy';
import axios from 'axios';

const getFormattedDate = () => {
  const today = new Date();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = today.toLocaleDateString('id-ID', options);
  return formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
};

const Clock = ({ ViewButton, onAttendanceChange }) => {
  const [time, setTime] = useState(new Date());
  const [currentDate, setCurrentDate] = useState('');
  const [buttonState, setButtonState] = useState('Datang');
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [hasCheckedIn, setHasCheckedIn] = useState(false);

  useEffect(() => {
    setCurrentDate(getFormattedDate());
    checkAttendance(); // Check attendance on component mount
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
      handleTimeBasedButtonState();
    }, 1000);

    return () => clearInterval(timer);
  }, [time]);

  const handleTimeBasedButtonState = () => {
    if (hasCheckedIn && buttonState === 'Pulang') {
      // Don't disable the "Pulang" button
      setButtonDisabled(false);
    }
  };

  const checkAttendance = async () => {
    const tanggalHariIni = new Date().toISOString().slice(0, 10); // Format YYYY-MM-DD
    const siswa_id = localStorage.getItem('siswa_id');

    try {
      // Check if the student has already checked in today
      const response = await axios.get(`http://localhost:8000/api/kehadiran/`, {
        params: {
          siswa_id: siswa_id,
          tanggal: tanggalHariIni,
        },
      });

      const attendance = response.data;

      if (attendance.length > 0) {
        const { wktdatang, wktpulang } = attendance[0];

        if (wktdatang && wktpulang) {
          console.log('wktdatang: ', wktdatang, 'wktpulang: ', wktpulang);
          setButtonDisabled(true); // Disable the button if both wktdatang and wktpulang are filled
        } else if (wktdatang) {
          setButtonState('Pulang');
          setHasCheckedIn(true); // Prevent double check-in
        }
      }
    } catch (error) {
      console.error('Error checking attendance:', error);
    }
  };

  const checkForMissingAttendance = async () => {
    const siswa_id = localStorage.getItem('siswa_id');
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    const tanggalKemarin = yesterday.toISOString().slice(0, 10); // Format YYYY-MM-DD
    const dayOfWeek = yesterday.getDay(); // Check yesterday's day

  };

  const handleButtonClick = async () => {
    if (buttonDisabled) return;

    const tanggalHariIni = new Date().toISOString().slice(0, 10); // Format YYYY-MM-DD
    const formattedTime = new Date().toTimeString().slice(0, 8); // Format HH:MM:SS
    const siswa_id = localStorage.getItem('siswa_id');

    try {
      if (buttonState === 'Datang') {
        // Check-in process
        const currentHour = time.getHours();
        const currentMinute = time.getMinutes();
        let status = 'HADIR'; // Default status

        if (currentHour >= 8 && currentHour < 24) {
          status = 'TELAT'; // Status becomes "TELAT" if later than 7:30
        }

        await axios.post('http://localhost:8000/api/kehadiran/', {
          tanggal: tanggalHariIni,
          wktdatang: formattedTime,
          wktpulang: null,
          status: status, // Record status as "HADIR" or "TELAT"
          siswa_id: siswa_id,
          keterangan: null,
        }, {
          headers: { 'Content-Type': 'application/json' },
        });

        alert(`Berhasil melakukan aksi datang dengan status ${status}`);
        setButtonState('Pulang'); // Switch button to 'Pulang'
        setHasCheckedIn(true); // Mark student as checked in
      } else if (buttonState === 'Pulang') {
        // Check-out process
        const response = await axios.get(`http://localhost:8000/api/kehadiran/`, {
          params: { siswa_id, tanggal: tanggalHariIni },
        });

        if (response.data.length > 0) {
          const attendanceId = response.data[0].id; // Get attendance ID
          
          // Patch the attendance with 'wktpulang'
          await axios.patch(`http://localhost:8000/api/kehadiran/${attendanceId}/`, {
            wktpulang: formattedTime,
          }, {
            headers: { 'Content-Type': 'application/json' },
          });

          alert('Berhasil melakukan aksi pulang');
          setButtonDisabled(true); // Disable the button after check-out
          setButtonState('Datang'); // Optionally reset button state to 'Datang' for the next day
        }
      }

      // Re-check attendance after submitting to update button state
      checkAttendance(); // Call checkAttendance to update the UI

      if (onAttendanceChange) {
        onAttendanceChange(); // Notify parent component of attendance change
      }
    } catch (error) {
      console.error('Error checking or submitting attendance:', error);
      alert('Terjadi kesalahan saat memeriksa atau mengirim kehadiran.');
    }
  };

  return (
    <Box sx={{ width: '30vw', py: 1 }}>
      <Typography sx={{ display: 'flex', justifyContent: 'center', fontWeight: '500', fontSize: 20, color: 'gray', fontFamily: 'poppins' }}>
        {currentDate}
      </Typography>
      <Typography variant="h1" color="textPrimary" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '80px', fontWeight: '500' }}>
        {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })}
      </Typography>
      {ViewButton && (
        <Box sx={{ display: 'flex', justifyContent: 'center', paddingTop: '30px' }}>
          <Button
            onClick={handleButtonClick}
            disabled={buttonDisabled}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '20px 50px',
              backgroundColor: buttonDisabled ? 'gray' : (buttonState === 'Datang' ? '#4D91FF' : '#F15C5C'),
              fontSize: 20,
              fontWeight: 'bold',
              color: 'white',
              '&:hover': {
                backgroundColor: buttonDisabled ? 'gray' : (buttonState === 'Datang' ? '#3D7BD9' : '#D12D2D'),
              },
            }}
          >
            {buttonState}
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default Clock;
