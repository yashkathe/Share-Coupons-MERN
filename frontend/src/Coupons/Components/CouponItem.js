import React from 'react';
import { Link } from "react-router-dom";

import Card from "../../Shared/UI/Card";

import styles from "./CouponItem.module.css";

const CouponItem = (props) => {

    if(props.data.length === 0) {
        return (
            <Card className={ styles.card }>
                <div className={ styles.couponItem__code }>
                    <h1> No cards found !</h1>
                </div>
            </Card>
        );
    }

    return (
        <Card className={ styles.card }>
            <div className={ styles.couponItem__code }>
                <h1> { props.title } !</h1>
            </div>
            <div className={ styles.couponItem__info }>
                <div>
                    <p>FROM:</p><h4> { props.company }</h4>
                </div>
                <div>
                    <p>EXPIRES:</p><h4>   { props.expirationDate }</h4>
                </div>
            </div>
            <div className={ styles.buttons }>
                <button onClick={ props.onView } >VIEW</button>
                <Link to={`/coupon/${props.couponId}`}>EDIT</Link>
                <button onClick={ props.onDelete }>DELETE</button>
            </div>
        </Card>
    );
};

export default CouponItem;