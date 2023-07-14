import React from 'react';
import ReactDOM from "react-dom";

import Backdrop from "./Backdrop";

import styles from './CouponModal.module.css';

const CouponModal = (props) => {

    return (
        ReactDOM.createPortal(
            <React.Fragment>
                <div className={ styles.modal }>
                    <h1>{ props.title }</h1>
                    <p>
                        { props.description }
                    </p>
                    <div className={ styles.info }>
                        <p> company: </p> <p>{ props.company }</p>
                        <p>expires-on: </p> <p>{ props.expirationDate }</p>
                    </div>
                    <button className={ styles.button } onClick={ props.addToCart }>ADD TO CART</button>
                    <p className={ styles.credits }> - Coupon provided by {props.creator}</p>
                </div>
                < Backdrop onClick={ props.onClick } />
            </React.Fragment>
            , document.getElementById('coupon-modal'))

    );
};

export default CouponModal;