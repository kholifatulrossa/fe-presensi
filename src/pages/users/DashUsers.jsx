import React, { useState, useEffect } from 'react';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import '@fontsource/poppins';
import Clock from '../components/Clock';
import FourCard from '../components/4card2';
import { Navigate } from 'react-router-dom';
import BasicTable from '../components/Table';
import axios from 'axios';
import FourCardChart from '../components/Graphic';

// Function to get formatted date
const getFormattedDate = () => {
  const today = new Date();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = today.toLocaleDateString('id-ID', options); // id-ID for Indonesian locale
  return formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1); // Capitalize first letter
};

export const DashUsers = () => {
  const [currentDate, setCurrentDate] = useState('');
  const [tableData, setTableData] = useState([]);
  const [shouldReload, setShouldReload] = useState(false); // State to track when data should reload
  const [nama, setNama] = useState('')

  if (localStorage.getItem("status") == null) {
    return <Navigate to={"/"} />
  }

  const [cardValues, setCardValues] = useState({
    presensi: 0,
    hadir: 0,
    telat: 0,
    izin: 0,
  });

  const id = localStorage.getItem('siswa_id');
  const fetchNama = async() => {
    try{
      const response = await axios.get(`http://localhost:8000/api/siswa/${id}/`)
      setNama(response.data.nama)
    }catch(error){
      console.error(error)
    }
  }

  console.log('siswa_id: ', id)
  const fetchPresensi = async () => {
    try {
      const siswa_id = id
      const response = await axios.get(`http://localhost:8000/api/kehadiran/?siswa_id=${siswa_id}`);
      console.log('Data presensi', response.data)
      return response.data.length;
    } catch (error) {
      console.error("Error fetching presensi data:", error);
      return 0;
    }
  };

  const fetchHadir = async () => {
    try {
      const siswa_id = id
      const response = await axios.get(`http://localhost:8000/api/kehadiran/?siswa_id=${siswa_id}&status=HADIR`);
      return response.data.length;
    } catch (error) {
      console.error("Error fetching hadir data:", error);
      return 0;
    }
  };

  const fetchTelat = async () => {
    try {
      const siswa_id = id

      const response = await axios.get(`http://localhost:8000/api/kehadiran/?siswa_id=${siswa_id}&status=TELAT`);
      return response.data.length;
    } catch (error) {
      console.error("Error fetching telat data:", error);
      return 0;
    }
  };

  const fetchIzin = async () => {
    try {
      const siswa_id = id
      const response = await axios.get(`http://localhost:8000/api/kehadiran/?siswa_id=${siswa_id}&status=IZIN`);
      return response.data.length;
    } catch (error) {
      console.error("Error fetching izin data:", error);
      return 0;
    }
  };

  const fetchData = async () => {
    try {      
      const siswa_id = id
      const response = await axios.get(`http://localhost:8000/api/kehadiran/?siswa_id=${siswa_id}`);

      // Get the current year and month
      const currentYear = new Date().getFullYear();
      const currentMonth = new Date().getMonth() + 1; // getMonth() returns 0-indexed month, so add 1

      // Filter data to include only entries for the current month
      const filteredData = response.data.filter(item => {
        const itemDate = new Date(item.tanggal); // Convert 'tanggal' to a Date object
        return (
          itemDate.getFullYear() === currentYear &&
          itemDate.getMonth() + 1 === currentMonth // +1 because getMonth() is 0-indexed
        );
      });

      // Sort the filtered data by tanggal or wktdatang in descending order
      const sortedData = filteredData.sort((a, b) => 
        new Date(b.tanggal || b.wktdatang) - new Date(a.tanggal || a.wktdatang)
      );

      setTableData(sortedData);
      
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };

  // Fetch card data and table data on mount
  useEffect(() => {
    const fetchAllData = async () => {
      const [presensi, hadir, telat, izin] = await Promise.all([
        fetchPresensi(),
        fetchHadir(),
        fetchTelat(),
        fetchIzin(),
      ]);

      setCardValues({ presensi, hadir, telat, izin });
      fetchData(); // Fetch table data initially
      setShouldReload(true)
    };

    fetchAllData();
  }, []);

  // Reload table data when `shouldReload` is set to true
  useEffect(() => {
    if (shouldReload) {
      fetchData(); // Fetch new data
      setShouldReload(true); // Reset the flag after reload
    }
  }, [shouldReload]);

  // Set current date on mount
  useEffect(() => {
    setCurrentDate(getFormattedDate()),
    fetchNama()
  }, []);

  // Add this line in the function that submits data (e.g., after button press):
  // setShouldReload(true);


  return (
    <>
      <Box sx={{ backgroundColor: '#F5F5FF', width: 'auto', height: 'auto' }}>
        <Box sx={{ p: 3 }}>
          <Typography
            level="p"
            sx={{
              fontWeight: '600',
              fontSize: 17,
              color: 'black',
              fontFamily: 'Poppins',
            }}
          >
            Selamat Datang, {nama}!
          </Typography>
          <Typography sx={{ color: '#1B1F3B', fontWeight: '440', fontSize: 14.5, fontFamily: 'poppins' }}>
            Silahkan catat presensi terlebih dahulu!
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: { xs: 'start', sm: 'center' },
            mx: 3,
            mb: 2,
            flexWrap: 'wrap',
            gap: 4,
          }}
        >
          <Box sx={{ display: 'flex', gap: 3, alignItems: 'center' }}>
            <Box
              sx={{
                backgroundColor: 'white',
                p: 5,
                borderRadius: 10,
                width: 'auto',
                height: 'auto',
                boxShadow: '2px 2px 10px 2px rgba(0, 0, 0, 0.1)',
              }}
            >
              <Clock ViewButton={true} onAttendanceChange={fetchData} />
            </Box>
            <FourCardChart values={cardValues}/>
          </Box>
            <FourCard values={cardValues} onAttendanceChange={cardValues} />
          <Box
            sx={{
              backgroundColor: 'white',
              p: 5,
              borderRadius: 10,
              width: 'auto',
              height: 'auto',
              boxShadow: '2px 2px 10px 2px rgba(0, 0, 0, 0.1)',
            }}
          >
            <BasicTable data={tableData} showFilterButton={false} showSearchButton={true} showPDFExport={false} />
          </Box>
        </Box>
      </Box>
    </>
  );
};
