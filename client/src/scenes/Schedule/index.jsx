import React from 'react';
import { useState } from 'react'
import { Box, List, ListItem, ListItemText, Typography, colors, useTheme } from '@mui/material';
import Header from 'components/Header';
import FullCalendar from '@fullcalendar/react';
import { formatDate } from '@fullcalendar/core'
import timeGridPlagin from "@fullcalendar/timegrid";
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from "@fullcalendar/interaction";
import listPlagin from "@fullcalendar/list";
import ModalAddWorkerToCalendar from 'components/ModalAddWorkerToCalendar';

const Schedule = () => {
  const theme = useTheme();
  const [currentWorkers, setCurrentWorkers] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedUser, setSelectedUser] = useState("");

  const handleDateClick = (selected) => {
    setSelectedDate(selected);
    setOpenModal(true);
  }
  const handleCloseModal = () => {
    setOpenModal(false);
  }


  const handleAddUser = (user) => {
    const calendarApi = selectedDate.view.calendar;
    calendarApi.unselect();
    // Проверяем, что пользователь выбран
    if (user) {
      const eventExists = currentWorkers.some(event => event.title === `${user.name} ${user.surname}`);
      if (eventExists) {
        alert(`User '${user.name} ${user.surname}' already exists in the calendar.`);
      } else {
        // Добавляем новое событие
        calendarApi.addEvent({
          id: `${selectedDate.dateStr} - ${user._id}`,
          title: `${user.name} ${user.surname}`,
          start: selectedDate.startStr,
          end: selectedDate.endStr,
          allDay: selectedDate.allDay,
        });
      }
    }

  };

  const handleEventClick = (selected) => {
    if (window.confirm(`Delete '${selected.event.title}'`)) {
      selected.event.remove();
    }
  }

  return (
    <Box m="20px">
      <Header title="Календар" subtitle="Створіть графік роботи для працівників" />
      <Box display="flex" justifyContent="space-between">
        {/*Calendar sidebar */}
        {/* <Box flex="1 1 20%" backgroundColor={theme.palette.primary[400]} p="15px" borderRadius="4px">
          <Typography variant='h5' sx={{ color: theme.palette.secondary[100] }}>Workers</Typography>
          <List>
            {currentWorkers.map((event) => (
              <ListItem
                key={event.id}
                sx={{ margin: "10px 0", borderRadius: "2px" }}
              >
                <ListItemText sx={{ color: theme.palette.secondary[100] }}
                  primary={event.title}
                  secondary={
                    <Typography>
                      {formatDate(event.start, {
                        year: "numeric",
                        month: "short",
                        day: "numeric"
                      })}
                    </Typography>
                  }
                />

              </ListItem>
            ))}
          </List>
        </Box> */}
        {/* calendar */}
        <Box flex="1 1 100%" ml="15px" sx={{ color: theme.palette.primary[200] }}>
          <FullCalendar
            height="75vh"
            plugins={[
              dayGridPlugin,
              interactionPlugin,
              timeGridPlagin,
              listPlagin,

            ]}
            headerToolbar={{
              left: "prev,next,today",
              center: "title",
              right: "dayGridMonth,listMonth"
            }}
            initialView='dayGridMonth'
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            select={handleDateClick}
            eventClick={handleEventClick}
            eventsSet={(events) => setCurrentWorkers(events)}
            initialEvents={[
              { id: "1234", title: "Rostyslav Naumenko", date: "2023-04-24" },
              { id: "4", title: "Rostyslav Naumenko", date: "2023-04-25" }
            ]}
          />
          <ModalAddWorkerToCalendar
            open={openModal}
            handleClose={handleCloseModal}
            handleAddUser={handleAddUser}
          />
        </Box>
      </Box>
    </Box>
  )
}

export default Schedule;
