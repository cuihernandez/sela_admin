import { React, useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { makeStyles } from '@mui/styles';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Input } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import backgroundImage from '../assets/bg.png';
// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();
const useStyles = makeStyles({
    root: {
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        height: '100vh', // Adjust the height as needed
    },
});
export default function SignIn() {

    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const handleSubmit = () => {
        // event.preventDefault();
        console.log('email:', email, 'password:', password);
    };
    const classes = useStyles();
    if (localStorage.getItem("wagmi.store")) {
        window.location.href = "/";
    }
    return (
        <div className={classes.root}>
            <ThemeProvider theme={defaultTheme}>
                <Container component="main" maxWidth="xs"
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '100vh', // Adjust the height as needed
                    }}
                >
                    <CssBaseline />
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',

                            backgroundColor: 'white',
                            padding: 3,
                            borderRadius: 4,
                        }}
                    >
                        <Typography component="h1" variant="h5">
                            הירשם
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                            {/* <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                placeholder='אימייל'
                                value={email}
                                onChange={setEmail}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                placeholder='סיסמה'
                                style={{ borderRadius: 30, backgroundColor: '#F1E6FF' }}
                                variant="outlined"
                                InputProps={{
                                    style: {
                                        border: "none",
                                    },
                                }}
                                value={password}
                                onChange={setPassword}
                            /> */}
                            <Input
                                margin="normal"
                                required
                                fullWidth
                                autoComplete="current-password"
                                placeholder='סיסמה'
                                style={{ borderRadius: 30, backgroundColor: '#F1E6FF' }}
                                variant="outlined"
                                InputProps={{
                                    style: {
                                        border: "none",
                                    },
                                }}

                                value={email}
                                onChange={setEmail}
                            />

                            <Input
                                placeholder='password'
                                onChange={setPassword}
                                value={password}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                onClick={handleSubmit}
                            >
                                החל מסנן
                            </Button>
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider>
        </div>
    );
}