import {createTheme} from '@mui/material/styles';
import baseTheme from "./baseTheme";

const lightTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#2a5cfc'
        }
    },
}, baseTheme);

export default lightTheme;