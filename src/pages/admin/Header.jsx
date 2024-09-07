import { Box, Typography } from '@mui/joy'
import { Divider } from '@mui/material'
import React from 'react'
import { useLocation } from 'react-router-dom'

export default function Header() {
  const location = useLocation()
  const getHeaderText = () => {
    switch (location.pathname){
      case '/admin/perizinan':
        return "Permohonan Izin";
      case '/admin/dashboard':
        return "Dashboard";
      case '/admin/dataKelas':
        return "Data Kelas"
    }
  }
  return (
    <>
     <Box
     className="header"
     sx={{ 
        width: '100vw',
        display: 'flex',
        alignItems: 'center',
        height: 30,
        py: 2,
        mx: 3,
        position: 'sticky',
        boxShadow: 'inherit'
      }}>
        <Typography
        level="tittle-lg"
        component="p"
        style={{ fontFamily: 'poppins' }}
        sx={{ 
            fontWeight: 'bold',
            fontSize: 17, 
            color: 'black'
         }}>
            {getHeaderText()}
         </Typography>
     </Box>
    </>
  )
}
