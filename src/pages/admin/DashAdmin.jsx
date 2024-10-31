import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/joy';
import Clock from '../components/Clock';
import { Navigate } from 'react-router-dom';
import FourCard from '../components/4card2';
import BasicTable from '../components/Table'; // Import your BasicTable component
import axios from 'axios';
import FourCardChart from '../components/Graphic';

const getFormattedDate = () => {
  const today = new Date();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = today.toLocaleDateString('id-ID', options); // id-ID for Indonesian locale
  return formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1); // Capitalize first letter
};

export const MainDash = () => {
  const [tableData, setTableData] = useState([]); // State to hold the table data
  const [kelas, setKelas] = useState('');
  const [nama, setNama] = useState('')
  const [shouldReload, setShouldReload] = useState(false); // State to track when data should reload
  const [currentDate, setCurrentDate] = useState('');
  const [cardValues, setCardValues] = useState({
    presensi: 0,
    hadir: 0,
    telat: 0,
    izin: 0,
  });

  if (localStorage.getItem("status") == null) {
    return <Navigate to={"/"} />
  }

  const guru_id = localStorage.getItem('guru_id');

  const fetchNama = async() => {
    try{
      const response = await axios.get(`http://localhost:8000/api/guru/${guru_id}/`)
      setNama(response.data.nama)
    }catch(error){
      console.error(error)
    }
  }
  useEffect(() => {
    fetchNama()
  }, [])

  // Function to fetch kelas_id based on guru_id
  const fetchKelasId = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/guru/${guru_id}/`);
      return response.data.kelas_id; // Adjust according to your API response
    } catch (error) {
      console.error("Error fetching kelas_id:", error);
      return null; // Return null if there's an error
    }
  };

  const fetchPresensi = async (kelas_id) => {
    try {
      const response = await axios.get(`http://localhost:8000/api/kehadiran/?kelas_id=${kelas_id}`);
      return response.data.length; // Adjust according to your API response
    } catch (error) {
      console.error("Error fetching presensi data:", error);
      return 0;
    }
  };

  const fetchHadir = async (kelas_id) => {
    try {
      const response = await axios.get(`http://localhost:8000/api/kehadiran/?kelas_id=${kelas_id}&status=HADIR`);
      return response.data.length; // Adjust according to your API response
    } catch (error) {
      console.error("Error fetching hadir data:", error);
      return 0;
    }
  };

  const fetchTelat = async (kelas_id) => {
    try {
      const response = await axios.get(`http://localhost:8000/api/kehadiran/?kelas_id=${kelas_id}&status=TELAT`);
      return response.data.length; // Adjust according to your API response
    } catch (error) {
      console.error("Error fetching telat data:", error);
      return 0;
    }
  };

  const fetchIzin = async (kelas_id) => {
    try {
      const response = await axios.get(`http://localhost:8000/api/kehadiran/`, { params: { status: 'IZIN,SAKIT', kelas_id: kelas_id}});
      return response.data.length; // Adjust according to your API response
    } catch (error) {
      console.error("Error fetching izin data:", error);
      return 0;
    }
  };

  const fetchData = async (kelas_id) => {
    try {      
      const response = await axios.get(`http://localhost:8000/api/kehadiran/?kelas_id=${kelas_id}`);

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

  useEffect(() => {
    const fetchAllData = async () => {
      const kelas_id = await fetchKelasId(); // Fetch kelas_id
      if (kelas_id) {
        setKelas(kelas_id); // Set kelas state

        const [presensi, hadir, telat, izin] = await Promise.all([
          fetchPresensi(kelas_id),
          fetchHadir(kelas_id),
          fetchTelat(kelas_id),
          fetchIzin(kelas_id),
        ]);

        setCardValues({
          presensi,
          hadir,
          telat,
          izin,
        })
        fetchData(kelas_id);

      }
    };

    fetchAllData();
  }, []); 

    useEffect(() => {
      if (shouldReload) {
        fetchData();
        setShouldReload(true);
      }
    }, [shouldReload]);
  
    useEffect(() => {
      setCurrentDate(getFormattedDate()),
      fetchNama()
    }, []);
 

  return (
    <Box sx={{ backgroundColor: '#F5F5FF', height: 'auto', width: 'auto' }}>
      <Box sx={{ p: 3 }}>
        <Typography
          level="p"
          sx={{
            fontWeight: '600',
            fontSize: 17,
            color: 'black',
            fontFamily: 'Poppins',
          }}>
          Selamat Datang, {nama}!
        </Typography>
        <Typography sx={{ color: '#1B1F3B', fontWeight: '440', fontSize: 14.5, fontFamily: 'poppins' }}>
          Berikut adalah catatan presensi kelas!
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
        }}>
        <Box sx={{ display: 'flex', gap: 3, alignItems: 'center' }}>
          <Box
            sx={{
              backgroundColor: 'white',
              p: 5,
              py: 10,
              borderRadius: 10,
              width: 'auto',
              height: 'auto',
              boxShadow: '2px 2px 10px 2px rgba(0, 0, 0, 0.1)',
              display: 'flex',
              justifyContent: 'center'
            }}>
            <Clock />
          </Box>
          <FourCardChart values={cardValues}/>
        </Box>
          <FourCard values={cardValues} />
        <Box
          sx={{
            backgroundColor: 'white',
            p: 5,
            borderRadius: 10,
            width: 'auto',
            height: 'auto',
            boxShadow: '2px 2px 10px 2px rgba(0, 0, 0, 0.1)',
          }}>
          <BasicTable data={tableData} showFilterButton={false} showSearchButton={true} showPDFExport={true} /> {/* Pass the fetched data as a prop */}
        </Box>
      </Box>
    </Box>
  );
};

export default MainDash;
