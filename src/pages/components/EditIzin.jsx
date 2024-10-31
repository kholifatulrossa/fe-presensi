import * as React from 'react';
import { useState } from 'react';
import { Box, Input, Radio, Typography, RadioGroup, Textarea, Button, Select, Option } from '@mui/joy';
import { FormControlLabel } from '@mui/material';
import DeleteRoundedIcon  from '@mui/icons-material/DeleteRounded';
import { ErrorRounded, SettingsInputSvideoRounded } from '@mui/icons-material';
import axios from 'axios';

export default function EditIzin({ isOpen, onClose, refreshStudents, izinId }) { // Menerima prop isOpen untuk kontrol luar
  const [classes, setClasses] = React.useState([]);
  const [nama, setNama] = React.useState('');
  const [tanggal, setTanggal] = React.useState('');
  const [izin, setIzin] = React.useState('');
  const [keterangan, setKeterangan] = React.useState('');
  const guruId = localStorage.getItem('guru_id')
  const [kelasId, setKelasId] = useState(null); // State for storing the fetched KelasId


  React.useEffect(() => {
    const fetchKelasId = async () => {
      try {
        // Fetch the kelasId from the API using the guruId
        const response = await axios.get(`http://localhost:8000/api/guru/${guruId}/`);
        setKelasId(response.data.kelas_id);
      } catch (error) {
        console.error('Error fetching kelasId:', error);
      }
    };

    fetchKelasId();
  }, [guruId]);
  
  React.useEffect(() => {
    const fetchClasses = async () => {
      if(kelasId){
        try {
          const response = await axios.get(`http://localhost:8000/api/siswa/?kelas_id=${kelasId}`);
          setClasses(response.data.output);
          console.log(response.data.output);
        } catch (error) {
          console.error('Error fetching classes', error);
        }
      }
    };
    fetchClasses();
  }, [kelasId]);

  
  React.useEffect(() => {
    const fetchIzindata = async () => {
      if (isOpen && izinId) {
        console.log('ini izin id: ', izinId)
        try {
          const response = await axios.get(`http://localhost:8000/api/kehadiran/${izinId}/`);
          const studentData = response.data;
          console.log('Response data: ', studentData)

          // Populate the state with the fetched student data
          setNama(studentData.siswa_id);
          setTanggal(studentData.tanggal);
          setIzin(studentData.status);
          setKeterangan(studentData.keterangan);
        } catch (error) {
          console.error('Error fetching student data:', error.response?.data || error.message);
        }
      }
    };

    fetchIzindata();
  }, [isOpen, izinId]); // Depend on isOpen and studentId

  const handleEdit = async () => {
    if (!nama) {
      alert('Masukkan nama siswa');
      return;
    }
    try {
      const response = await axios.patch(`http://localhost:8000/api/kehadiran/${izinId}/`, {
        tanggal: tanggal,     // Date value
        status: izin,         // Attendance status (sakit/izin)
        keterangan: keterangan, // Additional notes
        wktdatang: null,      // Placeholder for arrival time
        wktpulang: null       // Placeholder for departure time
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      if (response.status === 200 | 201) {
        alert('Berhasil mengubah data');
        refreshStudents()
      } else {
        alert('Gagal mengubah data');
      }
    } catch (error) {
      if (error.response) {
        console.error('Error response:', error.response.data);
        alert(`Error: ${error.response.data.message || 'Something went wrong'}`);
      } else {
        console.error('Error mengubah data:', error.message);
      }
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleEdit()
    console.log('Form submitted');
    onClose(); // Menutup modal setelah submit
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
            Form Edit Izin
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, border: 'none' }}>
          <Select
              value={nama}
              onChange={(event, newValue) => setNama(newValue)} // Use newValue from MUI's Select
              placeholder="nama"
              required
              fullWidth
              sx={{ py: 2, backgroundColor: '#D9D9D9', color: '#696969', border: 'none', fontFamily: 'poppins', fontWeight: 400 }}>
                {classes.map((siswa) => (
                  <Option key={siswa.id} value={siswa.id}>
                    {siswa.nama}
                  </Option>
                ))}
              </Select>

            <Input
              value={tanggal}
              onChange={(e) => setTanggal(e.target.value)}
              placeholder="Tanggal"
              type="date"
              required
              fullWidth
              sx={{ py: 2, backgroundColor: '#D9D9D9', color: '#696969', border: 'none', fontFamily: 'poppins', fontWeight: 400 }}
            />

            <RadioGroup
              value={izin}
              onChange={(e) => setIzin(e.target.value)}
              sx={{ display: 'flex', flexDirection: 'row', py: 1 }}
            >
              <FormControlLabel
                value="SAKIT"
                control={<Radio sx={{ color: 'inherit' }} />}
                label="Sakit"
                sx={{ px: 4, display: 'flex', gap: 2, color: 'black', fontWeight: 600 }}
              />
              <FormControlLabel
                value="IZIN"
                control={<Radio sx={{ color: 'inherit' }} />}
                label="Izin"
                sx={{ px: 4, display: 'flex', gap: 2, color: 'black', fontWeight: 600 }}
              />
            </RadioGroup>

            <Textarea
              value={keterangan}
              onChange={(e) => setKeterangan(e.target.value)}
              placeholder="Tuliskan keterangan di sini"
              type="text"
              required
              fullWidth
              sx={{ py: 2, backgroundColor: '#D9D9D9', color: '#696969', border: 'none', fontFamily: 'poppins', fontWeight: 400, pb: 10 }}
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
                Edit
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    )
  );
}
