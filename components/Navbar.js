import * as React from "react";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";

import {BottomNavigation, BottomNavigationAction, Paper} from "@mui/material";

const Navbar = () => {
    const router = useRouter()

    const Links = [
        {to: "/colculator", label: "Персонал", icon: "people"},
        {to: "/transfers", label: "Трансферы", icon: "airplane"},
        {to: "/counters", label: "Считалки", icon: "calculator"},
        {to: "/profile", label: "Профиль", icon: "person-circle"},
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
                                         id={`${link.icon}Nav`}
                                         icon={<ion-icon name={link.icon + (index === value ? "" : "-outline")}
                                                         style={{fontSize: 24}}/>}
                />)
            )}


        </BottomNavigation>
    </Paper>);
}

export default Navbar;