import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { TextField, Grid, Box ,Divider, Typography, Paper} from "@mui/material";
import { DataObjectSharp } from "@mui/icons-material";

export default function ContactViewPage() {
  var contactStructure = {
    "Name" : ["Name Prefix","First Name","Middle Name","Sur Name","Name Suffix"],
    "Company":["Company","Department","Title"],
    "Phone":["Phone - Main","Phone - Home","Phone - Work"],
    "Significant Date":["Birthday","Anniversary"],
    "Email":["Email - Home","Email - Work"],
    "Website":["Url"],
    "Related Person":["Assistant"],
    "Others":['Notes','Label']
  };
  function Item(name) {
    return (
      <Grid item>
        <TextField label={name} variant="outlined"></TextField>
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
      {/* <Paper square={false} style={{margin:"2rem"}} elevation={5}> */}
      <Box sx={{ flexGrow: 1, padding: "2rem" }}>
        <Grid container direction="column" rowSpacing={1} columnSpacing={1}>
          {Object.entries(contactStructure).map((item,index)=>{
            return inputSection(item[0],item[1]);
          })}
        </Grid>
      </Box>
      {/* </Paper> */}
    </div>
  );
}
