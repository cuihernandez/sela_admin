import React from 'react';
import { Container, Box } from '@mui/material';
import SideBar from '../components/SideBar';
import Header from '../components/Header';
import Tables from '../components/Tables'
function Home() {

    return (

        <>
            <Container>
                <Box>
                    <Header />
                    <Tables />
                </Box>
                <SideBar />
            </Container>

        </>
    );

}

export default Home;