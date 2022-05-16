const express = require('express');
const router = express.Router();
const userCrtl = require('../controllers/user.controllers');
const checkEmail = require('../middlewares/email-validator');
const limiter = require('../middlewares/limiter');
const checkPassword = require('../middlewares/password-validator');

router.post('/signup', checkPassword, checkEmail, userCrtl.signup);
router.post('/login', limiter, userCrtl.login);
router.get('/', userCrtl.getUsers);
router.delete('/:id', userCrtl.deleteUser);
router.put('/:id', userCrtl.updateUser);

module.exports = router;