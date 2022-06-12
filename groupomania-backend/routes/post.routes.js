const express = require('express');
const router = express.Router();
const postCtrl = require('../controllers/post.controllers');
const auth = require('../middlewares/auth.middlewares');
const multer = require('../middlewares/multer-config')


router.get('/', auth, multer, postCtrl.getAllPosts);
router.post("/:id", auth, multer, postCtrl.createPost);
/*router.put('/:id', auth, multer, postCtrl.updatePost);
router.delete('/:id', auth, postCtrl.deletePost);
router.post('/:id/like', auth, postCtrl.postLikes);*/

module.exports = router;