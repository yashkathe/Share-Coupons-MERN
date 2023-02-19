import React from 'react';

import Card from "../../Shared/UI/Card";
import AddCouponForm from "../Components/AddCouponForm";

import styles from './AddCoupons.module.css';

const AddCoupons = () => {

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