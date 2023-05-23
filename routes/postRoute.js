const express = require("express");
const { createPost, getAllPosts, addLike, postComment, getMyPosts, postDelete, updatePost } = require("../controllers/postController.js");

const router = express.Router();

router.route("/new-post").post(createPost);
router.route("/posts").get(getAllPosts);
// router.route("/getMyPosts").get(getMyPosts);
router.route("/getMyPosts/:id").get(getMyPosts);


router.route("/addLike").put(addLike);
router.route("/newComment").put(postComment);
router.route("/deletePost/:id").delete(postDelete);
router.route("/updatePost/:id").put(updatePost);


module.exports = router

/* 
const express = require("express");
const { registerUser, loginUser, logout } = require("../controllers/userController.js");
const router = express.Router();
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(logout)
module.exports = router
*/