import { React, useState } from 'react';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Input } from '@mui/material';
import { ArrowBack, Edit } from '@mui/icons-material';
import { Button } from '@mui/material';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';

import EditImage from '../../assets/Edit.png';
import IconImage from '../../assets/splash_icon.png'
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
    // const [name, setName] = useState('');
    // const [email, setEmail] = useState('');
    // const [motherName, setMotherName] = useState('');
    // const [phone, setPhone] = useState('');

    return (
        <>
            <ThemeProvider theme={theme}>
                <Grid item xs={8} sm={8} md={8} lg={8} xl={8}
                    sx={{
                        borderRadius: 1,
                        backgroundColor: '#F6FAFB',
                        margin: 2,
                        marginTop: -26,
                        padding: 2,
                    }}>
                    <Card elevation={10}
                        sx={{
                            borderRadius: 3,
                            margin: 2,
                            padding: 2
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'flex-end',
                                marginRight: 3,
                                marginBottom: 6
                            }}
                        >
                            <ArrowBack color='primary' />
                        </Box>


                        <Grid sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}>
                            <Card sx={{
                                borderRadius: 3,
                                margin: 2,
                                padding: 3,
                            }}>
                                <Typography variant='body5' color="primary" fontWeight={'bold'} textAlign={'right'}>
                                    ימים פעילים
                                </Typography>
                                <Typography variant='h4' color="primary" fontWeight={'bold'} textAlign={'right'} marginTop={3}>
                                    1,000
                                </Typography>
                            </Card>
                            <Box sx={{ position: 'relative' }}>
                                <Box component='img' src={IconImage} />
                                <Button sx={{ position: 'absolute', left: -20, bottom: 30 }}>
                                    <img src={EditImage} alt="edit" style={{ width: 30, height: 30 }} />
                                </Button>

                            </Box>

                        </Grid>
                        <Grid >
                            <Box sx={{
                                display: 'flex',
                                padding: 2,
                                justifyContent: 'space-between'
                            }}>
                                <Box sx={{
                                    padding: 1
                                }}>
                                    <Box>
                                        <Box sx={{
                                            display: 'flex',
                                            justifyContent: 'flex-end'
                                        }}>
                                            <Typography variant='body4' color="primary" textAlign={'right'} sx={{
                                            }}>
                                                Name
                                            </Typography>
                                        </Box>
                                        <Input
                                            sx={{ bgcolor: "#F1E6FF" }}
                                        />
                                    </Box>
                                    <Box>
                                        <Box sx={{
                                            display: 'flex',
                                            justifyContent: 'flex-end'
                                        }}>
                                            <Typography variant='body4' color="primary" textAlign={'right'} sx={{
                                            }}>
                                                Email
                                            </Typography>
                                        </Box>
                                        <Input
                                            sx={{ bgcolor: "#F1E6FF" }}
                                        />
                                    </Box>
                                </Box>
                                <Box
                                    sx={{
                                        padding: 1
                                    }}
                                >
                                    <Box>
                                        <Box sx={{
                                            display: 'flex',
                                            justifyContent: 'flex-end'
                                        }}>
                                            <Typography variant='body4' color="primary" textAlign={'right'} sx={{
                                            }}>
                                                Mother Name
                                            </Typography>
                                        </Box>
                                        <Input
                                            sx={{ bgcolor: "#F1E6FF" }}
                                        />
                                    </Box>

                                    <Box>
                                        <Box sx={{
                                            display: 'flex',
                                            justifyContent: 'flex-end'
                                        }}>
                                            <Typography variant='body4' color="primary" textAlign={'right'} sx={{
                                            }}>
                                                Phone Number
                                            </Typography>
                                        </Box>
                                        <Input
                                            sx={{ bgcolor: "#F1E6FF" }}
                                        />
                                    </Box>
                                </Box>
                            </Box>
                            <Box sx={{
                                display: 'flex',
                                justifyContent: "flex-end",
                                marginTop: 2
                            }}>
                                <Button color="secondary" sx={
                                    {
                                        bgcolor: '#560FC9',
                                        borderRadius: 4,

                                    }
                                }>שמור שינויים</Button>
                            </Box>

                        </Grid>
                    </Card>

                </Grid>
            </ThemeProvider>


        </>

    );

}


export default Data2;