import React, { useState } from 'react';
import Backdrop from "../Navigation/Backdrop";
import SideDrawer from "../Navigation/SideDrawer";
import HamburgerIcon from "../UI/HamburgerIcon";
import Header from "./Header";

import styles from "./Navigation.module.css";
import NavLinks from "./NavLinks";

const Navigation = () => {

    const [ showSideDrawer, setShowSideDrawer ] = useState(false);

    const closeSideDrawerHandler = () => {
        setShowSideDrawer(false);
    };

    const showSideDrawerHandler = () => {
        setShowSideDrawer(true);
    };

    return (
        <React.Fragment>

            <Header>
                <div className={ styles.mob_header }>
                    <div>
                        <HamburgerIcon onClick={ showSideDrawerHandler } />
                    </div>
                    <h1>Share Coupons</h1>
                </div>
                { showSideDrawer &&
                    <SideDrawer>
                        <NavLinks />
                    </SideDrawer>
                }
                { showSideDrawer && <Backdrop onClick={ closeSideDrawerHandler } /> }
            </Header>

            <Header className={ styles.main_header }>
                <h1>Share Coupons</h1>
                <NavLinks />
            </Header>

        </React.Fragment>
    );
};

export default Navigation;