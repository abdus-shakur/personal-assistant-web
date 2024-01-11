import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { TextField, Grid, Box ,Divider, Typography, Paper} from "@mui/material";
import { DataObjectSharp } from "@mui/icons-material";
import { GetVcardById } from "../service/RelationManager/CategorizedContacts/getData";
import { useEffect, useState } from "react";

export default function VCardContactViewPage() {
  
  const [contact,setContact] = useState({});

  const getContactDetails = (id)=>{
    GetVcardById(id).then(response=>{
      let responseContact = response.data;
      setContact(responseContact);
    });
  }

  useEffect(()=>{
    getContactDetails(573);
  },[]);

  var contactStructure = {
    "Name" : ["Full Name","Name Prefix","First Name","Middle Name","Sur Name","Name Suffix","ID"],
    "Company":["Company","Department","Title"],
    "Phone":["Phone - Main","Phone - Home","Phone - Work"],
    "Significant Date":["Birthday","Anniversary"],
    "Email":["Email - Home","Email - Work"],
    "Website":["Url"],
    "Related Person":["Assistant"],
    "Others":['Notes','Label']
  };

  var mappings = {
    "Name Prefix":"namePrefix",
    "Full Name":"fullName",
    "First Name":"firstName","Middle Name":"middleName","Sur Name":"surName","Name Suffix":"nameSuffix",
    "Birthday":"birthDay","ID":"id"

  };

  const valueChange = (event)=>{
    console.log(event.target);
    setContact((prev)=>({
      ...prev,
      [mappings[event.target.name]]:event.target.value
    }))
  }

  function Item(name) {
    return (
      <Grid item>
        {console.log(`name : ${name}, mappings : ${mappings[name]}, contact value : ${contact[mappings[name]]}`)}
        <TextField sx={{ width: "12.5rem" }} name={name} label={name} variant="outlined" onChange={valueChange} value={contact[mappings[name]]|| ''}></TextField>
      </Grid>
    );
  }
  function inputSection(heading,fields){
    return <div><Grid item>
    <Typography  ></Typography>

    {/* <Grid item> */}
    <Divider textAlign="center">{heading}</Divider>
    <br></br>
    </Grid>
    <Grid item>
      <Grid
         container
         direction="row"
         rowSpacing={2}
         columnSpacing={3}
      >
        {fields.map(field=>Item(field))}
      </Grid>
      <br></br>
    </Grid></div>;
  }
  return (
    <div>
      <CssBaseline />
      <Box sx={{ flexGrow: 1, padding: "2rem" }}>
        <Grid container direction="column" rowSpacing={1} columnSpacing={1}>
          {Object.entries(contactStructure).map((item,index)=>{
            return inputSection(item[0],item[1]);
          })}
        </Grid>
      </Box>
    </div>
  );
}
