import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import {ToggleButton, ToggleButtonGroup} from "@mui/lab";
import {AutoFixHighRounded, DarkModeRounded, LightModeRounded, PaletteRounded} from "@mui/icons-material";
import {
    Avatar,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    ListSubheader,
    Paper,
    Stack,
    Typography
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";


export default function Profile() {
    const handleChange = (event, newAlignment) => {
        //setAlignment(newAlignment);
    };

    return (
        <Container maxWidth={'md'}>
            <Box sx={{py: 2}}>
                <Paper variant={'outlined'}>
                    <Container sx={{py: 2}}>
                        <Stack direction="row"
                               alignItems="center"
                               spacing={2}>
                            <Avatar />
                            <Typography variant="h6" gutterBottom>Владислав Шинкарук</Typography>
                        </Stack>
                    </Container>
                </Paper>
                <List  subheader={<ul />}>
                    <ListItem disableGutters>
                        <ListItemIcon>
                            <PaletteRounded/>
                        </ListItemIcon>
                        <ListItemText id="switch-list-label-wifi" primary="Тема"
                                      secondary={"Основная цветовая схема приложения"}/>
                        <ToggleButtonGroup
                            color="primary"
                            size="small"
                            value="system"
                            exclusive
                            onChange={handleChange}
                        >
                            <ToggleButton disabled value="light"><LightModeRounded/></ToggleButton>
                            <ToggleButton disabled value="dark"><DarkModeRounded/></ToggleButton>
                            <ToggleButton value="system"><AutoFixHighRounded/></ToggleButton>
                        </ToggleButtonGroup>
                    </ListItem>
                </List>
            </Box>
        </Container>
    );
}