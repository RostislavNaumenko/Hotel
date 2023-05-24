import React from 'react';
import { useState, useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form';
import {
    Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField, Select, MenuItem, FormControl, InputLabel, Box, InputAdornment, IconButton
} from '@mui/material';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useTheme } from '@mui/material';
import Header from "components/Header";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Inputmask from "inputmask";
import { useGetWorkersQuery } from 'state/api';
import { useGetRoomsQuery } from 'state/api';
import * as dayjs from 'dayjs'
import ClearIcon from '@mui/icons-material/Clear';
import { useAddRoomWorkMutation } from 'state/api';


const ModalForAddRoomWork = ({ open, onClose }) => {
    const theme = useTheme();
    const [update] = useAddRoomWorkMutation();
    const { data: dataUser, isLoading } = useGetWorkersQuery();
    const [userId, setUser] = React.useState('');
    const [roomId, setRoom] = React.useState('');
    const { data: dataRoom } = useGetRoomsQuery();
    const [typeOfWork, setTypeOfWork] = React.useState('');
    const [date, setDateValue] = React.useState(null);

    const validationSchema = yup.object().shape({
        userId: yup.string().required('Select User is required'),
        roomId: yup.string().required('Select Room is required'),
        typeOfWork: yup.string().required('Type of Work is required'),
        date: yup.date().required('Date is required'),
        cost: yup.number().required('Cost is required'),
        descriptions: yup.string().required('Descriptions is required'),
    });

    const { register, handleSubmit, formState: { errors }, reset, trigger } = useForm({
        resolver: yupResolver(validationSchema),
        criteriaMode: "all",
        mode: 'onSubmit',
        shouldFocusError: true,
        defaultValues: {
            userId: '',
            roomId: '',
            typeOfWork: '',
            date: new Date(),
            cost: '',
            descriptions: '',
            status: "During"
        },
    });
    // const handleDateClear = (e) => {
    //     setDateValue(null);
    //     e.stopPropagation();
    // };

    // const handleChangeTypeOfWork = (event) => {
    //     setTypeOfWork(event.target.value);
    // };

    // const handleChangeUser = (event) => {
    //     setUser(event.target.value);
    // };
    // const handleChangeRoom = (event) => {
    //     setRoom(event.target.value);
    // };

    const options = dataUser?.map(user => ({
        value: user._id,
        label: `${user.name} ${user.surname}`
    }));

    const handleClose = () => {
        onClose();
        reset();
    }
    const onSubmit = async (data) => {
        console.log("data", data);
        update(data);
        reset();
        onClose();
    };


    return (
        <Box >
            <Dialog open={open} onClose={handleClose} fullWidth>
                <Box sx={{ padding: "20px 16px 0 16px" }}>
                    <Header title="Додати план роботи" subtitle="Введіть всі поля" />
                </Box>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <DialogContent>
                        <FormControl fullWidth>
                            <InputLabel id="role-label" >Виберіть працівника</InputLabel>
                            <Select
                                id="userId"
                                label="Виберіть працівника"
                                {...register('userId', { required: true, defaultValue: '' })}
                                error={!!errors.userId}
                            >
                                {options?.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl fullWidth sx={{ marginTop: "10px" }}>
                            <InputLabel id="role-label" >Виберіть кімнату</InputLabel>
                            <Select
                                labelId="demo-simple-select-label-floor"
                                id="demo-simple-select"
                                label="Виберіть кімнату"
                                MenuProps={{
                                    PaperProps: {
                                        style: {
                                            maxHeight: "180px",  // set maximum height
                                            overflowY: "scroll"  // add scrollbar when needed
                                        },
                                    },
                                }}
                                {...register('roomId')}
                                error={!!errors.roomId}
                            >
                                {dataRoom?.map((option) => (
                                    <MenuItem key={option._id} value={option._id}>
                                        {option.roomNumber}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl >
                        <FormControl fullWidth sx={{ marginTop: "10px", marginBottom: "10px" }}>
                            <InputLabel id="demo-simple-select-label-visitors">Тип роботи</InputLabel>
                            <Select
                                labelId="demo-simple-select-label-visitors"
                                id="demo-simple-select"
                                label="Тип роботи"
                                {...register('typeOfWork')}
                                error={!!errors.typeOfWork}
                            >
                                <MenuItem value={'AB'}>AB</MenuItem>
                                <MenuItem value={'BL'}>BL</MenuItem>
                            </Select>
                        </FormControl>
                        <Box >
                            <Box display="flex">
                                <LocalizationProvider dateAdapter={AdapterDayjs} display="flex" fullWidth sx={{ width: "552px" }}>
                                    <DemoContainer sx={{ mt: "-8px" }} components={['DatePicker']} >
                                        <DatePicker
                                            format="YYYY-MM-DD"
                                            name="date"
                                            label="Оберіть дату"
                                            {...register('date')}
                                            error={!!errors.date}
                                        />

                                    </DemoContainer>
                                </LocalizationProvider>
                            </Box >
                            {errors.dateValue && <p style={{ color: 'red' }}>{errors.date.message}</p>}

                        </Box>
                        <TextField
                            margin="dense"
                            id="cost"
                            label="Вартість роботи"
                            type="text"
                            fullWidth
                            {...register('cost')}
                            error={!!errors.cost}
                            helperText={errors.cost && "Cost is required"}
                        />
                        <TextField
                            margin="dense"
                            id="descriptions"
                            label="Опис"
                            type="text"
                            fullWidth
                            {...register('descriptions')}
                            error={!!errors.descriptions}
                            helperText={errors.descriptions && "Descriptions is required"}
                        />
                    </DialogContent>
                    <DialogActions >
                        <Button sx={{ color: theme.palette.secondary[100] }} onClick={handleClose}>Відмінити</Button>
                        <Button sx={{ color: theme.palette.secondary[100] }} type="submit" variant="contained" >Зберегти</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </Box >
    );
}

export default ModalForAddRoomWork;
