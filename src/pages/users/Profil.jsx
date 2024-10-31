import React, { useEffect, useState } from 'react';
import Box from '@mui/joy/Box';
import { Avatar, Grid, Typography } from '@mui/joy';
import Button from '@mui/joy/Button';
import axios from 'axios';
import Table from '@mui/joy/Table';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
// import PDFIcon from '../../assets/icon/eksporPDF.png';
import EditPass from './EditPass';

export const Profil = () => {
  const [students, setStudents] = useState([]);
  const [nama, setNama] = useState('');
  const [nisn, setNisn] = useState('');
  const [kelas, setKelas] = useState('');
  const [isEditPassOpen, setEditPassOpen] = useState(false)

  const handleOpenEditPass = () => {
    setEditPassOpen(true); // Membuka modal
  };

  const handleCloseEditPass = () => {
    setEditPassOpen(false); // Menutup modal
  };
  
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchData = async () => {
      try {
        const siswa_id = localStorage.getItem('siswa_id');
        const response = await axios.get(`http://localhost:8000/api/kehadiran/?siswa_id=${siswa_id}`);
        setStudents(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchData();
  }, []);


  const dataProfil = async () => {
    const siswa_id = localStorage.getItem('siswa_id');
    try {
      const response = await axios.get(`http://localhost:8000/api/siswa/${siswa_id}/`);
      const data = response.data;
      console.log('ini adalah data: ', data);
      setNama(data.nama); // Set the name profile
      setNisn(data.nisn); // Set the NISN profile
      setKelas(data.kelas.nama); // Set the class profile
    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
  };

  useEffect(() => {
    dataProfil(); // Fetch the data when the component mounts
  }, []);

  const handleLogout = () => {
    localStorage.clear(); // Clear all items from local storage
    navigate('/'); // Navigate to the login page (update the path as necessary)
  };

  return (
    <>
      <Box sx={{ backgroundColor: '#F5F5FF', height: '91%', overflowY: 'hidden', width: '100%' }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            mx: 3,
            mb: 2,
            flexWrap: 'wrap',
            gap: 4,
            px: 2,
            py: 4,
          }}>
          <Box
            sx={{
              backgroundColor: 'white',
              py: 5,
              borderRadius: 10,
              width: '30%',
              height: 'auto',
              boxShadow: '2px 2px 10px 2px rgba(0, 0, 0, 0.1)',
              display: 'flex',
              justifyContent: 'center',
            }}>
            <Box>
              <Avatar alt="" style={{ width: '13vw', height: '13vw', borderRadius: '50%'}} />
              <Box sx={{ textAlign: 'center', pb: 3 }}>
                <Typography sx={{ fontWeight: '700', fontSize: 30, pt: 2 }}>{nama}</Typography>
                <Typography sx={{ fontWeight: '500', fontSize: 17, color: 'gray', pb: 2}}>{nisn}</Typography>
                <Typography sx={{ fontWeight: '500', fontSize: 17, color: 'gray' }}>{kelas}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', gap: 1}}>
                <Button
                  onClick={handleOpenEditPass}
                  sx={{ px: 6, py: 2.5, fontFamily: 'poppins', fontSize: 20, borderRadius: 10, backgroundColor: '#4D91FF', '&:hover': { backgroundColor: '#3D7BD9' } }}>
                  Edit Password
                </Button>
                <EditPass isOpen={isEditPassOpen} onClose={handleCloseEditPass}/>
                <Button
                  onClick={handleLogout} // Call handleLogout on button click
                  sx={{ px: 6, py: 2.5, fontFamily: 'poppins', fontSize: 20, borderRadius: 10, backgroundColor: '#F15C5C', '&:hover': { backgroundColor: '#e64545' } }}>
                  Logout
                </Button>
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              backgroundColor: 'white',
              p: 5,
              borderRadius: 10,
              width: '60%',
              height: 'auto',
              boxShadow: '2px 2px 10px 2px rgba(0, 0, 0, 0.1)',
            }}>
            <Typography sx={{ pb: 2, fontWeight: 'bold', fontSize: 27 }}>History</Typography>
            <Table aria-label="basic table" sx={{ border: '3px solid #dcdfe2', borderRadius: 8 }}>
              <thead style={{ backgroundColor: '#dcdfe2' }}>
                <tr>
                  <th style={{ width: '3%', fontWeight: 'bold', textAlign: 'center', fontSize: 17 }}>No</th>
                  <th style={{ fontWeight: 'bold', fontSize: 17, width: '15%' }}>Tanggal</th>
                  <th style={{ fontWeight: 'bold', fontSize: 17 }}>Keterangan</th>
                  <th style={{ fontWeight: 'bold', fontSize: 17 }}>Datang</th>
                  <th style={{ fontWeight: 'bold', fontSize: 17 }}>Pulang</th>
                </tr>
              </thead>
              <tbody>
                {students.map((row, index) => (
                  <tr key={index}>
                    <td style={{ textAlign: 'center' }}>{index + 1}</td>
                    <td>{row.tanggal.slice(0, 10)}</td>
                    <td>{row.status}</td>
                    <td>{row.wktdatang}</td>
                    <td>{row.wktpulang}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Box>
        </Box>
      </Box>
    </>
  );
};
