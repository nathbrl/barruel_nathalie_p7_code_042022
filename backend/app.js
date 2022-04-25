const express = require("express");
const { Pool } = require("pg");

//const path = require('path');

/*const postRoutes = require('');*/
const userRoutes = require('./routes/user.routes');

const app = express();

//connexion BDD
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'groupomania',
    password: 'Postgresmdp',
    port: 5432,
})
pool.query('SELECT * FROM public."user"', (err, res) => {
    res.rows.forEach(user => {
        console.log(user.pseudo)
    }) 
    pool.end() 
})

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


/*app.use('', postRoutes);*/
app.use('/api/auth', userRoutes);

module.exports = app;