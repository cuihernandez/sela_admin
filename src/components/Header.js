import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {useLocation} from 'react-router-dom';
export default function Header() {
  const location = useLocation();

  let headerText = '';

  // Set header text based on the current route path
  switch (location.pathname) {
    case '/edit':
      headerText = 'תורמים';
      break;
    case '/donors/:id':
      headerText = 'תורמים פרטים אישיים';
      break;
    case '/tabledonee':
      headerText = 'לקוחות';
      break;
    case '/tabledonor':
      headerText = 'תורמים';
      break;
    default:
      headerText = 'מתפללים';
  }
  return (
    <Box
      sx={{
        bgcolor: 'primary.main',
        display: 'flex',
        justifyContent: 'center',
      }}>
      <Box sx={{flexGrow: 1}}>
        <AppBar
          position="static"
          sx={{backgroundColor: '#F1E6FF', borderRadius: 1}}>
          <Toolbar>
            <Typography
              variant="h6"
              component="div"
              sx={{flexGrow: 1}}></Typography>
            <Typography variant="h4" component="div" sx={{color: '#560FC9'}}>
              {headerText}
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
    </Box>
  );
}
