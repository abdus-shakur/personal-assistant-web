import { ArrowDropDown as ArrowDropDownIcon, Cake, Celebration, Phone, WhatsApp } from "@mui/icons-material";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Card,
    CardContent,
    Chip,
    Fade,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Paper,
    Skeleton,
    Typography
} from "@mui/material";

import '../FamilyTreeContent.scss';

import { bday } from './birthday.js';
import { useState } from "react";

export default function UpcomingEvents() {

    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ];

    // var eventList = [];
    const [eventList,setEventList] = useState([])

    function updateUpcomingEventData(){
        let eventList = bday;
        eventList = eventList.filter(fil=>fil.month>=0);
        eventList.forEach(eventMonth=>eventMonth.events.sort((a,b)=>a.date-b.date))
        // Order Months By current Month
        let currentMonth = new Date().getMonth();
        let passedMonths = eventList.filter(filter=>filter.month<currentMonth);
        let upcomingMonths = eventList.filter(filter=>filter.month>=currentMonth);
        passedMonths.forEach(data=>upcomingMonths.push(data));
        eventList = upcomingMonths;
        // Order Days by Current Date
        let currentMonthData = eventList.find(fil=>fil.month===currentMonth);
        currentMonthData = currentMonthData.events;
        let currentDate = new Date().getDate();
        let passedDates = currentMonthData.filter(filter=>filter.date<currentDate);
        let upcomingDates = currentMonthData.filter(filter=>filter.date>=currentDate);
        passedDates.forEach(data=>upcomingDates.push(data));
        currentMonthData.events = upcomingDates
        eventList.find(fil=>fil.month===currentMonth).events = upcomingDates
        setEventList(eventList);
        // let currentMonthPastData = {}
        // currentMonthPastData.month = currentMonth;
        // currentMonthPastData.events = passedDates;
        // eventList.push(currentMonthPastData);
    }

    const [eventsLoading,setEventsLoading] = useState(true);

    function updateData(){
      return new Promise((resolve,reject)=>{
        try{
          setTimeout(()=>{updateUpcomingEventData();resolve();},3000);
        }catch(e){
          reject();
        }

      })
    }

    updateData().then(()=>setEventsLoading(false));

    
    
    
  return (
    <>
      <div className="events-card">
        <Card
          className="dash-card upcoming-events"
          sx={{ width: "100%", borderRadius: "0.6rem" }}
          elevation={6}
        >
          <CardContent>
            <Typography variant="h4" className="card-view header">
              Upcoming Events
            </Typography>
            {eventsLoading?<Skeleton style={{maxHeight: '20rem'}} height={'20rem'}></Skeleton>:
            <Paper style={{maxHeight: '20rem', overflow: 'auto'}}>
                    {eventList.map((eventListForMonth,index)=>
                    <Accordion defaultExpanded={index===0} >
                    <AccordionSummary
                      expandIcon={<ArrowDropDownIcon />}
                      aria-controls="panel2-content"
                      id="panel2-header"
                      slots={{ transition: Fade }}
                      slotprops={{ transition: { timeout: 400 } }}
                    >
                      <Typography>{months[eventListForMonth.month]}</Typography>
                    </AccordionSummary>
                      <AccordionDetails >
                      <List dense={true}>
                        {eventListForMonth.events.map(event=>
                            <ListItem disableGutters disablePadding secondaryAction={<>
                            {/* <ListItemIcon>
                                <IconButton edge="end"  aria-label="delete">
                                  <Phone />
                                </IconButton> */}
                                {/* </ListItemIcon>
                                <ListItemIcon> */}
                                {/* <IconButton edge="end"  aria-label="delete">
                                <WhatsApp />
                              </IconButton>
                              </ListItemIcon> */}
                              </>
                              }>
                                {event?.date?<ListItemIcon><Chip color="secondary" label={event.date} /></ListItemIcon>:<></>}
                                <ListItemIcon>{event.type==="birthday"?<Cake/>:<Celebration/>}</ListItemIcon>
                                <ListItemText primary={event.label} secondary={event.type}></ListItemText>
                            </ListItem>
                        )}
                        </List>
                      </AccordionDetails>
                      </Accordion>
                    )}
            </Paper>}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
