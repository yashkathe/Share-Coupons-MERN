import React from 'react';
import { Link } from "react-router-dom";

import CouponItem from "./CouponItem";
import Card from "../../Shared/UI/Card";

import styles from './CouponList.module.css';

const CouponList = (props) => {

    console.log(props.items.length);

    if(props.items.length === 0) {
        return (
            <Card className={ styles.error_card }>
                <h2>No Coupons found. Maybe create one?</h2>
                <Link to={"/coupon/new"}>Create Coupon</Link>
            </Card>
        );
    }

    return (
        <li className={ styles.coupon__list }>
            {
                props.items.map(item => (
                    <CouponItem
                        key={ item.id }
                        couponId={ item.id }
                        title={ item.title }
                        company={ item.company }
                        expirationDate={ item.expirationDate }
                        onDeleteCoupon={ props.onDeleteCoupon }
                        showAdminButtons={ props.showAdminButtons }
                    />
                )) }
        </li>
    );
};

export default CouponList;