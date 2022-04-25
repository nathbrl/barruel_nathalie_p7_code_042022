const schemaPassword = require("../models/Password");

module.exports = (req, res, next) => {
  if (!schemaPassword.validate(req.body.password)) {
    const message =
      "Votre mot de passe doit comporter entre 8 et 20 caractères, dont une majuscule, une minuscule et un chiffre.";
    res.status(400).json({ message });
  } else {
    next();
  }
};