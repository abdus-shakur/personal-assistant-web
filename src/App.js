import logo from './logo.svg';
import React from 'react';
import './App.css';
import PageHolder from './pages/PageHolder';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { BrowserRouter, HashRouter, Route, Routes } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import "bootstrap/dist/css/bootstrap.min.css"

import { Notifications } from 'react-push-notification';

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
      <HashRouter>
        <Routes >
        <Route exact path="/*" element={<AuthPage></AuthPage>}></Route>
          <Route exact path="/app" element={<PageHolder changeTheme={()=>setThemePreference(!darkThemed)}></PageHolder>}></Route>
          
        </Routes>
      </HashRouter>
      
    </ThemeProvider>
  );
}

export default App;
