import React from 'react';
import PropTypes from 'prop-types';
import {CacheProvider} from '@emotion/react';
import {Box, CssBaseline, Fab, ThemeProvider} from '@mui/material';

import createEmotionCache from '../utility/createEmotionCache';
import lightTheme from '../styles/theme/lightTheme';
import '../styles/globals.css';
import Navbar from "../components/Navbar";
import ScrollTop from "../components/ScrollTop";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const clientSideEmotionCache = createEmotionCache();

const MyApp = (props) => {
    const {Component, emotionCache = clientSideEmotionCache, pageProps} = props;

    return (
        <CacheProvider value={emotionCache}>
            <ThemeProvider theme={lightTheme}>
                <CssBaseline/>
                <Box id={"main"} sx={{py: 2, overflow: 'auto', position: 'fixed', left: 0, right: 0, bottom: 56, top: 0}}>
                    <Component {...pageProps} />
                    <ScrollTop {...props}>
                        <Fab color="secondary" size="small" aria-label="scroll back to top">
                            <KeyboardArrowUpIcon />
                        </Fab>
                    </ScrollTop>
                </Box>
                <Navbar/>
            </ThemeProvider>
        </CacheProvider>
    );
};

export default MyApp;

MyApp.propTypes = {
    Component: PropTypes.elementType.isRequired,
    emotionCache: PropTypes.object,
    pageProps: PropTypes.object.isRequired,
};