import {createTheme} from '@mui/material/styles';
import baseTheme from "./baseTheme";

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#3e6aff'
        },
        secondary: {
            main: '#606167'
        },
    },
    components: {
        MuiBottomNavigationAction: {
            styleOverrides: {
                root: {
                    color: "rgba(255,255,255,0.5)",
                    '&.Mui-selected': {
                        color: "#ffffff"
                    },
                },
            }
        },
    }
}, baseTheme);

export default darkTheme;