import * as React from "react";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {BottomNavigation, BottomNavigationAction, Paper} from "@mui/material";
import LordIcon from "./LordIcon";
import lightTheme from "../styles/theme/lightTheme";


const Navbar = () => {
    const router = useRouter()

    const Links = [
        {to: "/", label: "", iconFilled: "hwixfird", iconOutlined: "igpbsrza", trigger: "morph", state: "morph-2"},
        {to: "/about", label: "", iconFilled: "elkhjhci", iconOutlined: "dklbhvrt"},
        {to: "/profile", label: "", iconFilled: "elkhjhci", iconOutlined: "dklbhvrt"}
    ];

    const getCurrentPage = () =>
        Links.findIndex((link) => link.to === router.pathname);

    const [value, setValue] = useState(getCurrentPage());

    useEffect(() => {
        setValue(getCurrentPage());
    }, [router.pathname])

    return (<Paper sx={{position: 'fixed', bottom: 0, left: 0, right: 0}} elevation={3}>
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
                (<BottomNavigationAction label={link.label}
                                         key={index}
                                         id={`${link.label}Nav`}
                                         icon={
                                             <LordIcon state={link?.state || "hover"}
                                                       src={index === value ? link.iconFilled : link.iconOutlined}
                                                       trigger={link?.trigger || "hover"}
                                                       color={lightTheme.palette.primary.main}
                                                       target={`#${link.label}Nav`}/>}
                />)
            )}


        </BottomNavigation>
    </Paper>);
}

export default Navbar;