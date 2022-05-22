import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import {ToggleButton, ToggleButtonGroup} from "@mui/lab";
import {
    AnimationRounded,
    AutoFixHighRounded, BugReportRounded,
    DarkModeRounded, HeadsetMicRounded, HelpOutlineRounded,
    InfoRounded,
    LightModeRounded,
    ManageAccountsRounded,
    OpenInNewRounded,
    PaletteRounded, QuestionMarkRounded
} from "@mui/icons-material";
import {
    Avatar, Divider,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    ListSubheader,
    Paper,
    Stack,
    Switch,
    Typography
} from "@mui/material";
import {useBooleanState} from "webrix/hooks";

import * as packageInfo from '../package.json';

const version = packageInfo.version;

export default function Index() {
    const handleChange = (event, newAlignment) => {
        //setAlignment(newAlignment);
    };

    const checked = useBooleanState(false);
    return (<Box sx={{py: 2}}>
            <Container sx={{p: 0}} maxWidth={'md'}>
                <Container sx={{p: {
                    sm: 2
                    }}}>
                    <Paper variant={"outlined"}>
                        <Container sx={{py: 2}}>
                            <Stack direction="row"
                                   alignItems="center"
                                   spacing={{xs: 2, sm: 3}}>
                                <Avatar sx={{width: 48, height: 48}}/>
                                <Stack direction={"column"} spacing={0}>
                                    <Typography variant="h6" component="div">Владислав Шинкарук</Typography>
                                    <Typography variant="body2" color={"text.secondary"} component="div">Junior Shift
                                        Manager</Typography>
                                </Stack>
                            </Stack>
                        </Container>
                    </Paper>
                </Container>
                {/*<TextField
                    sx={{mt: 2}}
                    placeholder={"Поиск"}
                    fullWidth
                    InputProps={{startAdornment: <InputAdornment position={"start"}><SearchRounded/></InputAdornment>}}
                ></TextField>*/}
                <List sx={{mt: 2}} subheader={<ListSubheader>Внешний вид</ListSubheader>}>
                    <ListItem>
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
                    <ListItemButton disabled>
                        <ListItemIcon>
                            <AnimationRounded/>
                        </ListItemIcon>
                        <ListItemText id="switch-list-label-wifi" primary="Анимации"
                                      secondary={"Воспроизведение анимаций может повлиять на производительность"}/>
                        <Switch
                            edge="end"
                            checked={checked}
                            inputProps={{
                                'aria-labelledby': 'switch-list-label-bluetooth',
                            }}
                        />
                    </ListItemButton>
                </List>
                <List subheader={<ListSubheader>О приложении</ListSubheader>}>
                    <ListItem>
                        <ListItemIcon>
                            <InfoRounded/>
                        </ListItemIcon>
                        <ListItemText id="switch-list-label-wifi" primary="Версия"
                                      secondary={version}/>
                    </ListItem>
                    <ListItemButton>
                        <ListItemIcon>
                            <ManageAccountsRounded/>
                        </ListItemIcon>
                        <ListItemText id="switch-list-label-wifi" primary="Разработчик"
                                      secondary="SwiftSoft"/>
                        <OpenInNewRounded/>
                    </ListItemButton>
                </List>
                <List subheader={<ListSubheader>Помощь</ListSubheader>}>
                    <ListItemButton>
                        <ListItemIcon>
                            <HeadsetMicRounded/>
                        </ListItemIcon>
                        <ListItemText id="switch-list-label-wifi" primary="Поддержка"/>
                        <OpenInNewRounded/>
                    </ListItemButton>
                    <ListItemButton>
                        <ListItemIcon>
                            <BugReportRounded/>
                        </ListItemIcon>
                        <ListItemText id="switch-list-label-wifi" primary="Сообщить об ошибке"/>
                        <OpenInNewRounded/>
                    </ListItemButton>
                </List>
            </Container>
        </Box>
    )
        ;
}