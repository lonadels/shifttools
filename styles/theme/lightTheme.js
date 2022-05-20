import {createTheme} from '@mui/material/styles';
import baseTheme from "./baseTheme";

const lightTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#123be0'
        }
    },
}, baseTheme);

export default lightTheme;