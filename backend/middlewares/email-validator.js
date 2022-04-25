const checkEmail = require('email-validator');

module.exports = (req, res, next) => {
    if (!checkEmail.validate(req.body.email)) {
        const message = 'Votre adresse mail n\'a pas un format valide';
        res.status(400).json({ message });
    } else {
        next();
    }
}