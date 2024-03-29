const express = require('express');
const { check } = require('express-validator');

const couponsController = require('../controllers/coupons-controllers');
const checkAuth = require('../middleware/check-auth');

const router = express.Router();


router.get('/:couponId', couponsController.getCouponById);

router.get('/couponsBought/:userId', couponsController.getCouponsBoughtByUser);

router.get('/user/:userId', couponsController.getCouponsByUserId);

router.get('/', couponsController.getCoupons);

router.get('/:userId/cart', couponsController.getCartById);

router.get('/search/query', couponsController.searchBarQuery)

router.use(checkAuth);

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

router.post(
    '/cart',
    couponsController.addToCart);

router.delete('/:couponId', couponsController.deleteCouponById);

router.delete('/cart/:couponId', couponsController.deleteCouponFromCartById);

router.post('/cart/checkout/:userId', couponsController.checkoutCart);

module.exports = router;