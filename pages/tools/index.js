import * as React from 'react';
import {
    Chip,
    Divider,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    ListSubheader,
    Typography
} from "@mui/material";
import {useRouter} from "next/router";
import {
    AutoGraphRounded,
    BadgeRounded, CalculateRounded,
    FastfoodRounded,
    HelpOutlineRounded,
    LocalDrinkRounded,
    LocalOfferRounded,
    LocalShippingRounded,
    NavigateNextRounded,
    OpenInNewRounded,
    ScheduleRounded,
    ScienceRounded,
    WorkspacePremiumRounded
} from "@mui/icons-material";

export default function Tools() {
    const router = useRouter();
    return (
        <>
            <List sx={{
                '& ul': {padding: 0},
            }}
                  subheader={<ListSubheader>Считалки</ListSubheader>}>

                        <ListItemButton onClick={() => {
                            // TODO: make component
                            router.push(`${router.pathname}/chicken`, undefined, {shallow: true});
                        }}>
                            <ListItemIcon>
                                <CalculateRounded/>
                            </ListItemIcon>
                            <ListItemText primary="Считалка курицы"
                                          secondary={"Инструмент для подсчета куриного п/ф"}/>
                            <NavigateNextRounded/>
                        </ListItemButton>
            </List>
            <Divider/>
            <List>
                <ListItemButton>
                    <ListItemIcon>
                        <HelpOutlineRounded/>
                    </ListItemIcon>
                    <ListItemText id="switch-list-label-wifi" primary="Не хватает нужного инструмета?"
                                  secondary="Напишите нам об этом"/>
                    <OpenInNewRounded/>
                </ListItemButton>
            </List>
        </>
    );
}