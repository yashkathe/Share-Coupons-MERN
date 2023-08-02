import React, { useEffect, useState, useContext } from 'react';
import { useParams } from "react-router-dom";

import { AnimatePresence } from "framer-motion";

import LoadingSpinner from "../../Shared/UI/LoadingSpinner";
import CouponList from "../Components/CouponList";
import Modal from "../../Shared/UI/Modal";

import { useHttpClient } from "../../Hooks/useHttpHook";

import { AuthContext } from "../../Shared/Context/auth-context";

import ToggleButtons from "../Components/ToggleButtons";

const UserCoupons = () => {
    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    const auth = useContext(AuthContext);

    const userId = useParams().userId;

    const [ loadedData, setLoadedData ] = useState();

    const [ toggleBtn, setToggleBtn ] = useState(false);

    useEffect(() => {
        const fetchCoupons = async () => {
            try {
                const responseData = await sendRequest(`http://localhost:5000/api/coupons/user/${userId}`);
                setLoadedData(responseData.coupons);
            } catch(err) {}
        };
        fetchCoupons();
    }, [ sendRequest, userId ]);


    const btn1OnClick = async () => {
        setToggleBtn(prevState => !prevState);

        try {
            const responseData = await sendRequest(`http://localhost:5000/api/coupons/couponsBought/${userId}`);
            setLoadedData(responseData.coupons);
        } catch(err) {}
    };


    const btn2OnClick = async () => {
        setToggleBtn(prevState => !prevState);
        try {
            const responseData = await sendRequest(`http://localhost:5000/api/coupons/user/${userId}`);
            setLoadedData(responseData.coupons);
        } catch(err) {}
    };

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
            <ToggleButtons
                btn1Disabled={ toggleBtn }
                btn2Disabled={ !toggleBtn }
                btn1OnClick={ btn1OnClick }
                btn2OnClick={ btn2OnClick }
            />
            <AnimatePresence>
                { error && <Modal paraMessage={ error } onBackdropClick={ clearError } /> }
                { !isLoading && loadedData && (
                    <CouponList
                        items={ loadedData }
                        onDeleteCoupon={ onDeleteCoupon }
                        deleteMessage="Do you want to proceed and delete this coupon ??"
                        showEditButton={ !toggleBtn }
                        showDeleteButton={ !toggleBtn }
                        disableAddToCartBtn={ true }
                        emptyCouponsTitle={ toggleBtn === false ? "No Coupons shared. Maybe create one?" : "No Coupons found. Maybe get one for free?" }
                        redirectLink={ toggleBtn === false ? "/coupon/new" : "/" }
                        redirectLinkName={ toggleBtn === false ? "Create Coupons" : "Get Coupons" }
                    />) }
            </AnimatePresence>
        </React.Fragment>
    );
};

export default UserCoupons;