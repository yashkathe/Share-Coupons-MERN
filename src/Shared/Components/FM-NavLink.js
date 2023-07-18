import React from 'react';
import { NavLink } from "react-router-dom";

import { motion } from "framer-motion";

const FmNavLink = (props) => {
    return (
        <motion.div whileHover={ { scale: 1.2 } }>
            <li>
                <NavLink activeClassName={ props.activeClassName } to={props.route} exact>
                    {props.title}
                </NavLink>
            </li>
        </motion.div>
    );
};

export default FmNavLink;