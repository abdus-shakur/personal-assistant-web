import logo from './logo.svg';
import './App.css';
import PageHolder from './pages/PageHolder';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';

function App() {
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <PageHolder></PageHolder>
    </ThemeProvider>
  );
}

export default App;
