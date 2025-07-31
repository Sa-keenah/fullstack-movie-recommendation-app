import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light', // change to 'dark' for dark mode
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#e91e63',
    },
  },
  typography: {
    fontFamily: '"Roboto", sans-serif',
  },
});

export default theme;