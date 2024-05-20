import React from 'react';
import Typography from '@mui/material/Typography';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
const theme = createTheme({
  palette: {
    primary: {
      main: '#560FC9',
    },
    secondary: {
      main: '#FFFFFF',
    },
  },
});

const Transfer = props => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            display: 'flex',
            flowDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: 1,
          }}>
          <Box>
            {parseFloat(props.price) > 0 ? (
              <Typography color="black">${props.price}</Typography>
            ) : (
              <Typography color="black">
                -${Math.abs(parseFloat(props.price))}
              </Typography>
            )}
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: 1,
            }}>
            <Box>
              <Box>
                <Typography color="black" textAlign={'right'}>
                  {props.name}
                </Typography>
                <Typography color="gray" textAlign={'right'}>
                  Transfer
                </Typography>
              </Box>
            </Box>
            <Box sx={{marginLeft: 1}}>
              {parseFloat(props.price) > 0 ? (
                <Avatar
                  sx={{bgcolor: '#e0f2f1', borderRadius: 30}}
                  variant="rounded">
                  <ArrowUpwardIcon sx={{color: 'green'}} />
                </Avatar>
              ) : (
                <Avatar
                  sx={{bgcolor: '#fff3e0', borderRadius: 30}}
                  variant="rounded">
                  <ArrowDownwardIcon sx={{color: 'red'}} />
                </Avatar>
              )}
            </Box>
          </Box>
        </Box>
      </ThemeProvider>
    </>
  );
};

export default Transfer;
