import React from 'react';
import { useState, useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form';
import {
    Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField, Select, MenuItem, FormControl, InputLabel, Box, InputAdornment, IconButton
} from '@mui/material';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useTheme } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useLoginUserMutation } from 'state/api'
import { useDispatch } from 'react-redux';
import { setUser } from 'state';
import { Link, useNavigate } from 'react-router-dom';


const Login = () => {
    const dispatch = useDispatch();
    const router = useNavigate()
    const [user] = useLoginUserMutation();
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
            email: "",
            password: "",
        },
        resolver: yupResolver(
            yup.object().shape({
                email: yup
                    .string()
                    .email("Enter a valid email")
                    .required("Email is required"),
                password: yup
                    .string()
                    .min(8, "Password should be at least 8 characters long")
                    .required("Password is required")
            })
        )
    });

    const onSubmit = async (data) => {
        console.log(data);
        user(data);
        const responce = await user(data)
        console.log(responce);
        dispatch(setUser(responce.data))
        router('/dailyplan')
    };

    return (
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
            <Box align="center" width="400px">
                <Box sx={{ color: theme.palette.secondary[100] }}>
                    <h1>Login</h1>
                </Box>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="email"
                            label="Введіть email"
                            type="text"
                            fullWidth
                            {...register('email')}
                            error={!!errors.email}
                            helperText={errors.email && "Ввдіть коректний email"}
                        />
                        <TextField
                            margin="dense"
                            id="password"
                            label="Password"
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
                    </DialogContent >
                    <DialogActions align="center">
                        <Box display="flex" justifyContent="right" width="100%" marginRight="17px">

                            <Button sx={{ color: theme.palette.secondary[100] }} type="submit" variant="contained" >Login</Button>
                        </Box>
                    </DialogActions>
                </form>
            </Box>
        </Box>
    );
}

export default Login;
