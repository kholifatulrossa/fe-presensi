import React, { useEffect, useState } from 'react';
import Box from '@mui/joy/Box';
import { Grid, Typography } from '@mui/joy';
import ProfilImage from '../../assets/img/images.png';
import Button from '@mui/joy/Button';
import axios from 'axios';
import Table from '@mui/joy/Table';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import PDFIcon from '../../assets/icon/eksporPDF.png'
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import EditData from '../components/EditData';

function exportToPDF(kehadiran) {
  const doc = new jsPDF();

  // Add a title
  doc.text('Data Presensi', 14, 10);

  // Define the table structure
  const tableColumn = ['No', 'Tanggal', 'Nama', 'Kelas', 'Keterangan', 'Hadir', 'Pulang'];
  const tableRows = [];

  // Loop through the rows and push the data to tableRows
  kehadiran.forEach((row, index) => {
    const rowData = [
      index + 1,  // No
      row.tanggal.slice(0, 10), // Make sure the date is formatted properly
      row.siswa?.nama || 'N/A', // Handle potential undefined values
      row.siswa?.kelas?.nama || 'N/A', // Ensure this is correctly accessing the class name
      row.status,
      row.wktdatang || 'N/A', // Default value if undefined
      row.wktpulang || 'N/A', // Default value if undefined
    ];
    tableRows.push(rowData);
  });

  // Add the table to the PDF using the autotable plugin
  doc.autoTable({
    head: [tableColumn],
    body: tableRows,
    startY: 20, // Position the table
  });

  // Save the PDF
  doc.save('rekap-presensi-data.pdf');
}

export const ProfilAdmin = () => {
  const [guru, setGuru] = useState([]);
  const [nama, setNama] = useState('');
  const [nip, setNip] = useState('');
  const [kelas, setKelas] = useState('');
  const [kelasId, setKelasId] = useState('')
  const [kehadiran, setKehadiran] = useState([])
  const [isEditDataOpen, setEditDataOpen] = useState(false)

  const handleOpenEditData = () => {
    setEditDataOpen(true)
  }

  const handleCloseEditData = () => {
    setEditDataOpen(false)
  }
  
  const navigate = useNavigate(); // Initialize useNavigate


  const fetchKelas = async () => {
    try {
        const guru_id = localStorage.getItem('guru_id');
        const response = await axios.get(`http://localhost:8000/api/guru/${guru_id}/`);
        const kelasId = response.data.kelas_id;
        setKelasId(kelasId); // Set the kelasId state here
        setNama(response.data.nama); // Set the name profile
        setNip(response.data.nip); // Set the NISN profile
        setKelas(response.data.kelas?.nama || ''); // Set the class profile
        console.log('kelas Id: ', kelasId);
      } catch (error) {
        console.error("Error fetching kelas_id:", error);
      }
    };
  useEffect(() => {
    fetchKelas();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (!kelasId) return; // Return early if kelasId is not set
  
      try {
        const response = await axios.get(`http://localhost:8000/api/kehadiran/?kelas_id=${kelasId}`);
        setKehadiran(response.data);
        console.log('Ini adalah data satu kelas', response.data);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };
  
    fetchData();
  }, [kelasId]); // Dependency on kelasId to re-fetch when it changes

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
              height: '100%',
              boxShadow: '2px 2px 10px 2px rgba(0, 0, 0, 0.1)',
              display: 'flex',
              justifyContent: 'center',
            }}>
            <Box>
              <img src={ProfilImage} alt="" style={{ width: '13vw', height: 'auto', borderRadius: '50%' }} />
              <Box sx={{ textAlign: 'center', pb: 3}}>
                <Typography sx={{ fontWeight: '700', fontSize: 30, pt: 2 }}>{nama}</Typography>
                <Typography sx={{ fontWeight: '500', fontSize: 17, color: 'gray', pb: 2 }}>{nip}</Typography>
                <Typography sx={{ fontWeight: '500', fontSize: 25, color: 'gray'}}>{kelas}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', gap: 1 }}>
                <Button
                  onClick={handleOpenEditData}
                  sx={{ px: 6, py: 2.5, fontFamily: 'poppins', fontSize: 20, borderRadius: 10, backgroundColor: '#4D91FF', '&:hover': { backgroundColor: '#3D7BD9' } }}>
                  Edit Data
                </Button>
                <EditData isOpen={isEditDataOpen} onClose={handleCloseEditData} refreshStudents={fetchKelas}/>
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
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography sx={{ pb: 2, fontWeight: 'bold', fontSize: 27 }}>History</Typography>
                <Button onClick={() => exportToPDF(kehadiran)} sx={{ padding: '14px 30px', color: 'white', backgroundColor: '#F15C5C', '&:hover': { backgroundColor: '#DF5A5A' }, mb: 1 }}>
                  <img src={PDFIcon} alt="PDF icon" style={{ width: '25px', height: '25px', marginRight: '10px' }} />Ekspor PDF
                </Button>
              </Box>
            <Table aria-label="basic table" sx={{ border: '3px solid #dcdfe2', borderRadius: 8 }}>
              <thead style={{ backgroundColor: '#dcdfe2' }}>
                <tr>
                  <th style={{ width: '3%', fontWeight: 'bold', textAlign: 'center', fontSize: 17 }}>No</th>
                  <th style={{ fontWeight: 'bold', fontSize: 17, width: '15%' }}>Tanggal</th>
                  <th style={{ fontWeight: 'bold', fontSize: 17 }}>Nama</th>
                  <th style={{ fontWeight: 'bold', fontSize: 17 }}>Status</th>
                  <th style={{ fontWeight: 'bold', fontSize: 17 }}>Datang</th>
                  <th style={{ fontWeight: 'bold', fontSize: 17 }}>Pulang</th>
                </tr>
              </thead>
              <tbody>
                {kehadiran.map((row, index) => (
                  <tr key={index}>
                    <td style={{ textAlign: 'center' }}>{index + 1}</td>
                    <td>{row.tanggal.slice(0, 10)}</td>
                    <td>{row.siswa.nama}</td>
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
