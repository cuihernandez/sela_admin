import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import { Image } from '@mui/icons-material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import iconImage from '../assets/icon.png';
function RightAlignedContainer() {
    return (
        <Box sx={{
            minWidth: '16.666%', // Equivalent to 1/6th, for responsiveness
            position: 'fixed',
            right: 0,
            top: 0,
            height: '100vh', // Full height of the viewport
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            // backgroundColor: '#fff', // Change as needed
            borderLeft: '1px solid #ccc', // Optional, adds a border line to separate from the content
        }}>
            {/* <Avatar
                sx={{ width: 56, height: 56, marginTop: 2 }}
                alt="Avatar Image"
                src="../assets/icon.png" // Your avatar image path
            /> */}
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
            <List sx={{ width: '100%' }}>
                {['משתמשים', 'לקוחות', 'דאונרים', 'מערכת', 'מתפלל'].map((text, index) => (
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
    );
}

export default RightAlignedContainer;
