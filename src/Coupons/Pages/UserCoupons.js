import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";

import LoadingSpinner from "../../Shared/UI/LoadingSpinner";
import Modal from "../../Shared/UI/Modal";
import CouponList from "../Components/CouponList";

import { useHttpClient } from "../../Hooks/useHttpHook";

const UserCoupons = () => {
    const { isLoading, error, sendRequest, clearError } = useHttpClient();

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

    const onDeleteCoupon = (deletedCouponId) => {
        setLoadedData(prevCoupons => prevCoupons.filter(coupon => coupon.id !== deletedCouponId ))
    }

    return (
        <React.Fragment>
            { isLoading && <LoadingSpinner asOverlay /> }
            { error && <Modal paraMessage={ error } onBackdropClick={ clearError } /> }
            { !isLoading && loadedData && (<CouponList items={ loadedData } onDeleteCoupon={onDeleteCoupon} showAdminButtons={true}/>) }
        </React.Fragment>
    );
};

export default UserCoupons;