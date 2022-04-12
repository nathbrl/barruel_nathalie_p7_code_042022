const express = require("express");
const { Pool, Client } = require("pg");
const path = require('path');

/*const postRoutes = require('');
const userRoutes = require('')*/

const app = express();

//connexion BDD
const credentials = {
    user: 'postgres',
    host: 'localhost',
    database: 'groupomania',
    password: 'Postgresmdp',
    port: 5432,
};
/*
    const pool = new Pool({
        user: '{user}',
        host: '{host}',
        database: '{database}',
        password: '{password}',
        port: {port},
    })
    pool.query('SELECT NOW()', (err, res) => {
    console.log(err, res) 
    pool.end() 
    })
*/
async function poolDemo() {
    const pool = new Pool(credentials);
    const now = await pool.query("SELECT NOW()");
    await pool.end()
    console.log(pool);
    return now;
}

//Paramétrage des headers
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
    res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
    next();
});

app.use(express.json());
app.use('/images', express.static(path.join(__dirname, 'images')));


/*app.use('', postRoutes);
app.use('', userRoutes);*/

module.exports = app;