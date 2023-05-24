import React, { useState } from 'react';
import { useGetRoomsQuery } from 'state/api';
import Header from "components/Header";
import PropTypes from 'prop-types';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
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
    TextField
} from '@mui/material';
import { useTheme } from '@mui/material';
import * as dayjs from 'dayjs'
import ClearIcon from '@mui/icons-material/Clear';


function formatDate(date) {
    const formattedDate = new Date(date).toISOString().substring(0, 10);
    return formattedDate;
}

function HistoryTableRow(prop) {
    let historyRow = prop?.historyRow ?? {};
    console.log(historyRow);
    return (
        <TableRow>
            <TableCell component="th" scope="row">
                <Typography sx={{ fontSize: 14 }}>
                    {formatDate(historyRow.date)}
                </Typography>
            </TableCell>
            <TableCell>
                <Typography align="center" sx={{ fontSize: 14 }}>
                    {historyRow.typeOfWork}
                </Typography>
            </TableCell>
            <TableCell align="center">
                <Typography sx={{ fontSize: 14 }}>
                    {historyRow.cost}
                </Typography>
            </TableCell>
            <TableCell align="center">
                <Typography sx={{ fontSize: 14 }}>
                    {historyRow.status}
                </Typography>
            </TableCell>
            <TableCell align="right">
                <Typography sx={{ fontSize: 14 }}>
                    {historyRow.descriptions}
                </Typography>
            </TableCell>

        </TableRow>
    )
}



function Row(prop) {
    let row = prop?.row ?? {};
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [dateValue, setDateValue] = React.useState(null);
    const [selectTypeOfWork, setTypeOfWork] = React.useState('');

    const handleChangeTypeOfWork = (event) => {
        setTypeOfWork(event.target.value);
    };
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
                <TableCell component="th" align="center" scope="row" >
                    <Typography sx={{ fontSize: 16}}>
                        {row.roomNumber}
                    </Typography>
                </TableCell>
                <TableCell align="center">
                    <Typography sx={{ fontSize: 16 }}>
                        {row.floor}
                    </Typography>
                </TableCell>
                <TableCell align="center">
                    <Typography sx={{ fontSize: 16 }}>
                        {row.countOfVisitors}
                    </Typography>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 2 }}>
                            <Box display="flex" justifyContent="space-between" alignItems="center">
                                <Typography variant="h4" gutterBottom component="div" fontWeight="bold" color={theme.palette.secondary[100]} >
                                    Історія
                                </Typography>
                                <Box display="flex">
                                    <Box display="flex">
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DemoContainer sx={{ mt: "-8px" }} components={['DatePicker']} >
                                                <DatePicker
                                                    value={dateValue}
                                                    format="YYYY-MM-DD"
                                                    label="Виберіть дату"
                                                    onChange={(newValue) => setDateValue(newValue)}
                                                />
                                            </DemoContainer>
                                            <IconButton onClick={handleDateClear} >
                                                <ClearIcon />
                                            </IconButton>
                                        </LocalizationProvider>
                                    </Box >
                                    <Box sx={{ ml: "1.5rem" }}>
                                        <FormControl fullWidth sx={{ width: "200px" }}>
                                            <InputLabel id="demo-simple-select-label-visitors">Тип роботи</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label-visitors"
                                                id="demo-simple-select"
                                                value={selectTypeOfWork}
                                                label="Тип роботи"
                                                onChange={handleChangeTypeOfWork}
                                            >
                                                <MenuItem value="">
                                                    <em>None</em>
                                                </MenuItem>
                                                <MenuItem value={'AB'}>AB</MenuItem>
                                                <MenuItem value={'BL'}>BL</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Box>
                                </Box>
                            </Box>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>
                                            <Typography sx={{ fontSize: 16 }} color={theme.palette.secondary[300]}>
                                                Дата
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Typography sx={{ fontSize: 16 }} color={theme.palette.secondary[300]}>
                                            Тип роботи
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Typography sx={{ fontSize: 16}} color={theme.palette.secondary[300]}>
                                                Ціна (€)
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Typography sx={{ fontSize: 16}} color={theme.palette.secondary[300]}>
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
                                    {
                                        row.stat ?
                                            row.stat.filter((stat) => {

                                                const dateHolder = dateValue === '' || dateValue === null ? '' : dayjs(dateValue).format('YYYY-MM-DD');

                                                if (dateHolder === '' && selectTypeOfWork === '') {
                                                    return true;
                                                } else if (dateHolder === '') {
                                                    return stat.typeOfWork === selectTypeOfWork;
                                                } else if (selectTypeOfWork === '') {
                                                    return dayjs(stat.date).format('YYYY-MM-DD') === dateHolder;
                                                }
                                                return dayjs(stat.date).format('YYYY-MM-DD') === dateHolder && stat.typeOfWork === selectTypeOfWork;
                                            }).map((obj) => {
                                                return <HistoryTableRow key={obj.date} historyRow={obj} />
                                            })

                                            : ''

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
const Room = () => {
    const { data, isLoading } = useGetRoomsQuery();
    const theme = useTheme();
    const sortedData = data ? [...data].sort((a, b) => a.roomNumber - b.roomNumber) : [];
    const [selectFloor, setFloor] = React.useState('');
    const [selectCountOfVisitors, setCountOfVisitors] = React.useState('');
    console.log(data);


    const handleChangeFloor = (event) => {
        setFloor(event.target.value);
    };

    const handleChangeCountOfVisitors = (event) => {
        setCountOfVisitors(event.target.value);
    };

    return (
        <Box m="1.5rem 2.5rem">
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Header title="Кімнати" subtitle="Список всіх кімнат в готелі" />
                <Box display="flex">
                    <Box sx={{ mr: "1rem" }} display="flex">
                        <Box sx={{ mr: "1rem" }}>
                            <FormControl fullWidth sx={{ minWidth: 120 }}>
                                <InputLabel id="demo-simple-select-label-floor">Поверх</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label-floor"
                                    id="demo-simple-select"
                                    value={selectFloor}
                                    label="Поверх"
                                    onChange={handleChangeFloor}
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={1}>First</MenuItem>
                                    <MenuItem value={2}>Second</MenuItem>
                                    <MenuItem value={3}>Third</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                        <Box sx={{ mr: "1rem" }}>
                            <FormControl fullWidth sx={{ minWidth: 120 }}>
                                <InputLabel id="demo-simple-select-label-visitors">Кількість відвідувачів</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label-visitors"
                                    id="demo-simple-select"
                                    value={selectCountOfVisitors}
                                    label="Кількість відвідувачів"
                                    onChange={handleChangeCountOfVisitors}
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={1}>1</MenuItem>
                                    <MenuItem value={2}>2</MenuItem>
                                    <MenuItem value={3}>3</MenuItem>
                                    <MenuItem value={4}>4</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>

                    </Box>
                    {/* <Box marginRight="0.5rem">
                        <Button
                            variant="contained"
                            sx={{ minWidth: "120px", minHeight: "52.5px", mb: "1.5rem" }}
                        >
                            Add rooms
                        </Button>
                    </Box> */}
                </Box>
            </Box>

            {data || !isLoading ? (
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
                                <TableCell width="50px"/>
                                <TableCell>
                                    <Typography sx={{ fontSize: 18 }} align="center" color={theme.palette.secondary[300]}>
                                        Номер кімнати
                                    </Typography>
                                </TableCell>
                                <TableCell align="right">
                                    <Typography sx={{ fontSize: 18 }} align="center" color={theme.palette.secondary[300]}>
                                        Поверх
                                    </Typography>
                                </TableCell>
                                <TableCell align="right">
                                    <Typography sx={{ fontSize: 18 }} align="center" color={theme.palette.secondary[300]}>
                                        Кількість відвідувачів

                                    </Typography>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody sx={{ backgroundColor: theme.palette.background.light }}>
                            {selectFloor !== '' || selectCountOfVisitors !== '' ?
                                (
                                    //All filters (floor, visitors, date)
                                    selectFloor !== '' && selectCountOfVisitors !== '' ? (
                                        sortedData
                                            .filter((row) => row.floor === selectFloor && row.countOfVisitors === selectCountOfVisitors)
                                            .map((row) => <Row key={row._id} row={row} />
                                            )
                                    ) : (
                                        //Filters (floor, date)
                                        selectFloor !== '' ? (
                                            sortedData
                                                .filter((row) => row.floor === selectFloor)
                                                .map((row) => <Row key={row._id} row={row} />
                                                )) : (
                                            //Filters (visitors, date)
                                            sortedData
                                                .filter((row) => row.countOfVisitors === selectCountOfVisitors)
                                                .map((row) => <Row key={row._id} row={row} />
                                                ))

                                    )
                                ) :
                                (sortedData?.map((row) => (
                                    <Row key={row._id} row={row} />
                                )))
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            ) : (
                <Typography sx={{ fontSize: 18, mt: "4rem" }} align="center" color={theme.palette.secondary[100]}>
                    Загрузка....
                </Typography>
            )
            }
        </Box >
    );
}

export default Room