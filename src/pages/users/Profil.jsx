import React from 'react'
import Box from '@mui/joy/Box'
import { Grid, Typography } from '@mui/joy'
import ProfilImage from '../../assets/img/images.png'
import Button from '@mui/joy/Button'
import Graph from '../components/Graph'

export const Profil = () => {
  return (
    <>
        <Box sx={{ backgroundColor: '#F5F5FF', height: 'auto', width: '100%' }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            mx: 3,
            mb: 2,
            flexWrap: 'wrap',
            gap: 4, 
            px: 2,
            py: 4
          }}>
            <Box
            sx={{
              backgroundColor: 'white',
              p: 5,
              borderRadius: 10,
              width: '100%',
              height: 'auto',
              boxShadow: '2px 2px 10px 2px rgba(0, 0, 0, 0.1)',
              display: 'flex',
              justifyContent: 'center', 
                }}>
                  <Box>
                <img src={ProfilImage} alt="" style={{ width: '18vw', height: 'auto', borderRadius: '50%' }}/>
                <Box sx={{ textAlign: 'center' }}>
                <Typography sx={{ fontWeight: '700', fontSize: 25, }}>Sierra Putri</Typography>
                <Typography sx={{ fontWeight: '500', fontSize: 17, color: 'gray' }}>0123456789</Typography>
                <Typography sx={{ fontWeight: '600', fontSize: 25, pt: 4}}>Kelas : <Typography>XII RPL 1</Typography></Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}><Button sx={{ px: 8, py: 3, fontSize: 20, my: 2, borderRadius: 10, backgroundColor: '#F15C5C', '&:hover': { backgroundColor: '#e64545'} }}>Logout</Button></Box>
                </Box>
            </Box>
          </Box>
        </Box>
    </>
  )
}
