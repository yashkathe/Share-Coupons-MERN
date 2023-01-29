import React from 'react';

import { NavLink } from "react-router-dom";

import styles from "./NavLinks.module.css"

const NavLinks = () => {
    return (
        <ul className={styles.header__ul}>
            <li>
                <NavLink  activeClassName={styles.active} to="/" exact>
                    Coupons
                </NavLink>
            </li>
            <li>
                <NavLink  activeClassName={styles.active} to="/users" exact>
                    Users
                </NavLink>
            </li>
            <li>
                <NavLink  activeClassName={styles.active} to="/coupon/new" exact>
                    Add Coupons
                </NavLink>
            </li>
            <li>
                <NavLink activeClassName={styles.active} to="/authentication/signin" exact>
                    Authentication
                </NavLink>
            </li>

        </ul>
    );
};

export default NavLinks;