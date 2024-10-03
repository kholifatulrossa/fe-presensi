import * as React from 'react';
import { Box, Input, Select, Option, Typography, Button } from '@mui/joy';
import axios from 'axios';
import client from '../../router/Client';

export default function FormSiswa({ isOpen, onClose }) {
  const [classes, setClasses] = React.useState([]);
  const modalRef = React.useRef(null);
  const selectRef = React.useRef(null); // Ref for the Select component

  const [nisn, setNisn] = React.useState('');
  const [nama, setNama] = React.useState('');
  const [kelasId, setKelasId] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirm, setConfirm] = React.useState('');

  const validatePass = () => {
    if (password !== confirm) {
      alert('Konfirmasi password salah');
      return false; // return false to stop form submission if passwords do not match
    }
    return true;
  };

  React.useEffect(() => {
    // Fetch the class options
    const fetchClasses = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/kelas');
        setClasses(response.data); // Assuming response.data is an array of class objects
      } catch (error) {
        console.error('Error fetching classes:', error);
      }
    };

    fetchClasses();
  }, []);

  const handleTambah = async () => {
    if (!nisn) {
      alert('Masukkan NISN');
      return;
    }

    try {
      const response = await client.post('/siswa', { nisn, nama, kelasId });
      const data = response?.data;
      if (data.message === 'Berikan password') {
        try {
          const siswaId = data.siswa.id;
          const response2 = await client.post('/user', { siswaId, confirm });
          const data2 = response2?.data;
          if (data2.message === 'Berhasil membuat data User') {
            console.log(data2);
          }
        } catch (error) {
          console.error('Error user: ', error);
        }
      }
    } catch (error) {
      console.error('Error siswa: ', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent form reload
    if (validatePass()) {
      handleTambah(); // Only call handleTambah if passwords match
      console.log('Form submitted');
      onClose();
    }
  };

  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target) &&
        selectRef.current &&
        !selectRef.current.contains(event.target) // Check if click is outside of the Select
      ) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

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
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 1000,
        }}
      >
        <Box
          ref={modalRef}
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
          onSubmit={handleSubmit} // Use handleSubmit to handle form submission
        >
          <Typography fontWeight={700} fontSize={20} sx={{ color: 'black', fontFamily: 'poppins' }}>
            Form Tambah Data Siswa
          </Typography>
          <Typography fontWeight={500} fontSize={14} color="black" mb={3} sx={{ fontFamily: 'poppins' }}>
            Silahkan isi form di bawah ini!
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.9 }}>
            <Input
              value={nisn}
              onChange={(e) => setNisn(e.target.value)}
              placeholder="NISN"
              type="number"
              required
              fullWidth
              sx={{
                py: 2,
                backgroundColor: '#D9D9D9',
                color: '#696969',
                border: 'none',
                fontFamily: 'poppins',
                fontWeight: 500,
                '& input[type=number]': {
                  '-moz-appearance': 'textfield', // Firefox
                },
                '& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button': {
                  '-webkit-appearance': 'none', // Chrome, Safari, Edge, Opera
                  margin: 0,
                },
              }}
            />
            <Input
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              placeholder="Nama"
              type="text"
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

            <Select
              ref={selectRef} // Attach the ref to the Select component
              value={kelasId}
              onChange={(event, newValue) => setKelasId(newValue)} // Use newValue from MUI's Select
              placeholder="Kelas"
              required
              fullWidth
              sx={{ py: 2, backgroundColor: '#D9D9D9', color: '#696969', border: 'none', fontFamily: 'poppins', fontWeight: 500 }}
            >
              {classes.map((kelas) => (
                <Option key={kelas.id} value={kelas.id}>
                  {kelas.nama}
                </Option>
              ))}
            </Select>

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
              <Button
                type="button"
                onClick={onClose}
                variant="solid"
                fontWeight={500}
                fontSize={20}
                sx={{
                  py: 2,
                  px: 4,
                  fontFamily: 'poppins',
                  backgroundColor: '#F15C5C',
                  '&:hover': { backgroundColor: '#e64545' },
                }}
              >
                Cancel
              </Button>
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
                Submit
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    )
  );
}
  