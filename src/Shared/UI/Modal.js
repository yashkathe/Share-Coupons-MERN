import React from 'react';
import ReactDOM from 'react-dom';
import Backdrop from "./Backdrop";

import { motion } from "framer-motion";

import styles from './Modal.module.css';

const Modal = (props) => {

    const modalVariants = {
        initial: {
            y: '-50vh'
        },
        animate: {
            y: '0vh',
            transition: { type: "tween" }
        },
        exit: {
            y: '-60vh'
        }
    };

    return (
        ReactDOM.createPortal(
            <React.Fragment>
                <motion.div
                    className={ styles.modal }
                    variants={ modalVariants }
                    initial="initial"
                    animate="animate"
                    exit="exit"
                >
                    <h1>{ props.headerMessage || 'Error' }</h1>
                    <p>{ props.paraMessage }</p>
                    { props.showButtons && (
                        <div className={ styles.buttons }>
                            <button onClick={ props.onCancel }>CANCEL</button>
                            <button onClick={ props.onConfirm }>{ props.onConfirmMsg }</button>
                        </div>
                    ) }
                </motion.div>
                <Backdrop onClick={ props.onBackdropClick } />
            </React.Fragment>
            , document.getElementById("modal-root"))
    );
};

export default Modal;
