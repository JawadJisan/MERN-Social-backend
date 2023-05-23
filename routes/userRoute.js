const express = require("express");

const { registerUser, loginUser, logout, info, userInfo } = require("../controllers/userController.js");

const router = express.Router();


router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(logout)
router.route("/info").put(info)
router.route("/userInfo/:id").get(userInfo)



module.exports = router