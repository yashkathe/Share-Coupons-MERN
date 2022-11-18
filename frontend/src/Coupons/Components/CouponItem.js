import React from 'react';

import Card from "../../Shared/UI/Card";

import "./CouponItem.css";

const CouponItem = (props) => {
    return (
        <Card className="card">
            <div className="couponItem__code">
                <h1> { props.title } !</h1>
                <h3>{ props.couponCode }</h3>
            </div>
            <div className="couponItem__info">
                <div className="info__div" >
                    <p>FROM:</p><h4> { props.company }</h4>
                </div>
                <div className="info__div">
                    <p>EXPIRES:</p><h4>   { props.expirationDate }</h4>
                </div>
            </div>
        </Card>
    );
};

export default CouponItem;