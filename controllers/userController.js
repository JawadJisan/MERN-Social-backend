const User = require("../models/userModels.js");
const ErrorHandler = require("../utils/errorHandler");

const catchAsyncError = require("../middleware/catchAsyncError");


// Register a User
exports.registerUser = catchAsyncError(async (req, res, next) => {
    try {
        console.log(req.body)
        const { name, email, password, image } = req.body;
        console.log(name, email, password)
        const user = await User.create({
            name,
            email,
            password,
            image
        });
        console.log(user, "register")
        res.status(200).json({ success: true, user })
    } catch (error) {
        res.status(400).json({
            status: 'failed',
            message: 'failed to register a user',
            error: error.message,
        });
    }
});


// User Info
exports.info = catchAsyncError(async (req, res, next) => {
    try {
        const { info, id } = req.body;
        const user = await User.findById(id);
        // product.comments.push(review);
        user.info.unshift(info);
        // user.info = info;
        await user.save({ validateBeforeSave: false });
        console.log(user)
        res.status(200).json({ success: true, user })
    } catch (error) {
        res.status(400).json({
            status: 'failed',
            message: 'coudnt found user info',
            error: error.message,
        });
    }
});


// User Info
exports.userInfo = catchAsyncError(async (req, res, next) => {
    const { id } = req.body;
    const user = await User.findById(req.params.id);
    res.status(200).json({ success: true, user })
});


// Login User
exports.loginUser = catchAsyncError(async (req, res, next) => {
    try {
        const { email, password } = req.body;
        // checking if user has given password and email both
        if (!email || !password) {
            return next(new ErrorHandler("Please Enter Email & Password", 400));
        }
        const user = await User.findOne({ email }).select("+password");
        console.log(user)
        console.log(user.password)
        if (!user) {
            return next(new ErrorHandler("Invalid email or password", 401));
        }
        const isPasswordMatched = await user.password === password;
        if (!isPasswordMatched) {
            return next(new ErrorHandler("Invalid email or password", 401));
        }
        res.status(200).json({ success: true, user })
    } catch (error) {
        res.status(400).json({
            status: 'failed',
            message: 'coudnt found user',
            error: error.message,
        });
    }
});

// Logout User
exports.logout = catchAsyncError(async (req, res, next) => {
    res.status(200).json({
        success: true,
        message: "Logged Out",
    });
});