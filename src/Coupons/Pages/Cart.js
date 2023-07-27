import React, { useEffect, useContext, useState } from 'react';

import { AnimatePresence } from "framer-motion";

import LoadingSpinner from "../../Shared/UI/LoadingSpinner";
import Modal from "../../Shared/UI/Modal";
import CouponList from "../Components/CouponList";

import { AuthContext } from "../../Shared/Context/auth-context";

import { useHttpClient } from "../../Hooks/useHttpHook";

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
                console.log(responseData.cart);
                setLoadedData(responseData.cart);
            } catch(err) { console.log(err); }
        };

        fetchCartCoupons();

    }, [ sendRequest, auth.userId ]);

    return (
        <React.Fragment>
            { isLoading && <LoadingSpinner asOverlay /> }
            <AnimatePresence>
                { error && <Modal paraMessage={ error } onBackdropClick={ clearError } /> }
                { !isLoading && loadedData && (
                    <CouponList
                        items={ loadedData }
                        isCart={ true }
                        onDeleteCoupon={ removeFromCartHandler }
                        deleteMessage="Delete coupon from cart ?"
                        showDeleteButton={ true }
                        disableAddToCartBtn={ true }
                    />) }
            </AnimatePresence>
        </React.Fragment>
    );
};

export default Cart;