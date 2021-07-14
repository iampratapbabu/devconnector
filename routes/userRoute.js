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
    .get(profileController.getAllProfiles);

router.route('/profile/user/:userid')
    .get(profileController.getUserProfile);

router.route('/profile/experience')
    .put(authController.protect,profileController.profileExperience);

router.route('/profile/education')
    .put(authController.protect,profileController.profileEducation);


router.route('/')
    .get(authController.protect,userController.getAllUsers)
    .delete(authController.protect,userController.deleteUser)


module.exports = router;