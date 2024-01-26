import { Box, Checkbox, Dialog, DialogContent, DialogTitle, IconButton, List, ListItem, ListItemIcon, ListItemText, Menu, MenuItem, MenuList, Popover, Toolbar, Typography, useTheme } from "@mui/material";
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Call, MenuBook , Menu as MenuIcon, MoreVert, WhatsApp} from "@mui/icons-material";
import { getBirthdayList } from "./Service/birthdayService";
import { callPhoneNumber, openWhatsappChat } from "../Utils/Commons";

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
        <Box  sx={{marginTop:'2rem',display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column'}}>
            <Toolbar sx={{backgroundColor:theme.palette.primary.main,width:'100%'}}>
                <Typography sx={{color:theme.palette.primary.contrastText,minWidth:'30%'}} variant="h6">Upcoming Birthdays</Typography>
                <Box sx={{display:'flex',justifyContent:'right',minWidth:'70%'}}>
                    {/* <IconButton onClick={handleMore} sx={{color:theme.palette.primary.contrastText}}  variant="inherit" size="large">
                        <MoreVert size="large"/>
                    </IconButton> */}
                </Box>
            </Toolbar>
            <TableContainer sx={{minWidth:'70%', maxHeight: "100vh"}} component={Paper}>

            <Table stickyHeader size={"small"} aria-label="simple table">
                <TableHead sx={{fontVariant:'revert'}}>
                <TableRow>
                {/* <TableCell padding="checkbox" ><Checkbox/></TableCell> */}
                    <TableCell >Full Name</TableCell>
                    <TableCell align="right">Date</TableCell>
                    {/* <TableCell align="right">Birth Date</TableCell> */}
                    <TableCell align="right">Till Days</TableCell>
                    <TableCell align="right">Till Days (Year)</TableCell>
                    <TableCell align="right">Age</TableCell>
                    <TableCell align="right">Year</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {birthdays.map((row) => (
                    <TableRow 
                    key={row.name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    onClick={()=>handleMore(row)}
                    >
                    {/* <TableCell padding="checkbox" ><Checkbox/></TableCell> */}
                    <TableCell align="left"component="th" scope="row">
                        {row.name}
                    </TableCell>
                    <TableCell align="right">{row.birthday}</TableCell>
                    {/* <TableCell align="right">{row.birthdayDate}</TableCell> */}
                    <TableCell align="right">{row.tillBirthday}</TableCell>
                    <TableCell align="right">{row.absoluteDaysThisYear}</TableCell>
                    <TableCell align="right">{row.age}</TableCell>
                    <TableCell align="right">{row.year}</TableCell>
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