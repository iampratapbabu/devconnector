const express = require('express');
const postController = require('../controllers/postController');
const authController = require('../controllers/authController');

const router = express.Router();

router.route('/')
  .post(authController.protect,postController.createPost)
  .get(postController.getPosts);

router.route('/single/:postid')
  .get(postController.getSinglePost)
  .delete(authController.protect,postController.deletePost);

router.route('/like/:postid')
  .put(authController.protect,postController.likePost);

router.route('/unlike/:postid')
  .put(authController.protect,postController.unlikePost);

router.route('/comment/:postid')
  .post(authController.protect,postController.commentPost);

router.route('/comment/:postid/:commentid')
  .delete(authController.protect,postController.deleteComment);

module.exports = router;
