import React, {useRef, useState} from 'react'
import { Box, Typography, Button } from '@mui/joy'
import Logo from '../../assets/img/logo.png'
import PopUpForm from '../components/FormIzin'
import NotificationPopup from '../components/Alert'

export const Perizinan = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [fade, setFade] = React.useState(false)

  const handleOpen = () => {
    setFade(true);
    setTimeout(() => setIsOpen(true), 50)
  };

  const handleClose = () => {
    setIsOpen(false)
    setTimeout(() => setFade(false), 500)
  };

  // pop up notification
  const showNotificationRef = useRef(null);

  const handleNotificationTrigger = (trigger) => {
    showNotificationRef.current = trigger;
  };

  const handleClick = () => {
    if (showNotificationRef.current) {
      showNotificationRef.current("Successful accept all!", "Info!")
    }
  }

  return (
    <>
        <Box sx={{ backgroundColor: '#f5f5ff', width: '100%', height: '100vh' }}>
          <Box sx={{ p:3.5 }}>
            <Box sx={{ p: '0 0 15px 0', gap: '18px', display: 'flex', justifyContent: 'flex-end'}}>
            <Button onClick={handleOpen} sx={{ padding: '20px 40px', backgroundColor: 'white',color: '#4D91FF', fontSize: 20, fontWeight: '600', boxShadow: '2px 2px 10px 2px rgba(0, 0, 0, 0.1)', '&:hover': { backgroundColor: '#BEBEBE', color: '#4D91FF'}}}>
            <Button onClick={handleOpen} sx={{ padding: '20px 40px', backgroundColor: 'white',color: '#4D91FF', fontSize: 20, fontWeight: '600', boxShadow: '2px 2px 10px 2px rgba(0, 0, 0, 0.1)', '&:hover': { backgroundColor: '#BEBEBE', color: '#4D91FF'}}}>
                Tambah Data
              </Button>
              {fade && (
                <PopUpForm isOpen={isOpen} onClose={handleClose} />
              )}
              <Button onClick={handleClick} sx={{ padding: '20px 40px', backgroundColor: '#4D91FF',color: 'white', fontSize: 20, fontWeight: '600', boxShadow: '2px 2px 10px 2px rgba(0, 0, 0, 0.1)', '&:hover': { color: 'white'}}}>
                Accept All
              </Button>
              <NotificationPopup triggerNotification={handleNotificationTrigger} />
            </Box>
              <Box 
                sx={{ backgroundColor: '#4D91FF', display: 'flex', alignItems: 'center', boxShadow: '2px 2px 10px 2px rgba(0, 0, 0, 0.1)', width: '25%', height: 'auto', padding: '0 0 0 10px', borderRadius: '8px'}}>
                      <Box 
                      sx={{ display: 'flex', backgroundColor: 'white', width: '100%', height: '117px',borderRadius: '0 8px 8px 0', }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', p: 3}}><img src={Logo} alt="" style={{ width: '60px', height: 'auto' }} />
                            <Box sx={{ pl: 3 }}>
                              <Typography sx={{ color: 'black', fontWeight: '600', fontSize: 20, fontFamily: 'poppins' }}>Farra Azzura</Typography>
                              <Typography sx={{ color: 'black', fontWeight: '500', fontSize: 18, fontFamily: 'poppins' }}>XII RPL 2</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', flex: 1, p: 2,justifyContent: 'flex-start ', ml: 'auto' }}>
                              <Button onClick={handleOpen} sx={{ backgroundColor: '#4D91FF', p: 2, px: 3, fontSize: 17, borderRadius: 15 }}>Detail</Button>  
                              <Button onClick={handleOpen} sx={{ backgroundColor: '#4D91FF', p: 2, px: 3, fontSize: 17, borderRadius: 15 }}>Detail</Button>  
                            </Box>
                        </Box>
                      </Box>
                </Box>
              </Box>
        </Box>
    </>
  )
}
