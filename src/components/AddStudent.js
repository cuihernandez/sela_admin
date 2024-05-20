import {Box, Button, Input, ThemeProvider, createTheme} from '@mui/material';
import {useState} from 'react';
import {db} from '../firebase';
import {addDoc, collection} from 'firebase/firestore/lite';

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

export default function AddStudent() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();

    if (!(name && phone)) return alert('Invalid Student details');

    try {
      // Reference to the collection
      const colRef = collection(db, 'students');

      // Add the document with auto-generated ID
      const docRef = await addDoc(colRef, {name, phone});

      console.log('Document written with ID: ', docRef.id);
      alert('Document written with ID: ' + docRef.id);
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <form onSubmit={handleSubmit}>
        <Box sx={{fontSize: 80, display: 'flex', gap: '2rem'}}>
          <Box>
            <Input
              placeholder="student name"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </Box>
          <Box>
            <Input
              type="number"
              placeholder="student phone"
              value={phone}
              onChange={e => setPhone(e.target.value)}
            />
          </Box>
        </Box>
        <Button type="submit" fullWidth variant="contained">
          Save
        </Button>
      </form>
    </ThemeProvider>
  );
}
