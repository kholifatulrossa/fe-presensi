import * as React from 'react';
import Table from '@mui/joy/Table';
import Box from '@mui/joy/Box';

function createData(date, nama, kelas, keterangan, hadir, pulang) {
  return { date, nama, kelas, keterangan, hadir, pulang };
} 

const rows = [
  createData('21-12-2024', 'Frozen Frozen', 'XII RPL 1', 'Hadir', '06.45', '15.00'),
  createData('21-12-2024', 'Frozen Frozen', 'XII RPL 1', 'Hadir', '06.45', '15.00'),
  createData('21-12-2024', 'Frozen Frozen', 'XII RPL 1', 'Hadir', '06.45', '15.00'),
  createData('21-12-2024', 'Frozen Frozen', 'XII RPL 1', 'Hadir', '06.45', '15.00'),
  createData('21-12-2024', 'Frozen Frozen', 'XII RPL 1', 'Hadir', '06.45', '15.00'),
];



export default function BasicTable() {

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const ref = useRef(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        handleClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open]);

  return (
    
    <Box>
      <Box ref={ref} sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end'}}>
      <Button
        sx={{ 
          padding: '14px 30px', 
          backgroundColor: '#f5f5f9', 
          color: 'gray', 
          fontFamily: 'poppins', 
          '&:hover': { backgroundColor: '#f5f5f9' },
          alignItems: 'center   '
        }}
        aria-controls={open ? 'dropdown-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        Filter <span style={{ display: 'flex', alignItems: 'center' }}><KeyboardArrowDownRoundedIcon  /></span>
      </Button>
      <Menu
        id="dropdown-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'dropdown-button',
        }}
        sx={{ backgroundColor: 'white', border: 'none' }}
      >
        {/* Dropdown items */}
        <MenuItem onClick={handleClose} sx={{ color: 'black', '&:hover':{  backgroundColor: '#f5f5f9', }}}>Option 1</MenuItem>
        <MenuItem onClick={handleClose} sx={{ color: 'gray' }}>Option 2</MenuItem>
        <MenuItem onClick={handleClose} sx={{ color: 'gray' }}>Option 3</MenuItem>
      </Menu>
      <Box
      sx={{ backgroundColor: '#f5f5f9', display: 'flex', alignItems: 'center', border: 'none', width: '15vw', borderRadius: 6}}>
        <SearchIcon sx={{ fontSize: 22, color: 'gray', pl: 3}}/>
        <Input placeholder='Cari' sx={{ fontFamily: 'poppins', fontSize: 15, fontWeight: 600, boxShadow: 'none', border:'none', bgcolor: '#f5f5f9', color: 'gray', width: '100%', height: '100%', mx: 'auto '}}/>
      </Box>
      <Button sx={{ padding: '14px 30px', color: 'white', backgroundColor: '#F15C5C', '&:hover': {backgroundColor: '#DF5A5A'} }}><img src={PDFIcon} alt="PDF icon" style={{ width: '25px', height: '25px', marginRight: '10px',  }}/>Ekspor PDF</Button>
      
    </Box>
    <Table aria-label="basic table" sx={{ border: '3px solid #dcdfe2', borderRadius: 8 }}>
      <thead style={{ backgroundColor: '#dcdfe2' }}>
        <tr>
          <th style={{ width: '3%', fontWeight: 'bold', textAlign: 'center', fontSize: 17 }}>No</th>
          <th style={{ fontWeight: 'bold',  fontSize: 17 , width: '10%'}}>Tanggal</th>
          <th style={{ fontWeight: 'bold',  fontSize: 17  }}>Nama</th>
          <th style={{ fontWeight: 'bold',  fontSize: 17  }}>Kelas</th>
          <th style={{ fontWeight: 'bold',  fontSize: 17  }}>Keterangan</th>
          <th style={{ fontWeight: 'bold',  fontSize: 17  }}>Hadir</th>
          <th style={{ fontWeight: 'bold',  fontSize: 17  }}>Pulang</th>
        </tr>
      </thead>
      <tbody>{rows.map((row, index) => (
        <tr style={{ textAlign: 'left' }}>
          <td style={{ textAlign:'center' }}>{index + 1}</td>
          <td style={{ fontWeight: 500, color: '#696969', width: '100%' }}>{row.date}</td>
          <td style={{ fontWeight: 500 }}>{row.nama}</td>
          <td style={{ fontWeight: 500 }}>{row.kelas}</td>
          <td style={{ fontWeight: 500 }}>{row.keterangan}</td>
          <td style={{ fontWeight: 500 }}>{row.hadir}</td>
          <td style={{ fontWeight: 500 }}>{row.pulang}</td>
        </tr>
      ))}
      </tbody>
    </Table>
    </Box>
  );
}