import React from 'react';
import ReactDOM from 'react-dom';
import Backdrop from "./Backdrop";
import Card from "./Card";

import styles from './Modal.module.css';

const Modal = (props) => {
    return (
        ReactDOM.createPortal(
            <React.Fragment>
                <Card className={ styles.modal }>
                    <h1>{ props.headerMessage || 'Error' }</h1>
                    <p>{ props.paraMessage }</p>
                    { props.showButtons && (
                        <div className={ styles.buttons }>
                            <button onClick={ props.onCancel }>CANCEL</button>
                            <button onClick={ props.onConfirm }>{ props.onConfirmMsg }</button>
                        </div>
                    ) }
                </Card>
                <Backdrop onClick={ props.onBackdropClick } />
            </React.Fragment>
            , document.getElementById("modal-root"))
    );
};

export default Modal;
