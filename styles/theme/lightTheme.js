import {createTheme} from '@mui/material/styles';
import baseTheme from "./baseTheme";

const lightTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#3e6aff'
        },
        success: {
            main: '#3a9f50'
        },
        secondary: {
            main: '#606167'
        },
    },
}, baseTheme);

export default lightTheme;