const express = require('express');
const router = express.Router();
const postCtrl = require('../controllers/post.controllers');
const commentsCtrl = require('../controllers/comments.controllers');
const auth = require('../middlewares/auth.middlewares');
const multer = require('../middlewares/multer-config');

/** POSTS */
router.get('/', auth, multer, postCtrl.getAllPosts);
router.post("/:id", auth, multer, postCtrl.createPost);
router.put('/:id', auth, multer, postCtrl.updatePost);
router.delete('/:id', auth, postCtrl.deletePost);

/** COMMENTS */
router.get('/:id/comments', auth, commentsCtrl.getAllComments);
router.post('/:id/comments', auth, commentsCtrl.createComment);
router.delete('/:id/comments/:id', auth, commentsCtrl.deleteComment);

module.exports = router;