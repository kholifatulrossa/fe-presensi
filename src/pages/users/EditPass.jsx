import * as React from 'react';
import { useState } from 'react';
import { Box, Input, Radio, Typography, RadioGroup, Textarea, Button, Select, Option } from '@mui/joy';
import { FormControlLabel } from '@mui/material';
import axios from 'axios';

export default function EditPass({ isOpen, onClose }) { 
    const [user, setUser] = useState('')
    const [password, setPassword] = useState([])
    const [confirm, setConfirm] = useState([])

    const validatePass = () => {
        if (password !== confirm) {
          alert('Konfirmasi password salah');
          return false;
        }
        return true;
      };

  React.useEffect(() => {
      const fetchSiswa = async () => {
        try {
        const siswa_id = localStorage.getItem('siswa_id')
        const response = await axios.get(`http://localhost:8000/api/user/?siswa_id=${siswa_id}`)
        console.log('Berikut data response: ', response.data[0].id)
        if (response.data[0]){
            setUser(response.data[0].id)
            console.log('Data id berhasil diambil: ', response.data[0].id)
        }else{
            console.error('Data id gagal diambil/tidak ada dalam response')
        }
      }catch(error){
        console.error('Error fetching user data: ', error)
      }
    };

    fetchSiswa();
  }, []);
  
  const handleEdit = async() => {
    if (!user){
        alert('User ID belum ditemukan')
        return
    }
    try{
        const siswa_id = localStorage.getItem('siswa_id')
        const response = await axios.patch(`http://localhost:8000/api/user/${user}/`, { siswa_id: siswa_id, password: confirm})
        console.log(response.data)
        alert('Password berhsil diubah')
    }catch(error){
        alert('error di', error)
        console.error('Error: ', error)
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validatePass){
        handleEdit()
        console.log('Form submitted');
        onClose(); // Menutup modal setelah submit
    }
  };
  
  return (
    isOpen && (
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
          zIndex: 1000,
        }}
      >
        <Box
          sx={{
            backgroundColor: 'white',
            px: 6,
            py: 5,
            borderRadius: 8,
            width: '40vw',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
            transition: 'transform 0.5s ease',
            transform: isOpen ? 'translateY(0)' : 'translateY(-20px)',
          }}
          component="form"
          onSubmit={handleSubmit}
        >
          <Typography fontWeight={700} fontSize={20} pb={3} sx={{ color: 'black', fontFamily: 'poppins' }}>
            Form Edit Password
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, border: 'none' }}>
          <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              type="password"
              required
              fullWidth
              sx={{
                py: 2,
                backgroundColor: '#D9D9D9',
                color: '#696969',
                border: 'none',
                fontFamily: 'poppins',
                fontWeight: 500,
              }}
            />
            <Input
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              placeholder="Confirm Password"
              type="password"
              required
              fullWidth
              sx={{
                py: 2,
                backgroundColor: '#D9D9D9',
                color: '#696969',
                border: 'none',
                fontFamily: 'poppins',
                fontWeight: 500,
              }}
            />
          </Box>

          <Box sx={{ gap: 1, py: 3 }}>
            <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
            <Button variant="outlined" sx={{ color: 'gray', border: '2px solid gray', '&:hover': { backgroundColor: 'gray', color: 'white', fontFamily: 'poppins'}}} onClick={onClose}>Cancel</Button>
              <Button
                type="submit"
                variant="solid"
                fontWeight={500}
                fontSize={20}
                sx={{
                  py: 2,
                  px: 4,
                  fontFamily: 'poppins',
                  backgroundColor: '#10C500',
                  '&:hover': { backgroundColor: '#12B104' },
                }}
              >
                Edit
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    )
  );
}
