const express = require("express");
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");
const profileController = require("../controllers/profileController");

const router = express.Router();

router.route('/auth')
    .post(userController.createUser)
    .get(authController.protect,userController.getSingleUser);

router.route('/login')
    .post(authController.login);

router.route('/profile/me')
    .get(authController.protect,profileController.myProfile);

router.route('/profile')
    .post(authController.protect,profileController.createProfile)


router.route('/')
.get(authController.protect,userController.getAllUsers);

module.exports = router;