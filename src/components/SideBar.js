import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import iconImage from '../assets/icon.png';
function RightAlignedContainer() {
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        }}>

            <Box
                component="img"
                sx={{
                    width: 80,
                    height: 80,
                    marginTop: 2,
                }}
                src={iconImage}
                alt="Icon Image"
            />
            <Box sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                marginLeft: 12,
                marginTop: 6
            }}>
                <List sx={{ width: '100%' }}>
                    {['משתמשים', 'לקוחות', 'דאונרים'].map((text, index) => (
                        <ListItem button key={text} sx={{
                            '&:hover': {
                                backgroundColor: 'linear-gradient(45deg, #F1E6FF, #F1E6FF)', // Custom hover color
                                // Note: Linear gradient might not be directly supported for background color in hover state. Use a solid color for compatibility or adjust with a pseudo-class in CSS.
                            },
                        }}>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
            </Box>

        </Box>
    );
}

export default RightAlignedContainer;
