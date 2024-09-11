// import React, { useState } from 'react';
// import Snackbar from '@mui/material/Snackbar';
// import MuiAlert from '@mui/material/Alert';
// import IconButton from '@mui/material/IconButton';
// import CloseIcon from '@mui/icons-material/Close';
// import CheckRoundedIcon from '@mui/icons-material/CheckRounded';

// // Custom Alert component
// const Alert = React.forwardRef(function Alert(props, ref) {
//   return (
//     <MuiAlert
//       elevation={6}
//       ref={ref}
//       variant="filled"
//       {...props}
//       sx={{
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'space-between', // Space between message and close button
//         padding: 2, // Add padding to the Alert content
//         width: 'auto', // Auto width for Alert
//         borderRadius: 2     , // Remove rounded corners
//         backgroundColor: '#2fcc27',
//         opacity: 0.8,
//         '& .MuiAlert-message': {
//           display: 'flex',
//           alignItems: 'center',
//           flex: 1, // Allow the message to take up remaining space
//           justifyContent: 'flex-start', // Left-align the message
//           pr: 50,
//           color: 'white',
//           fontFamily: 'poppins',
//           fontSize: 18
//         },
//         '& .MuiAlert-action': {
//           display: 'flex',
//           alignItems: 'center',
//           color: 'white'
//         }
//       }}
//     />
//   );
// });

// export default function NotificationPopup({ triggerNotification }) {
//   const [notifications, setNotifications] = useState([]);

//   // Function to show a notification
//   const showNotification = (message, severity = 'success') => {
//     const newNotification = {
//       id: new Date().getTime(),
//       message: message || 'This is a default notification!',
//       severity: severity,
//     };
//     setNotifications((prev) => [newNotification, ...prev]); // Stack notifications on top
//   };

//   if (triggerNotification) {
//     triggerNotification(showNotification);
//   }

//   // Close the notification
//   const handleClose = (id) => (event, reason) => {
//     if (reason === 'clickaway') {
//       return;
//     }
//     setNotifications((prev) => prev.filter((notification) => notification.id !== id));
//   };

//   return (
//     <>
//       {notifications.map((notification, index) => (
//         <Snackbar
//           key={notification.id}
//           open={true}
//           autoHideDuration={5000}
//           onClose={handleClose(notification.id)}
//           anchorOrigin={{ vertical: 'top', horizontal: 'right' }} // Align to the right
//           sx={{
//             width: 'auto', // Auto width for the Snackbar
//             left: 'auto', // No left alignment
//             right: 0, // Align to the right edge of the parent container
//             top: `${index * 70}px`, // Stack notifications with a gap of 70px
//             display: 'flex',
//             justifyContent: 'flex-end', // Align to the right
//           }}
//         >
//           <Alert
//             onClose={handleClose(notification.id)}
//             severity={notification.severity}
//             action={
//               <IconButton
//                 aria-label="close"
//                 color="inherit"
//                 onClick={handleClose(notification.id)}
//               >
//                 <CloseIcon />
//               </IconButton>
//             }
//             sx={{
//               backgroundColor: '#88fa5f', // Green background
//               color: 'white', // White text for better contrast
//             }}
//           >
//             <CheckRoundedIcon />{notification.message}
//           </Alert>
//         </Snackbar>
//       ))}
//     </>
//   );
// }

import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

// Custom Alert component
const Alert = React.forwardRef(function Alert(props, ref) {
      return (
        <MuiAlert
          elevation={6}
          ref={ref}
          variant="filled"
          {...props}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between', // Space between message and close button
            padding: 1.3, // Add padding to the Alert content
            width: 'auto', // Auto width for Alert
            borderRadius: 2     , // Remove rounded corners
            backgroundColor: '#2fcc27',
            opacity: 0.8,
            '& .MuiAlert-message': {
              display: 'flex',
              alignItems: 'center',
              flex: 1, // Allow the message to take up remaining space
              justifyContent: 'flex-start', // Left-align the message
              pr: 50,
              color: 'white',
              fontFamily: 'poppins',
              fontSize: 18
            },
            '& .MuiAlert-action': {
              display: 'flex',
              alignItems: 'center',
              color: 'white'
            }
          }}
        />
      );
    });

export default function NotificationPopup( { triggerNotification}) {
  const [notifications, setNotifications] = useState([]);

  // Function to open a new Snackbar
  const showNotification = (message, severity = 'success') => {
    const newNotification = {
      id: new Date().getTime(), // Unique ID for each notification
      message: message || 'This is a success notification!',
      severity: severity, // You can customize the severity if needed
    };
    setNotifications((prev) => [newNotification, ...prev]); // Stack notifications on top
};

  if (triggerNotification) {
    triggerNotification(showNotification)
  }

  // Function to close a Snackbar
  const handleClose = (id) => (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setNotifications((prev) => prev.filter((notification) => notification.id !== id));
  };

  return (
    <div>
      {/* Render multiple Snackbar components */}
      {notifications.map((notification, index) => (
        <Snackbar
          key={notification.id}
          open={true}
          autoHideDuration={5000} // 5 seconds duration
          onClose={handleClose(notification.id)}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }} // Position at top-right
          style={{ marginTop: `${index * 60}px` }} // Offset for each new notification
        >
          <Alert onClose={handleClose(notification.id)} severity={notification.severity} sx={{ width: '100%' }}>
            {notification.message}
          </Alert>
        </Snackbar>
      ))}
    </div>
  );
}
