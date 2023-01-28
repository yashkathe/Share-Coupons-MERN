const uuid = require('uuid').v4;
const { validationResult } = require('express-validator');

const HttpError = require('../models/http-error');

let DUMMY_COUPONS = [
    {
        id: "c4",
        title: "50% on any product",
        description: "50 % off only when purchased item worth rs $4999",
        couponCode: "12345",
        company: "Amazon",
        image: "https://play-lh.googleusercontent.com/G7jAks-PRl4d7IkL-s3Ir44nGyPq0Yh872N5UMwZYIJz4wG1Oj0DqoQjsAR5ddKZbQ",
        expirationDate: new Date("22 Aug 2023").toLocaleDateString(),
        creator: "u1"
    },
    {
        id: "c3",
        title: "50% on any product",
        description: "50 % off only when purchased item worth rs $4999",
        couponCode: "12345",
        company: "Amazon",
        image: "https://play-lh.googleusercontent.com/G7jAks-PRl4d7IkL-s3Ir44nGyPq0Yh872N5UMwZYIJz4wG1Oj0DqoQjsAR5ddKZbQ",
        expirationDate: new Date("22 Aug 2023").toLocaleDateString(),
        creator: "u1"
    }
];


const getCouponById = (req, res, next) => {
    const couponId = req.params.couponId;
    const coupons = DUMMY_COUPONS.find(c => {
        return c.id === couponId;
    });

    if(!coupons || coupons.length === 0) {
        throw new HttpError('Could not find a coupons for specified id', 404);
    }

    res.json({ coupons });
};

const getCouponsByUserId = (req, res, next) => {
    const userId = req.params.userId;
    const coupon = DUMMY_COUPONS.filter(c => {
        return c.creator === userId;
    });

    if(!coupon) {
        return next(new HttpError('Could not find a coupon for specified id', 404));
    }

    res.json(coupon);
};

const createCoupon = (req, res, next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        throw new HttpError('Invalid inputs passed', 422);
    }

    const { title, description, couponCode, company, image, expirationDate, creator } = req.body;
    const createdCoupon = {
        id: uuid(), title, description, couponCode, company, image, expirationDate, creator
    };

    DUMMY_COUPONS.push(createdCoupon);
    console.log(DUMMY_COUPONS);
    res.status(201).json({ coupon: createdCoupon });
};

const updateCouponById = (req, res, next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        throw new HttpError('Invalid inputs passed', 422);
    }
    const { title, description } = req.body;
    const couponId = req.params.couponId;

    const updatedCoupon = { ...DUMMY_COUPONS.find(c => c.id === couponId) };
    const couponIndex = DUMMY_COUPONS.findIndex(c => c.id === couponId);

    updatedCoupon.title = title;
    updatedCoupon.description = description;

    DUMMY_COUPONS[ couponIndex ] = updatedCoupon;

    res.status(200).json({ coupon: updatedCoupon });
};

const deleteCouponById = (req, res, next) => {

    const couponId = req.params.couponId;

    DUMMY_COUPONS = DUMMY_COUPONS.filter(c => c.id !== couponId);

    res.status(200).json({ message: "Coupon deleted successfully" });
};

exports.getCouponById = getCouponById;
exports.getCouponsByUserId = getCouponsByUserId;
exports.createCoupon = createCoupon;
exports.updateCouponById = updateCouponById;
exports.deleteCouponById = deleteCouponById;