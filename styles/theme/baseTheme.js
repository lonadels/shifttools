const baseTheme = {
    typography: {
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
    },
    components: {
        MuiBottomNavigationAction: {
            styleOverrides: {
                root: {
                    fontWeight: 400,
                },
                label: {
                    fontSize: "0.7rem",
                    '&.Mui-selected': {
                        fontSize: "0.7rem"
                    },
                },
            }
        },

    }
};

export default baseTheme;