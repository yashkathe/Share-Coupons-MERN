import React from 'react';

import Card from "../../Shared/UI/Card";

import styles from "./CouponItem.module.css";

const CouponItem = (props) => {
    return (
        <Card className={ styles.card }>
            <div className={ styles.couponItem__code }>
                <h1> { props.title } !</h1>
                <h3>{ props.couponCode }</h3>
            </div>
            <div className={ styles.couponItem__info }>
                <div>
                    <p>FROM:</p><h4> { props.company }</h4>
                </div>
                <div>
                    <p>EXPIRES:</p><h4>   { props.expirationDate }</h4>
                </div>
            </div>
        </Card>
    );
};

export default CouponItem;