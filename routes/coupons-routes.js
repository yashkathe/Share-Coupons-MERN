const express = require('express');
const { check } = require('express-validator');

const router = express.Router();

const couponsController = require('../controllers/coupons-controllers');

router.get('/:couponId', couponsController.getCouponById);

router.get('/user/:userId', couponsController.getCouponsByUserId);

router.post(
    '/', [
    check('title')
        .not()
        .isEmpty(),
    check('description').isLength({ min: 5 }),
    check('couponCode').not().isEmpty()
],
    couponsController.createCoupon);

router.patch(
    '/:couponId', [
    check('title').not().isEmpty(),
    check('description').isLength({ min: 5 })
],
    couponsController.updateCouponById);

router.delete('/:couponId', couponsController.deleteCouponById);

module.exports = router;