const express = require('express');
const router = express.Router();
const postCtrl = require('../controllers/post.controllers');
const auth = require('../middlewares/auth.middlewares');
const multer = require('../middlewares/multer-config');

/** POSTS */
router.get('/', auth, multer, postCtrl.getAllPosts);
router.get('/:id', auth, postCtrl.checkUpdatePost);
router.post("/", auth, multer, postCtrl.createPost);
router.put('/:id', auth, multer, postCtrl.updatePost);
router.delete('/:id', auth, postCtrl.deletePost);

/* LIKES*/
router.post('/:id/like', auth, postCtrl.likePost);

module.exports = router;