import { CheckBox, CheckBoxOutlineBlank, PlayArrow } from "@mui/icons-material";
import {
  Autocomplete,
  Checkbox,
  IconButton,
  List,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Paper,
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
    [...Array(stationData.length).keys()].map((foo) => foo + 1)
  );
  const searchRadioStations = (event) => {
    var matchedStations = [];
    for (let i = 0; i < stationData.length; i++) {
      let data = stationData[i];
      if (
        data.name !== null &&
        data.name !== undefined &&
        data.name.match(new RegExp(".*" + event.target.value + ".*", "i"))
      ) {
        matchedStations.push(i + 1);
      }
    }
    setStations([...matchedStations]);
  };
  return (
    <>
      <TextField
        label="Search"
        placeholder="Search Radio Stations"
        onChange={(e) => searchRadioStations(e)}
      ></TextField>
      <Autocomplete  options={stationData.map((dat,index)=>{
        dat.label = dat.name;
        // dat.index = index;
        return dat;
      })} value={"first"}

      renderOption={(props, option, { selected }) => (
        <li {...props}>
          <Checkbox
            icon={<CheckBoxOutlineBlank fontSize="small" />}
            checkedIcon={<CheckBox fontSize="small" />}
            style={{ marginRight: 8 }}
            checked={selected}
          />
          {option.name}
        </li>
      )}
      
      renderInput={(params)=><TextField  {...params} label="Test" value="first">Value</TextField>}></Autocomplete>
      <List>
        {currentStations ? (
          currentStations.map((stationIndex, index) => (
            <MenuItem
              style={{ width: "100%" }}
              onClick={() => setRadioIndex(stationIndex - 1)}
            >
              <ListItemText
                primary={stationData[stationIndex - 1].name}
              ></ListItemText>
              <ListItemIcon style={{ minWidth: "1rem" }}>
                <IconButton onClick={() => setRadioIndex(stationIndex - 1)}>
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
