import React from 'react';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import AccessTimeFilledRoundedIcon from '@mui/icons-material/AccessTimeFilledRounded';
import OfflinePinRoundedIcon from '@mui/icons-material/OfflinePinRounded';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import ErrorRoundedIcon from '@mui/icons-material/ErrorRounded';

const FourCard = () => {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          gap: 1,
          alignItems: 'center'
        }}>
        <Box>
        <Box sx={{ p: 1,  }}>
          <Box
            sx={{
              bgcolor: '#4D91FF',
              width: '22vw',
              py: 3.5,
              borderRadius: '8px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '20px',
            }}>
            <Box>
              <Typography fontFamily="poppins" fontWeight="700" fontSize={20} sx={{ paddingBottom: 1 }} color="#272A2C">
                Total Presensi
              </Typography>
              <Typography fontFamily="poppins" fontWeight="700" fontSize="25px" color="#272A2C">
                150
              </Typography>
              <Typography fontFamily="poppins" fontWeight="500" fontSize="20px" sx={{ color: '#adbed8' }}>
                Detail
              </Typography>
            </Box>
            <AccessTimeFilledRoundedIcon sx={{ fontSize: '80px', paddingRight: '10px', color: '#5f84bf', fontWeight: 'bold' }} />
          </Box>
        </Box>

        <Box sx={{ p: 1 }}>
          <Box
            sx={{
              bgcolor: '#74ff4d',
              width: '22vw',
              py: 3.5,
              borderRadius: '8px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '20px',
            }}>
            <Box>
              <Typography fontFamily="poppins" fontWeight="700" fontSize={20} sx={{ paddingBottom: 1 }} color="#272A2C">
                Total Hadir
              </Typography>
              <Typography fontFamily="poppins" fontWeight="700" fontSize="25px" color="#272A2C">
                106
              </Typography>
              <Typography fontFamily="poppins" fontWeight="500" fontSize="20px" sx={{ color: '#b8d8ad' }}>
                Detail
              </Typography>
            </Box>
            <OfflinePinRoundedIcon sx={{ fontSize: '80px', paddingRight: '10px', color: '#77BF5F', fontWeight: 'bold' }} />
          </Box>
        </Box>
            </Box>

          <Box>
        <Box sx={{ p: 1 }}>
          <Box
            sx={{
              bgcolor: '#ff4d4d',
              width: '22vw',
              py: 3.5,
              borderRadius: '8px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '20px',
            }}>
            <Box>
              <Typography fontFamily="poppins" fontWeight="700" fontSize={20} sx={{ paddingBottom: 1 }} color="#272A2C">
                Total Alpa
              </Typography>
              <Typography fontFamily="poppins" fontWeight="700" fontSize="25px" color="#272A2C">
                26
              </Typography>
              <Typography fontFamily="poppins" fontWeight="500" fontSize="20px" sx={{ color: '#d5adad' }}>
                Detail
              </Typography>
            </Box>
            <CancelRoundedIcon sx={{ fontSize: '80px', paddingRight: '10px', color: '#e06969', fontWeight: 'bold' }} />
          </Box>
        </Box>

        <Box sx={{ p: 1 }}>
          <Box
            sx={{
              // bgcolor: '#fcff4d',
              background: 'linear-gradient(to right, #FCFF4D, #fdff94)' ,
              width: '22vw',
              py: 3.5,
              borderRadius: '8px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '20px',
            }}>
            <Box>
              <Typography fontFamily="poppins" fontWeight="700" fontSize={20} sx={{ paddingBottom: 1 }} color="#272A2C">
                Total Telat
              </Typography>
              <Typography fontFamily="poppins" fontWeight="700" fontSize="25px" color="#272A2C">
                18
              </Typography>
              <Typography fontFamily="poppins" fontWeight="500" fontSize="20px" sx={{ color: '#f4ed9f' }}>
                Detail
              </Typography>
            </Box>
            <ErrorRoundedIcon sx={{ fontSize: '80px', paddingRight: '10px', color: '#EFE358', fontWeight: 'bold' }} />
          </Box>
        </Box>
        </Box>
      </Box>
    </>
  );
};

export default FourCard;
