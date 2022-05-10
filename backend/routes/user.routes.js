const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth.middlewares');
const userCrtl = require('../controllers/user.controllers');
const checkEmail = require('../middlewares/email-validator');
const limiter = require('../middlewares/limiter');
const checkPassword = require('../middlewares/password-validator');

router.post('/signup', checkPassword, checkEmail, userCrtl.signup);
router.get('/', userCrtl.getUsers);
//router.post('/login', auth, limiter, userCrtl.login);
router.delete('/:id', userCrtl.deleteUser);
router.put('/:id', userCrtl.updateUser);

module.exports = router;