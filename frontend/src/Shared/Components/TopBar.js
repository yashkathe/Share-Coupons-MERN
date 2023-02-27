import React from 'react';

import styles from "./TopBar.module.css";

const TopBar = (props) => {
    return (
        <div className={ ` ${styles.header} ${props.className} ` }>
            { props.children }
        </div>
    );
};

export default TopBar;