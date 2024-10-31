import { Input } from '@mui/joy';
import { Box, Button, Grid, Link, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import React, { useRef, useState } from 'react';
import Logo from '../assets/img/logo.png'
import axios from 'axios';
import imageLogin from '../assets/img/login.png'

export default function Login() {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!identifier) {
      alert('Masukkan NIP atau NISN');
      return;
    }
  
    try {
      const response = await axios.post('http://localhost:8000/api/login/', { identifier, password });
      const datas = response.data;
      console.log('Response data:', datas);
  
      if (datas.status == 'success') {
        alert('Berhasil login');
        localStorage.setItem('status', datas.status )
        try{
        if (datas.guru_id === null && datas.siswa_id) {
          localStorage.setItem('siswa_id', datas.siswa_id);
          console.log('Navigating to /users');
          navigate('/users');
        } else if (datas.guru_id) {
          localStorage.setItem('guru_id', datas.guru_id);
          console.log('Navigating to /admin');
          navigate('/admin');
        } else {
          console.error('Guru ID dan Siswa ID tidak ditemukan.');
          alert('Error: Tidak ditemukan ID guru atau siswa.');
        }
      }catch(error){
        console.error('Theres an error: ', error)
      }
      } else {
        console.log('Login failed:', datas);
      }
    } catch (error) {
      console.error('Error: ', error);
      alert('Gagal Login');
    }
  };
  
  
  

  return (
    <>
      <Box
        sx={{
          height: '100vh',
          width: '100vw',
          backgroundRepeat: 'no-repeat',
          background: 'linear-gradient(to right, #DFE6F2, #7AA2E3)',
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          overflow: 'hidden',
          alignItems: 'center',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        }}>
        <Box sx={{ width: '80%', height: '75%', borderRadius: 2, overflow: 'hidden', boxShadow: '0px 4px 10px 4px rgba(0, 0, 0, 0.1)' }}>
          <Grid container sx={{ height: '100%' }}>
          <Grid item xs={6} sx={{ bgcolor: '#7AA2E3', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <img src={imageLogin} alt="Deskripsi Gambar" style={{ width: '95%', height: 'auto' }} />
          </Grid>
            <Grid item xs={6} sx={{ bgcolor: 'white', display: 'flex', alignItems: 'center' }}>
              <Box className="wrapper" sx={{ height: 'auto', width: '100%', px: 18 }}>
                <Box className="tittle" display="flex" alignItems="center" sx={{ width: '100%', justifyContent: 'center', mb: 3 }}>
                  <img src={Logo} alt="Logo" style={{ width: '50px', height: 'auto', mx:8}} />
                  <Typography textAlign="center" fontWeight={600} fontSize={30} sx={{ fontFamily: 'poppins', pl: 2 }}>
                    Presen<span style={{ color: '#4D91FF' }}>Siswa</span>
                  </Typography>
                </Box>
                <form onSubmit={handleSubmit}>
                  <Box className="input-wrapper" pt={6}>
                    <Input
                      variant="solid"
                      placeholder="NIP/NISN"
                      value={identifier}
                      onChange={(e) => setIdentifier(e.target.value)}
                      sx={{
                        padding: 1,
                        paddingLeft: 3,
                        py: 1.5,
                        mb: 1.5,
                        borderRadius: 16,
                        bgcolor: '#D9D9D9',
                        color: '#696969',
                        '&::placeholder': {
                          color: '#696969',
                        },
                      }}
                    />
                    <Input
                      variant="solid"
                      placeholder="Password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      sx={{
                        padding: 1,
                        paddingLeft: 3,
                        py: 1.5,
                        borderRadius: 16,
                        bgcolor: '#D9D9D9',
                        color: '#696969',
                        '&::placeholder': {
                          color: '#696969',
                        },
                      }}
                    />
                  </Box>
                  {/* <Box sx={{" color="#7AA2E3" fontSize={14} underline="none" sx={{ '&:hover': { textDecoration: 'underline' } }}>
                      Forgot Password?
                    </Link>
                  </Box> */}
                  <Box sx={{ display: 'flex', height: 40, width: '100%', alignItems: 'center', justifyContent: 'center', mt: 1, pt: 6}}>
                    <Button variant="contained" type="submit" sx={{ fontFamily: 'Poppins', fontSize: 17, bgcolor: '#7AA2E3', width: 140, height: 50, borderRadius: 180, fontWeight: 'bold', textTransform: 'capitalize' }}>
                      Login
                    </Button>
                  </Box>
                </form>
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Link fontSize={10} href="" fontWeight={400} pt={2} underline="none" sx={{ color: 'GrayText' }}>
          Copyright@2024
        </Link>
      </Box>
    </>
  );
}
