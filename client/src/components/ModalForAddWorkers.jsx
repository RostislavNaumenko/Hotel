import React from 'react';
import { useState, useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form';
import {
    Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField, Select, MenuItem, FormControl, InputLabel, Box, InputAdornment, IconButton
} from '@mui/material';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useTheme } from '@mui/material';
import Header from "components/Header";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Inputmask from "inputmask";
import { useAddUserMutation } from 'state/api';



const ModalForAddWorkers = ({ open, onClose }) => {
    const [update] = useAddUserMutation();
    const theme = useTheme();
    const [showPassword, setShowPassword] = useState(false);



    const handleShowPasswordClick = () => {
        setShowPassword(!showPassword);
    };


    const { register, handleSubmit, formState: { errors }, reset, trigger } = useForm({
        mode: "onSubmit",
        criteriaMode: "all",
        shouldFocusError: true,
        defaultValues: {
            name: "",
            surname: "",
            email: "",
            phoneNumber: "",
            occupation: "",
            password: "",
            role: ""
        },
        resolver: yupResolver(
            yup.object().shape({
                name: yup
                    .string()
                    .matches(/^[A-Za-zА-Яа-яЁё]+$/, "Name should contain only letters")
                    .required("Name is required"),
                surname: yup
                    .string()
                    .matches(/^[A-Za-zА-Яа-яЁё]+$/, "Surname should contain only letters")
                    .required("Surname is required"),
                email: yup
                    .string()
                    .email("Enter a valid email")
                    .required("Email is required"),
                phoneNumber: yup
                    .string()
                    .matches(/^\d{10}$/, 'Некорректный номер телефона. Введите 10 цифр')
                    .required('Введите номер телефона'),
                occupation: yup
                    .string()
                    .matches(/^[A-Za-zА-Яа-яЁё]+$/, "Occupation should contain only letters")
                    .required("Occupation is required"),
                password: yup
                    .string()
                    .min(8, "Password should be at least 8 characters long")
                    .required("Password is required"),
                role: yup
                    .string()
                    .required("Role is required")
            })
        )
    });
    const handleClose = () => {
        reset(); // сброс значений input-ов
        onClose(); // закрытие модального окна
    }

    const onSubmit = async (data) => {
        console.log(data);
        update(data);
        reset();
        onClose();

    };

    return (
        <Box >
            <Dialog open={open} onClose={handleClose}>
                <Box sx={{ padding: "20px 16px 0 16px" }}>
                    <Header title="Add workers" subtitle="Enter data in the fields" />
                </Box>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Ім'я"
                            type="text"
                            fullWidth
                            {...register('name')}
                            error={!!errors.name}
                            helperText={errors.name && "Ввдіть коректне ім'я"}
                        />
                        <TextField
                            margin="dense"
                            id="surname"
                            label="Прізвище"
                            type="text"
                            fullWidth
                            {...register('surname')}
                            error={!!errors.surname}
                            helperText={errors.surname && "Surname is required"}
                        />
                        <TextField
                            margin="dense"
                            id="email"
                            label="Email"
                            type="email"
                            fullWidth
                            {...register('email')}
                            error={!!errors.email}
                            helperText={errors.email && "Email is required"}
                        />
                        <TextField
                            margin="dense"
                            id="phoneNumber"
                            label="Телефон"
                            type="tel"
                            fullWidth
                            {...register('phoneNumber')}
                            error={!!errors.phoneNumber}
                            helperText={errors.phoneNumber && "Phone is required"}
                        />
                        <TextField
                            margin="dense"
                            id="occupation"
                            label="Опис"
                            type="text"
                            fullWidth
                            {...register('occupation')}
                            error={!!errors.occupation}
                            helperText={errors.occupation && "Occupation is required"}
                        />
                        <TextField
                            margin="dense"
                            id="password"
                            label="Пароль"
                            type={showPassword ? "text" : "password"}
                            fullWidth
                            {...register("password")}
                            error={!!errors.password}
                            helperText={errors.password && "Password is required"}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={handleShowPasswordClick}>
                                            {showPassword ? <VisibilityIcon /> : < VisibilityOffIcon />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />
                        <FormControl fullWidth sx={{ marginTop: "10px" }}>
                            <InputLabel id="role-label">Виберіть роль</InputLabel>
                            <Select
                                label="Виберіть роль"
                                labelId="role-label"
                                id="role"
                                {...register('role', { required: true, defaultValue: '' })}
                                error={!!errors.role}
                                helperText={errors.role && "Role is required"}
                            >
                                <MenuItem value="user">worker</MenuItem>
                                <MenuItem value="admin">manager</MenuItem>
                            </Select>
                        </FormControl>
                    </DialogContent>
                    <DialogActions >
                        <Button sx={{ color: theme.palette.secondary[100] }} onClick={handleClose}>Cancel</Button>
                        <Button sx={{ color: theme.palette.secondary[100] }} type="submit" variant="contained" >Save</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </Box >
    );
}

export default ModalForAddWorkers