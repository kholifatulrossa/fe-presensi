import React from 'react';
import { Box, Typography } from '@mui/joy';
import ClassRoundedIcon from '@mui/icons-material/ClassRounded';

export const DataKelas = () => {
  return (
    <>
    <Box sx={{ backgroundColor: '#F5F5FF', width: '100vw', height: '100vh'}}>
        <Box 
        sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: 3, flexWrap: 'wrap', maxWidth: '90vw', p: 3.5}}>
            <Box 
            sx={{ backgroundColor: 'white', display: 'flex', alignItems: 'center', boxShadow: '2px 2px 10px 2px rgba(0, 0, 0, 0.1)', width: '25%', padding: '30px 30px', borderRadius: 8}}>
                <ClassRoundedIcon 
                sx={{marginRight: '10px', fontSize: '50px', color: '#7D87FF'}} />
                  <Box 
                  sx={{ display: 'flex', flexDirection: 'column' }}>
                      <Box 
                      sx={{ display: 'flex', alignItems: 'center', gap: '0 50px' }}>
                        <Typography sx={{  fontWeight: 'bold', fontSize: '25px', fontFamily: 'poppins', color: '#1B1F3B'}}>XII RPL 1</Typography>
                        <Typography sx={{ fontWeight: '500', fontFamily: 'poppins', marginLeft: '0', color: '#1B1F3B'}}>2024/2025</Typography>
                      </Box>
                  <Typography sx={{ fontWeight: 'bold', fontFamily: 'poppins', fontSize: '18px', color: '#1B1F3B' }}>36 Siswa</Typography>
                  </Box>
            </Box>
            <Box 
            sx={{ backgroundColor: 'white', display: 'flex', alignItems: 'center', boxShadow: '2px 2px 10px 2px rgba(0, 0, 0, 0.1) ', width: '25%', padding: '30px 30px', borderRadius: 8}}>
                <ClassRoundedIcon 
                sx={{marginRight: '10px', fontSize: '50px', color: '#6f707d'}} />
                  <Box 
                  sx={{ display: 'flex', flexDirection: 'column' }}>
                      <Box 
                      sx={{ display: 'flex', alignItems: 'center', gap: '0 50px' }}>
                        <Typography sx={{  fontWeight: 'bold', fontSize: '25px', fontFamily: 'poppins', color: '#1B1F3B'}}>XII RPL 1</Typography>
                        <Typography sx={{ fontWeight: '500', fontFamily: 'poppins', marginLeft: '0', color: '#1B1F3B'}}>2024/2025</Typography>
                      </Box>
                  <Typography sx={{ fontWeight: 'bold', fontFamily: 'poppins', fontSize: '18px', color: '#1B1F3B' }}>36 Siswa</Typography>
                  </Box>
            </Box>
        </Box>
    </Box>
    </>
  )
}
