import React from 'react';
import { DateCalendar, LocalizationProvider, PickersDay } from "@mui/x-date-pickers";
import { DayCalendar } from "@mui/x-date-pickers/internals";
import moment from "moment";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Badge, Card, CardContent, Typography } from "@mui/material";
import '../FamilyTreeContent.scss'

import { DayCalendarSkeleton } from '@mui/x-date-pickers/DayCalendarSkeleton';

export default function Calendar() {

  const [highlightedDays, setHighlightedDays] = React.useState([1, 2, 15]);

  function ServerDay(props) {
    const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;
  
    const isSelected =
      !props.outsideCurrentMonth && highlightedDays.indexOf(props.day.date()) >= 0;
  
    return (
      <Badge
        key={props.day.toString()}
        overlap="circular"
        badgeContent={isSelected ? '🌚' : undefined}
      >
        <PickersDay {...other} outsideCurrentMonth={outsideCurrentMonth} day={day} />
      </Badge>
    );
  }
  

  function handleMonthChange(event){
    console.log(event)
  }
  return (
    <>
    <div className="calendar-view">
    <Card  className="dash-card" sx={{ width:'max-content',borderRadius:'0.6rem' }} elevation={6}>
      <CardContent>
     <Typography variant="h4" className="card-view header">Calendar</Typography>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar defaultValue={dayjs(new Date())} loading={false} 
        renderLoading={() => <DayCalendarSkeleton />}  
        onMonthChange={handleMonthChange}
        slots={{
          day: ServerDay,
        }}
        slotProps={{
          day: {
            highlightedDays,
          },
        }}/>
      </LocalizationProvider>
      </CardContent>
      </Card>
      </div>
    </>
  );
}
