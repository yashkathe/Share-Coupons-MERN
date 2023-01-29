const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name:
        { type: String, required: true },
    email:
        { type: String, required: true, unique: true },
    password:
        { type: String, required: true, minlength: 5 },
    image:
        { type: String, required: true },
    coupons:
        [ { type: mongoose.Types.ObjectId, required: true, ref: 'Coupon' } ]
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);