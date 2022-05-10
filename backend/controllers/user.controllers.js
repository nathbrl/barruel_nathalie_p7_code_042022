const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();
const queries = require('../queries');
const pool = require('../config/db');

const createUser = async (user, res) => {
    //Check if email already exists
    const checkEmail = await pool.query(queries.checkExistingEmail, [user.email] );
    if (checkEmail.rowCount === 0) {
        await pool.query(queries.createUser, [user.user_id, user.pseudo, user.email, user.password, user.is_admin, user.profile_picture, user.created_at, user.updated_at]);
        res.status(201).send('user was successfully created');
    } else {
        res.status(400).send('user already exists');
    }
};

const updateUser = async (user, res) => {
    const id = user.params.id;
    await pool.query(queries.updateUser, [user.pseudo, user.profile_picture, id]);
    if (!id) {
        res.status(400).send('User couldn\'t be updated');
    } else {
        res.status(200).send('User was successfully updated');
    }
}
module.exports.updateUser = updateUser;

const deleteUser = async (user, res) => {
    const id = user.params.id;
    await pool.query(queries.deleteUser, [id]);
    if (!id) {
        res.status(400).send('User doesn\'t exist, deletion impossible');
    } else {
        res.status(200).send('User was successfully deleted');
    } 
}
module.exports.deleteUser = deleteUser;

const getUsers = async (req, res) => {
    const users = await pool.query(queries.getUsers);
    res.status(200).json(users.rows);
}
module.exports.getUsers = getUsers;

//Inscription de l'utilisateur
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
};

//connexion de l'utilisateur
/*exports.login = async (user, res) => {
    
    bcrypt.compare(req.body.password, user.password)
        .then(valid => {
            if(!valid){
                return res.status(401).json({ error: 'Mot de passe incorrect'});
            }
            res.status(200).json({
                userId: user.user_id,
                token: jwt.sign(
                    { userId: user._id },
                    process.env.RANDOM_TOKEN_SECRET_KEY,
                    { expiresIn: '24h' }
                    )
            });
        })
        .catch(error => res.status(500).json({ error}))
}*/