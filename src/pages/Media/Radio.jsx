import { PlayArrow, RadioOutlined } from "@mui/icons-material";
import { Button, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, TextField } from "@mui/material";
import { useState } from "react";
let stationData =  require('./stationData.json');

export default function Radio() {
 
  const [radioIndex, setRadioIndex] = useState(0);
  const [currentStations,setStations] = useState(stationData)
  const changeChannel = () => {
    setRadioIndex(radioIndex==0?1:0);
  };
  const searchRadioStations = (event) =>{
    console.log(`.*${event.target.value}.*`)
    setStations(stationData.filter(data=>data.name !== null && data.name !== undefined).filter(data => data.name.match(new RegExp(".*"+event.target.value+".*",'i','i'))))
  };
  console.log(currentStations)
  return (
    <>
    <TextField label="Search" placeholder="Search Radio Stations" onChange={(e)=>searchRadioStations(e)}></TextField>
    <List>
        
    {currentStations?currentStations.map((radio,index)=>
        <ListItem style={{width:'100%'}}>
            <ListItemText primary={radio.name}></ListItemText>
            <ListItemIcon style={{minWidth:'1rem'}}>
                <IconButton onClick={()=>setRadioIndex(index)}>
                  <PlayArrow />
                </IconButton>
              </ListItemIcon >
        </ListItem>
        
    ):<></>}
    </List>
    <label>{currentStations[radioIndex]?.name}</label>
      
      <div style={{position:'sticky',bottom:0}}>
        <audio src={currentStations[radioIndex]?.urls[0]} controls autoplay="false" muted>
        </audio>
      </div>
      <Button onClick={changeChannel}>Change Channel</Button>
    </>
  );
}
