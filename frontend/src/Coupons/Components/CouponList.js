import React, { useContext } from 'react';
import { Link } from "react-router-dom";

import CouponItem from "./CouponItem";
import Card from "../../Shared/UI/Card";

import { AuthContext } from "../../Shared/Context/auth-context";

import styles from './CouponList.module.css';

const CouponList = (props) => {

    const auth = useContext(AuthContext);

    if(props.items.length === 0 && !props.isCart) {
        return (
            <Card className={ styles.error_card }>
                <h2>{ props.emptyCouponsTitle }</h2>
                <div>
                    <Link to={ props.redirectLink }>{ props.redirectLinkName }</Link>
                    <button onClick={ props.onRedirect }>{props.redirectButtonName}</button>
                </div>
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
                        deleteMessage={ props.deleteMessage }
                        showEditButton={ props.showEditButton }
                        showDeleteButton={ props.showDeleteButton }
                        disableAddToCartBtn={ props.disableAddToCartBtn }
                        disableDelete={ item.boughtBy !== null && item.creator === auth.userId ? true : false }
                    />
                )) }
        </li>
    );
};

export default CouponList;