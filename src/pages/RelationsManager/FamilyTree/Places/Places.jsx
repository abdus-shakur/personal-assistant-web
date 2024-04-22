import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
// import 'leaflet/dist/leaflet.css';

import data from './placesData'
import { Avatar, Button, Dialog, DialogContent, DialogContentText, DialogTitle, IconButton, List, ListItem, ListItemIcon, ListItemText, MenuItem, MenuList, Typography } from "@mui/material";
import { useState } from "react";
import { Close as CloseIcon, People, PeopleAlt, Star } from "@mui/icons-material";

export default function Places(){

  const [showDialog,setShowDialog] = useState(false);
  const [dialogLocation,setDialogLocation] = useState('');

  function handleOpen(location){
    setShowDialog(true)
    setDialogLocation(location)
  }

  function handleClose(){

  }

  function launchGoogleMapDirection(lat,lng){
    let googleMapUrl = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
    window.open(googleMapUrl, '_blank', 'toolbar=0,location=1,menubar=0');
  }

    return <div ><MapContainer center={[51.505, -0.09]} zoom={3} scrollWheelZoom={true} minZoom={3}
    maxZoom={15}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    {data.filter((dat,index)=>data.findIndex(()=>data.find(keyword=>keyword.name===dat.name))!==index).map(node=>
      <Marker position={[node.latitude, node.longitude]}>
      <Popup>
        <Typography variant="body">Name : {node.name.join(", ")}</Typography>
        <br/>
        <Typography variant="body">ID : {node.id}</Typography>
        <br/>
        <Typography variant="body">Birth Place : {node.birth_place}</Typography>
        <br/>
        <Button onClick={()=>handleOpen(node.birth_place)}>Show All People</Button>
        <Button onClick={()=>launchGoogleMapDirection(node.latitude,node.longitude)}>Get Directions</Button>
      </Popup>
    </Marker>
    )}
    <Dialog open={showDialog} onClose={()=>setShowDialog(false)} fullWidth={true}
        maxWidth={'md'}>
      <DialogTitle >Others in Family from {dialogLocation}</DialogTitle>
      <IconButton
          aria-label="close"
          onClick={()=>setShowDialog(false)}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent>
          <List>
        {data.filter(dat=>dat.birth_place==dialogLocation).map(place=><>
          <MenuList>
            <ListItem >
              <ListItemIcon>
                <Avatar>
                  <PeopleAlt></PeopleAlt>
                </Avatar>
              </ListItemIcon>
              <ListItemText primary={"User : "+place.name.join(", ")} secondary={"Id : "+place.id}></ListItemText>
          {/* <Typography>User : {place.name.join(", ")}</Typography>
          <Typography>Id : {place.id}</Typography> */}
          </ListItem>
          </MenuList>
        </>)}
        </List>
      </DialogContent>
    </Dialog>
    
  </MapContainer></div>
}