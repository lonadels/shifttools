import * as React from "react";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";

import {BottomNavigation, BottomNavigationAction, Paper, SvgIcon} from "@mui/material";

import {
    AccountCircleOutlined,
    AccountCircleRounded,
    ConstructionOutlined,
    ConstructionRounded,
    GroupOutlined,
    GroupRounded,
    LocalShippingOutlined,
    LocalShippingRounded
} from "@mui/icons-material";


const Navbar = (props) => {
    const router = useRouter()

    const Links = [
        {to: "staff", label: "Персонал", icon: [GroupRounded, GroupOutlined]},
        {to: "transfers", label: "Трансферы", icon: [LocalShippingRounded, LocalShippingOutlined]},
        {to: "tools", label: "Инструменты", icon: [ConstructionRounded, ConstructionOutlined]},
        {to: "profile", label: "Профиль", icon: [AccountCircleRounded, AccountCircleOutlined]},
    ];

    const getCurrentPage = () =>
        Links.findIndex((link) => link.to === router.pathname.split("/")[1]);

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
                props.backdrop(true);
                const href = `/${Links[newValue].to}`;
                router.push(href, undefined, {shallow: true}).finally(() => {
                    props.backdrop(false);
                });
                setValue(newValue);
            }}
        >
            {Links.map((link, index) =>
                (<BottomNavigationAction key={index}
                                         label={link.label}
                                         id={`Nav${index}`}
                                         icon={<SvgIcon component={index === value ? link.icon[0] : link.icon[1]}/>}
                />)
            )}
        </BottomNavigation>
    </Paper>);
}

export default Navbar;