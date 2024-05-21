import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import iconImage from '../assets/icon.png';
import {Grid} from '@mui/material';
import {Link} from 'react-router-dom';

function RightAlignedContainer() {
  return (
    <Grid item xs={2} sm={2} md={2} lg={2} xl={2} sx={{bgcolor: 'white'}}>
      <Box
        sx={{
          height: 300, // Adjust the height as needed
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          p: 2,
        }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
          <Box
            component="img"
            sx={{
              width: 80,
              height: 80,
              marginTop: 2,
            }}
            src={iconImage}
            alt="Icon Image"
          />
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              marginLeft: 12,
              marginTop: 6,
            }}>
            <List sx={{width: '100%'}}>
              <ListItem
                button
                component={Link}
                to="/tabledonor"
                sx={ListItemStyle}>
                <ListItemText primary="משתמשים" />
              </ListItem>
              <ListItem
                button
                component={Link}
                to="/tabledonee"
                sx={ListItemStyle}>
                <ListItemText primary="לקוחות" />
              </ListItem>
              <ListItem button component={Link} to="/edit" sx={ListItemStyle}>
                <ListItemText primary="מערכת" />
              </ListItem>
            </List>
          </Box>
        </Box>
      </Box>
    </Grid>
  );
}

const ListItemStyle = {
  '&:hover': {
    backgroundColor: 'linear-gradient(45deg, #F1E6FF, #F1E6FF)', // Change the background color on hover
  },
};

export default RightAlignedContainer;
