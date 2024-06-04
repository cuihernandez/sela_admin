import {React, useState, useEffect} from 'react';
import Typography from '@mui/material/Typography';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import {Input} from '@mui/material';
import {ArrowBack} from '@mui/icons-material';
import {Button} from '@mui/material';
import Card from '@mui/material/Card';
import {useNavigate} from 'react-router-dom';
import EditImage from '../../assets/Edit.png';
import IconImage from '../../assets/splash_icon.png';
import {useEditContext} from '../../EditContext';
import {collection, getDocs, doc, updateDoc} from 'firebase/firestore/lite';
import {db} from '../../firebase';
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

const getColumnData = async donorID => {
  const users = collection(db, 'users');
  const querySnapshot = await getDocs(users);
  let documentData = ''; // Initialize as null for clarity
  querySnapshot.forEach(doc => {
    if (doc.id === donorID) {
      // Use === for comparison
      documentData = doc.data();
    } else {
      console.log('The data is not exist');
    }
  });

  if (documentData) {
    console.log('Document data:', documentData);
  } else {
    console.log('No document found with that ID.');
  }
  return documentData;
};

const Data4 = () => {
  const {editData} = useEditContext();
  const [donorInfo, setDonorInfo] = useState({});
  const navigate = useNavigate();

  const initialize = async () => {
    const data = await getColumnData(editData.donorID);
    setDonorInfo(data);
  };

  const handleFieldChange = field => e => {
    setDonorInfo(prev => ({...prev, [field]: e.target.value ?? ''}));
  };
  const handleBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  const updateUserData = async donorID => {
    const docRef1 = doc(db, 'users', donorID);
    try {
      await updateDoc(docRef1, {name: donorInfo.name});
      await updateDoc(docRef1, {mothername: donorInfo.mothername});
      await updateDoc(docRef1, {email: donorInfo.email});
      await updateDoc(docRef1, {phone: donorInfo.phone});
      console.log('Document updated successfully');
    } catch {}
  };
  const handleButtonClick = () => {
    updateUserData(editData.donorID);
  };
  useEffect(() => {
    initialize();
  }, [editData]);
  return (
    <>
      <ThemeProvider theme={theme}>
        <Grid
          item
          xs={8}
          sm={8}
          md={8}
          lg={8}
          xl={8}
          sx={{
            borderRadius: 1,
            backgroundColor: '#F6FAFB',
            margin: 2,
            padding: 2,
          }}>
          <Card
            elevation={10}
            sx={{
              borderRadius: 3,
              margin: 2,
              marginBottom: 22,
              padding: 2,
            }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                margin: 1,
                marginBottom: 0,
              }}>
              <Typography variant="h4" color="primary" fontWeight="bold">
                פרטי התורם
              </Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                marginRight: 3,
                marginBottom: 6,
              }}>
              <Button onClick={handleBack}>
                <ArrowBack color="primary" />
              </Button>
            </Box>

            <Grid
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
              }}>
              <Card
                sx={{
                  borderRadius: 3,
                  margin: 2,
                  padding: 3,
                }}>
                <Typography
                  variant="body5"
                  color="primary"
                  fontWeight={'bold'}
                  textAlign={'right'}>
                  מספר תפילות
                </Typography>
                <Typography
                  variant="h4"
                  color="primary"
                  fontWeight={'bold'}
                  textAlign={'right'}
                  marginTop={3}>
                  {editData.totalDonation}
                </Typography>
              </Card>
              <Box sx={{position: 'relative'}}>
                <Box component="img" src={IconImage} />
                <Button sx={{position: 'absolute', left: -20, bottom: 30}}>
                  <img
                    src={EditImage}
                    alt="edit"
                    style={{width: 30, height: 30}}
                  />
                </Button>
              </Box>
            </Grid>
            <Grid>
              <Box
                sx={{
                  display: 'flex',
                  padding: 2,
                  justifyContent: 'space-between',
                }}>
                <Box
                  sx={{
                    padding: 1,
                  }}>
                  <Box>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                      }}>
                      <Typography
                        variant="body4"
                        color="primary"
                        textAlign={'right'}
                        sx={{}}>
                        שם פרטי
                      </Typography>
                    </Box>
                    <Input
                      sx={{
                        bgcolor: '#F1E6FF',
                      }}
                      value={donorInfo.name}
                      onChange={handleFieldChange('name')}
                    />
                  </Box>
                  <Box>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                      }}>
                      <Typography
                        variant="body4"
                        color="primary"
                        textAlign={'right'}
                        sx={{}}>
                        אמייל
                      </Typography>
                    </Box>
                    <Input
                      sx={{
                        bgcolor: '#F1E6FF',
                      }}
                      value={donorInfo.email}
                      onChange={handleFieldChange('email')}
                    />
                  </Box>
                </Box>
                <Box
                  sx={{
                    padding: 1,
                  }}>
                  <Box>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                      }}>
                      <Typography
                        variant="body4"
                        color="primary"
                        textAlign={'right'}
                        sx={{}}>
                        שם האם
                      </Typography>
                    </Box>
                    <Input
                      sx={{
                        bgcolor: '#F1E6FF',
                      }}
                      value={donorInfo.mothername}
                      onChange={handleFieldChange('motherName')}
                    />
                  </Box>

                  <Box>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                      }}>
                      <Typography
                        variant="body4"
                        color="primary"
                        textAlign={'right'}
                        sx={{}}>
                        מספר טלפון
                      </Typography>
                    </Box>
                    <Input
                      sx={{bgcolor: '#F1E6FF'}}
                      value={donorInfo.phone}
                      onChange={handleFieldChange('phone')}
                    />
                  </Box>
                </Box>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  marginTop: 2,
                }}>
                <Button
                  color="secondary"
                  sx={{
                    bgcolor: '#560FC9',
                    borderRadius: 4,
                  }}
                  onClick={handleButtonClick}>
                  שמור שינויים
                </Button>
              </Box>
            </Grid>
          </Card>
        </Grid>
      </ThemeProvider>
    </>
  );
};

export default Data4;
