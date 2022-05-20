import * as React from 'react';
import Box from '@mui/material/Box';
import {List, ListItemButton, ListItemIcon, ListItemText, ListSubheader} from "@mui/material";
import {useRouter} from "next/router";
import {FastfoodRounded, ScheduleRounded} from "@mui/icons-material";

export default function Counters() {
    const router = useRouter();
    return (
        <div>
            <Box>
                <List sx={{ width: '100%', bgcolor: 'background.paper' }}
                      component="nav"
                      aria-labelledby="nested-list-subheader"
                      subheader={
                          <ListSubheader component="div" id="nested-list-subheader">
                                Считалки
                          </ListSubheader>
                      }>
                    <ListItemButton disabled>
                        <ListItemIcon>
                            <FastfoodRounded />
                        </ListItemIcon>
                        <ListItemText primary="Расчет поставки (скоро)"
                                      secondary={"Расчет необходимого количества продукта для заказа"}/>
                    </ListItemButton>
                    <ListItemButton onClick={() => {
                        router.push(`${router.pathname}/hours`, undefined, {shallow: true});
                    }}>
                        <ListItemIcon>
                            <ScheduleRounded />
                        </ListItemIcon>
                        <ListItemText primary="Часы сотрудников"
                                      secondary={"Подсчет рабочего времени персонала"}/>
                    </ListItemButton>
                </List>
            </Box>
        </div>
    );
}