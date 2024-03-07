import React from 'react';
import { Grid, Box, Container } from '@mui/material';
import SideBar from '../components/SideBar';
import Header from '../components/Header';
import TablesDoner from '../components/Tables_doner'
import System from '../components/System'
import TableDonee from '../components/Tables_donee';

function Home() {

    return (
        <Box sx={{ bgcolor: '#560FC9' }}>
            <Container>
                <Box sx={{ flexGrow: 1, width: '100%' }}>
                    <Grid container >
                        {/* First Grid item for the vertically aligned containers */}
                        <Grid item xs={10} sm={10} md={10} lg={10} xl={10} sx={{ bgcolor: '#F6FAFB' }}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column', // Stack children vertically
                                }}
                            >
                                {/* Header */}
                                <Box
                                    sx={{
                                        bgcolor: 'primary.main',
                                        display: 'flex',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <Header />
                                </Box>

                                {/* Main Content */}
                                <Box
                                    sx={{
                                        flex: 1, // Take up the remaining space
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        color: 'white',
                                        p: 1,
                                    }}
                                >
                                    <TablesDoner />
                                    {/* <System /> */}
                                </Box>
                            </Box>
                        </Grid>

                        {/* Second Grid item (1/6 width of the container) */}
                        <Grid item xs={2} sm={2} md={2} lg={2} xl={2} sx={{ bgcolor: 'white' }}>
                            <Box
                                sx={{
                                    height: 300, // Adjust the height as needed
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    p: 2,
                                }}
                            >
                                <SideBar />
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </Box>
    );

}

export default Home;