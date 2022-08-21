import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import {ToggleButton, ToggleButtonGroup} from "@mui/lab";
import {
    AnimationRounded,
    AutoFixHighRounded, BugReportRounded,
    DarkModeRounded, GitHub, HeadsetMicRounded, HelpOutlineRounded,
    InfoRounded,
    LightModeRounded, LogoutRounded,
    ManageAccountsRounded,
    OpenInNewRounded,
    PaletteRounded, QuestionMarkRounded
} from "@mui/icons-material";
import {
    Avatar, Divider, Link,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    ListSubheader,
    Paper,
    Stack, SvgIcon,
    Switch,
    Typography
} from "@mui/material";
import {useBooleanState} from "webrix/hooks";

import * as packageInfo from '../package.json';
import {useRouter} from "next/router";

const version = packageInfo.version;

import {fetchSubject, selectSubject, wrapper} from '../components/store';
import {useDispatch, useSelector} from "react-redux";
import {themeSetAuto, themeSetDark, themeSetLight} from "../services/propertiesSlice";

export default function Index() {
    const handleChange = (event, newAlignment) => {
        //setAlignment(newAlignment);
    };

    const theme = useSelector((state) => state.properties.theme);
    const dispatch = useDispatch()

    const router = useRouter();

    const checked = useBooleanState(false);
    return (<Box sx={{py: 2.5}}>
            <Container sx={{p: 0}} maxWidth={'md'}>
                <Container sx={{px: {
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
                            value={ theme === -1 ? "dark" : (theme === 0 ? "auto" : "light") }
                            exclusive
                            onChange={handleChange}
                        > {/* onClick={() => dispatch(decrement())} */}
                            <ToggleButton onClick={() => dispatch(themeSetLight())} value="light"><LightModeRounded/></ToggleButton>
                            <ToggleButton onClick={() => dispatch(themeSetDark())} value="dark"><DarkModeRounded/></ToggleButton>
                            <ToggleButton onClick={() => dispatch(themeSetAuto())} value="auto"><AutoFixHighRounded/></ToggleButton>
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
                    <ListItemButton>
                        <ListItemIcon>
                            <InfoRounded/>
                        </ListItemIcon>
                        <ListItemText id="switch-list-label-wifi" primary="Версия"
                                      secondary={version}/>
                    </ListItemButton>
                    <ListItemButton onClick={() => {
                        window.open("https://vk.com/swiftof")
                    }}>
                        <ListItemIcon>
                            <ManageAccountsRounded/>
                        </ListItemIcon>
                        <ListItemText id="switch-list-label-wifi" primary="Разработчик"
                                      secondary="SwiftSoft"/>
                        <OpenInNewRounded/>
                    </ListItemButton>
                    <ListItemButton onClick={() => {
                        window.open("https://github.com/lonadels/shifttools")
                    }}>
                        <ListItemIcon>
                            <GitHub />
                        </ListItemIcon>
                        <ListItemText id="switch-list-label-wifi" primary="Исходный код"
                                      secondary="GitHub"/>
                        <OpenInNewRounded/>
                    </ListItemButton>
                </List>
                <Divider variant={"middle"} />
                <List>
                    <ListItemButton>
                        <ListItemIcon>
                            <HeadsetMicRounded/>
                        </ListItemIcon>
                        <ListItemText id="switch-list-label-wifi" primary="Поддержка"/>
                    </ListItemButton>
                    <ListItemButton >
                        <ListItemIcon>
                            <LogoutRounded color={"error"}/>
                        </ListItemIcon>
                        <ListItemText color={"error"} id="switch-list-label-wifi" primary={<Typography color={"error"}>Выйти</Typography>}/>
                    </ListItemButton>
                </List>
            </Container>
        </Box>
    )
        ;
}