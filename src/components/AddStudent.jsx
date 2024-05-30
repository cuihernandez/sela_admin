import {Box, Button, Input, ThemeProvider, createTheme} from '@mui/material';
import {useState} from 'react';
import {db, storage} from '../firebase';
import {addDoc, collection} from 'firebase/firestore/lite';
import {getDownloadURL, ref, uploadBytes} from 'firebase/storage';
import {Camera} from '@mui/icons-material';

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
  const [image, setImage] = useState({file: null, preview: null});

  const addImage = ({preview, data}) => {
    console.log({preview, data});
    setImage({file: data, preview});
  };

  const readURI = (img, value) => {
    if (img) {
      let reader = new FileReader();
      reader.onload = function (ev) {
        addImage({
          preview: ev.target?.result,
          // data: ev.target?.result as string,
          data: value,
        });
      };
      return reader.readAsDataURL(img);
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (!(name && phone && image && image.file))
      return alert('Invalid Student details');

    try {
      // Reference to the collection

      const imageUrl = await uploadImage(image.file);
      const colRef = collection(db, 'students');

      // Add the document with auto-generated ID
      const docRef = await addDoc(colRef, {
        name,
        phone,
        photo: imageUrl,
        inView: false,
        sponsor: '',
      });

      console.log({docRef});

      // console.log(`Student, ${name} added successfully`);
      alert(`Student, ${name} added successfully`);
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };

  // Function to upload an image
  async function uploadImage(file) {
    try {
      // Create a storage reference
      const storageRef = ref(storage, `images/${file.name}`);

      // Upload the file
      const snapshot = await uploadBytes(storageRef, file);

      console.log('Uploaded a blob or file!', snapshot);

      // Get the download URL
      const downloadURL = await getDownloadURL(snapshot.ref);
      console.log('File available at', downloadURL);

      return downloadURL;
    } catch (e) {
      console.error('Error uploading file:', e);
      throw e;
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <form onSubmit={handleSubmit}>
        <Box
          sx={{
            borderRadius: '100%',
            width: '5rem',
            height: '5rem',
            overflow: 'clip',
            backgroundColor: '#560FC9',
            marginLeft: 'auto',
            marginRight: 'auto',
            transform: 'translateY(2rem)',
            position: 'relative',
            display: 'flex',
            alignItems: 'center', // items-center
            justifyContent: 'center', // justify-center
          }}>
          {image?.preview && (
            <img
              src={image?.preview}
              style={{
                objectFit: 'cover',
                width: '100%',
                height: '100%',
              }}
            />
          )}
          <label
            htmlFor="image"
            // className="w-20 absolute h-20 p-4 flex bg-white/10 backdrop-blur-sm rounded-lg items-center justify-center cursor-pointer active:scale-95 transition-all duration-200">
            style={{
              width: '100%', // w-20
              height: '100%', // h-20
              position: 'absolute', // absolute
              display: 'flex', // flex
              // backgroundColor: 'rgba(255, 255, 255, 0.1)', // bg-white/10
              // backdropFilter: 'blur(1px)', // backdrop-blur-sm
              borderRadius: '0.5rem', // rounded-lg
              alignItems: 'center', // items-center
              justifyContent: 'center', // justify-center
              cursor: 'pointer', // cursor-pointer
              transition: 'transform 200ms, all 200ms', // transition-all duration-200
            }}>
            <Camera className="w-6 h-6 stroke-primary" />
          </label>
          <input
            type="file"
            id="image"
            accept="image/*"
            hidden
            multiple={false}
            // value={image?.file}
            // onChange={e => setName(e.target.value)}
            onInput={e => {
              const target = e.target;
              const value = target.files ? target.files[0] : null;

              console.log('IMAGE_FILE', {value});

              // @ts-ignore TODO
              //TODO COMEBACK ADD_TYPES
              const img = Object.values(target.files)[0];

              console.log({img});

              readURI(img, value);
              console.log({value});
              return setImage(img);
            }}
          />
        </Box>
        <Box
          sx={{
            fontSize: 80,
            display: 'flex',
            gap: '2rem',
          }}>
          <Box sx={{}}>
            <Input
              placeholder="student name"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </Box>
          <Box sx={{}}>
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
