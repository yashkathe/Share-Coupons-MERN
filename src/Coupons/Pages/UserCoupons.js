import React, { useEffect, useState, useContext } from 'react';
import { useParams } from "react-router-dom";

import { AnimatePresence } from "framer-motion";

import LoadingSpinner from "../../Shared/UI/LoadingSpinner";
import CouponList from "../Components/CouponList";
import Modal from "../../Shared/UI/Modal";

import { useHttpClient } from "../../Hooks/useHttpHook";

import { AuthContext } from "../../Shared/Context/auth-context";

const UserCoupons = () => {
    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    const auth = useContext(AuthContext);

    const [ loadedData, setLoadedData ] = useState();

    const userId = useParams().userId;

    useEffect(() => {
        const fetchCoupons = async () => {
            try {
                const responseData = await sendRequest(`http://localhost:5000/api/coupons/user/${userId}`);
                setLoadedData(responseData.coupons);
            } catch(err) {}
        };
        fetchCoupons();
    }, [ sendRequest, userId ]);

    const onDeleteCoupon = async (deletedCouponId) => {
        try {
            await sendRequest(`http://localhost:5000/api/coupons/${deletedCouponId}`,
                'DELETE',
                null,
                {
                    'authorization': 'Bearer ' + auth.token
                });
        } catch(err) { console.log(err); }
        setLoadedData(prevCoupons => prevCoupons.filter(coupon => coupon.id !== deletedCouponId));
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
                    onDeleteCoupon={ onDeleteCoupon }
                    deleteMessage="Do you want to proceed and delete this coupon ??"
                    showEditButton={ true }
                    showDeleteButton={ true }
                    disableAddToCartBtn={ true }
                />) }
        </React.Fragment>
    );
};

export default UserCoupons;