const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const couponSchema = new Schema({
    title:
        { type: String, required: true },
    description:
        { type: String, required: true },
    couponCode:
        { type: Number, required: true },
    company:
        { type: String },
    image:
        { type: String, required: true },
    expirationDate:
        { type: String },
    creator:
        { type: String, required: true }
});

module.exports = mongoose.model('Coupon', couponSchema);