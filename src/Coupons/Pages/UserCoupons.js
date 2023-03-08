import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";

import CouponItem from "../Components/CouponItem";
import LoadingSpinner from "../../Shared/UI/LoadingSpinner";
import ErrorModal from "../../Shared/UI/ErrorModal";

import { useHttpClient } from "../../Hooks/useHttpHook";

import styles from "./Coupons.module.css";

const UserCoupons = () => {
    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    const [ loadedData, setLoadedData ] = useState();

    const userId = useParams().userId;

    useEffect(() => {
        const fetchCoupons = async () => {
            try {
                const responseData = await sendRequest(`http://localhost:5000/api/coupons/user/${userId}`);
                setLoadedData(responseData.coupons);
            } catch(err) { console.log(err); }
        };
        fetchCoupons();
    }, [ sendRequest, userId ]);


    const viewHandler = () => {
        console.log("view");
    };

    const deleteHandler = () => {
        console.log("delete");
    };

    return (
        <React.Fragment>
            { isLoading && <LoadingSpinner asOverlay /> }
            { error && <ErrorModal errorMessage={ error } onClick={ clearError } /> }
            { !isLoading && loadedData && (
                <li className={ styles.coupon__list }>
                    {
                        loadedData.map(coupon => (
                            <CouponItem
                                data={ loadedData }
                                key={ coupon.id }
                                couponId={coupon.id}
                                title={ coupon.title }
                                company={ coupon.company }
                                expirationDate={ coupon.expirationDate }
                                onView={ viewHandler }
                                onDelete={ deleteHandler }
                            />
                        )) }
                </li>) }
        </React.Fragment>
    );
};

export default UserCoupons;