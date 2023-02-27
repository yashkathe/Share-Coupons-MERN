import React, { useState } from 'react';
import Backdrop from "../UI/Backdrop";
import SideDrawer from "../Navigation/SideDrawer";
import HamburgerIcon from "../UI/HamburgerIcon";
import TopBar from "./TopBar";

import styles from "./Header.module.css";
import NavLinks from "./NavLinks";

const Header = () => {

    const [ showSideDrawer, setShowSideDrawer ] = useState(false);

    const closeSideDrawerHandler = () => {
        setShowSideDrawer(false);
    };

    const showSideDrawerHandler = () => {
        setShowSideDrawer(true);
    };

    return (
        <React.Fragment>

            <TopBar>
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
            </TopBar>

            <TopBar className={ styles.main_header }>
                <h1>Share Coupons</h1>
                <NavLinks />
            </TopBar>

        </React.Fragment>
    );
};

export default Header;