import React from 'react';
import { Grid, Box } from '@mui/material';
import SideBar from '../components/SideBar';
import Header from '../components/Header';
import Tables from '../components/Tables'
function Home() {

    return (

        <>
            <Box sx={{ flexGrow: 1, width: '100%' }}>
                <Grid container >
                    {/* First Grid item for the vertically aligned containers */}
                    <Grid item xs={10} sm={10} md={10} lg={10} xl={10}>
                        <Box
                            sx={{
                                height: 300, // Adjust the height as needed
                                display: 'flex',
                                flexDirection: 'column', // Stack children vertically
                                bgcolor: 'primary.light',
                            }}
                        >
                            {/* First container with the Header component */}
                            <Box
                                sx={{
                                    bgcolor: 'primary.main',
                                    display: 'flex',
                                    justifyContent: 'center',
                                }}
                            >
                                <Header />
                            </Box>

                            {/* Second container for other content */}
                            <Box
                                sx={{
                                    flex: 1, // Take up the remaining space
                                    bgcolor: 'primary.dark',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    color: 'white',
                                    p: 1,
                                }}
                            >
                                <Tables />
                            </Box>
                        </Box>
                    </Grid>

                    {/* Second Grid item (1/6 width of the container) */}
                    <Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
                        <Box
                            sx={{
                                height: 300, // Adjust the height as needed
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                p: 2,
                                color: "#8F80A7"
                            }}
                        >
                            <SideBar />
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </>
    );

}

export default Home;