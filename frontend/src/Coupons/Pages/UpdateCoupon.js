import React, { useEffect, useState, useContext } from 'react';
import { useParams, useHistory } from "react-router-dom";

import { AnimatePresence } from "framer-motion";

import LoadingSpinner from "../../Shared/UI/LoadingSpinner";
import ErrorModal from "../../Shared/UI/Modal";
import FormLabel from "../../Shared/Components/FormLabel";

import { useHttpClient } from "../../Hooks/useHttpHook";
import { AuthContext } from "../../Shared/Context/auth-context";

import styles from './UpdateCoupon.module.css';
import Card from "../../Shared/UI/Card";

const UpdateCoupon = () => {
    const [ coupon, setCoupon ] = useState();

    const auth = useContext(AuthContext);

    const titleChangeHandler = (event) => {
        setCoupon({
            ...coupon, title: event.target.value
        });
    };

    const descriptionChangeHandler = (event) => {
        setCoupon({
            ...coupon, description: event.target.value
        });
    };

    const couponChangeHandler = (event) => {
        setCoupon({
            ...coupon, couponCode: event.target.value
        });
    };

    const companyChangeHandler = (event) => {
        setCoupon({
            ...coupon, company: event.target.value
        });
    };

    const dateChangeHandler = (event) => {
        setCoupon({
            ...coupon, expirationDate: event.target.value
        });
    };

    const [ data, setLoadedData ] = useState();

    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    const couponId = useParams().couponId;
    const userId = auth.userId;
    const history = useHistory();

    useEffect(() => {
        const fetchCoupon = async () => {
            try {
                const responseData = await sendRequest(`http://localhost:5000/api/coupons/${couponId}`);
                setCoupon(responseData.coupon);
                setLoadedData(responseData.coupon);
            } catch(err) { console.log(err); }
        };
        fetchCoupon();
    }, [ sendRequest, couponId ]);

    const updateCouponHandler = async (event) => {
        event.preventDefault();
        try {
            await sendRequest(
                `http://localhost:5000/api/coupons/${couponId}`,
                'PATCH',
                JSON.stringify(coupon),
                {
                    'Content-Type': 'application/json',
                    'authorization': 'Bearer ' + auth.token
                }
            );
            history.push(`/${userId}/coupons`);
        } catch(err) {
            console.log(err);
        }
    };

    return (
        <React.Fragment>
            { isLoading && <LoadingSpinner asOverlay /> }
            <AnimatePresence>
                { error && <ErrorModal paraMessage={ error } onBackdropClick={ clearError } /> }
            </AnimatePresence>
            { !isLoading && data && (
                <Card className={ styles.card }>
                    <form onSubmit={ updateCouponHandler }>
                        <FormLabel label="Title" type="text" changeHandler={ titleChangeHandler } value={ coupon.title } required={ true } />
                        <FormLabel label="Description" type="text" changeHandler={ descriptionChangeHandler } value={ coupon.description } minLength="5" />
                        <FormLabel label="coupon Code" type="text" changeHandler={ couponChangeHandler } value={ coupon.couponCode } required={ true } />
                        <FormLabel label="Company" type="text" changeHandler={ companyChangeHandler } value={ coupon.company } required={ true } />
                        <FormLabel label="Expiration Date" type="date" changeHandler={ dateChangeHandler } value={ coupon.expirationDate } />
                        <div className={ styles.form_element }>
                            <button type="submit" >UPDATE COUPON</button>
                        </div>
                    </form>
                </Card>
            ) }
        </React.Fragment>
    );
};

export default UpdateCoupon;