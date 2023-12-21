import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { TextField, Grid, Box } from "@mui/material";

export default function ContactViewPage() {
  function Item(name) {
    return (
      <Grid item>
        <TextField label={name} variant="outlined"></TextField>
      </Grid>
    );
  }
  return (
    <div>
      <CssBaseline />
      <Container maxWidth="sm">ContactViewPage</Container>
      <Box sx={{ flexGrow: 1, padding: "2rem" }}>
        <Grid container direction="column" rowSpacing={2}>
          <Grid item>
            <Grid container direction="column" xs={12}  rowSpacing={2}>
              {Item("Name")}
              {Item("Number")}
            </Grid>
          </Grid>
          <Grid item>
            <Grid
              container
              direction="row"
              rowSpacing={2}
              columnSpacing={3}
            >
              {Item("Name Prefix")}
              {Item("First Name")}
              {Item("Middle Name")}
              {Item("Sur Name")}
              {Item("Company")}
            </Grid>
          </Grid>
          <Grid item>
            <Grid
              container
              direction="row"
              xs={12}
              rowSpacing={2}
              columnSpacing={3}
            >
              {Item("Phone - Main")}
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
