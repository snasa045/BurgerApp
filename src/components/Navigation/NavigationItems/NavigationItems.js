import React from 'react';

import NavigationItem from "./NavigationItem/NavigationItem";
import "./NavigationItems.scss";

const navigationItems = (props) => {
    return (
        <ul className="NavigationItems">
            <NavigationItem link = "/" active>Burger Builder</NavigationItem>
            <NavigationItem link = "/">Checkout</NavigationItem>
        </ul>
    );
}

export default navigationItems;
