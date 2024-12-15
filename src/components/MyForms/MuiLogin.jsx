import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export default function MuiLogin() {
    return (
        <Box
            component="form"
            sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}
            noValidate
            autoComplete="off"
        >
            <div className='form-container'>
                <h5>Registration</h5>
                
                <TextField
                    id="Name"
                    label="Enter Name"
                    autoComplete="current-Name"
                    variant="standard"
                />

                <TextField
                    id="standard-Email-input"
                    label="Enter Email"
                    type="Email"
                    autoComplete="current-Email"
                    variant="standard"
                />

                <TextField
                    id="standard-Mobile-input"
                    label="Enter Mobile"
                    type="Mobile"
                    autoComplete="current-Mobile"
                    variant="standard"
                />

                <TextField
                    id="standard-password-input"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    variant="standard"
                />

                <TextField
                    id="standard-password-input"
                    label="Confirm Password"
                    type="password"
                    autoComplete="current-password"
                    variant="standard"
                />
                <br/>
                <Stack direction="row" spacing={2}>
                    <Button color="primary" variant="contained">Register</Button>
                </Stack>
            </div>
        </Box>
    );
}
