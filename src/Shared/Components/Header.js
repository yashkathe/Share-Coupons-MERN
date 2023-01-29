import React from 'react';

import styles from "./Header.module.css";
import NavLinks from "./NavLinks";

const Header = () => {
    return (
        <div className={ styles.header }>
            <h1>Share Coupons</h1>
            <NavLinks />
        </div>
    );
};

export default Header;