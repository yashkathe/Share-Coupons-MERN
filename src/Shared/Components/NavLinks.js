import React, { useContext } from 'react';
import { NavLink } from "react-router-dom";

import { AuthContext } from "../Context/auth-context";

import cartLogo from '../Icon/shopping-cart-32.png'

import styles from "./NavLinks.module.css";

const NavLinks = () => {

    const auth = useContext(AuthContext);

    return (
        <ul className={ styles.header__ul }>
            <li>
                <NavLink activeClassName={ styles.active } to="/" exact>
                    Coupons
                </NavLink>
            </li>
            { auth.isLoggedIn && (<li>
                <NavLink activeClassName={ styles.active } to="/coupon/new" exact>
                    Add Coupons
                </NavLink>
            </li>) }
            { auth.isLoggedIn && (<li>
                <NavLink activeClassName={ styles.active } to={ `/${auth.userId}/coupons` } exact>
                    My Coupons
                </NavLink>
            </li>) }
            { !auth.isLoggedIn && (<li>
                <NavLink activeClassName={ styles.active } to="/authentication/signin" exact>
                    Authentication
                </NavLink>
            </li>) }
            {
                auth.isLoggedIn && (
                    <li>
                        <img src={cartLogo} alt="cart"/>
                    </li>
                )
            }
            {
                auth.isLoggedIn && (<li>
                    <button onClick={ auth.logout } >Logout</button>
                </li>

                )
            }

        </ul>
    );
};

export default NavLinks;