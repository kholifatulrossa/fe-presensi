import React, { useEffect, useRef, useState } from 'react';
import { Box, Typography, Button, IconButton, Menu, MenuItem } from '@mui/joy';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PopUpForm from '../components/FormIzin';
import axios from 'axios';
import dayjs from 'dayjs';
import Table from '@mui/joy/Table';
import SearchIcon from '@mui/icons-material/Search'
import Input from '@mui/joy/Input';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import EditIzin from '../components/EditIzin';

export const Perizinan = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [fade, setFade] = useState(false);
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [anchorEl, setAnchorEl] = useState(null);
  const [isPerBulan, setIsPerBulan] = useState(false); // State for 'Per Bulan'
  const [tableData, setTableData] = useState([]);
  const [filteredData, setFilteredData] = useState([]); // State for filtered data
  const [searchQuery, setSearchQuery] = useState(''); 
  const [kelasId, setKelasId] = useState(null); // State for storing the fetched KelasId
  const guruId = localStorage.getItem('guru_id') // You should replace this with the actual guruId
  const [isEditIzinOpen, SetEditIzinOpen] = useState(false);
  const [selectedIzin, setSelectedIzin] = useState('')

  const showNotificationRef = useRef(null);

  const handleEditIzin = () => {
    SetEditIzinOpen(true)
  }

  const handleCloseEditIzin = () => {
    SetEditIzinOpen(false)
  }
  
  const handleOpen = () => {
    setFade(true);
    setTimeout(() => setIsOpen(true), 50);
  };

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(() => setFade(false), 500);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handlePerBulan = () => {
    setIsPerBulan(true);
    handleMenuClose();
  };

  const handleSemua = () => {
    setIsPerBulan(false);
    setFilteredData(tableData)
    handleMenuClose();
  };

  useEffect(() => {
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

  const fetchData = async () => {
    if (kelasId) { // Wait until kelasId is fetched
      try {
          const response = await axios.get('http://localhost:8000/api/kehadiran/', {
            params: {
              status: 'IZIN,SAKIT',
              kelas_id: kelasId, // Add kelasId to the request params
            }
          });
          setTableData(response.data);
          setFilteredData(response.data); // Initialize filtered data with all data
        } catch (error) {
          console.error('Error fetching data: ', error);
        }
      }
    };
    
  useEffect(() => {
    fetchData();
  }, [kelasId]); // Re-run the effect when kelasId changes

  useEffect(() => {
    const filterData = () => {
      let filtered = [...tableData];

      if (isPerBulan) {
        const startOfMonth = selectedDate.startOf('month');
        const endOfMonth = selectedDate.endOf('month');
        filtered = filtered.filter(row => {
          const rowDate = dayjs(row.tanggal);
          return rowDate.isAfter(startOfMonth) && rowDate.isBefore(endOfMonth);
        });
      }   

      if (searchQuery) {
        filtered = filtered.filter(row => {
          const siswaName = row.siswa.nama.toLowerCase();
          const status = row.status.toLowerCase(); // Assuming status is a property
          const date = dayjs(row.tanggal).format('YYYY-MM-DD'); // Format the date as needed
          const ket = row.keterangan.toLowerCase();
      
          return (
            siswaName.includes(searchQuery) ||
            status.includes(searchQuery) ||
            date.includes(searchQuery) ||
            ket.includes(searchQuery) 
          );
        });
      }

      setFilteredData(filtered);
    };

    filterData();
  }, [tableData, selectedDate, isPerBulan, searchQuery]);
  
  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/kehadiran/${id}/`);
      alert('Berhasil menghapus data');
      // Refresh data after delete
      const response = await axios.get('http://localhost:8000/api/kehadiran/', {
        params: {
          status: 'IZIN,SAKIT',
          kelas_id: kelasId, // Add kelasId when fetching data again
        }
      });
      setTableData(response.data);
      setFilteredData(response.data); // Update filtered data after deletion
    } catch (error) {
      console.error('Error deleting data: ', error);
      alert('Gagal menghapus data');
    }
  };

  return (
    <Box sx={{ backgroundColor: '#f5f5ff', width: '100%', height: '100vh' }}>
      <Box sx={{ p: 3.5 }}>
        <Box sx={{ p: '0 0 15px 0', gap: '18px', display: 'flex', justifyContent: 'space-between' }}>
        <Box
          sx={{
            backgroundColor: 'white',
            display: 'flex',
            alignItems: 'center',
            padding: '10px 15px',
            borderRadius: 8,
            boxShadow: '2px 2px 10px 2px rgba(0, 0, 0, 0.1)',
            minWidth: 300, // Set a minimum width (adjust as needed)
            height: 50, // Set a fixed height (adjust as needed)
          }}
        >
          {isPerBulan ? (
            <Typography sx={{ 
              backgroundColor: 'white', 
              padding: '10px 16px', 
              borderRadius: '8px', 
              fontWeight: '400', 
              fontSize: 16 
            }}>
              Per Bulan
            </Typography>
          ) : (
            <Typography sx={{ 
              backgroundColor: 'white', 
              padding: '10px 16px', 
              borderRadius: '8px', 
              fontWeight: '400', 
              fontSize: 16 
            }}>
              Semua
            </Typography>
          )}
          <IconButton sx={{ ml: 1, mr: 3 }} onClick={handleMenuOpen}>
            <MoreVertIcon />
          </IconButton>
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
            <MenuItem onClick={handlePerBulan}>Per Bulan</MenuItem>
            <MenuItem onClick={handleSemua}>Semua</MenuItem>
          </Menu>
          {/* <SearchIcon sx={{ fontSize: 22, color: 'gray', }} /> */}
          <Input
            placeholder="Cari"
            value={searchQuery}
            onChange={handleSearch}
            sx={{
              fontFamily: 'poppins',
              fontSize: 15,
              fontWeight: 600,
              boxShadow: 'none',
              border: 'none',
              bgcolor: '#f5f5f9',
              color: 'gray',
              width: '100%',
              height: '100%',
              mx: 'auto',
            }}
            endAdornment={<SearchIcon />}
          />
        </Box>


          <Box sx={{ display: 'flex', gap: 3 }}>
            <Button
              onClick={handleOpen}
              sx={{
                padding: '20px 40px',
                backgroundColor: '#4D91FF',
                color: 'white',
                fontSize: 20,
                fontWeight: '600',
                boxShadow: '2px 2px 10px 2px rgba(0, 0, 0, 0.1)',
                '&:hover': { color: 'white' },
              }}  
            >
              + Tambah Data
            </Button>
            {fade && <PopUpForm isOpen={isOpen} onClose={handleClose} refreshStudents={fetchData} />}
          </Box>
        </Box>

        <Table aria-label="basic table" sx={{ border: '3px solid #dcdfe2', borderRadius: 8 }}>
          <thead style={{  }}>
            <tr>
              <th style={{ width: '3%', fontWeight: 'bold', textAlign: 'center', fontSize: 17 }}>No</th>
              <th style={{ fontWeight: 'bold', fontSize: 17, width: '10%' }}>Tanggal</th>
              <th style={{ fontWeight: 'bold', fontSize: 17 }}>Nama</th>
              <th style={{ fontWeight: 'bold', fontSize: 17 }}>Status</th>
              <th style={{ fontWeight: 'bold', fontSize: 17 }}>Keterangan</th>
              <th style={{ fontWeight: 'bold', fontSize: 17, paddingLeft: 45 }}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((row, index) => (
              <tr key={index} style={{ textAlign: 'left', backgroundColor: 'white' }}>
                <td style={{ textAlign: 'center' }}>{index + 1}</td>
                <td style={{ fontWeight: 500, color: '#696969', width: '100%' }}>{row.tanggal.slice(0, 10)}</td>
                <td style={{ fontWeight: 500 }}>{row.siswa.nama}</td>
                <td style={{ fontWeight: 500 }}>{row.status}</td>
                <td style={{ fontWeight: 500 }}>{row.keterangan}</td>
                <td >
                  <Box sx={{ display: 'flex'}}>
                  <Button onClick={() => { setSelectedIzin(row.id); handleEditIzin()}} sx={{ backgroundColor: 'white', py:1, '&:hover': { backgroundColor: '#f5f5ff'} }}><EditRoundedIcon sx={{ color: '#424242' }} /></Button>
                  <EditIzin isOpen={isEditIzinOpen} onClose={handleCloseEditIzin} refreshStudents={fetchData} izinId={selectedIzin} />
                  <Button sx={{ backgroundColor: 'white', py:1, '&:hover': { backgroundColor: '#f5f5ff'} }}><DeleteRoundedIcon onClick={() => handleDelete(row.id)} sx={{ color: '#424242'}}/></Button>
                  </Box>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Box>
    </Box>
  );
};
