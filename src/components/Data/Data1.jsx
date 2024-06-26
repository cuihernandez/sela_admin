import {React, useState, useEffect} from 'react';
import Typography from '@mui/material/Typography';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import {TextField} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import {Delete, RotateLeft} from '@mui/icons-material';
import {Button} from '@mui/material';
import Card from '@mui/material/Card';
import {useForm} from 'react-hook-form';
import dayjs from 'dayjs';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {
  collection,
  addDoc,
  deleteDoc,
  getDocs,
  doc,
  setDoc,
  getDoc,
  writeBatch,
} from 'firebase/firestore/lite';
import {db} from '../../firebase';
import {DatePicker} from '@mui/x-date-pickers';

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

const Data1 = () => {
  const {register, handleSubmit, reset} = useForm();
  const [items, setItems] = useState([]);

  const [loading, setLoading] = useState({date: false});

  const [startDate, setStartDate] = useState(dayjs('2024-03-01T15:30'));

  const [endDate, setEndDate] = useState(dayjs('2024-04-01T18:30'));

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, 'psalms'));
      const fetchedItems = querySnapshot.docs.map(doc => ({
        id: doc.id, // Store document ID for deletion
        ...doc.data(),
      }));
      setItems(fetchedItems);
    };

    fetchData();
    const fetchDateData = async () => {
      const docStartSnapshot = await getDoc(
        doc(db, 'mobileStatus', 'startTime'),
      );
      const docEndSnapshot = await getDoc(doc(db, 'mobileStatus', 'endTime'));

      if (docStartSnapshot.exists() && docEndSnapshot.exists()) {
        const startTime = dayjs(docStartSnapshot.data().time.toDate()); // Convert Firestore timestamp to dayjs
        const endTime = dayjs(docEndSnapshot.data().time.toDate()); // Convert Firestore timestamp to dayjs
        setStartDate(startTime);
        setEndDate(endTime);
        // console.log('startTime:', startTime, 'endTime is', endTime);
      } else {
        console.log('One or both documents do not exist.');
      }
    };

    fetchDateData();
  }, []);

  const onSubmit = async formData => {
    try {
      const docRef = await addDoc(collection(db, 'psalms'), {
        text: formData.newText, // Assuming you want to store text under "text" field
      });
      // Update local state with new item
      setItems(prev => [...prev, {id: docRef.id, text: formData.newText}]);
      reset(); // Reset form after submission
    } catch (e) {
      alert('Error adding document');
    }
  };

  const handleDelete = async docId => {
    try {
      await deleteDoc(doc(db, 'psalms', docId));
      console.log('Document deleted with ID: ', docId);
      // Update local state to remove the item
      setItems(prev => prev.filter(item => item.id !== docId));
    } catch (e) {
      console.error('Error deleting document: ', e);
    }
  };

  const handleChange = async newValue => {
    const docRefStart = doc(db, 'mobileStatus', 'startTime');
    const docRefEnd = doc(db, 'mobileStatus', 'endTime');
    setLoading(prev => ({...prev, date: true}));

    try {
      if (startDate) {
        await setDoc(docRefStart, {time: startDate}, {merge: true});
      }
      if (endDate) {
        await setDoc(docRefEnd, {time: endDate}, {merge: true});
      }

      alert('Date set successfully');
      updateAllDocuments('students', 'inView', false);
    } catch (error) {
      console.error('error is :', error);
    } finally {
      setLoading(prev => ({...prev, date: false}));
    }
  };
  // const handleButtonClick = () => {
  //     const startTime = new Date(value[0].$d);
  //     const endTime = new Date(value[1].$d);
  //     const currentTime = new Date();
  //     if (currentTime >= startTime && currentTime <= endTime) {
  //         console.log(true); // Time is between the start and end time
  //     } else {
  //         console.log(false); // Time is not between the start and end time
  //     }
  //     // console.log("first value is :", startTime);
  //     // console.log("Seconde value is:", endTime);

  // }

  return (
    <>
      <ThemeProvider theme={theme}>
        <Grid
          item
          xs={4}
          sm={4}
          md={4}
          lg={4}
          xl={4}
          sx={{
            bgcolor: '#F6FAFB',
            borderRadius: 3,
            marginTop: -8,
            marginLeft: 3,
          }}>
          <Box sx={{marginBottom: 3}}>
            <Card
              elevation={10}
              sx={{
                borderRadius: 3,
              }}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  margin: 1,
                  marginRight: 5,
                  marginBottom: 4,
                  hegiht: 300,
                }}>
                <Typography variant="h5" color="primary" fontWeight="bold">
                  ימים פעילים
                </Typography>
              </Box>
              <Box>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center', // Center content horizontally
                    alignItems: 'center', // Center content vertically
                    // width: '100%',
                    padding: 2, // Add some padding
                  }}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    {/* <DemoContainer
                      components={[
                        'SingleInputDateTimeRangeField',
                        'SingleInputDateTimeRangeField',
                      ]}>
                      <SingleInputDateTimeRangeField
                        label="Holiday Setting"
                        value={value}
                        onChange={handleChange}
                      />
                    </DemoContainer> */}
                    <div>
                      <div style={{marginBottom: '0.5rem'}}>
                        <label>Holiday Setting</label>
                      </div>
                      <DatePicker
                        value={startDate}
                        onChange={e => {
                          // console.log({e});
                          if (e?.$d) setStartDate(new Date(e.$d));
                        }}
                        label="Start Date"
                      />
                      <Box sx={{marginTop: '1rem'}}>
                        <DatePicker
                          value={endDate}
                          onChange={e => {
                            if (e?.$d) setEndDate(new Date(e.$d));
                          }}
                          label="End Date"
                        />
                      </Box>
                    </div>
                  </LocalizationProvider>
                </Box>
                <Box
                  sx={{
                    // width: 'fit-content',
                    marginRight: 'auto',
                    marginLeft: 'auto',
                    width: '85%',
                  }}>
                  <Button onClick={handleChange} variant="contained" fullWidth>
                    Confirm
                    {loading.date && <RotateLeft className={'spinner'} />}
                  </Button>
                </Box>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                  margin: 1,
                  padding: 1,
                }}>
                <Typography color="black">ימי ראשון</Typography>
              </Box>
            </Card>
          </Box>
          <Card elevation={10}>
            <Box
              sx={{
                padding: 2,
              }}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  margin: 1,
                  marginRight: 5,
                  marginBottom: 1,
                }}>
                <Typography variant="h5" color="primary" fontWeight="bold">
                  ימים פעילים
                </Typography>
              </Box>
              <Box
                sx={{
                  marginRight: 2,
                  marginLeft: 2,
                  padding: 2,
                  bgcolor: '#F1E6FF',
                  borderRadius: 3,
                  borderColor: '#F1FFFF',
                  overflow: 'auto',
                  maxHeight: 300,
                }}>
                {items.map(item => (
                  <div
                    key={item.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      margin: 3,
                      marginBottom: 7,
                    }}>
                    <TextField
                      multiline
                      rows={3}
                      variant="outlined"
                      sx={{
                        borderRadius: 3,
                        width: '100%',
                        hegiht: '30%',
                        bgcolor: 'white',
                      }}
                      value={item.text}
                      disabled
                    />
                    <Button onClick={() => handleDelete(item.id)}>
                      <Delete />
                    </Button>
                  </div>
                ))}
                <form onSubmit={handleSubmit(onSubmit)}>
                  <TextField
                    multiline
                    rows={3}
                    variant="outlined"
                    sx={{
                      borderRadius: 3,
                      width: '100%',
                      hegiht: '30%',
                      bgcolor: 'white',
                    }}
                    {...register('newText')}
                  />
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'flex-end',
                      marginTop: 3,
                    }}>
                    <Button
                      sx={{borderRadius: 4}}
                      type="submit"
                      variant="contained">
                      <AddIcon />
                      הוסף חלון חדש
                    </Button>
                  </Box>
                </form>
              </Box>
            </Box>
          </Card>
        </Grid>
      </ThemeProvider>
    </>
  );
};

const updateAllDocuments = async (
  collectionName,
  propertyName,
  propertyValue,
) => {
  const batch = writeBatch(db);
  const collectionRef = collection(db, collectionName);

  try {
    const snapshot = await getDocs(collectionRef);

    snapshot.forEach(docSnapshot => {
      const docRef = doc(db, collectionName, docSnapshot.id);
      batch.update(docRef, {[propertyName]: propertyValue});
    });

    await batch.commit();
    console.log('All documents updated successfully');
  } catch (error) {
    console.error('Error updating documents: ', error);
  }
};
export default Data1;
