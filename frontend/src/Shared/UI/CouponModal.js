import React from 'react';
import ReactDOM from "react-dom";

import { motion } from "framer-motion";

import Backdrop from "./Backdrop";

import styles from './CouponModal.module.css';

const CouponModal = (props) => {

    const modalVariant = {
        initial: {
            y: "100vh",
            transition: {
                ease: "linear",
            }
        },
        animate: {
            y: 0,
            transition: {
                ease: "linear",
                y: { duration: 0.8 }
            }
        },
        exit: {
            y: "100vh",
            transition: {
                ease: "linear",
                y: { duration: 0.8 }
            }
        }
    };

    return (
        ReactDOM.createPortal(
            <React.Fragment>
                <motion.div
                    className={ styles.modal }
                    variants={ modalVariant }
                    initial="initial"
                    animate="animate"
                    exit="exit"
                >
                    <h1>{ props.title }</h1>
                    <p>
                        { props.description }
                    </p>
                    <div className={ styles.info }>
                        <p> company: </p> <p>{ props.company }</p>
                        <p>expires-on: </p> <p>{ props.expirationDate }</p>
                    </div>
                    {
                        !props.disableAddToCartBtn && !props.isCreatedBySameUser &&
                        <button disabled={ props.disabled } className={ styles.button } onClick={ props.addToCart }>ADD TO CART</button>
                    }
                    {
                        !props.isCreatedBySameUser &&
                        <p className={ styles.credits }> - Coupon provided by { props.creator }</p>
                    }
                </motion.div>
                < Backdrop onClick={ props.onBackdropClick } />
            </React.Fragment >

            , document.getElementById('coupon-modal'))

    );
};

export default CouponModal;;;;