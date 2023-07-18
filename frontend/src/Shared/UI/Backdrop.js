import React from 'react';
import ReactDOM from "react-dom";

import { motion } from "framer-motion";

import styles from './Backdrop.module.css';

const Backdrop = (props) => {

    const backDropVariant = {

        hidden: {
            opacity: 0
        },
        visible: {
            opacity: 1,
            transition: { duration: "0.8" }
        },
        exit: {
            opacity: 0,
            transition: { duration: "0.8" }
        }
    };

    const content =
        <motion.div
            className={ styles.backdrop }
            onClick={ props.onClick }
            variants={ backDropVariant }
            initial="hidden"
            animate="visible"
            exit="exit"
        >
            { props.children }
        </motion.div>;
    return (
        ReactDOM.createPortal(content, document.getElementById("backdrop-root"))
    );
};

export default Backdrop;