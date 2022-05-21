import * as React from 'react';
import {List, ListItemButton, ListItemIcon, ListItemText, ListSubheader} from "@mui/material";
import {useRouter} from "next/router";
import {
    AutoGraphRounded,
    FastfoodRounded,
    NavigateNextRounded,
    ScheduleRounded,
    WorkspacePremiumRounded
} from "@mui/icons-material";

export default function Tools() {
    const router = useRouter();
    return (
        <List sx={{
            width: '100%',
            height: '100%',

            '& ul': {padding: 0},
        }}
              subheader={<li/>}>
            <li key={0}>
                <ul>
                    <ListSubheader>{`Считалки`}</ListSubheader>
                    <ListItemButton disabled>
                        <ListItemIcon>
                            <FastfoodRounded/>
                        </ListItemIcon>
                        <ListItemText primary="Расчет поставки"
                                      secondary={"Расчет необходимого количества продукта для заказа (скоро)"}/>
                        <NavigateNextRounded/>
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
                        <NavigateNextRounded/>
                    </ListItemButton>
                </ul>
            </li>
            <li key={1}>
                <ul>
                    <ListSubheader>{`Другое`}</ListSubheader>
                    <ListItemButton disabled>
                        <ListItemIcon>
                            <AutoGraphRounded/>
                        </ListItemIcon>
                        <ListItemText primary="Реализация"
                                      secondary={"Таблица отчетности показателей ресторана (скоро)"}/>
                        <NavigateNextRounded/>
                    </ListItemButton>
                    <ListItemButton disabled>
                        <ListItemIcon>
                            <WorkspacePremiumRounded/>
                        </ListItemIcon>
                        <ListItemText primary="Сертификация"
                                      secondary={"Чек-лист сертификации сотрудника на позицию (скоро)"}/>
                        <NavigateNextRounded/>
                    </ListItemButton>
                </ul>
            </li>
        </List>
    );
}