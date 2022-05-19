import {createTheme} from '@mui/material/styles';
import baseTheme from "./baseTheme";

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#ff1c51'
        },
    },
    components: {
        MuiBottomNavigationAction: {
            styleOverrides: {
                root: {
                    fontWeight: 700,
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