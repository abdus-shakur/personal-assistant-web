import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import VCardTable2 from '../components/RelationManager/VCardTable2'

export default function CircleManagementPage() {
  return (
    <div className = "relation-container">
      <CssBaseline />
      <Container maxWidth="sm">CircleManagementPage</Container>
      <VCardTable2></VCardTable2>
    </div>
  );
}
