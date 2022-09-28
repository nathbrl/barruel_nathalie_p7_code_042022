const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const queries = require('../queries');
const pool = require('../config/db');
const { json } = require('express');

/**
 * CREATE A USER
*/
async function createUser(user, res) {
    //Check if email already exists
    const checkEmail = await pool.query(queries.checkExistingEmailQuery, [user.email]);
    if (checkEmail.rowCount === 0) {
        await pool.query(queries.createUserQuery, [user.pseudo, user.email, user.password, user.is_admin, user.created_at, user.updated_at]);
        res.status(201).send({ message: 'Nouvel utilisateur crée' });
    } else {
        res.status(400).send({ message: 'Cet utilisateur existe déjà' });
    }
}

/**
 * USER SIGNUP
*/
exports.signup = async (req, res) => {
    try {
        const pseudo = req.body.pseudo;
        const checkPseudo = await pool.query(queries.checkExistingPseudo, [pseudo]);
        if (req.body.password === undefined || req.body.password == '') {
            return res.status(400).json({ message: 'Mot de passe non défini' });
        };
        if (req.body.pseudo === undefined || req.body.pseudo == '') {
            return res.status(400).json({ message: 'Renseignez un pseudo afin de créer votre compte' });
        };
        if (pseudo === checkPseudo.rows) {
            return res.status(400).json({ message: 'Ce pseudo existe déjà, veuillez en choisir un autre' });
        };
        const passwordHashed = await bcrypt.hash(req.body.password, 10)
        createUser({
            pseudo: pseudo,
            email: req.body.email,
            password: passwordHashed,
            is_admin: false,
            created_at: new Date(),
            updated_at: null,
        }, res);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: error });
    }
}

/**
 * USER LOG IN
 * 
*/
exports.login = async (req, res) => {
    const result = await pool.query(queries.checkUserQuery, [req.body.email]);
    const checkEmail = await pool.query(queries.checkExistingEmailQuery, [req.body.email]);
    const user = result.rows[0];
    if (checkEmail.rowCount === 0) {
        if (!result.email && result.email === undefined) {
            return res.status(401).json({ message: "Cet email ou ce mot de passe contient une erreur" });
        }
    } else {
        const admin = user.is_admin;
        bcrypt.compare(req.body.password, user.password)
            .then(valid => {
                if (!valid) {
                    return res.status(401).json({ message: 'Cet email ou ce mot de passe contient une erreur' });
                }
                res.status(200).json({
                    pseudo: user.pseudo,
                    email: user.email,
                    password: undefined,
                    token: jwt.sign(
                        {
                            userId: user.user_id,
                            pseudo: user.pseudo,
                            admin: admin,
                            email: user.email
                        },
                        process.env.RANDOM_TOKEN_SECRET_KEY,
                        { expiresIn: '24h' },
                    )
                });
            })
            .catch(error => {
                console.log(error);
                res.status(500).json({ message: error })
            });
    }
}