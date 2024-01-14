import logo from './logo.svg';
import React from 'react';
import './App.css';
import PageHolder from './pages/PageHolder';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';

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
      <CssBaseline />
      <PageHolder changeTheme={()=>setThemePreference(!darkThemed)}></PageHolder>
    </ThemeProvider>
  );
}

export default App;
