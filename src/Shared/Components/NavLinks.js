import React, { useContext } from 'react';

import { motion } from "framer-motion";

import { AuthContext } from "../Context/auth-context";

import FmNavLink from "./FM-NavLink";

import cartLogo from '../Icon/shopping-cart-32.png';

import styles from "./NavLinks.module.css";

const NavLinks = () => {

    const auth = useContext(AuthContext);

    return (
        <ul className={ styles.header__ul }>

            <FmNavLink title="Coupons" activeClassName={ styles.active } route="/" />

            { auth.isLoggedIn && (
                <FmNavLink title="Add Coupons" activeClassName={ styles.active } route="/coupon/new" />
            )

            }
            { auth.isLoggedIn && (
                <FmNavLink title="My Coupons" activeClassName={ styles.active } route={ `/${auth.userId}/coupons` } />

            ) }
            { !auth.isLoggedIn && (
                <FmNavLink title="Auntentication" activeClassName={ styles.active } route="/authentication/signin" />

            ) }
            {
                auth.isLoggedIn && (
                    <motion.div whileHover={ { scale: 1.2 } }>
                        <li>
                            <img src={ cartLogo } alt="cart" />
                        </li>
                    </motion.div>

                )
            }
            {
                auth.isLoggedIn && (
                    <motion.div whileHover={ { scale: 1.2 } }>

                        <li>
                            <button onClick={ auth.logout } >Logout</button>
                        </li>
                    </motion.div>

                )
            }
        </ul>
    );
};

export default NavLinks;