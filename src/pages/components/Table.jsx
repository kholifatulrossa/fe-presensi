import * as React from 'react';
import Table from '@mui/joy/Table';
import Box from '@mui/joy/Box';
import { useState, useRef, useEffect } from 'react';
import Button from '@mui/joy/Button';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import Menu from '@mui/joy/Menu';
import MenuItem from '@mui/joy/MenuItem';
import SearchIcon from '@mui/icons-material/Search';
import Input from '@mui/joy/Input';
import PDFIcon from '../../assets/icon/eksporPDF.png';
import Typography from '@mui/joy/Typography';
import jsPDF from 'jspdf';
import "jspdf-autotable";

function exportToPDF(data) {
  const doc = new jsPDF();

  // Add a title
  doc.text('Data Presensi', 14, 10);

  // Define the table structure
  const tableColumn = ["No", "Tanggal", "Nama", "Kelas", "Keterangan", "Hadir", "Pulang"];
  const tableRows = [];

  // Loop through the rows and push the data to tableRows
  data.forEach((row, index) => {
    const rowData = [
      index + 1,  // No
      row.tanggal,
      row.siswa.nama,
      row.siswa.kelasId,
      row.status,
      row.wktdatang,
      row.wktpulang
    ];
    tableRows.push(rowData);
  });

  // Add the table to the PDF using the autotable plugin
  doc.autoTable({
    head: [tableColumn],
    body: tableRows,
    startY: 20, // Position the table
  });

  // Save the PDF
  doc.save('presensi-data.pdf');
}

export default function BasicTable({ data = [], showFilterButton = true, showSearchButton = true, showPDFExport = true }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const ref = useRef(null);
  const [searchQuery, setSearchQuery] = useState(''); 
  const [filteredRows, setFilteredRows] = useState(data); 

  // Handle dropdown menu open/close
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // Helper function to convert date from 'DD-MM-YYYY' to 'YYYY-MM-DD'
  const convertDate = (date) => {
    const [day, month, year] = date.split('-');
    return `${year}-${month}-${day}`;
  };

  // Handle sorting by name A-Z, Z-A
  const sortByNameAsc = () => {
    const sortedRows = [...filteredRows].sort((a, b) => a.nama.localeCompare(b.nama));
    setFilteredRows(sortedRows);
    handleClose();
  };

  const sortByNameDesc = () => {
    const sortedRows = [...filteredRows].sort((a, b) => b.nama.localeCompare(a.nama));
    setFilteredRows(sortedRows);
    handleClose();
  };

  // Handle sorting by date (Latest, Recent)
  const sortByDateLatest = () => {
    const sortedRows = [...filteredRows].sort((a, b) => new Date(convertDate(b.date)) - new Date(convertDate(a.date)));
    setFilteredRows(sortedRows);
    handleClose();
  };

  const sortByDateRecent = () => {
    const sortedRows = [...filteredRows].sort((a, b) => new Date(convertDate(a.date)) - new Date(convertDate(b.date)));
    setFilteredRows(sortedRows);
    handleClose();
  };

  // Search filter logic
  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    const filteredData = data.filter((row) =>
      row.siswa.nama.toLowerCase().includes(query) ||
      row.tanggal.toLowerCase().includes(query) ||
      row.status.toLowerCase().includes(query) 
    );

    setFilteredRows(filteredData);
  };

  // Handle click outside the dropdown menu
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

  useEffect(() => {
    setFilteredRows(data);
  }, [data]);

  return (
    <Box sx={{ width: '100%' }}>
      <Box ref={ref} sx={{ display: 'flex', gap: 1, justifyContent: 'space-between', pb: 2 }}>
        <Typography fontWeight="700" fontSize="25px" color="#272A2C" sx={{ p: 1, fontFamily: 'poppins' }}>
          Tabel data Presensi
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          { showFilterButton && (
            <Button
              sx={{
                padding: '14px 30px',
                backgroundColor: '#f5f5f9',
                color: 'gray',
                fontFamily: 'poppins',
                '&:hover': { backgroundColor: '#f5f5f9' },
                alignItems: 'center',
              }}
              aria-controls={open ? 'dropdown-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
            >
              Filter <span style={{ display: 'flex', alignItems: 'center' }}><KeyboardArrowDownRoundedIcon /></span>
            </Button>
            )}
            <Menu
            id="dropdown-menu"
            anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              sx={{ backgroundColor: 'white', border: 'none' }}
            >
              {/* Dropdown items */}
              <MenuItem onClick={sortByNameAsc} sx={{ color: 'black', '&:hover': { backgroundColor: '#f5f5f9' } }}>
                A → Z
              </MenuItem>
              <MenuItem onClick={sortByNameDesc} sx={{ color: 'black', '&:hover': { backgroundColor: '#f5f5f9' } }}>
                Z → A
              </MenuItem>
              <MenuItem onClick={sortByDateLatest} sx={{ color: 'black', '&:hover': { backgroundColor: '#f5f5f9' } }}>
                Tanggal Terbaru
              </MenuItem>
              <MenuItem onClick={sortByDateRecent} sx={{ color: 'black', '&:hover': { backgroundColor: '#f5f5f9' } }}>
                Tanggal Terlama
              </MenuItem>
            </Menu>
            { showSearchButton && (
            <Box
              sx={{ backgroundColor: '#f5f5f9', display: 'flex', alignItems: 'center', border: 'none', width: '15vw', borderRadius: 6 }}
            >
              <SearchIcon sx={{ fontSize: 22, color: 'gray', pl: 3 }} />
              <Input
                placeholder="Cari"
                value={searchQuery}
                onChange={handleSearch}
                sx={{ fontFamily: 'poppins', fontSize: 15, fontWeight: 600, boxShadow: 'none', border: 'none', bgcolor: '#f5f5f9', color: 'gray', width: '100%', height: '100%', mx: 'auto' }}
              />
            </Box>
              )}
              { showPDFExport && (
            <Button onClick={() => exportToPDF(filteredRows)} sx={{ padding: '14px 30px', color: 'white', backgroundColor: '#F15C5C', '&:hover': { backgroundColor: '#DF5A5A' } }}>
              <img src={PDFIcon} alt="PDF icon" style={{ width: '25px', height: '25px', marginRight: '10px' }} />Ekspor PDF
            </Button>
              )}
        </Box>
      </Box>
      <Table aria-label="basic table" sx={{ border: '3px solid #dcdfe2', borderRadius: 8 }}>
        <thead style={{ backgroundColor: '#dcdfe2' }}>
          <tr>
            <th style={{ width: '3%', fontWeight: 'bold', textAlign: 'center', fontSize: 17 }}>No</th>
            <th style={{ fontWeight: 'bold', fontSize: 17, width: '10%' }}>Tanggal</th>
            <th style={{ fontWeight: 'bold', fontSize: 17 }}>Nama</th>
            <th style={{ fontWeight: 'bold', fontSize: 17 }}>Kelas</th>
            <th style={{ fontWeight: 'bold', fontSize: 17 }}>Keterangan</th>
            <th style={{ fontWeight: 'bold', fontSize: 17 }}>Hadir</th>
            <th style={{ fontWeight: 'bold', fontSize: 17 }}>Pulang</th>
          </tr>
        </thead>
        <tbody>
          {filteredRows.map((row, index) => (
            <tr key={index} style={{ textAlign: 'left' }}>
              <td style={{ textAlign: 'center' }}>{index + 1}</td>
              <td style={{ fontWeight: 500, color: '#696969', width: '100%' }}>{row.tanggal.slice(0, 10)}</td>
              <td style={{ fontWeight: 500 }}>{row.siswa.nama}</td>
              <td style={{ fontWeight: 500 }}>{row.siswa.kelasId}</td>
              <td style={{ fontWeight: 500 }}>{row.status}</td>
              <td style={{ fontWeight: 500 }}>{row.wktdatang}</td>
              <td style={{ fontWeight: 500 }}>{row.wktpulang}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Box>
  );
}
