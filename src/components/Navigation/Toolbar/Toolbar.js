import React from 'react';

import "./Toolbar.scss";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import DrawerToggle from "../SideDrawer/DrawerToggle/DrawerToggle"

const toolbar = (props) => {
    return (
        <header className="Toolbar">
            <DrawerToggle clicked = {props.drawerToggleClicked}/>
            <Logo />
            <nav className="DesktopOnly">
                <NavigationItems />
            </nav>
        </header>
    );
}

export default toolbar;
