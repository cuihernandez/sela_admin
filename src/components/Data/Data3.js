import React from 'react';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import Card from '@mui/material/Card';
import Transfer from '../Transfer';
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

const Data3 = () => {
    return (
        <>
            <ThemeProvider theme={theme}>
                <Grid item xs={4} sm={4} md={4} lg={4} xl={4}
                    sx={
                        {
                            bgcolor: '#F6FAFB',
                            borderRadius: 1,
                            marginLeft: 4,
                            margin: 2,
                            padding: 2
                        }
                    }
                >
                    <Box>
                        <Box sx={{ marginBottom: 20 }}>
                            <Card elevation={10} >
                                <Box sx={{
                                    display: 'flex',
                                    justifyContent: 'flex-end',
                                    margin: 1,
                                    marginRight: 5,
                                    marginBottom: 4
                                }}>
                                    <Typography variant='h5' color="primary" fontWeight="bold">
                                        ימים פעילים
                                    </Typography>
                                </Box>
                                <Box border={1} borderColor={'#D6B7FF'} sx={{ margin: 2, borderRadius: 3, padding: 1 }}>
                                    <Transfer price={-99} name={"יעקב"} />
                                    <Transfer price={99.45} name={"Tom"} />
                                    <Transfer price={-1229} name={"John"} />
                                    <Transfer price={14299} name={"Andy"} />


                                </Box>
                                <Box border={1} borderColor={'#D6B7FF'} sx={{ margin: 2, borderRadius: 3, padding: 2, paddingRight: 3 }}>
                                    <Typography variant='h6' color="primary" fontWeight="bold" textAlign={'right'}>
                                        ימים
                                    </Typography>
                                    <Typography variant='h5' color="primary" fontWeight="bold" textAlign={'right'}>
                                        $30,100
                                    </Typography>
                                </Box>
                            </Card>
                        </Box>
                    </Box>

                </Grid>
            </ThemeProvider>


        </>

    );

}


export default Data3;