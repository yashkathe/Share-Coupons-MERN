const express = require('express');
const router = express.Router();

const HttpError = require('../models/http-error');

const DUMMY_COUPONS = [
    {
        id: "c4",
        title: "50% on any product",
        couponCode: "12345",
        company: "Amazon",
        image: "https://play-lh.googleusercontent.com/G7jAks-PRl4d7IkL-s3Ir44nGyPq0Yh872N5UMwZYIJz4wG1Oj0DqoQjsAR5ddKZbQ",
        expirationDate: new Date("22 Aug 2023").toLocaleDateString(),
        creator: "u1"
    }
];

router.get('/:couponId', (req, res, next) => {
    const couponId = req.params.couponId;
    const coupon = DUMMY_COUPONS.find(c => {
        return c.id === couponId;
    });

    if(!coupon) {
        throw new HttpError('Could not find a coupon for specified id', 404);
    }

    res.json({ coupon });
});

router.get('/user/:userId', (req, res, next) => {
    const userId = req.params.userId;
    const coupon = DUMMY_COUPONS.find(c => {
        return c.creator === userId;
    });

    if(!coupon) {
        return next(new HttpError('Could not find a coupon for specified id', 404));
    }

    res.json(coupon);
});

module.exports = router;