import React from 'react';

import CouponItem from "./CouponItem";

import styles from './CouponList.module.css';

const CouponList = (props) => {
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
                    />
                )) }
        </li>
    );
};

export default CouponList;