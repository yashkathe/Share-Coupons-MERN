import React from 'react';
import ReactDOM from "react-dom";

import styles from './SideDrawer.module.css';

const SideDrawer = (props) => {

    const content = <div className={ styles.sideDrawer } onClick={ props.onClick }>{ props.children }</div>;

    return (
        ReactDOM.createPortal(content, document.getElementById('sidedrawer-root'))
    );
};

export default SideDrawer;