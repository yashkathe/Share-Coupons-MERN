const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const couponSchema = new Schema({
    title:
        { type: String, required: true },
    description:
        { type: String, required: true },
    couponCode:
        { type: String, required: true },
    company:
        { type: String },
    expirationDate:
        { type: String },
    creator:
        { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
    time:
        { type: Date, default: Date.now }
});

module.exports = mongoose.model('Coupon', couponSchema);