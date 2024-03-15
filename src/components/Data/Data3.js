import { React, useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Transfer from '../Transfer';
import { useEditContext } from '../../EditContext';
import { collection, getDocs, where, query } from "firebase/firestore/lite";
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
const getTransactionData = async (donorID) => {
    const users = collection(db, 'transaction');
    const q = query(users, where('donorID', '==', donorID));

    try {
        const querySnapshot = await getDocs(q);
        let data = [];
        querySnapshot.forEach((doc) => {
            data.push(doc.data());
        })
        return data;
    }
    catch (error) {
        console.error('Error is:', error);
    }
}

const Data3 = () => {
    const { editData } = useEditContext();
    const [transactionData, setTransactionData] = useState({});
    const initialize = async () => {
        const data = await getTransactionData(editData.donorID);
        setTransactionData(data);

    }
    useEffect(() => {
        initialize();
    }, [editData]);
    return (
        <>
            <ThemeProvider theme={theme}>
                <Grid item xs={4} sm={4} md={4} lg={4} xl={4}
                    sx={
                        {
                            bgcolor: '#F6FAFB',
                            borderRadius: 1,
                            marginLeft: 4,
                            margin: 2,
                            padding: 2
                        }
                    }
                >
                    <Box>
                        <Box sx={{ marginBottom: 20 }}>
                            <Card elevation={10} >
                                <Box sx={{
                                    display: 'flex',
                                    justifyContent: 'flex-end',
                                    margin: 1,
                                    marginRight: 5,
                                    marginBottom: 4
                                }}>
                                    <Typography variant='h5' color="primary" fontWeight="bold">
                                        הפקדות וקרדיט
                                    </Typography>
                                </Box>

                                <Box border={1} borderColor={'#D6B7FF'} sx={{ margin: 2, borderRadius: 3, padding: 1 }}>
                                    {Array.isArray(transactionData) && transactionData.map((doc) => (
                                        <Transfer key={doc.id} price={doc.transactionAmount} name={doc.doneeName} />
                                    ))}
                                </Box>
                                <Box border={1} borderColor={'#D6B7FF'} sx={{ margin: 2, borderRadius: 3, padding: 2, paddingRight: 3 }}>
                                    <Typography variant='h6' color="primary" fontWeight="bold" textAlign={'right'}>
                                        ימים
                                    </Typography>
                                    <Typography variant='h5' color="primary" fontWeight="bold" textAlign={'right'}>
                                        ${editData.credit}
                                    </Typography>
                                </Box>
                            </Card>
                        </Box>
                    </Box>

                </Grid>
            </ThemeProvider>


        </>

    );

}


export default Data3;