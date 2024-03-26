import { CheckBox, CheckBoxOutlineBlank, PlayArrow } from "@mui/icons-material";
import {
  Autocomplete,
  Checkbox,
  Divider,
  Grid,
  IconButton,
  List,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography
} from "@mui/material";
import { useState } from "react";
let stationDataInput = require("./stationData.json");


export default function Radio() {
  
  const [radioIndex, setRadioIndex] = useState(0);
  const [stationData,setStationData] = useState(stationDataInput.sort((a,b)=>{
    if(a.name<b.name){
      return -1
    }
    if(a.name>b.name){
      return 1
    }
    return 0
  }))
  const [currentStations, setStations] = useState(
    [...Array(stationData.length).keys()].map((foo) => foo)
  );
  const filterRadioStationsByName = (name)=>{
    var matchedStations = [];
  
    if(Array.isArray(name)){
      
      name = name.map(data=>data.name).reduce((accumulator, currentValue) => {
        // Check if accumulator is empty to avoid adding delimiter at the beginning
        if (accumulator === "") {
            return currentValue;
        } else {
            return accumulator + "|" + currentValue;
        }
    },"")
      console.log(name)
      console.log("Inside")
      name = "("+name.substring(0,name.length-1)+")"
      console.log(name)
    }
    for (let i = 0; i < stationData.length; i++) {
      let data = stationData[i];
      if (
        data.name !== null &&
        data.name !== undefined &&
        data.name.match(new RegExp(".*" + name+ ".*", "i"))
      ) {
        matchedStations.push(i);
      }
    }
    setStations([...matchedStations]);
  }
  const searchRadioStations = (event) => {
    filterRadioStationsByName(event.target.value);
  };
  const [selectedOptions,setSelectedOptions] = useState([]);
  const handleOnChange = (event,values)=>{
    console.log(values)
    values = values.map(data=>{
      if(typeof data === "object"){
        return data
      }
      var obj = {}
      obj.name = data;
      return obj;
    })
    setSelectedOptions(values);
    filterRadioStationsByName(values)
  }
  return (
    <>
    <Grid container gap={3} sx={{paddingTop:"1rem"}}>
      <Grid item>
      <TextField sx={{width:"30rem"}}
        label="Search"
        placeholder="Search Radio Stations"
        onChange={(e) => searchRadioStations(e)}
      ></TextField>
      </Grid>
      <Grid item>
      <Autocomplete sx={{width:"30rem"}} multiple options={stationData.map((data,index)=>{data.key=index;return data;})}
      getOptionLabel={(option) => option.name}
      value={selectedOptions}
      onChange={handleOnChange}
      freeSolo="true"
      renderInput={(params) => (
        <TextField {...params} label="Search Stations" placeholder="Search Radio Stations" />
      )}/>
      </Grid>
      </Grid>
      <Divider sx={{paddingTop:"0.5rem"}}variant="fullWidth">Showing {currentStations.length} of {stationData.length} Stations</Divider>
      <List>
        {currentStations ? (
          currentStations.map((stationIndex, index) => (
            <MenuItem
              style={{ width: "100%" }}
              onClick={() => setRadioIndex(stationIndex)}
            >
              <ListItemText
                primary={stationData[stationIndex].name}
              ></ListItemText>
              <ListItemIcon style={{ minWidth: "1rem" }}>
                <IconButton onClick={() => setRadioIndex(stationIndex)}>
                  <PlayArrow />
                </IconButton>
              </ListItemIcon>
            </MenuItem>
          ))
        ) : (
          <></>
        )}
      </List>
      <div style={{ height: "6.8rem" }}></div>
      <Paper elevation={10}>
        <Paper
          elevation={10}
          sx={{
            padding: "0.5rem 0.5rem 0 0.5rem",
            position: "fixed",
            bottom: 0,
            left: 0,
            maxWidth: "100% !important",
            width: "100%",
            height: "6.8rem",
          }}
        >
          <label style={{ width: "100%", textAlign: "center" }}>
            <Typography variant="h6">
              {stationData[radioIndex]?.name}
            </Typography>
          </label>
          <audio
            style={{ width: "100%" }}
            src={stationData[radioIndex]?.urls[0]}
            controls
            autoplay="false"
            muted
          ></audio>
        </Paper>
      </Paper>
    </>
  );
}
