const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
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
        await pool.query(queries.createUserQuery, [user.pseudo, user.email, user.password, user.is_admin, user.profile_picture, user.created_at, user.updated_at]);
        res.status(201).send({message: 'user was successfully created'});
    } else {
        res.status(400).send({message:'user already exists'});
    }
}

/**
 * UPDATE A USER
*/
exports.updateUser = async (req, res) => {
    const id = req.params.id;

    const userUpdated = {
        pseudo: req.body.pseudo,
        profile_picture: req.body.profile_picture,
        updated_at: new Date()
    }
    console.log(userUpdated);
    const update = await pool.query(queries.updateUserQuery, [userUpdated.pseudo, userUpdated.profile_picture, userUpdated.updated_at, id]);
    if(!update) {
        res.status(400).send({message: 'User couldn\'t be updated'});
    } else {
        res.status(200).send({message:'User was successfully updated'});
    }
}

/**
 * DELETE A USER
*/

exports.deleteUser = async (user, res) => {
    const id = user.params.id;
    await pool.query(queries.deleteUserQuery, [id]);
    if (!id) {
        res.status(400).send({message: 'User doesn\'t exist, deletion impossible'});
    } else {
        res.status(200).send({message: 'User was successfully deleted'});
    } 
}

/**
 * USER SIGN UP
*/
exports.signup = async (req, res) => {
    try {
        if (req.body.password === undefined || req.body.password == '') {
            return res.status(400).json({ message: 'Mot de passe non défini'});
        }
        const passwordHashed = await bcrypt.hash(req.body.password, 10)
        createUser ({
            //user_id: uuidv4(), // à retirer + dans la requête 
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
    const result = await pool.query(queries.checkUserQuery, [req.body.email]);
        const user = result.rows[0];
        if (user && !user.email) {
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
                            { userId: user.user_id, 
                            is_admin: true,
                            pseudo: user.pseudo,
                            email: user.email },
                            process.env.RANDOM_TOKEN_SECRET_KEY,
                            //return is_admin ici
                            { expiresIn: '24h' }
                        )
                    });
                })
                .catch(error => res.status(500).json({ message: "Authentication error" }));
    }
}