import React, { useEffect, useContext, useState } from 'react';

import { AnimatePresence, motion } from "framer-motion";

import LoadingSpinner from "../../Shared/UI/LoadingSpinner";
import Modal from "../../Shared/UI/Modal";
import CouponList from "../Components/CouponList";

import { AuthContext } from "../../Shared/Context/auth-context";

import { useHttpClient } from "../../Hooks/useHttpHook";

import styles from './Cart.module.css';

const Cart = () => {

    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    const auth = useContext(AuthContext);

    const [ loadedData, setLoadedData ] = useState([]);

    const removeFromCartHandler = async (couponId) => {
        try {
            await sendRequest(
                `http://localhost:5000/api/coupons/cart/${couponId}`,
                'DELETE',
                JSON.stringify({
                    userId: auth.userId
                }),
                {
                    'Content-Type': 'application/json',
                    'authorization': 'Bearer ' + auth.token
                }
            );

            setLoadedData(prevCart => prevCart.filter(coupon => coupon.id !== couponId));

        } catch(err) { console.log(err); }
    };

    useEffect(() => {

        const fetchCartCoupons = async () => {
            try {
                const responseData = await sendRequest(
                    `http://localhost:5000/api/coupons/${auth.userId}/cart`,
                );
                setLoadedData(responseData.cart);
            } catch(err) { console.log(err); }
        };

        fetchCartCoupons();

    }, [ sendRequest, auth.userId ]);


    const checkoutCartHandler = async () => {
        try {
            await sendRequest(
                `http://localhost:5000/api/coupons/cart/checkout/${auth.userId}`,
                "POST",
                null,
                {
                    'authorization': 'Bearer ' + auth.token
                }
            );
            setLoadedData([]);
        } catch(err) {}
    };


    return (
        <React.Fragment>

            { isLoading && <LoadingSpinner asOverlay /> }

            <AnimatePresence>
                { error && <Modal paraMessage={ error } onBackdropClick={ clearError } /> }
            </AnimatePresence>

            { !isLoading && loadedData && (
                <CouponList
                    items={ loadedData }
                    onDeleteCoupon={ removeFromCartHandler }
                    deleteMessage="Delete coupon from cart ?"
                    showDeleteButton={ true }
                    disableAddToCartBtn={ true }
                    emptyCouponsTitle="No Coupons in your Cart"
                    redirectLink="/"
                    redirectLinkName="View Coupons"
                />) }

            {
                loadedData.length !== 0 &&
                <div className={ styles.checkoutBtn }>
                    <motion.button
                        onClick={ checkoutCartHandler }
                        type="button"
                        whileHover={{scale:1.1, transition:{ease:"easeInOut" , duration:0.1}}}>
                        CHECK OUT
                    </motion.button>
                </div>
            }
        </React.Fragment >
    );
};

export default Cart;