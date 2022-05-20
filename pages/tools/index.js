import * as React from 'react';
import Box from '@mui/material/Box';
import {List, ListItemButton, ListItemIcon, ListItemText, ListSubheader} from "@mui/material";
import {useRouter} from "next/router";
import {AutoGraphRounded, FastfoodRounded, ScheduleRounded, WorkspacePremiumRounded} from "@mui/icons-material";

export default function Tools() {
    const router = useRouter();
    return (
        <div>
            <Box>
                <List sx={{
                    width: '100%',
                    bgcolor: 'background.paper',
                    position: 'relative',
                    overflow: 'auto',
                    '& ul': {padding: 0},
                }}
                      subheader={<li/>}>
                    <li>
                        <ul>
                            <ListSubheader>{`Считалки`}</ListSubheader>
                            <ListItemButton disabled>
                                <ListItemIcon>
                                    <FastfoodRounded/>
                                </ListItemIcon>
                                <ListItemText primary="Расчет поставки"
                                              secondary={"Расчет необходимого количества продукта для заказа (скоро)"}/>
                            </ListItemButton>
                            <ListItemButton onClick={() => {
                                // TODO: make component
                                router.push(`${router.pathname}/hours`, undefined, {shallow: true});
                            }}>
                                <ListItemIcon>
                                    <ScheduleRounded/>
                                </ListItemIcon>
                                <ListItemText primary="Часы сотрудников"
                                              secondary={"Подсчет рабочего времени персонала"}/>
                            </ListItemButton>
                            <ListSubheader>{`Другое`}</ListSubheader>
                            <ListItemButton disabled>
                                <ListItemIcon>
                                    <AutoGraphRounded/>
                                </ListItemIcon>
                                <ListItemText primary="Реализация"
                                              secondary={"Таблица отчетности показателей ресторана (скоро)"}/>
                            </ListItemButton>
                            <ListItemButton disabled>
                                <ListItemIcon>
                                    <WorkspacePremiumRounded/>
                                </ListItemIcon>
                                <ListItemText primary="Сертификация"
                                              secondary={"Чек-лист сертификации сотрудника на позицию (скоро)"}/>
                            </ListItemButton>
                        </ul>
                    </li>
                </List>
            </Box>
        </div>
    );
}