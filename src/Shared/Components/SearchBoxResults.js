import React from 'react';

import { motion } from 'framer-motion';

import styles from './SearchBoxResults.module.css';

const SearchBoxResults = (props) => {

    const resultVariants = {
        initial: {
            y: -20,
            opacity: 0,
            transition: { duration: 0.5, ease: 'easeInOut' }
        },
        animate: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.5, ease: 'easeInOut' }
        }
    };

    return (
        <motion.div
            className={ styles.wrapper }
            variants={ resultVariants }
            initial="initial"
            animate="animate"
            exit="initial"
            onClick={ props.onClick }
        >
            <li>
                <h1>{ props.title }</h1>
                <p>{ props.company }</p>
            </li>
        </motion.div>
    );
};

export default SearchBoxResults;