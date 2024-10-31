import * as React from 'react';
import { Box, Input, Select, Option, Typography, Button } from '@mui/joy';
import axios from 'axios';

export default function EditSiswa({ isOpen, onClose, studentId, refreshStudents }) {
  const [classes, setClasses] = React.useState([]);
  const [filteredClasses, setFilteredClasses] = React.useState([]);
  const [id, setId] = React.useState('')

  const [nisn, setNisn] = React.useState('');
  const [nama, setNama] = React.useState('');
  const [kelas_id, setKelasId] = React.useState('')

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

  React.useEffect(() => {
    const fetchStudentData = async () => {
      if (isOpen && studentId) {
        try {
          const response = await axios.get(`http://localhost:8000/api/siswa/${studentId}/`);
          const studentData = response.data;

          // Populate the state with the fetched student data
          setNisn(studentData.nisn);
          setNama(studentData.nama);
          setKelasId(studentData.kelas_id);
        } catch (error) {
          console.error('Error fetching student data:', error.response?.data || error.message);
        }
      }
    };

    fetchStudentData();
  }, [isOpen, studentId]); // Depend on isOpen and studentId

  const handleEdit = async () => {
    if (!nisn) {
      alert('Masukkan NISN');
      return;
    }

    try {
      const response = await axios.patch(`http://localhost:8000/api/siswa/${studentId}/`, {
        nisn: nisn,
        nama: nama,
        kelas_id: kelas_id,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = response.data;
      alert('Berhasil mengupdate data')
      console.log(data);
      refreshStudents()
    } catch (error) {
      console.error('Error in creating siswa:', error.response?.data || error.message);
      alert('Gagal mengupdate data')
    }
  }


  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent form reload
    handleEdit(); // Only call handleTambah if passwords match
    console.log('Form submitted');
    onClose();
  };
  React.useEffect(() => {
    const ambilId = async () => {
      const response = await axios.get(`http://localhost:8000/api/user/?siswa_id=${studentId}`)
      setId(response.data[0].id)
    }
    ambilId()
  }, [])

  const handleDelete = async () => {
    console.log('ini id murid: ', studentId)
    try {
      const response = await axios.delete(`http://localhost:8000/api/siswa/${studentId}/`)
      if (response.status === 204){
        onClose()
        alert('Berhasil menghapus data siswa')
        refreshStudents()
        console.log('Berhasil hapus data siswa')
      }else{
        console.log(response.data)
      }
    }catch(error) {
      console.error('Error ketika hapus data siswa: ', error)
    }
  }

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
          zIndex: 1010
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
          </Box>

          <Box sx={{ gap: 1, py: 3, display: 'flex', justifyContent: 'space-evenly' }}>
            <Button variant="outlined" sx={{ color: 'gray', border: '2px solid gray', fontFamily: 'poppins', '&:hover': { backgroundColor: 'gray', color: 'white'}}} onClick={onClose}>Cancel</Button>
            <Box sx={{ display: 'flex', gap: 1, marginLeft: 'auto'}}>
              <Button
                onClick={handleDelete}
                variant="solid"
                fontWeight={500}
                fontSize={20}
                sx={{
                  py: 2,
                  px: 4,
                  fontFamily: 'poppins',
                  backgroundColor: '#F15C5C',
                  '&:hover': { backgroundColor: '#e64545',  },
                }}
              >
                Hapus
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
                Edit
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    )
  );
}
