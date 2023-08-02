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

const getCouponsBoughtByUser = async (req, res, next) => {
    const userId = req.params.userId;

    let user;
    try {
        user = await User.findById(userId).populate({ path: "couponsBought" });
    } catch { return next(new HttpError('Couldnt find a user with specified ID', 500)); }

    if(!user) return next(new HttpError('No such user found', 404));

    res.status(200).json({ coupons: user.couponsBought.map(coupon => coupon.toObject({ getters: true })) });
};

const getCouponById = async (req, res, next) => {
    const couponId = req.params.couponId;

    let coupon;
    try {
        coupon = await Coupon.findById(couponId).populate({ path: "creator" });
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
        // return next(new HttpError('Could not find coupons for specified User ID ', 500));
    }

    if(!coupons || coupons.length === 0) {
        // return next(new HttpError('Could not find any coupons for specified user id', 404));
    }

    res.json({ coupons: coupons.map(coupon => coupon.toObject({ getters: true })) });
};

const createCoupon = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return next(new HttpError('Invalid inputs passed', 422));
    }

    const { title, description, couponCode, company, expirationDate, creator } = req.body;

    const currentTime = new Date();
    const expirationTime = new Date(expirationDate);

    if(currentTime > expirationTime) {
        return next(new HttpError('Expiration date cannot be older than current date', 422));
    }

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

    const currentTime = new Date();
    const expirationTime = new Date(expirationDate);

    if(currentTime > expirationTime) {
        return next(new HttpError('Expiration date cannot be older than current date', 422));
    }

    const couponId = req.params.couponId;

    let coupon;
    try {
        coupon = await Coupon.findById(couponId);
    } catch(err) {
        return next(new HttpError('Could not update a coupon with specified ID', 500));
    }

    if(coupon.creator.toString() != req.userData.userId) {
        return next(new HttpError('Not allowed to edit this place', 403));
    }

    coupon.title = title;
    coupon.description = description;
    coupon.couponCode = couponCode;
    coupon.company = company;
    coupon.expirationDate = expirationDate;

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
        coupon = await Coupon.findById(couponId).populate('creator');
    } catch {
        return next(new HttpError('Could not update a coupon with specified ID', 500));
    }

    if(!coupon) {
        return next(new HttpError('Could not find a coupon with specified ID', 404));
    }

    let user;
    try {
        user = await User.findById(req.userData.userId);
    } catch {
        return next(new HttpError('Could not update a user with specified ID', 500));
    }

    if(!user) {
        return next(new HttpError('Could not find a user with specified ID', 404));
    }

    if(coupon.creator.id !== req.userData.userId) {
        return next(new HttpError('Not allowed to delete this place', 403));
    }

    try {
        const sess = await mongoose.startSession();
        sess.startTransaction();

        //delete Coupon
        await Coupon.findByIdAndDelete(couponId).session(sess);

        //delete ref value from user document who created it
        user.coupons = user.coupons.filter(
            coupon => coupon.toString() !== couponId);
        await user.save({ session: sess });

        // delete couponId ref from other user documents who have it in their cart
        let userCarts = await User.find({ cart: mongoose.Types.ObjectId(couponId) });

        for(const user of userCarts) {
            user.cart = user.cart.filter((coupon) => coupon.toString() !== couponId);
            try {
                await user.save({ session: sess });
            } catch(err) {
                sess.abortTransaction();
                return next(new HttpError('Failed to buy these coupons', 500));
            }
        }

        await sess.commitTransaction();
    } catch(err) {
        console.log(err);
        return next(new HttpError('Deleting Coupon Failed', 500));
    }

    res.status(200).json({ coupon: coupon.toObject({ getters: true }), message: "Coupon deleted successfully" });
};

const addToCart = async (req, res, next) => {

    const { couponId, userId } = req.body;

    let coupon;
    let user;

    // find user and coupon with given id
    try {
        user = await User.findById(userId);
        coupon = await Coupon.findById(couponId);
    } catch(err) {
        return next(new HttpError('Invalid or user or coupon ID', 500));
    }

    // if user and coupon dont exist
    if(!user) {
        return next(new HttpError('Could not find a user, please login again', 500));
    }
    if(!coupon) {
        return next(new HttpError('Could not find a coupon, please refresh this page', 500));
    }

    // avoid duplicates
    if(user.cart.includes(couponId)) {
        return next(new HttpError('You already have the same coupon in your cart', 500));
    }

    // add to cart 
    try {
        user.cart.push(couponId);
        await user.save();
    } catch(err) {
        console.log(err);
        return next(new HttpError('Adding to cart Failed', 500));
    }

    res.status(201).json({ coupon });

};

const getCartById = async (req, res, next) => {

    const userId = req.params.userId;

    const user = await User.findById(userId).populate({ path: "cart" });

    if(!user) return next(new HttpError('No such user found', 404));

    res.status(200).json({ cart: user.cart.map(coupon => coupon.toObject({ getters: true })) });

};

const deleteCouponFromCartById = async (req, res, next) => {

    const couponId = req.params.couponId;
    const { userId } = req.body;

    let coupon;
    let user;

    // find this user to get its cart

    try {
        user = await User.findById(userId).populate({ path: "cart" });
    } catch {}

    if(!user) return next(new HttpError('No such user found', 404));

    // delete coupon from cart

    try {
        user.cart = user.cart.filter(
            coupon => coupon._id.toString() !== couponId);
        await user.save();
    } catch {}

    res.status(200).json({ coupon: user.cart.map(coupon => coupon.toObject({ getters: true })), message: "Coupon removed from cart" });

};

const checkoutCart = async (req, res, next) => {
    const userId = req.params.userId;

    let user;
    try {
        user = await User.findById(userId).populate({ path: "cart" });
    } catch(err) { return next(new HttpError('No user with specified email id found', 404)); }

    try {
        const sess = await mongoose.startSession();
        sess.startTransaction();

        // transfer cart to couponsBought
        user.couponsBought = [ ...user.cart ];

        // empty out the cart
        user.cart = [];

        // add user ref to coupons's boughtBy
        for(const coupon of user.couponsBought) {
            if(coupon.boughtBy === null) {
                coupon.boughtBy = mongoose.Types.ObjectId(userId);
            } else {
                sess.abortTransaction();
                return next(new HttpError(`the coupon "${coupon.title}" is already bought by someone`, 500));
            }
            try {
                await coupon.save({ session: sess });
            } catch(err) {
                sess.abortTransaction();
                return next(new HttpError('Failed to buy these coupons', 500));
            }
        }

        user.save({ session: sess });

        await sess.commitTransaction();
    } catch(err) { session.abortTransaction(); }

    res.status(200).json({ user: user.cart.toObject({ getters: true }), message: "You can use these coupons now" });
};

exports.getCouponById = getCouponById;
exports.getCouponsBoughtByUser = getCouponsBoughtByUser;
exports.getCouponsByUserId = getCouponsByUserId;
exports.createCoupon = createCoupon;
exports.updateCouponById = updateCouponById;
exports.deleteCouponById = deleteCouponById;
exports.getCoupons = getCoupons;
exports.addToCart = addToCart;
exports.getCartById = getCartById;
exports.deleteCouponFromCartById = deleteCouponFromCartById;
exports.checkoutCart = checkoutCart;