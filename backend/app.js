const express = require("express");
const pg = require("pg");
require("dotenv").config();

//const path = require('path');

/*const postRoutes = require('');*/
const userRoutes = require('./routes/user.routes');

const app = express();

//connexion BDD
const config = {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    max: 10,
}

const pool = new pg.Pool(config);

pool.query('SELECT * FROM public."user"', (err, res) => {
    res.rows.forEach(user => {
        //console.log(user.pseudo)
    }) 
    pool.end() 
})

async function connect() {
    try {
            pool.on('connect', () => {
            console.log('Successfully connected to the database groupomania');
        })
    } catch (error) {
        console.error("Unable to connect to the database groupomania", error);
    }
}
connect();

//Paramétrage des headers
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
    res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
    next();
});

app.use(express.json());
//app.use('/images', express.static(path.join(__dirname, 'images')));


app.use('/api/user', userRoutes);

module.exports = app;