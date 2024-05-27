import {React, useState} from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import {makeStyles} from '@mui/styles';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import backgroundImage from '../assets/bg.png';
import {auth} from '../firebase';
import {signInWithEmailAndPassword} from 'firebase/auth';

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

  const handlePassword = event => {
    event.preventDefault();
    setPassword(event.target.value);
  };
  const handleEmail = event => {
    event.preventDefault();
    setEmail(event.target.value);
  };
  const classes = useStyles();

  const handleSignIn = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const user = userCredential.user;
      localStorage.setItem('token', user.accessToken);
      console.log('User signed in:', user.accessToken);
      if (localStorage.getItem('token') === user.accessToken) {
        window.location.href = '/tabledonor';
      }
      // Redirect or perform further actions upon successful sign-in
    } catch (error) {
      console.error('Error signing in:', error.message);
    }
  };
  return (
    <div className={classes.root}>
      <ThemeProvider theme={defaultTheme}>
        <Container
          component="main"
          maxWidth="xs"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh', // Adjust the height as needed
          }}>
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
            }}>
            <Typography component="h1" variant="h5">
              הירשם
            </Typography>
            <Box cnoValidate sx={{mt: 1}}>
              <TextField
                margin="normal"
                required
                fullWidth
                name="email"
                style={{borderRadius: 30, backgroundColor: '#F1E6FF'}}
                placeholder="אימייל"
                value={email}
                onChange={handleEmail}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                type="password"
                placeholder="סיסמה"
                style={{
                  borderRadius: 30,
                  backgroundColor: '#F1E6FF',
                  border: 'none',
                }}
                value={password}
                onChange={handlePassword}
              />
              <Button
                fullWidth
                variant="contained"
                sx={{mt: 3, mb: 2}}
                onClick={handleSignIn}>
                החל מסנן
              </Button>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  );
}
