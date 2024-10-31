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
import Avatar from '@mui/joy/Avatar';
import EditSiswa from '../components/EditSiswa';

export const DataKelas = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [fade, setFade] = useState(false);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const ref = useRef(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [selectedStudent, setSelectedStudent] = useState(''); // Menyimpan siswa yang dipilih
  const [isAvataropen, setAvatarOpen] = useState(false)
  

  const handleAvatarClick = () => {
    setAvatarOpen(true)
  }

  const handleAvatarUnclick = () => {
    setAvatarOpen(false)
  }

  const handleMenuToggle = (event, studentId) => {
    setAnchorEl((prev) => (prev ? null : event.currentTarget));
    setSelectedStudent(studentId); // Simpan ID siswa yang dipilih
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

    const fetchData = async () => {
      const guru_id = localStorage.getItem('guru_id')
      try{
        const response1 = await axios.get(`http://localhost:8000/api/guru/${guru_id}/`)
        const data1 = response1.data
        try {
          const kelas_id = data1.id
          const response = await axios.get('http://localhost:8000/api/siswa/', { params: { kelas_id: kelas_id } }); // Replace with your API URL
          setStudents(response.data.output);
          setLoading(false);
        } catch (error) {
          setError(error);
          setLoading(false);
        }
      }catch(error){
        console.error('Error cant get the kelas id from guru', error)
      }
    };
  useEffect(() => {
    fetchData()
  }, [])



  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>Error fetching data: {error.message}</Typography>;

  return (
    <>
      <Box ref={ref} sx={{ backgroundColor: '#F5F5FF', width: '100%', height: '100vh' }}>
        <Box sx={{ p: 3 }}>
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
            <FormSiswa isOpen={isOpen} onClose={handleClose} refreshStudents={fetchData}/>
          </Box>
        </Box>
        <Box 
          sx={{ 
            display: 'flex', 
            justifyContent: 'flex-start', 
            alignItems: 'center', 
            gap: 3, 
            flexWrap: 'wrap', 
            maxWidth: '100vw', 
            px: 3.5
          }}
        >
          {students.map((student) => (
            <Box 
              key={student.id}
              sx={{ 
                backgroundColor: 'white', 
                boxShadow: '2px 2px 10px 2px rgba(0, 0, 0, 0.1)', 
                width: '16.9vw', 
                padding: '30px 30px', 
                borderRadius: 8
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', pb: 2.5, justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar alt="" style={{ width: '4vw', height: '4vw', borderRadius: '50%', cursor: 'pointer' }}
                onClick={() => { setSelectedStudent(student.id); handleAvatarClick(); }} />
                <EditSiswa isOpen={isAvataropen} onClose={handleAvatarUnclick} studentId={selectedStudent} refreshStudents={fetchData}/>
                <Typography sx={{ fontWeight: 'bold', fontSize: 20, pl: 3, fontFamily: 'poppins' }}>
                  {student.nama}
                </Typography>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', gap: 1, color: '#6f707d', pb: 1 }}>
                <PersonRoundedIcon sx={{ pl: 2}} />
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
