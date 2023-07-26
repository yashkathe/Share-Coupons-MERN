import React from 'react';
import ReactDOM from "react-dom";

import { motion } from "framer-motion";

import Backdrop from "./Backdrop";

import styles from './CouponModal.module.css';

const CouponModal = (props) => {

    const modalVariant = {
        hidden: {
            y: "100vh",
        },
        visible: {
            y: 0,
            transition: { type: "tween", duration: "0.5" }
        },
        exit: {
            y: "100vh",
            transition: { type: "tween", duration: "0.5" }
        }
    };

    return (
        ReactDOM.createPortal(
            <React.Fragment>
                <motion.div
                    className={ styles.modal }
                    variants={ modalVariant }
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                >
                    <h1>{ props.title }</h1>
                    <p>
                        { props.description }
                    </p>
                    <div className={ styles.info }>
                        <p> company: </p> <p>{ props.company }</p>
                        <p>expires-on: </p> <p>{ props.expirationDate }</p>
                    </div>
                    <button disabled={ props.disabled } className={ styles.button } onClick={ props.addToCart }>ADD TO CART</button>
                    {
                        props.isCreatedBySameUser ?
                            <p className={ styles.credits }> - This coupon is provided by you</p> :
                            <p className={ styles.credits }> - Coupon provided by { props.creator }</p>
                    }
                </motion.div>
                < Backdrop onClick={ props.onClick } />
            </React.Fragment >

            , document.getElementById('coupon-modal'))

    );
};

export default CouponModal;;;;