import React, { useContext } from 'react';
import ReactDOM from "react-dom";

import { motion } from "framer-motion";

import Backdrop from "./Backdrop";

import { AuthContext } from "../Context/auth-context";

import styles from './CouponModal.module.css';

const CouponModal = (props) => {

    const auth = useContext(AuthContext);

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
                    <h1>{ props.loadedData.title }</h1>
                    <p>
                        { props.loadedData.description }
                    </p>
                    <div className={ styles.info }>
                        <p> company: </p> <p>{ props.loadedData.company }</p>
                        <p>expires-on: </p> <p>{ props.loadedData.expirationDate }</p>
                    </div>
                    {
                        !props.disableAddToCartBtn && !props.isCreatedBySameUser && auth.isLoggedIn && !props.isBoughtByUser &&
                        <motion.button
                            className={ styles.button }
                            onClick={ props.addToCart }
                            whileTap={ { scale: 0.9 } }>
                            ADD TO CART
                        </motion.button>
                    }
                    { props.isBoughtByUser && auth.isLoggedIn &&
                        <div className={ styles.info }>
                            <p> coupon code: </p> <p>{ props.loadedData.couponCode }</p>
                        </div>
                    }
                </motion.div>
                < Backdrop onClick={ props.onBackdropClick } />
            </React.Fragment >

            , document.getElementById('coupon-modal'))

    );
};

export default CouponModal;;;;