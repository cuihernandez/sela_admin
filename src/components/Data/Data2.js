import { React, useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { TextField } from '@mui/material';
import QuoteImage from '../../assets/bi_quote.png';
import { ArrowBack } from '@mui/icons-material';
import { Button } from '@mui/material';
import Card from '@mui/material/Card';
import { Delete } from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { collection, updateDoc, getDocs, doc, addDoc, deleteDoc } from "firebase/firestore/lite";
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

const Data2 = () => {
    const [noticeText1, setNoticeText1] = useState('');
    const [noticeText2, setNoticeText2] = useState('');

    const handleNoticeText1 = (event) => {
        setNoticeText1(event.target.value);
    }
    const handleNoticeText2 = (event) => {
        setNoticeText2(event.target.value);
    }
    useEffect(() => {
        const fetchData = async () => {
            const querySnapshot = await getDocs(collection(db, 'notice'));
            const fetchData = querySnapshot.docs.map(doc => (
                doc.data()
            ));
            setNoticeText1(fetchData[0].text);
            setNoticeText2(fetchData[1].text);
            console.log('this is my console', fetchData[0], fetchData[1])
            // setNoticeText2(fetchData.[1].data);
        };
        fetchData();
    }, []);
    const handlePearlButton = async () => {
        const docRef1 = doc(db, 'notice', '1');
        const docRef2 = doc(db, 'notice', '2');
        try {
            await updateDoc(docRef1, { text: noticeText1 });
            await updateDoc(docRef2, { text: noticeText2 });
            console.log('Document updated successfully');
        } catch (e) {
            console.error('Error updating document:', e);
        }
    };




    const { register, handleSubmit, reset } = useForm();
    const [items, setItems] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const querySnapshot = await getDocs(collection(db, 'pearls'));
            const fetchedItems = querySnapshot.docs.map(doc => ({
                id: doc.id, // Store document ID for deletion
                ...doc.data()
            }));
            setItems(fetchedItems);
        };

        fetchData();
    }, []);

    const onSubmit = async (formData) => {
        try {
            const docRef = await addDoc(collection(db, 'pearls'), {
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
            await deleteDoc(doc(db, 'pearls', docId));
            console.log("Document deleted with ID: ", docId);
            // Update local state to remove the item
            setItems(prev => prev.filter(item => item.id !== docId));
        } catch (e) {
            console.error("Error deleting document: ", e);
        }
    };
    const navigate = useNavigate();
    const handleBack = () => {
        navigate(-1); // Navigate back to the previous page
    };
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
                            <Button onClick={handleBack}>
                                <ArrowBack color='primary' />
                            </Button>
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
                                marginLeft: 2,
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                            <TextField
                                multiline
                                rows={3}
                                variant="outlined"
                                sx={{
                                    width: "100%",
                                    hegiht: "30%",
                                    bgcolor: 'white',
                                    margin: 2
                                }}
                                value={noticeText1}
                                onChange={handleNoticeText1} />
                            <TextField
                                multiline
                                rows={3}
                                variant="outlined"
                                sx={{
                                    width: "100%",
                                    hegiht: "30%",
                                    bgcolor: 'white',
                                    margin: 2
                                }}
                                value={noticeText2}
                                onChange={handleNoticeText2}
                            />
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
                            }

                                onClick={handlePearlButton}>שמור שינויים</Button>
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
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <TextField
                                    multiline
                                    rows={1}
                                    variant="outlined"
                                    sx={{
                                        width: "100%",
                                        hegiht: "30%",
                                        bgcolor: 'white',
                                    }}
                                    {...register('newText')}
                                />
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
                                            <Button color="secondary"
                                                sx={
                                                    {
                                                        bgcolor: '#560FC9',
                                                        borderRadius: 3
                                                    }
                                                }
                                                type="submit"

                                            >שמור שינויים</Button>
                                        </Box>

                                    </Box>
                                    {items.map((item) => (
                                        <Box key={item.id} sx={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center'
                                        }}>
                                            <Box>
                                                <Button onClick={() => handleDelete(item.id)}>
                                                    <Delete />
                                                </Button>
                                            </Box>


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
                                                        marginRight: 2,
                                                        padding: 2,
                                                        paddingBottom: 4,
                                                        overflow: 'hidden'
                                                    }}>
                                                        <TextField
                                                            multiline
                                                            variant='standard'
                                                            InputProps={{ style: { borderBottom: "none" }, disableUnderline: true }}
                                                            sx={{
                                                                width: "100%",
                                                                hegiht: "30%",
                                                                bgcolor: '#F1E6FF',
                                                            }}
                                                            value={(item.text)}
                                                            disabled={true}
                                                        />
                                                        {/* <Typography variant='body3' fontWeight={'bold'} >
                                                            {item.text}
                                                        </Typography> */}
                                                    </Box>
                                                </Box>
                                            </Box>
                                        </Box>

                                    ))}

                                </Box>
                            </form>
                        </Box>
                    </Card>
                </Grid>
            </ThemeProvider>


        </>

    );

}


export default Data2;