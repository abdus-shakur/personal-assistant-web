import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import "bootstrap/dist/css/bootstrap.min.css";
import React from 'react';
import './App.css';

import { Notifications } from 'react-push-notification';
import PageRouter from './pages/PageRouter';

function App() {

  function getDefaultTheme(){
   return null===localStorage.getItem("theme-preference")?true:localStorage.getItem("theme-preference")==="dark";
  }

  function setThemePreference(darkThemed){
    setDarkThemed(darkThemed);
    localStorage.setItem("theme-preference",localStorage.getItem("theme-preference")==="dark"?"light":"dark");
  }

  const [darkThemed,setDarkThemed] = React.useState(getDefaultTheme());

  const darkTheme = createTheme({
    palette: {
      mode: darkThemed?'dark':'light',
    },
  });



  return (
    <ThemeProvider theme={darkTheme}>
      <Notifications/>
      <CssBaseline />
      <PageRouter darkThemed={darkThemed} changeTheme={()=>setThemePreference(!darkThemed)} setThemePreference={()=>setThemePreference(!darkThemed)} />
    </ThemeProvider>
  );
}

export default App;
