import * as React from 'react';
import { Box, Input, Select, Option, Typography, Button } from '@mui/joy';
import axios from 'axios';
import '@fontsource/poppins'

export default function FormSiswa({ isOpen, onClose, refreshStudents }) {
  const [classes, setClasses] = React.useState([]);
  const [filteredClasses, setFilteredClasses] = React.useState([]);

  const [nisn, setNisn] = React.useState('');
  const [nama, setNama] = React.useState('');
  const [kelas_id, setKelasId] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirm, setConfirm] = React.useState('');

  const validatePass = () => {
    if (password !== confirm) {
      alert('Konfirmasi password salah');
      return false;
    }
    return true;
  };

  React.useEffect(() => {
    const guru_id = localStorage.getItem('guru_id'); // Fetch guru_id from localStorage

    const fetchGuruAndClasses = async () => {
      try {
        // Fetch the classes for the specific guru
        const responseGuru = await axios.get(`http://localhost:8000/api/guru/${guru_id}/`);
        const guruKelasId = responseGuru.data.kelas_id; // Get the kelas_id for the guru
        
        // Fetch all class options
        const responseClasses = await axios.get('http://localhost:8000/api/kelas/');
        const allClasses = responseClasses.data; // Assuming response.data is an array of class objects

        // Filter the classes based on the guru's kelas_id
        const filtered = allClasses.filter(kelas => kelas.id === guruKelasId);
        setFilteredClasses(filtered); // Set filtered classes to be displayed in Select

        // Optionally store all classes if needed later
        setClasses(allClasses);
      } catch (error) {
        console.error('Error fetching guru or classes:', error);
      }
    };

    fetchGuruAndClasses();
  }, []);

  const handleTambah = async () => {
    if (!nisn) {
      alert('Masukkan NISN');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/api/siswa/', {
        nisn: nisn,
        nama: nama,
        kelas_id: kelas_id,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      const data = response.data;
      console.log(data);
    
      // Check if `data` is not empty or has a valid `id`
      if (data.status == 200 | 201) {
        try {
          const siswa_id = data.id;
          const response2 = await axios.post('http://localhost:8000/api/user/', {
            password: confirm,
            siswa_id: siswa_id,
          }, {
            headers: { 'Content-Type': 'application/json' },
          });
          
          const data2 = response2.data;
          
          console.log(data2);
          if(data2.status == 200 | 201){
            alert('Berhasil menambahkan data siswa')
          }
          refreshStudents()
        } catch (eror) { // Catch and log error for the second request
          alert('Gagal menambahkan siswa')
          console.error('Error in creating user:', eror.response?.data || eror.message);
        }
      } else {
        console.error(error.message);
      }
    } catch (error) {
      console.error('Error in creating siswa:', error.response?.data || error.message);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent form reload
    if (validatePass()) {
      handleTambah(); // Only call handleTambah if passwords match
      console.log('Form submitted');
      onClose();
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
          onSubmit={handleSubmit} // Use handleSubmit to handle form submission
        >
          <Typography fontWeight={700} fontSize={20} pb={3} sx={{ color: 'black', fontFamily: 'poppins' }}>
            Form Tambah Data Siswa
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
                  '-moz-appearance': 'textfield',
                },
                '& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button': {
                  '-webkit-appearance': 'none',
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
              value={kelas_id}
              onChange={(event, newValue) => setKelasId(newValue)} // Use newValue from MUI's Select
              placeholder="Kelas"
              required
              fullWidth
              sx={{ py: 2, backgroundColor: '#D9D9D9', color: '#696969', border: 'none', fontFamily: 'poppins', fontWeight: 500 }}
            >
              {filteredClasses.map((kelas) => (
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
            <Button variant="outlined" sx={{ color: 'gray', border: '2px solid gray', fontFamily: 'poppins', '&:hover': { backgroundColor: 'gray', color: 'white'}}} onClick={onClose}>Cancel</Button>
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
