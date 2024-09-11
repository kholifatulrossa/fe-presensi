import * as React from 'react';
import { Box, Input, Radio, Typography, RadioGroup, Textarea, Button } from '@mui/joy';
import { FormControlLabel } from '@mui/material';
import DeleteRoundedIcon  from '@mui/icons-material/DeleteRounded';

export default function PopUpForm({ isOpen, onClose }) { // Menerima prop isOpen untuk kontrol luar
  const modalRef = React.useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Form submitted');
    onClose(); // Menutup modal setelah submit
  };

  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  return (
    isOpen && (
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 1000,
        }}
      >
        <Box
          ref={modalRef}
          sx={{
            backgroundColor: 'white',
            px: 6,
            py: 5,
            borderRadius: 8,
            width: 'auto',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
            transition: 'transform 0.5s ease',
            transform: isOpen ? 'translateY(0)' : 'translateY(-20px)',
          }}
          component="form"
          onSubmit={handleSubmit}
        >
          <Typography fontWeight={700} fontSize={20} sx={{ color: 'black', fontFamily: 'poppins' }}>
            Form Permohonan Izin
          </Typography>
          <Typography fontWeight={500} fontSize={14} color="black" mb={3} sx={{ fontFamily: 'poppins' }}>
            Silahkan isi form permohonan izin di bawah ini!
          </Typography>

          <Box sx={{ display: 'flex', gap: 4 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, border: 'none' }}>
              <Input placeholder="NISN" type="text" required fullWidth sx={{ py: 2, backgroundColor: '#D9D9D9', color: '#696969', border: 'none', fontFamily: 'poppins', fontWeight: 500 }} />
              <Input placeholder="Tanggal awal" type="date" required fullWidth sx={{ py: 2, backgroundColor: '#D9D9D9', color: '#696969', border: 'none', fontFamily: 'poppins', fontWeight: 500 }} />
              <Input placeholder="Tanggal akhir" type="date" required fullWidth sx={{ py: 2, backgroundColor: '#D9D9D9', color: '#696969', border: 'none', fontFamily: 'poppins', fontWeight: 500 }} />
              <RadioGroup sx={{ display: 'flex', flexDirection: 'row', py: 1 }}>
                <FormControlLabel
                  value="sakit"
                  control={<Radio sx={{ color: 'inherit' }} />}
                  label="Sakit"
                  sx={{ px: 4, display: 'flex', gap: 2, color: 'black', fontWeight: 600 }}
                />
                <FormControlLabel
                  value="izin"
                  control={<Radio sx={{ color: 'inherit' }} />}
                  label="Izin"
                  sx={{ px: 4, display: 'flex', gap: 2, color: 'black', fontWeight: 600 }}
                />
              </RadioGroup>
            </Box>
            <Box width="20vw" height="auto">
              <Textarea placeholder="Tuliskan keterangan di sini" type="text" required fullWidth sx={{ py: 2, backgroundColor: '#D9D9D9', color: '#696969', border: 'none', fontFamily: 'poppins', fontWeight: 500, pb: 10 }} />
            </Box>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 1, py: 3 }}>
            <Box sx={{ display: 'flex', gap: 1 }}>
            <Button onClick={onClose} sx={{ py: 2, px: 3, fontFamily: 'poppins', bgcolor: 'white', color: '#F15C5C', border: '2px solid #F15C5C', '&:hover': { backgroundColor: '#F15C5C', color: 'white' } }}>
              <DeleteRoundedIcon/>
            </Button>
            <Button type="submit" variant='solid' fontWeight={500} fontSize={20} sx={{ py: 2, px: 4, fontFamily: 'poppins', backgroundColor: '#10C500', '&:hover': { backgroundColor: '#12B104'}}}>
              Submit
            </Button>
            </Box>
            <Button type="submit" variant='solid' fontWeight={500} fontSize={20} sx={{ py: 2, px: 4, fontFamily: 'poppins' }}>
              Accept
            </Button>
          </Box>
        </Box>
      </Box>
    )
  );
}
