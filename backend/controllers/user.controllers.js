const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
//require('dotenv').config();

const User = require('../models/user');

//Inscription de l'utilisateur
exports.signup = (req, res, next) => {
    try {
        if (req.body.password === undefined) {
            throw 'Mot de passe non défini';
        }
        bcrypt.hash(req.body.password, 10)
            .then(hash => { 
                const user = new User({
                    user_id: req.body.user_id,
                    pseudo: req.body.pseudo,
                    email: req.body.email,
                    password: hash,
                    is_admin: req.body.is_admin,
                    profile_picture: req.body.profile_picture,
                    created_at: req.body.created_at,
                    updated_at: req.body.updated_at                
                })
                user.save()
                    .then( () => res.status(201).json({ message: 'Utilisateur créé' }))
                    .catch(error => res.status(400).json({ error}))
            })
    }
    catch(error) {
        res.status(400).json({ message: error });
    }
};

//connexion de l'utilisateur
exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email})
        .then(user => {
            if(!user){
                return res.status(401).json({ error: 'Utilisateur non trouvé'});
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if(!valid){
                        return res.status(401).json({ error: 'Mot de passe incorrect'});
                    }
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                            { userId: user._id },
                            RANDOM_TOKEN_SECRET_KEY,
                            { expiresIn: '24h' }
                        )
                    });
                })
                .catch(error => res.status(500).json({ error}))
        })
        .catch(error => res.status(500).json({ error }))
};