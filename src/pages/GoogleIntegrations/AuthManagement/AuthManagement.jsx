import { LoginOutlined, Logout, Refresh, Settings } from "@mui/icons-material";
import { Chip, List, ListItem, ListItemButton, ListItemIcon, TextField, Tooltip, Typography, useTheme } from "@mui/material";
import oauthSignIn, { getAuthTimeRemaining, getAuthToken, getCodeToken, logoutGoogle } from "../service/oauth/manageLogin";
import { setToken } from "../service/EmailService";
import { useEffect, useRef, useState } from "react";
import React from 'react'

export default function AuthManagement() {
    const [timeRemaining,setTimeRemaining] = useState(getAuthTimeRemaining()||0);
    const [bearerToken,setBearerToken] = useState(getAuthToken());
    const chipMode = useTheme().palette.mode==='dark'?"outlined":"filled";
    const timerRef = useRef(null);
    let timerRefreshInterval = 1000;
    useEffect(()=>{
            if(null!==timerRef.current){
              clearInterval(timerRef.current);
            }
            timerRef.current = 
            setInterval(() =>{
                if(getAuthTimeRemaining()<=0){
                    setTimeRemaining(0);
                    clearInterval(timerRef.current);
                    setBearerToken(null);
                }else{
                    // setTimeRemaining((prev)=>(prev-timerRefreshInterval/1000));
                    setTimeRemaining((prev)=>(getAuthTimeRemaining()));
                    setBearerToken(getAuthToken());
                }
            } , timerRefreshInterval);
            return () => {
            clearInterval(timerRef.current);
            }
    },[])
  return (
    <React.Fragment>
      <List>
        <ListItem>
          <ListItemButton onClick={setToken}>
            <ListItemIcon>
              <Settings />
            </ListItemIcon>
          </ListItemButton>
          <ListItemButton onClick={oauthSignIn}>
            <ListItemIcon>
              <LoginOutlined />
            </ListItemIcon>
          </ListItemButton>
          <ListItemButton onClick={logoutGoogle}>
            <ListItemIcon>
              <Logout />
            </ListItemIcon>
          </ListItemButton>
          
          <ListItemButton onClick={getCodeToken}>
          <Tooltip title="Fetch Refresh Token" >
            <ListItemIcon>
              <Refresh />
            </ListItemIcon>
            </Tooltip>
          </ListItemButton>
          
        </ListItem>
        <ListItem>
            <TextField variant="outlined" color="primary" label="Bearer Token" value={bearerToken||''} contentEditable={false}></TextField>
        </ListItem>
        <ListItem>
            <Chip variant={chipMode} color="success" label={`Token Time Remaining : ${timeRemaining.toFixed(0)} Seconds`}></Chip>
            </ListItem>
            <ListItem>
            <Chip variant={chipMode} color="success" label={` ${(timeRemaining/60).toFixed(0)} Minutes`}></Chip>
        </ListItem>
      </List>
    </React.Fragment>
  );
}
