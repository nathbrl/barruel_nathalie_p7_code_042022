const express = require('express');
const router = express.Router();

//const postCtrl = require('../controllers/sauces');
//const auth = require('../middlewares/auth');
const multer = require('../middlewares/multer-config')

/*router.post("/", auth, multer, postCtrl.createPost);
router.put('/:id', auth, multer, postCtrl.updatePost);
router.delete('/:id', auth, postCtrl.deletePost);
router.get('/', auth, multer, postCtrl.getAllPosts);
router.post('/:id/like', auth, postCtrl.postLikes);*/

module.exports = router;