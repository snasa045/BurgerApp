import React, { useState } from 'react';

import "./Layout.scss";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
import { connect } from 'react-redux';

const Layout = props => {

    const [sideDrawerIsVisible, setSideDrawerIsVisible] = useState(false)

    // state = {
    //     showSideDrawer: false
    // }
    
    const sideDrawerClosedHandler = () => {
        setSideDrawerIsVisible(false);
    }

    const sideDrawerToggleHandler = () => {
        setSideDrawerIsVisible(!sideDrawerIsVisible);
    }

    return(
        <React.Fragment>
            <Toolbar 
                isAuth = {props.isAuthenticated}
                drawerToggleClicked={sideDrawerToggleHandler}/>
            <SideDrawer 
                isAuth = {props.isAuthenticated}
                open={sideDrawerIsVisible} closed = {sideDrawerClosedHandler}/>
            <main className= "Container">
                { props.children }
            </main>
        </React.Fragment>
    );
};

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}

export default connect(mapStateToProps)(Layout);