import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ProTip from '../components/ProTip';
import Link from '../components/Link';
import Copyright from '../components/Copyright';
import LordIcon from "../components/LordIcon";

export default function About() {
    return (
        <Container maxWidth="sm">
            <Box sx={{my: 4}}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Next.js example
                </Typography>
                <Button id="goHome" variant="contained" component={Link} noLinkStyle href="/">
                    <span> Go to the main page&nbsp;
                        <LordIcon state="hover-3" src="gwlkhzue" trigger="loop-on-hover" target="#goHome"/></span>
                </Button>
                <ProTip/>
                <Copyright/>
            </Box>
        </Container>
    );
}