import { Button, Container } from "@mui/material";

export default function UrlPage() {
  const baseUrl = "http://localhost:8080";
  const linkButton = (url,name)=>{
    return <div><Button variant="contained" color="primary" href={baseUrl+url}>{name}</Button>
    <br/><br/></div>
  }
  return (
    <Container align="center">
      {linkButton("/dummy","Dummy UnAuthenticated Page")}
      {linkButton("/http","Http Authorization Request")}
      {linkButton("/oauthTest","OAuth Authorization Request")}
    </Container>
  );
}
