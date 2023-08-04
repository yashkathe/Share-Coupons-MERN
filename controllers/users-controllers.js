const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
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
    const { email, password, confirmPassword } = req.body;

    if(password !== confirmPassword){
        return next(new HttpError('Passwords do not match', 422))
    }

    let existingUser;
    try {
        existingUser = await User.findOne({ email: email });
    } catch(err) {
        return next(new HttpError('Signing Up failed', 500));
    }

    if(existingUser) {
        return next(new HttpError('User exists already', 422));
    }

    let hashedPassword;
    try {
        hashedPassword = await bcrypt.hash(password, 12);
    } catch(err) {
        return next(new HttpError('Could not create user, please try again', 500));
    }

    const createdUser = new User({
        email,
        password: hashedPassword,
        image: req.file.path,
        coupons: []
    });

    try {
        await createdUser.save();
    } catch(err) {
        console.log(err);
        return next(new HttpError('Creating new user failed', 500));
    }

    let token;
    try {
        token = jwt.sign({
            userId: createdUser.id,
            email: createdUser.email
        },
            process.env.JWT_KEY,
            { expiresIn: '1h' }
        );
    } catch(err) {
        return next(new HttpError('Signing Up failed', 500));
    }

    res.status(201)
        .json({ userId: createdUser.id, email: createdUser.email, token: token });
};

const login = async (req, res, next) => {
    const { email, password } = req.body;

    let existingUser;
    try {
        existingUser = await User.findOne({ email: email });
    } catch(err) {
        return next(new HttpError('Logging in failed', 500));
    }

    if(!existingUser) {
        return next(new HttpError('The following Email-ID is not registered', 401));
    }

    let isValidPassword = false;
    try {
        isValidPassword = await bcrypt.compare(password, existingUser.password);
    } catch(err) {
        return next(new HttpError('Could not log you in, please check your credentials and try again', 500));
    }

    if(!isValidPassword) {
        return next(new HttpError('Invalid Password', 401));
    }

    let token;
    try {
        token = jwt.sign({
            userId: existingUser.id,
            email: existingUser.email
        },
            process.env.JWT_KEY,
            { expiresIn: '1h' }
        );
    } catch(err) {
        return next(new HttpError('Loggin in failed', 500));
    }

    res.status(200)
        .json({
            userId: existingUser.id,
            email: existingUser.email,
            token: token
        });
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;