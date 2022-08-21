import React, {useEffect, useState} from 'react';
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
import {wrapper} from "../components/store";
import {Provider, useDispatch, useSelector} from "react-redux";

const clientSideEmotionCache = createEmotionCache();

const Theme = (props) => {

        const {Component, emotionCache = clientSideEmotionCache, pageProps} = props.prop;

        const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

        const themeProp = useSelector((state) => state.properties.theme);

        const theme = React.useMemo(
            () => {
                if( themeProp === 0 )
                    return prefersDarkMode ? darkTheme : lightTheme
                else
                    return themeProp === 1 ? lightTheme : darkTheme;
            },
            [prefersDarkMode, themeProp],
        );

        return <ThemeProvider theme={theme}>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no"
                      key="viewport"/>
            </Head>
            <CssBaseline/>
            <Box id={"main"}
                 sx={{overflow: "auto", position: "fixed", left: 0, right: 0, bottom: 56, top: 0}}>
                <Fade in={props.in} unmountOnExit>
                    <Grid
                        position={"absolute"}
                        container
                        height={"100%"}
                        direction="column"
                        justifyContent="center"
                        alignItems="center">
                        <CircularProgress color="primary"/>
                    </Grid>
                </Fade>
                <Fade in={!props.in} unmountOnExit><Box><Component {...pageProps} /></Box></Fade>
            </Box>
            <Navbar backdrop={props.backdrop}/>
        </ThemeProvider>;
}

Theme.propTypes = {
    theme: PropTypes.any,
    in: PropTypes.bool,
    pageProps: PropTypes.any,
    backdrop: PropTypes.func
};
const MyApp = ({...rest}) => {
    const {store, props} = wrapper.useWrappedStore(rest)

    const {emotionCache = clientSideEmotionCache} = props;

    const [backdrop, setBackdrop] = useState(false);

    useEffect(() => {
        document.addEventListener('contextmenu', event => event.preventDefault());
    }, []);

    return (
        <Provider store={store}>
            <CacheProvider value={emotionCache}>
                <Theme in={backdrop} prop={props} backdrop={setBackdrop}/>
            </CacheProvider>
        </Provider>
    );
};

export default MyApp;

MyApp.propTypes = {
    Component: PropTypes.elementType.isRequired,
    emotionCache: PropTypes.object,
    pageProps: PropTypes.object.isRequired,
};