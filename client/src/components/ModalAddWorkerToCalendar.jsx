import React from 'react';
import { useState } from 'react';
import { useTheme } from '@mui/material';
import {
    Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField, Select, MenuItem, FormControl, InputLabel, Box, InputAdornment, IconButton
} from '@mui/material';
import Header from "components/Header";
import { useGetWorkersQuery } from 'state/api'

const ModalAddWorkerToCalendar = ({ open, handleClose, handleAddUser }) => {
    const theme = useTheme();
    const { data: dataUser, isLoading } = useGetWorkersQuery();
    const [selectUser, setUser] = React.useState('');

    const handleChangeUser = (event) => {
        setUser(event.target.value);
    };

    const options = dataUser?.map(user => ({
        value: user._id,
        label: `${user.name} ${user.surname}`
    }));

    const handleAdd = () => {
        const selectedUser = dataUser.find(user => user._id === selectUser);
        handleAddUser(selectedUser);
        console.log(selectedUser);
        setUser('');
        handleClose();
    }
    const handleCancel = () => {
        handleClose();
        setUser(''); // очистка select
    }

    return (
        <Box >
            <Dialog open={open} onClose={handleClose}>
                <Box sx={{ padding: "20px 16px 0 16px" }}>
                    <Header title="Add workers" subtitle="Select Worker" />
                </Box>
                <DialogContent>
                    <FormControl fullWidth sx={{ width: "250px"}}>
                        <InputLabel id="role-label" >Select User</InputLabel>
                        <Select
                            labelId="demo-simple-select-label-floor"
                            id="demo-simple-select"
                            value={selectUser}
                            label="Select worker"
                            onChange={handleChangeUser}
                        >
                            {options?.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button sx={{ color: theme.palette.secondary[100] }} onClick={handleCancel}>Cancel</Button>
                    <Button sx={{ color: theme.palette.secondary[100] }} type="submit" variant="contained" onClick={handleAdd}>Submit</Button>
                </DialogActions>
            </Dialog>
        </Box >
    );
}

export default ModalAddWorkerToCalendar;
