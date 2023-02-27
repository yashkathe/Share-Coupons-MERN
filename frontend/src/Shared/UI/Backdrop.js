import React from 'react';
import ReactDOM from "react-dom";

import styles from './Backdrop.module.css';

const Backdrop = (props) => {
    const content = <div className={ styles.backdrop } onClick={ props.onClick }>{ props.children }</div>;
    return (
        ReactDOM.createPortal(content, document.getElementById("backdrop-root"))
    );
};

export default Backdrop;