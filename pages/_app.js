import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {CacheProvider} from '@emotion/react';
import {Box, CircularProgress, CssBaseline, Fade, Grid, ThemeProvider} from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';

import createEmotionCache from '../utility/createEmotionCache';
import lightTheme from '../styles/theme/lightTheme';
import '../styles/globals.css';
import Navbar from "../components/Navbar";
import darkTheme from "../styles/theme/darkTheme";
import Head from "next/head";

const clientSideEmotionCache = createEmotionCache();

const MyApp = (props) => {
    const {Component, emotionCache = clientSideEmotionCache, pageProps} = props;
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

    const [backdrop, setBackdrop] = useState(false);

    const theme = React.useMemo(
        () => prefersDarkMode ? darkTheme : lightTheme,
        [prefersDarkMode],
    );

    return (
        <CacheProvider value={emotionCache}>
            <ThemeProvider theme={theme}>
                <Head>
                    <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no"
                          key="viewport"/>
                    <link rel="preconnect" href="https://fonts.googleapis.com"/>
                    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin/>
                    <link
                        href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap"
                        rel="stylesheet"/>
                </Head>
                <CssBaseline/>
                    <Box id={"main"}
                         sx={{overflow: 'auto', position: 'fixed', left: 0, right: 0, bottom: 56, top: 0}}>
                        <Fade in={backdrop} unmountOnExit  >
                        <Grid
                                position={"absolute"}
                                container
                                height={'100%'}
                                direction="column"
                                justifyContent="center"
                                alignItems="center">
                                <CircularProgress color="primary"/>
                        </Grid>
                        </Fade>
                        <Fade in={!backdrop} unmountOnExit ><Box><Component {...pageProps} /></Box></Fade>
                    </Box>
                <Navbar backdrop={setBackdrop}/>
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