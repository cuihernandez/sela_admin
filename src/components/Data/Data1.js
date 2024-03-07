import React from 'react';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Switch from '@mui/material/Switch';
import { TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
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

const label = { inputProps: { 'aria-label': 'Switch demo' } };
const Data1 = () => {
    return (
        <>
            <ThemeProvider theme={theme}>
                <Grid item xs={4} sm={4} md={4} lg={4} xl={4}
                    sx={
                        {
                            bgcolor: '#F6FAFB',
                            borderRadius: 3,
                            marginTop: -21
                        }
                    }
                >
                    <Box>
                        <Box sx={{ marginBottom: 20 }}>
                            <Card elevation={10} sx={{
                                borderRadius: 3
                            }}>
                                <Box sx={{
                                    display: 'flex',
                                    justifyContent: 'flex-end',
                                    margin: 1,
                                    marginRight: 5,
                                    marginBottom: 4,
                                }}>
                                    <Typography variant='h5' color="primary" fontWeight="bold">
                                        ימים פעילים
                                    </Typography>
                                </Box>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: 'flex-end',
                                        alignItems: 'center',
                                        margin: 1,
                                        padding: 1
                                    }}
                                >
                                    <Typography color="black">ימי ראשון</Typography>
                                    <Switch {...label} defaultChecked />
                                </Box>
                            </Card>
                        </Box>
                        <Card elevation={10}>
                            <Box sx={{
                                padding: 2,
                            }}>
                                <Box sx={{
                                    display: 'flex',
                                    justifyContent: 'flex-end',
                                    margin: 1,
                                    marginRight: 5,
                                    marginBottom: 1
                                }}>
                                    <Typography variant='h5' color="primary" fontWeight="bold">
                                        ימים פעילים
                                    </Typography>
                                </Box>

                                {/* textfield */}
                                <Box
                                    sx={{
                                        marginRight: 2,
                                        marginLeft: 2,
                                        padding: 2,
                                        bgcolor: '#F1E6FF',
                                        borderRadius: 3,
                                        borderColor: '#F1FFFF'
                                    }}>
                                    <TextField
                                        multiline
                                        rows={3}
                                        variant="outlined"
                                        sx={{
                                            borderRadius: 3,
                                            width: "100%",
                                            hegiht: "30%",
                                            bgcolor: 'white',
                                        }}>
                                    </TextField>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'flex-end',
                                            marginTop: 3,
                                        }}>
                                        <Button color='secondary'
                                            sx={
                                                {
                                                    bgcolor: '#560FC9',
                                                    borderRadius: 4
                                                }}>
                                            <AddIcon />
                                            Add Button
                                        </Button>

                                    </Box>

                                </Box>
                                <Box sx={{
                                    display: 'flex',
                                    justifyContent: 'flex-end',
                                    marginTop: 3,
                                    marginRight: 2,
                                }}>
                                    <Button color='secondary'
                                        sx={
                                            {
                                                bgcolor: '#560FC9',
                                                borderRadius: 4
                                            }}>
                                        okay
                                    </Button>
                                </Box>
                            </Box>
                        </Card>
                    </Box>

                </Grid>
            </ThemeProvider>


        </>

    );

}


export default Data1;