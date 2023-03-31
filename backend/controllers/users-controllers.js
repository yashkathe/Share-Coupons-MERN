const uuid = require('uuid').v4;
const { validationResult } = require('express-validator');

const HttpError = require('../models/http-error');
const User = require('../models/users');


const getUsers = async (req, res, next) => {

    let users;
    try {
        users = await User.find({}, '-password');
    } catch(err) {
        return next(new HttpError('Failed to retrieve users', 500));
    }

    res.status(200).json({ users: users.map(user => user.toObject({ getters: true })) });
};

const signup = async (req, res, next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return next(new HttpError('Invalid inputs passed', 500));
    }
    const { email, password } = req.body;

    let existingUser;
    try {
        existingUser = await User.findOne({ email: email });
    } catch(err) {
        return next(new HttpError('Signing Up failed', 500));
    }

    if(existingUser) {
        return next(new HttpError('User exists already', 422));
    }

    const createdUser = new User({
        email,
        password,
        image: req.file.path,
        coupons: []
    });

    try {
        await createdUser.save();
    } catch(err) {
        console.log(err);
        return next(new HttpError('Creating new user failed', 500));
    }

    res.status(201).json({ user: createdUser.toObject({ getters: true }) });
};

const login = async (req, res, next) => {
    const { email, password } = req.body;

    let existingUser;
    try {
        existingUser = await User.findOne({ email: email });
    } catch(err) {
        return next(new HttpError('Logging in failed', 500));
    }

    if(!existingUser || existingUser.password !== password) {
        return next(new HttpError('Invalid Credentials', 401));
    }

    res.status(200).json({ message: "Logged In", user: existingUser.toObject({ getters: true }) });
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;