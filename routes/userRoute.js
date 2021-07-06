const express = require("express");
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");

const router = express.Router();

router.route('/auth')
    .post(userController.createUser)
    .get(authController.protect,userController.getSingleUser);


router.route('/')
.get(authController.protect,userController.getAllUsers);

module.exports = router;