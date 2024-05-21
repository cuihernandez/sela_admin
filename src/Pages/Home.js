import React, {useEffect} from 'react';
import {Route, Routes, useNavigate} from 'react-router-dom';
import {Grid, Box, Container} from '@mui/material';
import SideBar from '../components/SideBar';
import Header from '../components/Header';
import TablesDoner from '../components/Tables_doner';
import Edit from '../components/Edit';
import TableDonee from '../components/Tables_donee';
import Donors from '../components/Donors';
import {EditProvider} from '../EditContext';

function Home() {
  const navigate = useNavigate();
  useEffect(() => {
    const accessToken = localStorage.getItem('token');
    if (!accessToken) navigate('/sign-in');
  }, []);

  return (
    <Box sx={boxStyle}>
      <Container>
        <Box sx={containerBoxStyle}>
          <Grid container>
            {/* First Grid item for the vertically aligned containers */}
            <Grid
              item
              xs={10}
              sm={10}
              md={10}
              lg={10}
              xl={10}
              sx={{bgcolor: '#F6FAFB'}}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column', // Stack children vertically
                }}>
                <Header />
                {/* Main Content */}
                <Box sx={mainContentBoxStyle}>
                  <EditProvider>
                    <Routes>
                      <Route path="/edit" element={<Edit />} />
                      <Route path="/donors/:id" element={<Donors />} />
                      <Route path="/tabledonee" element={<TableDonee />} />
                      <Route path="/tabledonor" element={<TablesDoner />} />
                    </Routes>
                  </EditProvider>
                </Box>
              </Box>
            </Grid>
            <SideBar />
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}

const boxStyle = {
  bgcolor: '#560FC9',
};

const containerBoxStyle = {
  flexGrow: 1,
  width: '100%',
};

const mainContentBoxStyle = {
  flex: 1,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  color: 'white',
  p: 1,
};
export default Home;
