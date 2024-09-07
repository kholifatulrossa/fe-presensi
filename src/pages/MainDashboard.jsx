import { Box, CssBaseline, CssVarsProvider } from '@mui/joy';
import React from 'react'
import Header from './admin/Header';
import Sidebar from './admin/Sidebar';
import { Outlet } from 'react-router-dom';

const DashboardPage = () => {
  return (
  <>
    <CssVarsProvider disableTransitionOnChange>
        <Box sx={{ display: 'flex'}}>
            <Sidebar/>
            <Box>
            <Header/>
            <Box
            component="main"
            className="MainContent"
            sx={{
              pt: { xs: 'calc(12px + var(--Header-height))', md: 0 },
              pb: { xs: 2, sm: 2, md: 3 },
              display: 'flex',
              flexDirection: 'column',
              width: 'auto',  // Auto width to fit content
              alignItems: 'center',  // Center content horizontally
              maxWidth: '100%',  // Ensure it doesn't overflow parent
              gap: 1,
              mx: 'auto',  // Center container in the viewport
              overflowX: 'hidden',  // Prevent horizontal overflow
            }}>
                <Box sx={{ borderRadius: '15px', overflow: 'hidden' }}><Outlet/> </Box>
            </Box>
            </Box>
        </Box>
    </CssVarsProvider>
  </>
  )
}

export default DashboardPage;

