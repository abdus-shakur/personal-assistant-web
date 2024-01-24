import React, { useEffect, useState } from "react";
import { getCodeToken, isUserOAuthAuthenticated } from "./service/oauth/manageLogin";
import { Backdrop, Button, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function UnauthorizedOverlay(){

    const [loggedOutBackdrop,setLoggedOutBackdrop] = useState(false);
    const navigate = useNavigate();

    useEffect(()=>{
        isUserGoogleOAuthAuthenticated();
    },[isUserGoogleOAuthAuthenticated])

    function isUserGoogleOAuthAuthenticated(){
        isUserOAuthAuthenticated()
        .then(() => {
          setLoggedOutBackdrop(false);
        })
        .catch((error) => {
          setLoggedOutBackdrop(true);
          console.log('UnauthorizedOverlay : Error : '+error);
        });
      }

    return <React.Fragment>
        <Backdrop
        sx={{ color: "#fff", flexDirection:'column',zIndex: (theme) => theme.zIndex.appBar - 1 }}
        open={loggedOutBackdrop}
        onClick={() => setLoggedOutBackdrop(true)}>
        <Button color="info" style={{marginBottom:'2rem'}} variant="contained" onClick={getCodeToken}>Login to Google</Button>
        <Divider></Divider>
        <Button color="success" onClick={()=>{navigate('/app/google-integrations/auth-management',{replace:false})}}variant="contained">Auth Management</Button>
      </Backdrop>
    </React.Fragment>
}