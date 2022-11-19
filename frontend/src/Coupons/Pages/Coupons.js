import React from 'react';

import CouponItem from "../Components/CouponItem";

import styles from "./Coupons.module.css";

const DUMMY_COUPONS = [ {
    id: "c1",
    title: "50% on any product",
    couponCode: "12345",
    company: "Amazon",
    image: "https://play-lh.googleusercontent.com/G7jAks-PRl4d7IkL-s3Ir44nGyPq0Yh872N5UMwZYIJz4wG1Oj0DqoQjsAR5ddKZbQ",
    expirationDate: new Date("22 Aug 2023").toLocaleDateString()
},
{
    id: "c2",
    title: "50% on any product",
    couponCode: "12345",
    company: "Amazon",
    image: "https://play-lh.googleusercontent.com/G7jAks-PRl4d7IkL-s3Ir44nGyPq0Yh872N5UMwZYIJz4wG1Oj0DqoQjsAR5ddKZbQ",
    expirationDate: new Date("22 Aug 2023").toLocaleDateString()
},
{
    id: "c3",
    title: "50% on any product",
    couponCode: "12345",
    company: "Amazon",
    image: "https://play-lh.googleusercontent.com/G7jAks-PRl4d7IkL-s3Ir44nGyPq0Yh872N5UMwZYIJz4wG1Oj0DqoQjsAR5ddKZbQ",
    expirationDate: new Date("22 Aug 2023").toLocaleDateString()
},
{
    id: "c4",
    title: "50% on any product",
    couponCode: "12345",
    company: "Amazon",
    image: "https://play-lh.googleusercontent.com/G7jAks-PRl4d7IkL-s3Ir44nGyPq0Yh872N5UMwZYIJz4wG1Oj0DqoQjsAR5ddKZbQ",
    expirationDate: new Date("22 Aug 2023").toLocaleDateString()
}
];

const Coupons = () => {
    return (
        <li className={ styles.coupon__list }>
            {
                DUMMY_COUPONS.map(coupon => (
                    <CouponItem
                        key={ coupon.id }
                        image={ coupon.image }
                        alt={ coupon.company }
                        couponCode={ coupon.couponCode }
                        title={ coupon.title }
                        company={ coupon.company }
                        expirationDate={ coupon.expirationDate }
                    />
                ))

            }
        </li>
    );
};

export default Coupons;