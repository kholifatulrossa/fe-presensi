import React, { useEffect, useState, useRef } from 'react';
import { Box, Button, Typography } from '@mui/joy';
import ClassRoundedIcon from '@mui/icons-material/ClassRounded';
import Image from '../../assets/img/images.png';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import '@fontsource/poppins';
import FormSiswa from '../components/FormSiswa';
import axios from 'axios';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import Menu from '@mui/joy/Menu';
import MenuItem from '@mui/joy/MenuItem';

export const DataKelas = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [fade, setFade] = useState(false);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const ref = useRef(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (anchorEl && ref.current && !ref.current.contains(event.target)) {
        handleMenuClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [anchorEl]);


  const handleOpen = () => {
    setFade(true);
    setTimeout(() => setIsOpen(true), 50);
  };

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(() => setFade(false), 500);
  };

  // pop up notification
  const showNotificationRef = useRef(null);

  const handleNotificationTrigger = (trigger) => {
    showNotificationRef.current = trigger;
  };

  const handleClick = () => {
    if (showNotificationRef.current) {
      showNotificationRef.current("Successful accept all!", "Info!");
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        handleToClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/siswa'); // Replace with your API URL
        setStudents(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>Error fetching data: {error.message}</Typography>;

  return (
    <>
      <Box ref={ref} sx={{ backgroundColor: '#F5F5FF', width: '100%', height: '100vh' }}>
        <Box sx={{ p: 3 }}>
          <Typography
            level="p"
            sx={{
              fontWeight: '600',
              fontSize: 20,
              color: 'black',
              fontFamily: 'Poppins',
            }}
          >
            Data siswa kelas...
          </Typography>
          <Typography sx={{ color: '#1B1F3B', fontWeight: '440', fontSize: 16, fontFamily: 'poppins' }}>
            Berikut adalah data siswa kelas ... tahun pelajaran ...
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button 
              onClick={handleOpen} 
              sx={{ 
                padding: '20px 40px', 
                backgroundColor: 'white',
                color: '#4D91FF', 
                fontSize: 20, 
                fontWeight: '600', 
                boxShadow: '2px 2px 10px 2px rgba(0, 0, 0, 0.1)', 
                '&:hover': { 
                  backgroundColor: '#F9F9F9', 
                  color: '#4D91FF'
                }
              }}
            >
              Tambah Data
            </Button>
            <FormSiswa isOpen={isOpen} onClose={handleClose} />
          </Box>
        </Box>
        <Box 
          sx={{ 
            display: 'flex', 
            justifyContent: 'flex-start', 
            alignItems: 'center', 
            gap: 3, 
            flexWrap: 'wrap', 
            maxWidth: '90vw', 
            px: 3.5
          }}
        >
          {students.map((student) => (
            <Box 
              key={student.id}
              sx={{ 
                backgroundColor: 'white', 
                boxShadow: '2px 2px 10px 2px rgba(0, 0, 0, 0.1)', 
                width: '22vw', 
                padding: '30px 30px', 
                borderRadius: 8
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', pb: 2.5, justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <img src={Image} alt="student" style={{ borderRadius: '100%', width: '60px' }}/>                  
                <Typography sx={{ fontWeight: 'bold', fontSize: 20, pl: 3, fontFamily: 'poppins' }}>
                  {student.nama}
                </Typography>
                </Box>
              <MoreVertRoundedIcon 
              aria-controls={open ? 'dropdown-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleMenuOpen}
              sx={{ cursor: 'pointer' }}
              />
            <Menu
            id="dropdown-menu"
            anchorEl={anchorEl}
              open={open}
              onClose={handleMenuClose}
              sx={{ backgroundColor: 'white', border: 'none' }}
            >
              {/* Dropdown items */}
              <MenuItem sx={{ color: 'black', '&:hover': { backgroundColor: '#f5f5f9' } }}>
                Edit
              </MenuItem>
              <MenuItem sx={{ color: 'black', '&:hover': { backgroundColor: '#f5f5f9' } }}>
                Hapus
              </MenuItem>
            </Menu>
              </Box>
              <Box sx={{ display: 'flex', gap: 1, color: '#6f707d', pb: 1 }}>
                <PersonRoundedIcon sx={{ pl: 2 }} />
                <Typography sx={{ fontFamily: 'poppins' }}>{student.nisn}</Typography>  
              </Box>
              <Box sx={{ display: 'flex', gap: 1, color: '#6f707d' }}>
                <ClassRoundedIcon sx={{ pl: 2 }} />
                <Typography sx={{ fontFamily: 'poppins' }}>{student.kelas.nama}</Typography>  
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </>
  );
};
