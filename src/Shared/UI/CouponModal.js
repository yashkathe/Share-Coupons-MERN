import React from 'react';
import ReactDOM from "react-dom";

import Backdrop from "./Backdrop";

import styles from './CouponModal.module.css';

const CouponModal = (props) => {

    return (
        ReactDOM.createPortal(
            <React.Fragment>
                <div className={ styles.modal }>
                    <h1>50% off on Jack and Jones</h1>
                    <p>
                        on shopping of above rs999
                    </p>
                    <div className={styles.info}>
                        <p> company: </p> <p>Jack and Jones</p>
                        <p>expires-on: </p> <p>{"5/05/2024"}</p>
                    </div>
                    <div className={styles.info}>
                        
                    </div>
                    <button className={ styles.button } onClick={ props.addToCart }>ADD TO CART</button>
                    <p className={ styles.credits }> - Coupon provided by Yash Kathe</p>
                </div>
                < Backdrop onClick={ props.onClick } />
            </React.Fragment>
            , document.getElementById('coupon-modal'))

    );
};

export default CouponModal;