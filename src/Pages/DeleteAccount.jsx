import {Container} from '@mui/material';
import {React, useState} from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import {makeStyles} from '@mui/styles';
import Typography from '@mui/material/Typography';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import backgroundImage from '../assets/bg.png';
import {auth} from '../firebase';
import {signInWithEmailAndPassword} from 'firebase/auth';
import styles from './styles.module.css';
import {RotateLeft} from '@mui/icons-material';

// TODO remove, this demo shouldn't need to reset the theme.
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
const useStyles = makeStyles({
  root: {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    height: '100vh', // Adjust the height as needed
  },
});

export default function DeleteAccount() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async e => {
    e.preventDefault();

    try {
      setLoading(true);
      setTimeout(() => {
        alert('account deleted successfully');
        setLoading(false);
      }, 2000);
    } catch (error) {}
  };

  const handleUsername = event => {
    event.preventDefault();
    setUsername(event.target.value);
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
        username,
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
      <ThemeProvider theme={theme}>
        <Container
          component="main"
          maxWidth="lg"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh', // Adjust the height as needed
          }}>
          <CssBaseline />
          <form onSubmit={submit}>
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
                בקשה למחיקת חשבון
              </Typography>
              <Box cnoValidate sx={{mt: 1}}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  className={styles.authInputField}
                  name="username"
                  style={{
                    borderRadius: 30,
                    backgroundColor: '#F1E6FF',
                    border: 'none',
                    outline: 'none',
                    overflow: 'clip',
                  }}
                  placeholder="שם משתמש"
                  value={username}
                  onChange={handleUsername}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  className={styles.authInputField}
                  name="email"
                  type="email"
                  style={{
                    borderRadius: 30,
                    backgroundColor: '#F1E6FF',
                    border: 'none',
                    outline: 'none',
                    overflow: 'clip',
                  }}
                  placeholder="אימייל"
                  value={email}
                  onChange={handleEmail}
                />
                <textarea
                  placeholder="למה אתה רוצה למחוק את החשבון שלך?"
                  rows={12}
                  style={{
                    borderRadius: 30,
                    backgroundColor: '#F1E6FF',
                    outline: 'none',
                    border: 'none',
                    overflow: 'clip',
                    width: '100%',
                    padding: '1rem',
                    marginTop: '0.5rem',
                    height: 'auto',
                  }}
                  className={styles.textInput}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{mt: 3, mb: 2, borderRadius: 30, padding: '1rem 0'}}
                  onClick={handleSignIn}>
                  {loading ? (
                    <RotateLeft style={{fill: 'white'}} className={'spinner'} />
                  ) : (
                    'לְאַשֵׁר'
                  )}
                </Button>
              </Box>
            </Box>
          </form>
        </Container>
      </ThemeProvider>
    </div>
  );
}
