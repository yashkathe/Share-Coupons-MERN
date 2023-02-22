import React from 'react';

import styles from './HamburgerIcon.module.css';

const HamburgerIcon = (props) => {
    return (
        <div onClick={ props.onClick }>
            <div className={ styles.menu }></div>
            <div className={ styles.menu }></div>
            <div className={ styles.menu }></div>
        </div>
    );
};

export default HamburgerIcon;