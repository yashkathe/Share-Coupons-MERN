import React from 'react';
// import { useHttpClient } from "../../Hooks/useHttpHook";

import Card from "../../Shared/UI/Card";
import AddCouponForm from "../Components/AddCouponForm";

import styles from './AddCoupons.module.css';

const AddCoupons = () => {

    // const { isLoading, error, sendRequest, clearError} = useHttpClient()


    const createCoupon = ( newCoupon ) => {
        console.log(newCoupon)
    }

    return (
        <Card className={ styles.card }>
            <AddCouponForm onCreateCoupon={ createCoupon } />
        </Card>
    );
};

export default AddCoupons;