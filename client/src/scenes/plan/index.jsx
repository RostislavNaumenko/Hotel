import React, { useState, useEffect } from 'react';
import { useGetRoomsQuery } from 'state/api';
import { useGetWorkersQuery } from 'state/api'
import Header from "components/Header";
import PropTypes from 'prop-types';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import ClearIcon from '@mui/icons-material/Clear';
import {
    Typography,
    TableHead,
    IconButton,
    Collapse,
    TableRow,
    TableContainer,
    Table,
    TableBody,
    TableCell,
    Paper,
    Box,
    useMediaQuery,
    makeStyles,
    InputLabel,
    Select,
    FormControl,
    MenuItem,
    Button,
    TextField,
} from '@mui/material';
import { useTheme } from '@mui/material';
import ModalForAddWorkers from 'components/ModalForAddWorkers';
import ModalForAddRoomWork from 'components/ModalForAddRoomWork';
import * as dayjs from 'dayjs'

const WorkList = () => {
    const theme = useTheme();
    const { data: dataUser, isLoading } = useGetWorkersQuery();
    const [selectUser, setUser] = React.useState('');
    const [open, setOpen] = useState(false);
    const [openRoomWorkModal, setOpenRoomWorkModal] = useState(false);

    const handleChangeUser = (event) => {
        setUser(event.target.value);
    };

    const options = dataUser?.map(user => ({
        value: user._id,
        label: `${user.name} ${user.surname}`
    }));
    console.log(options);

    return (
        <Box m="1.5rem 2.5rem">
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Header title="Work list" subtitle="See list of work" />
                <Box display="flex">
                    <Box sx={{ mr: "1rem" }} display="flex">
                        <Box sx={{ mr: "1rem" }}>
                            <FormControl fullWidth sx={{ width: "250px" }}>
                                <InputLabel id="demo-simple-select-label-floor">Виберіть робітника</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label-floor"
                                    id="demo-simple-select"
                                    value={selectUser}
                                    label="Виберіть робітника"
                                    onChange={handleChangeUser}
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    {options?.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>
                    </Box>
                    <Box marginRight="0.5rem">
                        <Button
                            variant="contained"
                            sx={{ minWidth: "120px", minHeight: "52.5px", mb: "1.5rem" }}
                            onClick={() => setOpen(true)}

                        >
                            Додати працівника
                        </Button>
                        <ModalForAddWorkers open={open} onClose={() => setOpen(false)} />
                    </Box>
                    <Box sx={{ ml: "1.5rem" }}>
                        <Box>
                            <Button
                                variant="contained"
                                sx={{ minWidth: "120px", minHeight: "52.5px" }}
                                onClick={() => setOpenRoomWorkModal(true)}

                            >
                               Додати роботу для кімнати
                            </Button>
                            <ModalForAddRoomWork open={openRoomWorkModal} onClose={() => setOpenRoomWorkModal(false)} />
                        </Box>
                    </Box>
                </Box>
            </Box>

            {dataUser || !isLoading ? (
                <TableContainer component={Paper} sx={{
                    backgroundColor: theme.palette.background.alt,
                    borderRadius: "0.7rem"
                }}
                >
                    <Table aria-label="collapsible table">
                        <TableHead sx={{
                            backgroundColor: theme.palette.neutral.main
                        }}>
                            <TableRow >
                                <TableCell width="20px" />
                                <TableCell sx={{ width: "150px" }}>
                                    <Typography sx={{ fontSize: 16 }} color={theme.palette.secondary[300]}>
                                        І'мя
                                    </Typography>
                                </TableCell>
                                <TableCell sx={{ width: "150px" }}>
                                    <Typography sx={{ fontSize: 16 }} color={theme.palette.secondary[300]}>
                                        Прізвиище
                                    </Typography>
                                </TableCell>
                                <TableCell sx={{ width: "200px", textAlign: "center", margin: 0 }}>
                                    <Typography sx={{ fontSize: 16, maxWidth: "400px" }} color={theme.palette.secondary[300]}>
                                        Email
                                    </Typography>
                                </TableCell >
                                <TableCell sx={{ width: "200px", textAlign: "center", margin: 0 }}>
                                    <Typography sx={{ fontSize: 16, maxWidth: "400px" }} color={theme.palette.secondary[300]}>
                                        Телефон
                                    </Typography>
                                </TableCell>
                                <TableCell sx={{ margin: 0 }}>
                                    <Typography sx={{ fontSize: 16, textAlign: "center", maxWidth: "400px" }} color={theme.palette.secondary[300]}>
                                        Опис
                                    </Typography>
                                </TableCell>
                                <TableCell sx={{ margin: 0, width: "50px" }}>
                                    <Typography sx={{ fontSize: 16, width: "50px" }} color={theme.palette.secondary[300]}>
                                        Роль
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody sx={{ backgroundColor: theme.palette.background.light }}>
                            {

                                (dataUser?.map((row) => (
                                    row._id === selectUser && <Row key={row._id} row={row} selectUser={selectUser} />
                                )))
                            }

                        </TableBody>
                    </Table>
                </TableContainer>

            ) : (
                <Typography sx={{ fontSize: 18, mt: "4rem" }} align="center" color={theme.palette.secondary[100]}>
                    Loading....
                </Typography>
            )
            }
        </Box >

    );


    function Row(props) {
        const { data, isLoading } = useGetRoomsQuery();
        const { row, selectUser } = props;
        const filteredData = data?.filter(item => item.stat.some(statItem => statItem.userId === selectUser));
        console.log("data", data);
        console.log("filteredData", filteredData);
        let sortedData;
        // const rooms = filteredData?.flatMap(item => item.rooms);
        // console.log("FilterDataRooms", rooms);

        const theme = useTheme();
        const [open, setOpen] = React.useState(false);
        const [dateValue, setDateValue] = React.useState(null);
        const handleDateClear = (e) => {
            setDateValue(null);
            e.stopPropagation();
        };

        return (
            <React.Fragment>
                <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                    <TableCell>
                        <IconButton
                            aria-label="expand row"
                            size="small"
                            onClick={() => setOpen(!open)}
                        >
                            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        </IconButton>
                    </TableCell>
                    <TableCell component="th" scope="row" >
                        <Typography sx={{ fontSize: 16 }}>
                            {row.name}
                        </Typography>
                    </TableCell>
                    <TableCell>
                        <Typography sx={{ fontSize: 16 }}>
                            {row.surname}
                        </Typography>
                    </TableCell>
                    <TableCell sx={{ textAlign: "center", }}>
                        <Typography sx={{ fontSize: 16 }}>
                            {row.email}
                        </Typography>
                    </TableCell>
                    <TableCell sx={{ textAlign: "center", }}>
                        <Typography sx={{ fontSize: 16 }}>
                            {row.phoneNumber}
                        </Typography>
                    </TableCell>
                    <TableCell sx={{ textAlign: "center", }}>
                        <Typography sx={{ fontSize: 16 }}>
                            {row.occupation}
                        </Typography>
                    </TableCell>
                    <TableCell>
                        <Typography sx={{ fontSize: 16 }}>
                            {row.role}
                        </Typography>
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7} >
                        <Collapse in={open} timeout="auto" unmountOnExit style={{ width: "100%" }}>
                            <Box sx={{ margin: 2, flexGrow: 1 }}>
                                <Box sx={{ width: "100%", paddingBottom: "1.5rem" }}>
                                    <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ width: "100%" }}>
                                        <Typography variant="h4" gutterBottom component="div" fontWeight="bold" color={theme.palette.secondary[100]} >
                                            History
                                        </Typography>
                                        {/* <Box display="flex" >
                                            <Box display="flex">
                                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                    <DemoContainer sx={{ mt: "-8px" }} components={['DatePicker']} >
                                                        <DatePicker
                                                            value={dateValue}
                                                            format="YYYY-MM-DD"
                                                            label="Select date"
                                                            onChange={(newValue) => setDateValue(newValue)}
                                                        />
                                                    </DemoContainer>
                                                    <IconButton onClick={handleDateClear} >
                                                        <ClearIcon />
                                                    </IconButton>
                                                </LocalizationProvider>
                                            </Box >
                                        </Box> */}
                                    </Box>
                                </Box>
                                <Table size="small" aria-label="purchases">
                                    <TableHead>
                                        <TableRow sx={{ margin: 0 }}>
                                            <TableCell sx={{ width: "150px", padding: 0, margin: 0 }}>
                                                <Typography sx={{ fontSize: 16, padding: 0, margin: 0 }} color={theme.palette.secondary[300]}>
                                                    Дату
                                                </Typography>
                                            </TableCell>
                                            <TableCell sx={{ width: "150px", padding: 0 }}>
                                                <Typography sx={{ fontSize: 16, padding: 0 }} color={theme.palette.secondary[300]}>
                                                   Номер кімнати
                                                </Typography>
                                            </TableCell>
                                            <TableCell align="center" sx={{ width: "150px", padding: 0 }}>
                                                <Typography sx={{ fontSize: 16, padding: 0 }} color={theme.palette.secondary[300]}>
                                                    Поверх
                                                </Typography>
                                            </TableCell>
                                            <TableCell align="center" sx={{ width: "150px", padding: 0 }}>
                                                <Typography sx={{ fontSize: 16, padding: 0 }} color={theme.palette.secondary[300]}>
                                                    Користувачі
                                                </Typography>
                                            </TableCell>
                                            <TableCell align="center" sx={{ width: "150px", padding: 0 }}>
                                                <Typography sx={{ fontSize: 16, padding: 0 }} color={theme.palette.secondary[300]}>
                                                    Тип роботи
                                                </Typography>
                                            </TableCell>

                                            <TableCell align="center" sx={{ width: "150px" }}>
                                                <Typography sx={{ fontSize: 16, }} color={theme.palette.secondary[300]}>
                                                    Ціна (€)
                                                </Typography>
                                            </TableCell>
                                            <TableCell align="center" sx={{ width: "150px" }}>
                                                <Typography sx={{ fontSize: 16, }} color={theme.palette.secondary[300]}>
                                                    Статус
                                                </Typography>
                                            </TableCell>
                                            <TableCell >
                                                <Typography sx={{ fontSize: 16 }} align="right" color={theme.palette.secondary[300]}>
                                                    Опис
                                                </Typography>
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody >
                                        {(filteredData ? filteredData
                                            .filter((obj) => {
                                                const dateHolder = dateValue === '' || dateValue === null ? '' : dayjs(dateValue).format('YYYY-MM-DD');
                                                if (dateHolder === '') {
                                                    return true;
                                                } else {
                                                    obj.stat?.filter((objStat) => {
                                                        console.log('dateAnime', dateHolder, dayjs(objStat.date).format('YYYY-MM-DD'));
                                                        return dayjs(objStat.date).format('YYYY-MM-DD') === dateHolder;
                                                    });
                                                   
                                                }
                                                console.log("obj", obj);
                                            }).map((obj) => (
                                                <HistoryTableRow key={obj._id} historyRow={obj} />
                                            ))

                                            : [])
                                        }
                                    </TableBody>
                                </Table>
                            </Box>
                        </Collapse>
                    </TableCell>
                </TableRow>
            </React.Fragment >
        );
    }
}


function HistoryTableRow(prop) {
    let historyRowRooms = prop?.historyRow ?? {};
    console.log("historyRowRooms", historyRowRooms);
    const roomsStats = historyRowRooms.stat;
    console.log("roomsStats", roomsStats);

    return roomsStats.map((roomStat) => (
        <TableRow key={roomStat._id}>
            <TableCell component="th" scope="row">
                <Typography sx={{ fontSize: 14 }}>{dayjs(roomStat.date).format('YYYY-MM-DD')}</Typography>
            </TableCell>
            <TableCell>
                <Typography align="center" sx={{ fontSize: 14 }}>
                    {historyRowRooms.roomNumber}
                </Typography>
            </TableCell>
            <TableCell align="center">
                <Typography sx={{ fontSize: 14 }}>{historyRowRooms.floor}</Typography>
            </TableCell>
            <TableCell align="center">
                <Typography sx={{ fontSize: 14 }}>{historyRowRooms.countOfVisitors}</Typography>
            </TableCell>
            <TableCell align="center">
                <Typography sx={{ fontSize: 14 }}>{roomStat.typeOfWork}</Typography>
            </TableCell>
            <TableCell align="center">
                <Typography sx={{ fontSize: 14 }}>{roomStat.cost}</Typography>
            </TableCell>
            <TableCell align="center">
                <Typography sx={{ fontSize: 14 }}>{roomStat.status}</Typography>
            </TableCell>
            <TableCell align="right">
                <Typography sx={{ fontSize: 14 }}>{roomStat.descriptions}</Typography>
            </TableCell>
        </TableRow>
    ));
}

export default WorkList;
