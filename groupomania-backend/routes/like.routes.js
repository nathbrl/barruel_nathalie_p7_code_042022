const express = require('express');
const router = express.Router();
const likeCtrl = require('../controllers/like.controllers');
const auth = require('../middlewares/auth.middlewares');

router.post(('/post/:id/like', auth));

module.exports = router;