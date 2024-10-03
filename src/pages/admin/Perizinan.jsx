import React, { useEffect, useRef, useState } from 'react';
import { Box, Typography, Button, IconButton, Menu, MenuItem } from '@mui/joy';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Logo from '../../assets/img/logo.png';
import PopUpForm from '../components/FormIzin';
import NotificationPopup from '../components/Alert';
import dayjs from 'dayjs';
import axios from 'axios';

export const Perizinan = () => {
  // Hooks harus berada di level atas tanpa perubahan urutan
  const [isOpen, setIsOpen] = useState(false);
  const [fade, setFade] = useState(false);
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [anchorEl, setAnchorEl] = useState(null);
  const [isPerBulan, setIsPerBulan] = useState(false); // State for 'Per Bulan'
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useRef tidak boleh ditempatkan di dalam kondisi atau fungsi bersyarat
  const showNotificationRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const time = isPerBulan 
          ? selectedDate.format('YYYY-MM')
          : selectedDate.format('YYYY-MM-DD');

        const response = await axios.get(`http://localhost:3000/api/kehadiran/status?status=IZIN&tanggal=${time}`);
        setStudents(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedDate, isPerBulan]);

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>Error fetching data: {error.message}</Typography>;

  const handleOpen = () => {
    setFade(true);
    setTimeout(() => setIsOpen(true), 50);
  };

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(() => setFade(false), 500);
  };

  const handleNotificationTrigger = (trigger) => {
    showNotificationRef.current = trigger;
  };

  const handleClick = () => {
    if (showNotificationRef.current) {
      showNotificationRef.current('Successful accept all!', 'Info!');
    }
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handlePerBulan = () => {
    setIsPerBulan(true);
    handleMenuClose();
  };

  const handlePerTanggal = () => {
    setIsPerBulan(false);
    handleMenuClose();
  };

  return (
    <>
      <Box sx={{ backgroundColor: '#f5f5ff', width: '100%', height: '100vh' }}>
        <Box sx={{ p: 3.5 }}>
          <Box sx={{ p: '0 0 15px 0', gap: '18px', display: 'flex', justifyContent: 'space-between' }}>
            <Box
              sx={{
                backgroundColor: 'white',
                display: 'flex',
                alignItems: 'center',
                padding: '10px 15px',
                borderRadius: 8,
                boxShadow: '2px 2px 10px 2px rgba(0, 0, 0, 0.1)',
              }}
            >
              {/* Conditional rendering based on 'Per Bulan' state */}
              {isPerBulan ? (
                <Typography
                  sx={{
                    backgroundColor: 'white',
                    padding: '16px 16px',
                    borderRadius: '8px',
                    fontFamily: 'Poppins',
                    fontWeight: '500',
                    fontSize: 16,
                  }}
                >
                  Per Bulan
                </Typography>
              ) : (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    value={selectedDate}
                    onChange={(newValue) => setSelectedDate(newValue)}
                    renderInput={({ inputRef, inputProps }) => (
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <IconButton ref={inputRef} {...inputProps} sx={{ p: 1 }}>
                          <CalendarTodayIcon />
                        </IconButton>
                        <Typography
                          sx={{
                            backgroundColor: 'white',
                            padding: '8px 16px',
                            borderRadius: '8px',
                            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                            fontFamily: 'Poppins',
                            fontWeight: '500',
                            fontSize: 16,
                            ml: 1,
                          }}
                        >
                          {selectedDate.format('YYYY-MM-DD')}
                        </Typography>
                      </Box>
                    )}
                  />
                </LocalizationProvider>
              )}

              {/* Dropdown Menu Button */}
              <IconButton sx={{ ml: 2 }} onClick={handleMenuOpen}>
                <MoreVertIcon />
              </IconButton>
              <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                <MenuItem onClick={handlePerBulan}>Per Bulan</MenuItem>
                <MenuItem onClick={handlePerTanggal}>Per Tanggal</MenuItem>
              </Menu>
            </Box>

            <Box sx={{ display: 'flex', gap: 3 }}>
              <Button
                onClick={handleOpen}
                sx={{
                  padding: '20px 40px',
                  backgroundColor: '#4D91FF',
                  color: 'white',
                  fontSize: 20,
                  fontWeight: '600',
                  boxShadow: '2px 2px 10px 2px rgba(0, 0, 0, 0.1)',
                  '&:hover': { color: 'white' },
                }}
              >
                +  Tambah Data
              </Button>
              {fade && <PopUpForm isOpen={isOpen} onClose={handleClose} />} 
              {/* <Button
                onClick={handleClick}
                sx={{
                  padding: '20px 40px',
                  backgroundColor: '#4D91FF',
                  color: 'white',
                  fontSize: 20,
                  fontWeight: '600',
                  boxShadow: '2px 2px 10px 2px rgba(0, 0, 0, 0.1)',
                  '&:hover': { color: 'white' },
                }}
              >
                Accept All
              </Button>  */}
              {/* <NotificationPopup triggerNotification={handleNotificationTrigger} /> */}
            </Box>
          </Box>

          <Box
            sx={{
              display: 'flex',           // Menyusun elemen secara horizontal
              flexWrap: 'wrap',           // Mengizinkan elemen wrap jika ada terlalu banyak item untuk satu baris
              gap: 3,                     // Jarak antar Box
              justifyContent: 'flex-start', // Mengatur posisi elemen dalam satu baris
            }}
          >
            {students.map((student) => (
              <Box
                key={student.id}
                sx={{
                  backgroundColor: '#4D91FF',
                  display: 'flex',
                  alignItems: 'center',
                  boxShadow: '2px 2px 10px 2px rgba(0, 0, 0, 0.1)',
                  width: '25vw',
                  height: 'auto',
                  padding: '0 0 0 10px',
                  borderRadius: '8px',
                  flexDirection: 'row', // Menata konten dalam Box secara horizontal
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    backgroundColor: 'white',
                    width: '30vw',
                    height: '117px',
                    borderRadius: '0 8px 8px 0',
                    flexDirection: 'row', // Menata konten di dalam Box ini secara horizontal
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', p: 3 }}>
                    <img src={Logo} alt="" style={{ width: '60px', height: 'auto' }} />
                    <Box sx={{ pl: 3 }}>
                      <Typography sx={{ color: 'black', fontWeight: '600', fontSize: 20, fontFamily: 'poppins' }}>
                        {student.siswa.nama}
                      </Typography>
                      <Typography sx={{ color: 'black', fontWeight: '500', fontSize: 18, fontFamily: 'poppins' }}>
                        {student.siswa.kelas.nama}
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', flex: 1, p: 2, justifyContent: 'flex-end', ml: 'auto' }}>
                    <Button onClick={handleOpen} sx={{ color: 'white', backgroundColor: '#4D91FF', p: '10px 25px', mr: 5 }}>
                      Detail
                    </Button>
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>

        </Box>
      </Box>
    </>
  );
};
