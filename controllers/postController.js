const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");

const Post = require("../models/postModal.js");

// create post
exports.createPost = catchAsyncError(async (req, res, next) => {
    try {
        const { title, description, image, user } = req.body;
        console.log(req.body)
        const post = await Post.create({
            title,
            description,
            image,
            user: user._id,
        });
        res.status(200).json({ success: true, post })
    } catch (error) {
        res.status(400).json({
            status: 'failed',
            message: 'post cant create',
            error: error.message,
        });
    }
});

// get all posts
exports.getAllPosts = catchAsyncError(async (req, res, next) => {
    const posts = await Post.find()
    res.status(200).json({ success: true, posts })

});

// delete single post
exports.postDelete = catchAsyncError(async (req, res, next) => {
    try {
        const posts = await Post.findByIdAndDelete(req.params.id)
        res.status(200).json({ success: true })
    } catch (error) {
        res.status(400).json({
            status: 'failed',
            message: 'coudnt delete the post',
            error: error.message,
        });
    }
});

// add Like to product
exports.addLike = catchAsyncError(async (req, res, next) => {
    try {
        const { productId, type } = req.body;
        const product = await Post.findById(productId);
        if (type === "like") {
            product.likes += 1;
        }
        if (type === "disLike") {
            product.likes -= 1;
        }
        // const result = await product.set(req.body).save();
        await product.save({ validateBeforeSave: false });
        res.status(200).json({
            success: true,
        });
    } catch (error) {
        res.status(400).json({
            status: 'failed',
            message: 'something went wrong to adding like',
            error: error.message,
        });
    }
});

// postComment
exports.postComment = catchAsyncError(async (req, res, next) => {
    try {
        const { comment, productId, user } = req.body;
        const review = {
            user: user._id,
            name: user.name,
            comment,
        };
        const product = await Post.findById(productId);
        const isReviewed = product.comments.find(
            (rev) => rev.user.toString() === user._id.toString()
        );
        if (isReviewed) {
            product.comments.forEach((rev) => {
                if (rev.user.toString() === user._id.toString())
                    (rev.comment = comment);
            });
        } else {
            product.comments.push(review);
        }
        await product.save({ validateBeforeSave: false });
        res.status(200).json({
            success: true,
        });
    } catch (error) {
        res.status(400).json({
            status: 'failed',
            message: 'something went wrong to comment on this post',
            error: error.message,
        });
    }
});

// update post title description image
exports.updatePost = catchAsyncError(async (req, res, next) => {
    try {
        const { title, description, image, id } = req.body;
        const post = await Post.findById(id);
        post.title = title;
        post.description = description;
        post.image = image;

        await post.save({ validateBeforeSave: false });
        res.status(200).json({
            success: true,
        });
    } catch (error) {
        res.status(400).json({
            status: 'failed',
            message: 'coudnt update the post',
            error: error.message,
        });
    }
});

exports.getMyPosts = catchAsyncError(async (req, res, next) => {
    try {
        const { userId } = req.body;

        // const posts = await Post.find({ user: userId })
        const posts = await Post.find({ user: req.params.id })
        res.status(200).json({
            success: true,
            posts,
        });
    } catch (error) {
        res.status(400).json({
            status: 'failed',
            message: 'coudnt find any post',
            error: error.message,
        });
    }
});
