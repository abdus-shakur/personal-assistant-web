import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import {
  TextField,
  Grid,
  Box,
  Divider,
  Typography,
  Paper,
  ListItem,
  MenuItem,
  Button,
} from "@mui/material";
import { DataObjectSharp } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { GetBasicVcards } from "../service/RelationManager/CategorizedContacts/getData";
import ContactsSearchTable from "../components/RelationManager/ContactsSearchTable";
import ContactsFilterTable from "../components/RelationManager/ContactsFilterTable";


export default function CategorizedContacts() {
  var contactStructure = {
    Name: [
      "Name Prefix",
      "First Name",
      "Middle Name",
      "Sur Name",
      "Name Suffix",
    ],
    Company: ["Company", "Department", "Title"],
    Phone: ["Phone - Main", "Phone - Home", "Phone - Work"],
    "Significant Date": ["Birthday", "Anniversary"],
    Email: ["Email - Home", "Email - Work"],
    Website: ["Url"],
    "Related Person": ["Assistant"],
    Others: ["Notes", "Label"],
  };

  const[contacts,setContacts] = useState([]);
  useEffect(()=>{
    GetBasicVcards().then((response)=>{
      console.log(response.data);
      var data = response.data;
      var contHolder = [];
      response.data.forEach(dat=>{
        var cont = {};
        cont.name = dat.fullName;
        if(dat.phoneNumbers.length>0)
        cont.number = dat.phoneNumbers[0].number;
        contHolder.push(cont);
      })
      setContacts(contHolder);
    }).catch((error)=>{
      console.error(error);
    })

  },[])
  function Item(name) {
    return (
      <Grid item>
        <TextField label={name} variant="outlined"></TextField>
      </Grid>
    );
  }
  function line(name,number, message) {
    let encodedMessage = encodeURIComponent(message);
    return (
      <ListItem variant="primary">
        <MenuItem>{name}</MenuItem>
        <MenuItem>{number}</MenuItem>
        <Button href={`tel:${number}`}>Call</Button>
        <Button href={`https://wa.me/${number}?text=${encodedMessage}`}>
          Whatsapp Call
        </Button>
        <Button href={`https://wa.me/${number}?call`}>
          Test Button
        </Button>
      </ListItem>
    );
  }
  function item(number, message) {
    let encodedMessage = encodeURIComponent(message);
    return (
      <ListItem variant="primary">
        <MenuItem>{number}</MenuItem>
        <Button href={`tel:${number}`}>Call</Button>
        <Button href={`https://wa.me/${number}?text=${encodedMessage}`}>
          Whatsapp Call
        </Button>
        <Button href={`https://wa.me/${number}?call`}>
          Test Button
        </Button>
      </ListItem>
    );
  }
  return (
    <div>
      <CssBaseline />
      {/* <Paper square={false} style={{margin:"2rem"}} elevation={5}> */}
      <Box sx={{ flexGrow: 1, padding: "2rem" }}>
        <Grid container direction="column" rowSpacing={1} columnSpacing={1}>
          {/* <ListItem>
            <MenuItem>MenuItem</MenuItem>
            <Button href="https://wa.me/9482756382?text=Wish%20You%20a%20Very%20Happy%20Birthday%20%21%20%E2%9D%A4%EF%B8%8F">
              Whatsapp Call
            </Button>
          </ListItem>
          {item("7904001237", "Wish You a very Happy Birthday ! ❤️❤️")} */}
          <ContactsSearchTable ></ContactsSearchTable>
          <ContactsFilterTable></ContactsFilterTable>
          {/* {contacts.map(contact=>line(contact.name,contact.number,"Wish You a very Happy Birthday ! ❤️❤️"))} */}
        </Grid>
      </Box>
      {/* </Paper> */}
    </div>
  );
}
