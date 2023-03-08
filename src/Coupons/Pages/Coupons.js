import React, { useEffect, useState } from 'react';

import CouponItem from "../Components/CouponItem";
import ErrorModal from "../../Shared/UI/ErrorModal";
import LoadingSpinner from "../../Shared/UI/LoadingSpinner";

import styles from "./Coupons.module.css";

import { useHttpClient } from "../../Hooks/useHttpHook";

const Coupons = () => {

    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [ loadedData, setLoadedData ] = useState();

    useEffect(() => {
        const fetchCoupons = async () => {
            try {
                const responseData = await sendRequest(
                    'http://localhost:5000/api/coupons'
                );

                setLoadedData(responseData.coupons);
            } catch(err) {}
        };
        fetchCoupons();
    }, [ sendRequest ]);

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

export default Coupons;