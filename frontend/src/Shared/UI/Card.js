import React from 'react';

import { motion } from "framer-motion";

import styles from './Card.module.css';

const Card = (props) => {
    return (
        <motion.div
            className={ `${styles.card} ${props.className}` }
            variants={props.variants}
            initial={props.initial}
            animate={props.animate}
            exit={props.exit}
            >
            { props.children }
        </motion.div>
    );
};

export default Card;