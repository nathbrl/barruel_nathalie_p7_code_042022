const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();
const queries = require('../queries');
const pool = require('../config/db');
const { json } = require('express');

/**
 * GET ALL USERS 
 */
// à supprimer
exports.getUsers = async (req, res) => {
    const users = await pool.query(queries.getUsers);
    res.status(200).json(users.rows);
}

/**
 * CREATE A USER
 */
async function createUser (user, res) {
    //Check if email already exists
    const checkEmail = await pool.query(queries.checkExistingEmail, [user.email] );
    if (checkEmail.rowCount === 0) {
        await pool.query(queries.createUserQuerie, [user.user_id, user.pseudo, user.email, user.password, user.is_admin, user.profile_picture, user.created_at, user.updated_at]);
        res.status(201).send('user was successfully created');
    } else {
        res.status(400).send('user already exists');
    }
}

/**
 * UPDATE A USER
 */
exports.updateUser = async (user, res) => {
    const id = user.params.id
    await pool.query(queries.updateUser, [user.body.pseudo, user.body.profile_picture, id], (error, results) => {
        if (error) {
            res.status(400).send('User couldn\'t be updated');
        } else {
            res.status(200).send('User was successfully updated');
        }
    });
    
}

/**
 * DELETE A USER
 */

exports.deleteUser = async (user, res) => {
    const id = user.params.id;
    await pool.query(queries.deleteUser, [id]);
    if (!id) {
        res.status(400).send('User doesn\'t exist, deletion impossible');
    } else {
        res.status(200).send('User was successfully deleted');
    } 
}

/**
 * USER SIGN UP
 */
exports.signup = async (req, res) => {
    try {
        if (req.body.password === undefined) {
            throw 'Mot de passe non défini';
        }
        const passwordHashed = await bcrypt.hash(req.body.password, 10)
        createUser ({
            user_id: uuidv4(),
            pseudo: req.body.pseudo,
            email: req.body.email,
            password: passwordHashed,
            is_admin: false,
            profile_picture: req.body.profile_picture,
            created_at: new Date(),
            updated_at: null,          
        }, res);
    }
    catch(error) {
        res.status(400).json({ message: error });
    }
}

/**
 * USER LOG IN
 * 
 */
exports.login = async (req, res) => {
    const checkEmail = await pool.query(queries.checkEmail, [req.body.email]);
        if (!checkEmail) {
            return res.status(401).json({ error: "Email was not found" })
        } else {
            bcrypt.compare(req.body.password, checkEmail.password)
            .then(valid => {
                if (!valid) {
                    return res.status(401).json({ error: 'Password is incorrect'});
                }
                console.log("User successfully logged in !");
                res.status(200).json({
                    userEmail: checkEmail.email,
                    token: jwt.sign(
                        { userId: checkEmail.email },
                        process.env.RANDOM_TOKEN_SECRET_KEY,
                        { expiresIn: '24h' }
                    )
                })
            })
            .catch(error => res.status(500).json({ message: "Authentication error" }));
        }    
};