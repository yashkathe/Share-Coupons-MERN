const { validationResult } = require('express-validator');
const mongoose = require('mongoose');

const HttpError = require('../models/http-error');
const Coupon = require('../models/coupons');
const User = require('../models/users');

const getCoupons = async (req, res, next) => {

    let coupons;
    try {
        coupons = await Coupon.find({});
    } catch(err) {
        return next(new HttpError('Failed to retrive coupons', 500));
    }

    res.status(200).json({ coupons: coupons.map(coupon => coupon.toObject({ getters: true })) });
};

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
        return next(new HttpError('Could not find any coupons for specified user id', 404));
    }

    res.json({ coupons: coupons.map(coupon => coupon.toObject({ getters: true })) });
};

const createCoupon = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return next(new HttpError('Invalid inputs passed', 422));
    }

    const { title, description, couponCode, company, expirationDate, creator } = req.body;
    const createdCoupon = new Coupon({
        title,
        description,
        couponCode,
        company,
        expirationDate,
        creator
    });

    // check if if of logged in user is existing already
    let user;

    try {
        user = await User.findById(creator);
    } catch(err) {
        return next(new HttpError('Creating Coupon Failed', 500));
    }

    if(!user) {
        return next(new HttpError('Could not find user for provided ID', 404));
    }

    try {

        const sess = await mongoose.startSession();
        sess.startTransaction();
        await createdCoupon.save({ session: sess });
        user.coupons.push(createdCoupon);
        await user.save({ session: sess });
        await sess.commitTransaction();

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
    const { title, description, couponCode, company, expirationDate } = req.body;
    const couponId = req.params.couponId;

    let coupon;
    try {
        coupon = await Coupon.findById(couponId);
    } catch(err) {
        return next(new HttpError('Could not update a coupon with specified ID', 500));
    }

    coupon.title = title;
    coupon.description = description;
    coupon.couponCode = couponCode
    coupon.company = company
    coupon.expirationDate = expirationDate

    try {
        await coupon.save();
    } catch(err) {
        return next(new HttpError('Could not update a coupon with specified ID', 500));
    }

    res.status(200).json({ coupon: coupon.toObject({ getters: true }) });
};

const deleteCouponById = async (req, res, next) => {

    const couponId = req.params.couponId;

    let coupon;
    try {
        coupon = await Coupon.findByIdAndDelete(couponId).populate('creator');
    } catch {
        return next(new HttpError('Could not update a coupon with specified ID', 500));
    }

    if(!coupon) {
        return next(new HttpError('Could not find a coupon with specified ID', 404));
    }

    res.status(200).json({ coupon: coupon.toObject({ getters: true }), message: "Coupon deleted successfully" });
};

exports.getCouponById = getCouponById;
exports.getCouponsByUserId = getCouponsByUserId;
exports.createCoupon = createCoupon;
exports.updateCouponById = updateCouponById;
exports.deleteCouponById = deleteCouponById;
exports.getCoupons = getCoupons;