import React, { useEffect, useState, useContext } from 'react';

import { AnimatePresence } from "framer-motion";

import ErrorModal from "../../Shared/UI/Modal";
import LoadingSpinner from "../../Shared/UI/LoadingSpinner";
import CouponList from "../Components/CouponList";

import { AuthContext } from "../../Shared/Context/auth-context";

import { useHttpClient } from "../../Hooks/useHttpHook";

const Coupons = () => {

    const auth = useContext(AuthContext);

    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [ loadedData, setLoadedData ] = useState();

    useEffect(() => {
        const fetchCoupons = async () => {
            try {
                const responseData = await sendRequest(
                    'http://localhost:5000/api/coupons'
                );

                setLoadedData(responseData.coupons.filter(coupon => coupon.creator.toString() !== auth.userId));
            } catch(err) {}
        };
        fetchCoupons();
    }, [ sendRequest, auth ]);

    return (
        <React.Fragment>
            { isLoading && <LoadingSpinner asOverlay /> }
            <AnimatePresence>
                { error && <ErrorModal paraMessage={ error } onBackdropClick={ clearError } /> }
            </AnimatePresence>
            { !isLoading && loadedData && (
                <CouponList
                    items={ loadedData } 
                    emptyCouponsTitle="No Coupons found"
                    redirectLink="/coupon/new"
                    redirectLinkName="Maybe create one"
                    />) }
        </React.Fragment>
    );
};

export default Coupons;