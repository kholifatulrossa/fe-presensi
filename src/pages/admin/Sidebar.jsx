import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom'; // Import useLocation
import GlobalStyles from '@mui/joy/GlobalStyles';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Chip from '@mui/joy/Chip';
import Divider from '@mui/joy/Divider';
import IconButton from '@mui/joy/IconButton';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemButton, { listItemButtonClasses } from '@mui/joy/ListItemButton';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import DraftsIcon from '@mui/icons-material/Drafts';
import ClassRoundedIcon from '@mui/icons-material/ClassRounded';
import Logo from '../../assets/img/logo.png';

const ListItemWithIcon = ({ IconComponent, text, href, onClick, selected, children }) => (
  <ListItem sx={{ gap: 1.5 }}>
    <Link to={href} style={{ textDecoration: 'none', display: 'flex' }}>
      <ListItemButton
        onClick={onClick}
        component='a'
        href={href}
        sx={{
          bgcolor: selected ? '#4D91FF' : 'white', // Adjust background color
          width: 220,
          py: 1.3,
          mt: 1,
          '&:hover': {
            bgcolor: '#BEBEBE !important',
            opacity: '0.5',
            '& .MuiTypography-root, & .MuiSvgIcon-root': {
              color: selected ? 'white' : 'white',
            },
          },
        }}>
        <IconComponent sx={{ fontSize: '20px', color: selected ? 'white' : 'black' }} />
        <Typography sx={{ color: selected ? 'white' : 'black' }} level="title-sm">
          {text}
        </Typography>
        {children}
      </ListItemButton>
    </Link>
  </ListItem>
);

export default function Sidebar({ showDashboardOnly, basePath, nameprofile, classprofile, photo }) {
  const location = useLocation(); // Get the current URL

  // Handle selection of active menu based on current URL
  const isSelected = (path) => location.pathname === path;

  return (
    <Sheet
      className="Sidebar"
      sx={{
        position: { xs: 'fixed', md: 'sticky' },
        transition: 'transform 0.4s, width 0.4s',
        zIndex: 10000,
        height: '100dvh',
        width: 'var(--Sidebar-width)',
        top: 0,
        p: 2,
        flexShrink: 0,
        justifyContent: 'space-between',
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        boxShadow: '4px 0px 10px rgba(0, 0, 0, 0.1)',
        bgcolor: 'white',
        overflowY: 'auto',
        boxSizing: 'border-box',
      }}>
      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', justifyContent: 'center', pr: 2 }}>
        <Box variant="soft">
          <img src={Logo} alt="Logo" style={{ width: '38px', height: 'auto' }} />
        </Box>
        <Typography textColor={'common.black'} style={{ fontFamily: 'Poppins', fontWeight: '700', fontSize: 20 }}>
          Presen<span style={{ color: '#4D91FF' }}>Siswa</span>
        </Typography>
      </Box>
      <Box
        sx={{
          minHeight: 0,
          overflow: 'auto',
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
        }}>
        <List
          size="sm"
          sx={{
            gap: 1,
            '--List-nestedInsetStart': '30px',
            '--ListItem-radius': (theme) => theme.vars.radius.sm,
          }}>
          <div>
            {showDashboardOnly ? (
              <ListItemWithIcon
                IconComponent={HomeRoundedIcon}
                text="Dashboard"
                href={basePath}
                selected={isSelected(`${basePath}`)} // Check if the current URL is for the dashboard
                onClick={() => handleClick('home')}
              />
            ) : (
              <>
                <ListItemWithIcon
                  IconComponent={HomeRoundedIcon}
                  text="Dashboard"
                  href="/admin"
                  selected={isSelected('/admin')} // Check if current URL is /admin
                  onClick={() => handleClick('home')}
                />
                <ListItemWithIcon
                  IconComponent={DraftsIcon}
                  text="Permohonan izin"
                  href="/admin/perizinan"
                  selected={isSelected('/admin/perizinan')} // Check if current URL is /admin/perizinan
                  onClick={() => handleClick('perizinan')}
                />
                <ListItemWithIcon
                  IconComponent={ClassRoundedIcon}
                  text="Data Kelas"
                  href="/admin/dataKelas"
                  selected={isSelected('/admin/dataKelas')} // Check if current URL is /admin/dataKelas
                  onClick={() => handleClick('dataKelas')}
                />
              </>
            )}
          </div>
        </List>
      </Box>

      <Divider />
      <Link to={`${basePath}/profil`} style={{ textDecoration: 'none', color: 'blue' }}>
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', height: 60 }}>
          <Avatar variant="soft" size="lg" src={photo} />
          <Box sx={{ minWidth: 0, flex: 1, pl: 1 }}>
            <Typography level="title-lg" sx={{ fontWeight: 600, fontSize: 15 }}>
              {nameprofile}
            </Typography>
            <Typography level="body-md" sx={{ fontWeight: 500, fontSize: 13 }}>
              {classprofile}
            </Typography>
          </Box>
          <IconButton size="md" variant="plain" color="primary">
            <LogoutRoundedIcon />
          </IconButton>
        </Box>
      </Link>
    </Sheet>
  );
}
