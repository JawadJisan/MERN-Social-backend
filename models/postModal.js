const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, "Enter a post or Status Title"],
    },
    description: {
        type: String,
        required: [true, "Please Enter post Description"],
    },
    likes: {
        type: Number,
        default: 0,
    },
    image: {
        type: String,
        required: [true, "Please Upload User Image "],
    },
    comments: [
        {
            user: {
                type: mongoose.Schema.ObjectId,
                ref: "User",
                required: true,
            },
            name: {
                type: String,
                required: true,
            },
            comment: {
                type: String,
                required: true,
            },
        },
    ],
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: [true, "user info"],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Post", postSchema);