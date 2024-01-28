import { Call, WhatsApp } from "@mui/icons-material";
import { Box, Dialog, DialogContent, DialogTitle, ListItemIcon, ListItemText, MenuItem, MenuList, Toolbar, Typography, useTheme } from "@mui/material";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import * as React from 'react';
import { callPhoneNumber, openWhatsappChat } from "../Utils/Commons";
import { getBirthdayList } from "./Service/birthdayService";

export default function BirthdayReminder(props){

    const rows = [
        {
            name : "Test Name",
            birthday : "10 Calories",
            birthdayDate : "20 Carbs",
            tillBirthday: "100 Protein",
            numbers:[]
        }
    ]

    const [birthdays,setBirthdays] = React.useState(rows);

    React.useEffect(()=>{
        getBirthdayList()
        .then((response=>{
            setBirthdays((prev)=>[...response.data])
        })).catch((error)=>{
            console.log(error);
        })
    },[]);

    const theme = useTheme();

    const [optionDialogDetails,setOptionDialogDetails] = React.useState({
        open:false,
        number : "No Number",
        name: "No Name"
    })

    const [selectNumberDialogDetails,setSelectNumberDialogDetails] = React.useState({
        open:false,
        contactDetail:rows[0]
    })

    function SelectNumberPopup(props){
        const {details} = props;

        function closePopover(){
            setSelectNumberDialogDetails((prev)=>({
                ...prev,
                open:false}));
        }
        return <React.Fragment>
             <Dialog  
              open={details.open} onClose={closePopover} >
                <DialogTitle>{`Select # :${details.contactDetail.name}`}</DialogTitle>
                <DialogContent>
                <MenuList>
                    {details.contactDetail.numbers.map(number=>
                        <MenuItem onClick={(event)=>{setOptionDialogDetails((prev)=>({
                            ...prev,
                            number:number.number,
                            name:details.contactDetail.name,
                            open:true}));}}>
                            <ListItemIcon><Call/></ListItemIcon>
                            <ListItemText primary={number.number} 
                            secondary={`Type : ${number.type}`}></ListItemText>
                        </MenuItem>)}
                </MenuList>
                </DialogContent>
            </Dialog>
        </React.Fragment>
    }

    function OptionsPopup(props){

        function closePopover(){
            setOptionDialogDetails((prev)=>({
                ...prev,
                open:false}));
        }

        return <React.Fragment>
            <Dialog  open={optionDialogDetails.open} onClose={closePopover}>
                <DialogTitle>Select Action</DialogTitle>
                <DialogContent>
            <MenuList>
                <MenuItem onClick={()=>{callPhoneNumber(optionDialogDetails.number)}}>
                    <ListItemIcon><Call/></ListItemIcon>
                    <ListItemText primary="Call"></ListItemText>
                </MenuItem>
                <MenuItem onClick={()=>{openWhatsappChat(optionDialogDetails.number,`Happy Birthday ${optionDialogDetails.name} !!! 🎉🎊🎂🍰🍥🤩`)}}>
                    <ListItemIcon><WhatsApp/></ListItemIcon>
                    <ListItemText primary="Send Whatsapp Message"></ListItemText>
                </MenuItem>
            </MenuList>
            </DialogContent>
            </Dialog>
        </React.Fragment>
    }
    
    function handleMore(row){
        setSelectNumberDialogDetails((prev)=>({
            ...prev,
            open:!prev.open,
            contactDetail:row
        }));
    }

    return <React.Fragment>
        <Box  sx={{display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column'}}>
            <Toolbar sx={{width:'100%',alignContent:'center',justifyContent:'center'}}>
                <Typography sx={{}} variant="h6">Upcoming Birthdays</Typography>
            </Toolbar>
            <TableContainer sx={{minWidth:'70%', height:'100%'}} component={Paper}>

            <Table stickyHeader size={"small"} aria-label="simple table">
                <TableHead sx={{fontVariant:'revert'}}>
                <TableRow>
                    <TableCell >Full Name</TableCell>
                    <TableCell align="right">Date/Day</TableCell>
                    <TableCell align="right">Days To Go</TableCell>
                    <TableCell align="right">This Year</TableCell>
                    <TableCell align="right">Age/Year</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {birthdays.map((row) => (
                    <TableRow 
                    key={row.name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    onClick={()=>handleMore(row)}
                    >
                    <TableCell align="left"component="th" scope="row">
                        {row.name}
                    </TableCell>
                    <TableCell align="right">{row.birthday}:{row.day}</TableCell>
                    <TableCell align="right">{row.tillBirthday}</TableCell>
                    <TableCell align="right">{row.absoluteDaysThisYear}</TableCell>
                    <TableCell align="right">{row.age}/{row.year}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </TableContainer>
        </Box>
        <SelectNumberPopup details={selectNumberDialogDetails}/>
        <OptionsPopup />
    </React.Fragment>
}