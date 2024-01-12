import CssBaseline from "@mui/material/CssBaseline";
import { Grid, Box } from "@mui/material";
import ContactsSearchTable from "../components/RelationManager/ContactsSearchTable";

export default function CategorizedContacts() {
  return (
    <div>
      <CssBaseline />
      <Box sx={{ flexGrow: 1, padding: "2rem" }}>
        <Grid container direction="column" rowSpacing={1} columnSpacing={1}>
          <ContactsSearchTable></ContactsSearchTable>
        </Grid>
      </Box>
    </div>
  );
}
