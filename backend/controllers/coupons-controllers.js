const uuid = require('uuid').v4;
const { validationResult } = require('express-validator');

const HttpError = require('../models/http-error');
const Coupon = require('../models/coupons');

const getCouponById = async (req, res, next) => {
    const couponId = req.params.couponId;

    let coupon;
    try {
        coupon = await Coupon.findById(couponId);
    } catch(err) {
        return next(new HttpError('Could not find a coupon with specified ID', 500));
    }

    if(!coupon || coupon.length === 0) {
        return next(new HttpError('Could not find a coupons for specified id', 404));
    }

    res.json({ coupon: coupon.toObject({ getters: true }) });
};

const getCouponsByUserId = async (req, res, next) => {
    const userId = req.params.userId;

    let coupons;
    try {
        coupons = await Coupon.find({ creator: userId });
    } catch(err) {
        return next(new HttpError('Could not find coupons for specified User ID ', 500));
    }

    if(!coupons || coupons.length === 0) {
        return next(new HttpError('Could not find a coupon for specified id', 404));
    }

    // console.log(coupons)

    res.json({ coupon: coupons.map(coupon => coupon.toObject({ getters: true })) });
};

const createCoupon = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        throw new HttpError('Invalid inputs passed', 422);
    }

    const { title, description, couponCode, company, image, expirationDate, creator } = req.body;
    const createdCoupon = new Coupon({
        title, description, couponCode, company, image, expirationDate, creator
    });

    try {
        await createdCoupon.save();
    } catch(err) {
        return next(new HttpError('Creating Coupon Failed', 500));
    }

    res.status(201).json({ coupon: createdCoupon });
};

const updateCouponById = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        throw new HttpError('Invalid inputs passed', 422);
    }
    const { title, description } = req.body;
    const couponId = req.params.couponId;

    let coupon;
    try {
        coupon = await Coupon.findById(couponId);
    } catch(err) {
        return next(new HttpError('Could not update a coupon with specified ID', 500));
    }

    coupon.title = title;
    coupon.description = description;

    try {
        await coupon.save();
    } catch {
        return next(new HttpError('Could not update a coupon with specified ID', 500));
    }

    res.status(200).json({ coupon: coupon.toObject({ getters: true }) });
};

const deleteCouponById = async (req, res, next) => {

    const couponId = req.params.couponId;

    let coupon;
    try {
        coupon = await Coupon.findByIdAndDelete(couponId);
    } catch {
        return next(new HttpError('Could not update a coupon with specified ID', 500));
    }

    res.status(200).json({ coupon: coupon.toObject({ getters: true }), message: "Coupon deleted successfully" });
};

exports.getCouponById = getCouponById;
exports.getCouponsByUserId = getCouponsByUserId;
exports.createCoupon = createCoupon;
exports.updateCouponById = updateCouponById;
exports.deleteCouponById = deleteCouponById;