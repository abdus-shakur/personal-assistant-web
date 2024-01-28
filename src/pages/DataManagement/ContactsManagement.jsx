import { useTheme } from "@emotion/react";
import { Button, Container, InputLabel, TextField } from "@mui/material";
import React from "react";





export default function ContactsManagement() {
    // const classes = useStyles();
  function uploadFile(file) {
    console.log('upload file'+file);
  }

  const theme = useTheme();
  return (
    <React.Fragment>
      <Container sx={{marginTop:'3rem'}}>
      <form>
        <InputLabel>VCard File Upload</InputLabel>
      <TextField type="file" />
      <hr/>
      <Button variant="contained" color="primary" component="span">
        Upload <input style={{display:'none'}}type="file"/>
      </Button>
    </form>
      </Container>
      <label className="upload-button" >
      <input style={{display:'none'}}type="file"/>Custom Upload
      </label>

    </React.Fragment>
  );
}
