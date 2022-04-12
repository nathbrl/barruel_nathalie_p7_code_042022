const express = require("express");
const { Client } = require("node-postgres");
const path = require('path');
require("dotenv").config();

const postRoutes = require('');
const userRoutes = require('')

const app = express();

//connexion BDD
(async () => {
    const client = new Client({
      user: 'postgres',
      host: 'localhost',
      database: 'groupomania',
      password: 'Postgresmdp',
      port: 5432
    });
    
    await client.connect();
   
    const res = await client.query('SELECT * from users');
    console.log(res);
    await client.end();
})().then( () => console.log("Connexion à la BDD réussie !"))
    .catch( () => console.log("Connexion à la BDD échouée !"));


//Paramétrage des headers
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
    res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
    next();
});

app.use(express.json()); // anciennement body parser
app.use('/images', express.static(path.join(__dirname, 'images')));


app.use('', postRoutes);
app.use('', userRoutes);

module.exports = app;