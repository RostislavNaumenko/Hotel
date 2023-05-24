import React, { useState, useEffect, useMemo } from 'react';
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
import {useUpdateRoomStatMutation} from 'state/api';
import { useSelector } from 'react-redux';
import * as dayjs from 'dayjs';


function HistoryTableRow(prop) {
    let historyRow = prop?.historyRow ?? {};
    return (
        <TableRow>
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
    const [roomUpdate] = useUpdateRoomStatMutation();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);


    const handleDoneButtonClick = (roomStatId) => {
        roomUpdate({roomStatId});
        console.log(roomStatId);
    }
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
                    <Typography sx={{ fontSize: 16 }}>
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
                <TableCell align="center">
                    <Typography sx={{ fontSize: 16 }}>
                        <Button sx={{ color: theme.palette.secondary[100] }} type="submit" variant="contained" 
                         onClick={() => handleDoneButtonClick(row.stat[0]._id)}
                        >Done</Button>
                    </Typography>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 2 }}>
                            <Box display="flex" justifyContent="space-between" alignItems="center">
                                <Typography variant="h4" gutterBottom component="div" fontWeight="bold" color={theme.palette.secondary[100]} >
                                    Додаткова інформація
                                </Typography>
                            </Box>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center">
                                            <Typography sx={{ fontSize: 16 }} color={theme.palette.secondary[300]}>
                                                Тип роботи
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Typography sx={{ fontSize: 16 }} color={theme.palette.secondary[300]}>
                                                Загальна сума (€)
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Typography sx={{ fontSize: 16 }} color={theme.palette.secondary[300]}>
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
                                        row.stat?.map((obj) => {
                                            return <HistoryTableRow key={obj.date} historyRow={obj} />
                                        })
                                    }
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    )
}
const WorkerPlan = () => {
    const theme = useTheme();
    const loggedUserId = useSelector((state) => state.global?.user?.data?.userId);
    const { data, isLoading } = useGetRoomsQuery();
    const [sortedDataUser, setSortedDataUser] = useState(null);
    const sortedData = data ? [...data].sort((a, b) => a.roomNumber - b.roomNumber) : [];
    const todayDate = new Date();

    useEffect(() => {
        if (data) {
          const sorted = [...data].sort((a, b) => a.roomNumber - b.roomNumber);
          setSortedDataUser(sorted);
        }
      }, [data]);
    
      const filteredData = useMemo(() => {
        return sortedData
          .map((element) => {
            const stat = element.stat.filter(
              (e) =>
                e.userId === loggedUserId &&
                dayjs(e.date).format("YYYY-MM-DD") ===
                  dayjs(new Date()).format("YYYY-MM-DD")
            );
            console.log("stat", stat);
            if (stat.length > 0) {
              return { ...element, stat };
            }
          })
          .filter((item) => item !== undefined);
      }, [sortedData, loggedUserId]);
      console.log(data);


    return (
        <Box m="1.5rem 2.5rem" >
            <Box>
                <Header title={`План роботи на ${dayjs(todayDate).format('YYYY-MM-DD')}`} subtitle="Номери, які потрібно виконати" />
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
                                <TableCell width="50px" />
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
                                <TableCell align="right">
                                    <Typography sx={{ fontSize: 18 }} align="center" color={theme.palette.secondary[300]}>

                                    </Typography>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody sx={{ backgroundColor: theme.palette.background.light }}>
                            {
                                filteredData?.map((row) => (
                                    < Row key={row._id} row={row} />
                                ))

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
        </Box>
    );
}

export default WorkerPlan;
