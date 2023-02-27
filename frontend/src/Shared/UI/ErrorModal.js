import React from 'react';
import ReactDOM from 'react-dom';
import Backdrop from "./Backdrop";
import Card from "./Card";

import styles from './ErrorModal.module.css';

const ErrorModal = (props) => {
    return (
        ReactDOM.createPortal(
            <React.Fragment>
                <Card className={ styles.modal }>
                    <h1>Error !</h1>
                    <p>{ props.errorMessage }</p>
                </Card>
                <Backdrop onClick={props.onClick} />
            </React.Fragment>
            , document.getElementById("errorModal-root"))
    );
};

export default ErrorModal;
