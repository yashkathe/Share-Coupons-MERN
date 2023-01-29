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
        { type: mongoose.Types.ObjectId, required: true, ref: 'User' }
});

module.exports = mongoose.model('Coupon', couponSchema);