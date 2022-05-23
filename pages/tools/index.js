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
    BadgeRounded,
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
                  subheader={<li/>}>
                <li>
                    <ul>
                        <ListSubheader>{`Считалки`}</ListSubheader>

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
                        <ListItemButton disabled>
                            <ListItemIcon>
                                <FastfoodRounded/>
                            </ListItemIcon>
                            <ListItemText primary={"Расчет поставки"}
                                          secondary={"Расчет необходимого для заказа количества охлажденного куриного п/ф"}/>
                            <NavigateNextRounded/>
                        </ListItemButton>
                    </ul>
                </li>
                <li>
                    <ul>
                        <ListSubheader>{`Чек-листы`}</ListSubheader>
                        <ListItemButton disabled>
                            <ListItemIcon>
                                <ScienceRounded/>
                            </ListItemIcon>
                            <ListItemText primary={`ООО "ТД Полимир"`}
                                          secondary={"Бланк подсчета химии и упаковки"}/>
                            <NavigateNextRounded/>
                        </ListItemButton>
                        <ListItemButton disabled>
                            <ListItemIcon>
                                <LocalShippingRounded/>
                            </ListItemIcon>
                            <ListItemText primary={`ООО "РБД-Дистрибьюция"`}
                                          secondary={"Бланк подсчета замороженной и охлажденной продукции"}/>
                            <NavigateNextRounded/>
                        </ListItemButton>
                        <ListItemButton disabled>
                            <ListItemIcon>
                                <LocalDrinkRounded/>
                            </ListItemIcon>
                            <ListItemText primary={`ООО "ПепсиКо Холдингс"`}
                                          secondary={"Бланк подсчета бибов, бутылок и баллонов Pepsi"}/>
                            <NavigateNextRounded/>
                        </ListItemButton>
                       {/* <Divider variant={"middle"}/>*/}
                        <ListItemButton disabled>
                            <ListItemIcon>
                                <WorkspacePremiumRounded/>
                            </ListItemIcon>
                            <ListItemText primary="Сертификация"
                                          secondary={"Бланк сертификации сотрудника на позицию (скоро)"}/>
                            <NavigateNextRounded/>
                        </ListItemButton>
                    </ul>
                </li>
                <li>
                    <ul>
                        <ListSubheader>{`Отчеты`}</ListSubheader>
                        <ListItemButton disabled>
                            <ListItemIcon>
                                <AutoGraphRounded/>
                            </ListItemIcon>
                            <ListItemText primary="Реализация"
                                          secondary={"Таблица отчетности показателей ресторана (скоро)"}/>
                            <NavigateNextRounded/>
                        </ListItemButton>
                    </ul>
                </li>
                <li>
                    <ul>
                        <ListSubheader>{`Другое`}</ListSubheader>
                        <ListItemButton disabled>
                            <ListItemIcon>
                                <BadgeRounded/>
                            </ListItemIcon>
                            <ListItemText primary="Поставщики"
                                          secondary={"Справочная информация по поставщикам"}/>
                            <NavigateNextRounded/>
                        </ListItemButton>
                        <ListItemButton disabled>
                            <ListItemIcon>
                                <LocalOfferRounded/>
                            </ListItemIcon>
                            <ListItemText primary="Производители"
                                          secondary={"Названия производителей сырья"}/>
                            <NavigateNextRounded/>
                        </ListItemButton>
                    </ul>
                </li>
            </List>
            <Divider/>
            <List subheader={<li/>}>
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