import React from 'react';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { TextField } from '@mui/material';
import QuoteImage from '../../assets/bi_quote.png';
import { ArrowBack } from '@mui/icons-material';
import { Button } from '@mui/material';
import Card from '@mui/material/Card';
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

const Data2 = () => {
    return (
        <>
            <ThemeProvider theme={theme}>
                <Grid item xs={8} sm={8} md={8} lg={8} xl={8}
                    sx={{
                        borderRadius: 1,
                        backgroundColor: '#F6FAFB',
                        margin: 2,
                        padding: 2
                    }}>
                    <Card elevation={10}
                        sx={{

                            borderRadius: 3,
                            backgroundColor: '#F1E6FF',
                            margin: 2,
                            padding: 2
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'flex-end',
                                marginRight: 3,
                            }}
                        >
                            <ArrowBack color='primary' />
                        </Box>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'flex-end',
                                marginTop: 2,
                                marginRight: 5
                            }}
                        >
                            <Typography variant='h5' color="primary" fontWeight="bold">
                                ימים פעילים
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'flex-end',
                                marginTop: 3,
                                marginRight: 5
                            }}
                        >
                            <Typography variant='body2' color="primary" >
                                ימים פעילים
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                                marginRight: 2,
                                marginLeft: 2
                            }}>
                            <TextField
                                multiline
                                rows={7}
                                variant="outlined"
                                sx={{
                                    width: "100%",
                                    hegiht: "30%",
                                    bgcolor: 'white',
                                }}>
                            </TextField>
                        </Box>

                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            marginTop: 3
                        }}>
                            <Button color="secondary" sx={
                                {
                                    bgcolor: '#560FC9',
                                    borderRadius: 4
                                }
                            }>שמור שינויים</Button>
                        </Box>

                    </Card>
                    <Card elevation={7}
                        sx={{
                            borderRadius: 3,
                            margin: 2,
                            padding: 2
                        }}>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'flex-end',

                                marginRight: 5
                            }}
                        >
                            <Typography variant='h5' color="primary" fontWeight="bold">
                                ימים פעילים
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'flex-end',
                                marginTop: 3,
                                marginRight: 5
                            }}
                        >
                            <Typography variant='body2' color="primary" >
                                ימים פעילים
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                                marginRight: 2,
                                marginLeft: 2
                            }}>
                            <TextField
                                multiline
                                rows={1}
                                variant="outlined"
                                sx={{
                                    width: "100%",
                                    hegiht: "30%",
                                    bgcolor: 'white',
                                }}>
                            </TextField>
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'flex-end',
                                    flexDirection: 'column'
                                }}>
                                <Box sx={{
                                    display: 'flex',
                                    justifyContent: 'flex-end',
                                }}>
                                    <Box sx={{
                                        display: 'flex',
                                        justifyContent: 'flex-end',
                                        marginTop: 3
                                    }}>
                                        <Button color="secondary" sx={
                                            {
                                                bgcolor: '#560FC9',
                                                borderRadius: 3
                                            }
                                        }>שמור שינויים</Button>
                                    </Box>

                                </Box>
                                <Box sx={{
                                    display: 'flex',
                                    justifyContent: 'flex-end'
                                }}>

                                    <Box sx={{
                                        borderRadius: 3,
                                        backgroundColor: '#F1E6FF',
                                        margin: 2,
                                        marginRight: 0,
                                        width: '70%',
                                        // display: 'flex',
                                        // justifyContent: 'flex-end',
                                    }}>
                                        <Box sx={{

                                        }}>
                                            <img src={QuoteImage} alt="edit" style={{ width: 'auto', height: 'auto' }} />
                                        </Box>

                                        <Box>
                                            <Box sx={{
                                                display: 'flex',
                                                justifyContent: 'flex-end',
                                                marginRight: 2
                                            }}>
                                                <Typography variant='body3' color="primary" fontWeight={'bold'} >
                                                    הוסף תאריך
                                                </Typography>
                                            </Box>

                                            <Box sx={{
                                                display: 'flex',
                                                justifyContent: 'flex-end',
                                                marginTop: 1,
                                                marginRight: 2
                                            }}>
                                                <Typography variant='body2' color="gray" >
                                                    הוסף תאריך
                                                </Typography>
                                            </Box>


                                            <Box sx={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                paddingRight: 4,
                                                paddingLeft: 2,
                                                marginTop: 1,
                                                marginBottom: 3

                                            }}>
                                                <Typography variant='body2' color="gray" >
                                                    12/01/2024
                                                </Typography>
                                                <Typography variant='body2' color="primary" >
                                                    הוסף תאריך
                                                </Typography>
                                            </Box>

                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Card>
                </Grid>
            </ThemeProvider>


        </>

    );

}


export default Data2;