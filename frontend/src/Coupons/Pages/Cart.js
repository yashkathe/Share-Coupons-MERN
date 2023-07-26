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

    return (
        <React.Fragment>
            { isLoading && <LoadingSpinner asOverlay /> }
            <AnimatePresence>
                { error && <Modal paraMessage={ error } onBackdropClick={ clearError } /> }
            </AnimatePresence>
            { !isLoading && loadedData && (<CouponList items={ loadedData } isCart={ true } />) }
        </React.Fragment>
    );
};

export default Cart;