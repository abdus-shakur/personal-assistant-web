import { Button, Container, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

export default function Logout(){
    return <React.Fragment>
        <Container sx={{marginTop:'3rem',display:'flex',flexDirection:'column',alignContent:'center',justifyContent:'center',justifyItems:'center'}}>
            <Typography sx={{alignSelf:'center'}}variant="h3">User is Logged Out</Typography>
            <br/>
            <br/>
        <Typography sx={{alignSelf:'center'}}variant="a"><Link to="/" ><Button variant="contained">Go to Login Page</Button></Link></Typography>        
        </Container>
    </React.Fragment>
}