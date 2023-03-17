import React from 'react';
import { Link } from "react-router-dom";

import Card from "../../Shared/UI/Card";

import styles from "./CouponItem.module.css";

const CouponItem = (props) => {

    const deleteHandler = () => {
        console.log('delete')
    }

    return (
        <React.Fragment>
            <Card className={ styles.card }>
                <div className={ styles.couponItem__code }>
                    <h1> { props.title } !</h1>
                </div>
                <div className={ styles.couponItem__info }>
                    <p>FROM:</p><h4> { props.company }</h4>
                    <p>EXPIRES:</p><h4>   { props.expirationDate }</h4>
                </div>
                <div className={ styles.buttons }>
                    <button onClick={ props.onView } >VIEW</button>
                    <Link to={ `/coupon/${props.couponId}` }>EDIT</Link>
                    <button onClick={ deleteHandler }>DELETE</button>
                </div>
            </Card>
        </React.Fragment>
    );
};

export default CouponItem;