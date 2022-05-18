import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Link from '../components/Link';
import LordIcon from "../components/LordIcon";
import {Stack, Typography} from "@mui/material";

export default function About() {
    return (
        <div>
            <Container maxWidth="md">
                <Box>
                    <Typography variant="h4" gutterBottom component="div">Информация</Typography>
                    <p>Купите бобы, либо Бобы купят вас.</p>
                    <Stack direction={{xs: 'column', sm: 'row'}}
                           spacing={1}>
                        <Button id="goHome"
                                variant="outlined"
                                component={Link}
                                size={"large"}
                                noLinkStyle
                                href="/">
                            Вернуться на главную
                        </Button>
                        <Button endIcon={
                            <LordIcon state="hover"
                                      src="mndtpdim"
                                      trigger="loop-on-hover"
                                      target="#buyBobs"/>}
                                id="buyBobs"
                                variant="contained"
                                component={Link}
                                size={"large"}
                                noLinkStyle
                                href="/404">
                            Купить бобы
                        </Button>
                        <LordIcon state="hover"
                                  src="mndtpdim"
                                  trigger="loop-on-hover"
                                  className={"inherit-color"}
                                  target="#buyBobs"/>
                    </Stack>
                </Box>
            </Container>

        </div>
    );
}