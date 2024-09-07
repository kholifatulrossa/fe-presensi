import React from 'react'
import { Box, Typography } from '@mui/joy'

export const Perizinan = () => {
  return (
    <>
        <Box sx={{ backgroundColor: '#f5f5ff' }}>
          <Box sx={{ padding: '20px', maxWidth: '100vw', maxHeight: 'auto'}}>
            <Typography
              level="p"
              sx={{
                fontWeight: '500',
                fontSize: 16,
                color: 'black',
                fontFamily: 'Poppins'
              }}>
              Selamat Datang, Admin! <br /> <span>Lorem </span>
            </Typography>
          </Box>
          <Box 
         sx={{
          display: 'flex',
          gap: 1,
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: { xs: 'start', sm: 'center' },
          mx: 3,
          mb: 2,
          flexWrap: 'wrap',
          justifyContent: 'center',
          color: 'black',
        }}>
        
        </Box>
      </Box>
    </>
  )
}
