const baseTheme = {
    typography: {
        fontFamily: "Inter"
    },
    components: {
        MuiBottomNavigationAction: {
            styleOverrides: {
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