import * as React from "react";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";

import {BottomNavigation, BottomNavigationAction, Paper, SvgIcon} from "@mui/material";

import {ReactComponent as PersonCircle} from "ionicons/dist/svg/person-circle.svg"
import {ReactComponent as PersonCircleOutline} from "ionicons/dist/svg/person-circle-outline.svg"

import {ReactComponent as People} from "ionicons/dist/svg/people.svg"
import {ReactComponent as PeopleOutline} from "ionicons/dist/svg/people-outline.svg"

import {ReactComponent as Walk} from "ionicons/dist/svg/walk.svg"
import {ReactComponent as WalkOutline} from "ionicons/dist/svg/walk-outline.svg"

import {ReactComponent as Calculator} from "ionicons/dist/svg/calculator.svg"
import {ReactComponent as CalculatorOutline} from "ionicons/dist/svg/calculator-outline.svg"

const Navbar = () => {
    const router = useRouter()

    const Links = [
        {to: "/staff", label: "Персонал", icon: [People, PeopleOutline]},
        {to: "/transfers", label: "Трансферы", icon: [Walk, WalkOutline]},
        {to: "/counters", label: "Считалки", icon: [Calculator, CalculatorOutline]},
        {to: "/profile", label: "Профиль", icon: [PersonCircle, PersonCircleOutline]},
    ];

    const getCurrentPage = () =>
        Links.findIndex((link) => link.to === router.pathname);

    const [value, setValue] = useState(getCurrentPage());

    useEffect(() => {
        setValue(getCurrentPage());
    }, [router.pathname])

    return (<Paper sx={{
        position: 'fixed', bottom: 0, left: 0, right: 0,
    }} elevation={3}>
        <BottomNavigation
            showLabels
            value={value}
            onChange={(event, newValue) => {
                const href = `/${Links[newValue].to}`;
                router.push(href, undefined, {shallow: true})
                setValue(newValue);
            }}
        >
            {Links.map((link, index) =>
                (<BottomNavigationAction key={index}
                                         label={link.label}
                                         id={`Nav${index}`}
                                         icon={<SvgIcon component={index === value ? link.icon[0] : link.icon[1]}
                                                        inheritViewBox/>}
                />)
            )}
        </BottomNavigation>
    </Paper>);
}

export default Navbar;