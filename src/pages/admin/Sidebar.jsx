import React, { useState } from 'react';
import GlobalStyles from '@mui/joy/GlobalStyles';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Chip from '@mui/joy/Chip';
import Divider from '@mui/joy/Divider';
import IconButton from '@mui/joy/IconButton';
import List from '@mui/joy/List';
import { Link } from 'react-router-dom';
import ListItem from '@mui/joy/ListItem';
import ListItemButton, { listItemButtonClasses } from '@mui/joy/ListItemButton';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import DraftsIcon from '@mui/icons-material/Drafts';
import ClassRoundedIcon from '@mui/icons-material/ClassRounded';
import '@fontsource/poppins'
import Logo from '../../assets/img/logo.png'
import { FontDownloadOutlined } from '@mui/icons-material';

const ListItemWithIcon = ({ IconComponent, text, href, onClick, selected, children }) => {
  return (
    <ListItem
      sx={{
        gap: 1.5,
      }}>
      <Link to={href} style={{ textDecoration: 'none', display: 'flex' }}>
        <ListItemButton
          onClick={onClick}
          component={href ? 'a' : 'div'}
          href={href}
          sx={{
            bgcolor: selected ? '#4D91FF' : 'white',
            width: 220,
            py: 1.3,
            mt: 1,
            transition: '0.1s ease-in-out',
            '&:hover': {
              bgcolor: '#4D91FF !important',
              '& .MuiTypography-root, & .MuiSvgIcon-root': {
                color: selected ? 'white' : 'white',
                transition: '0.1s ease-in-out'
              }
            }
          }}>
          <IconComponent
            sx={{
              fontSize: '20px',
              color: selected ? 'white' : 'black',
            }}
          />
          <Typography
            sx={{
              color:  selected ? 'white' : 'black',
            }}
            className="MuiTypography-root"
            level="title-sm">
            {text}
          </Typography>
          {children}
        </ListItemButton>
      </Link>
    </ListItem>
  );
};

export default function Sidebar() {
  const [selected, setSelected] = useState(false);
  const [showChip, setShowChip] = useState(true);

  const handleClick = (item) => {
    setSelected(item);
    if (item === 'users') {
      setShowChip(false);
    }
  };

  return (
    <Sheet
      className="Sidebar"
      sx={{
        position: { xs: 'fixed', md: 'sticky' },
        transform: {
          md: 'none',
        },
        transition: 'transform 0.4s, width 0.4s',
        zIndex: 10000,
        height: '100vh',
        width: 'var(--Sidebar-width)',
        top: 0,
        p: 2,
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        // borderRight: '1px solid',
        bgcolor: 'white',
        overflowY: 'auto',
        boxSizing: 'border-box'
      }}>
      <Box
        className="Sidebar-overlay"
        sx={{
          position: 'fixed',
          zIndex: 9998,
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',  // Dark backdrop
          // backgroundColor: 'var(--joy-palette-background-backdrop)',
          transition: 'opacity 0.4s',
          transform: {
            xs: 'translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1) + var(--SideNavigation-slideIn, 0) * var(--Sidebar-width, 0px)))',
            lg: 'translateX(-100%)',
          },
        }}
        onClick={() => closeSidebar()}
      />
      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', justifyContent:'center', pr: 2,  }}>
        <Box variant="soft" >
            <img src={Logo} alt="Logo" style={{ width: '38px', height: 'auto' }} />
        </Box>
        <Typography textColor={'common.black'} style={{ fontFamily: 'Poppins', fontWeight: '700', fontSize: 20 }}>
          Presen<span style={{ color: '#4D91FF' }}>Siswa</span>
        </Typography>
        
        {/* <ColorSchemeToggle sx={{ ml: 'auto' }} /> */}
      </Box>
      {/* <Input size="sm" startDecorator={<SearchRoundedIcon />} placeholder="Search" /> */}
      <Box
        sx={{
          minHeight: 0,
          overflow: 'auto',
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          [`& .${listItemButtonClasses.root}`]: {
            gap: 2.5,
          },
        }}>
        <List
          size="sm"
          sx={{
            gap: 1,
            '--List-nestedInsetStart': '30px',
            '--ListItem-radius': (theme) => theme.vars.radius.sm,
          }}>
          <div>
            <ListItemWithIcon IconComponent={HomeRoundedIcon} text="Dashboard" href="dashboard" selected={selected === 'home'} onClick={() => handleClick('home')} />
            <ListItemWithIcon IconComponent={DraftsIcon} text="Permohonan izin" href="/admin/perizinan" selected={selected === 'perizinan'} onClick={() => handleClick('perizinan')} />
            <ListItemWithIcon IconComponent={ClassRoundedIcon} text="Data Kelas" href="/admin/dataKelas" selected={selected === 'dataKelas'} onClick={() => handleClick('dataKelas')} />
          </div>
        </List>
      </Box>

      <Divider/>
      <Link to="/admin/profil" style={{ textDecoration: 'none', color: 'blue' }}>
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', height: 60 }}>
          <Avatar variant="outlined" size="lg" src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286" />
          <Box sx={{ minWidth: 0, flex: 1 }}>
            <Typography level="title-lg">Siriwat K.</Typography> {/* ini adalah nama pe */}
            <Typography level="body-md">siriwatk@test.com</Typography>
          </Box>
          <IconButton size="md" variant="plain" color="danger">
            <LogoutRoundedIcon />
          </IconButton>
        </Box>
      </Link>
    </Sheet>
  );
}