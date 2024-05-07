import { React, useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Delete } from '@mui/icons-material';
import { Button } from '@mui/material';
import Card from '@mui/material/Card';
import { useForm } from 'react-hook-form';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { SingleInputDateTimeRangeField } from '@mui/x-date-pickers-pro/SingleInputDateTimeRangeField';

import { collection, addDoc, deleteDoc, getDocs, doc, setDoc, getDoc } from "firebase/firestore/lite";
import { onSnapshot } from 'firebase/firestore'
import { db } from '../../firebase';


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
    const { register, handleSubmit, reset } = useForm();
    const [items, setItems] = useState([]);
    const [value, setValue] = useState([
        dayjs('2024-03-01T15:30'),
        dayjs('2024-04-01T18:30')
    ]);
    useEffect(() => {
        const fetchData = async () => {
            const querySnapshot = await getDocs(collection(db, 'psalms'));
            const fetchedItems = querySnapshot.docs.map(doc => ({
                id: doc.id, // Store document ID for deletion
                ...doc.data()
            }));
            setItems(fetchedItems);
        };

        fetchData();
        const fetchDateData = async () => {
            const docStartSnapshot = await getDoc(doc(db, 'mobileStatus', 'startTime'));
            const docEndSnapshot = await getDoc(doc(db, 'mobileStatus', 'endTime'));

            if (docStartSnapshot.exists() && docEndSnapshot.exists()) {
                const startTime = dayjs(docStartSnapshot.data().time.toDate()); // Convert Firestore timestamp to dayjs
                const endTime = dayjs(docEndSnapshot.data().time.toDate()); // Convert Firestore timestamp to dayjs
                setValue([startTime, endTime]); // Update state
                console.log('startTime:', startTime, 'end time is', endTime)
            } else {
                console.log("One or both documents do not exist.");
            }
        };

        fetchDateData();

    }, []);

    const onSubmit = async (formData) => {
        try {
            const docRef = await addDoc(collection(db, 'psalms'), {
                text: formData.newText // Assuming you want to store text under "text" field
            });
            console.log("Document written with ID: ", docRef.id);
            // Update local state with new item
            setItems(prev => [...prev, { id: docRef.id, text: formData.newText }]);
            reset(); // Reset form after submission
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    };

    const handleDelete = async (docId) => {
        try {
            await deleteDoc(doc(db, 'psalms', docId));
            console.log("Document deleted with ID: ", docId);
            // Update local state to remove the item
            setItems(prev => prev.filter(item => item.id !== docId));
        } catch (e) {
            console.error("Error deleting document: ", e);
        }
    };

    const handleChange = async (newValue) => {
        const docRefStart = doc(db, 'mobileStatus', 'startTime');
        const docRefEnd = doc(db, 'mobileStatus', 'endTime');
        setValue(newValue);
        const startTime = newValue[0]?.$d ? new Date(newValue[0].$d) : null;
        const endTime = newValue[1]?.$d ? new Date(newValue[1].$d) : null;
        try {
            if (startTime) {
                await setDoc(docRefStart, { time: startTime }, { merge: true });
            }
            if (endTime) {
                await setDoc(docRefEnd, { time: endTime }, { merge: true });
            }
        } catch (error) {
            console.error('error is :', error);
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
                <Grid item xs={4} sm={4} md={4} lg={4} xl={4}
                    sx={
                        {
                            bgcolor: '#F6FAFB',
                            borderRadius: 3,
                            marginTop: -8,
                            marginLeft: 3
                        }
                    }
                >

                    <Box sx={{ marginBottom: 3 }}>
                        <Card elevation={10} sx={{

                            borderRadius: 3
                        }}>
                            <Box sx={{
                                display: 'flex',
                                justifyContent: 'flex-end',
                                margin: 1,
                                marginRight: 5,
                                marginBottom: 4,
                                hegiht: 300
                            }}>
                                <Typography variant='h5' color="primary" fontWeight="bold">
                                    ימים פעילים
                                </Typography>

                            </Box>
                            <Box sx={{
                                display: 'flex',
                                justifyContent: 'center',  // Center content horizontally
                                alignItems: 'center',  // Center content vertically
                                width: '100%',
                                padding: 2  // Add some padding
                            }}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer
                                        components={[
                                            'SingleInputDateTimeRangeField',
                                            'SingleInputDateTimeRangeField',
                                        ]}
                                    >
                                        <SingleInputDateTimeRangeField
                                            label="Holiday Setting"
                                            value={value}
                                            onChange={handleChange}
                                        />
                                    </DemoContainer>
                                </LocalizationProvider>
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
                                marginBottom: 1,
                            }}>
                                <Typography variant='h5' color="primary" fontWeight="bold">
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
                                    maxHeight: 300
                                }}>

                                {items.map((item) => (
                                    <div key={item.id} style={{ display: 'flex', alignItems: 'center', margin: 3, marginBottom: 7 }}>
                                        <TextField
                                            multiline
                                            rows={3}
                                            variant="outlined"
                                            sx={{
                                                borderRadius: 3,
                                                width: "100%",
                                                hegiht: "30%",
                                                bgcolor: 'white',
                                            }}
                                            value={item.text} disabled />
                                        <Button onClick={() => handleDelete(item.id)}><Delete /></Button>
                                    </div>
                                ))}
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <TextField
                                        multiline
                                        rows={3}
                                        variant="outlined"
                                        sx={{
                                            borderRadius: 3,
                                            width: "100%",
                                            hegiht: "30%",
                                            bgcolor: 'white',
                                        }}
                                        {...register('newText')} />
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'flex-end',
                                            marginTop: 3,
                                        }}>
                                        <Button sx={{ borderRadius: 4 }} type="submit" variant="contained">
                                            <AddIcon />
                                            הוסף חלון חדש</Button>
                                    </Box>
                                </form>
                            </Box>
                        </Box>
                    </Card>
                </Grid>
            </ThemeProvider>


        </>

    );

}


export default Data1;