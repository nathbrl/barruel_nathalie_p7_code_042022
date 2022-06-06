const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();
const queries = require('../queries');
const pool = require('../config/db');
const { json } = require('express');

/**
 * GET ALL USERS // à supprimer
*/
exports.getUsers = async (req, res) => {
    const users = await pool.query(queries.getUsersQuery);
    res.status(200).json(users.rows);
}

/**
 * CREATE A USER
*/
async function createUser (user, res) {
    //Check if email already exists
    const checkEmail = await pool.query(queries.checkExistingEmailQuery, [user.email] );
    if (checkEmail.rowCount === 0) {
        await pool.query(queries.createUserQuery, [user.user_id, user.pseudo, user.email, user.password, user.is_admin, user.profile_picture, user.created_at, user.updated_at]);
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
    await pool.query(queries.updateUserQuery, [user.body.pseudo, user.body.profile_picture, id], (error, results) => {
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
    await pool.query(queries.deleteUserQuery, [id]);
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
    await pool.query(queries.checkUserQuery, [req.body.email], (err, result) => {
        const user = result.rows[0];
        if (!user.email) {
            return res.status(401).json({ error: "This email doesn't exists, signup up first" });
        } else {
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ error: 'The password is incorrect'});
                    }
                    res.status(200).json({
                        pseudo: user.pseudo,
                        email: user.email,
                        password: undefined,
                        token: jwt.sign(
                            { userId: user.user_id },
                            process.env.RANDOM_TOKEN_SECRET_KEY,
                            { expiresIn: '24h' }
                        )
                    });
                   
                })
                .catch(error => res.status(500).json({ message: "Authentication error" }));
        }
    });
}