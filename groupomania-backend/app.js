const express = require("express");
require("dotenv").config();
const helmet = require('helmet');
const app = express();
const path = require('path');
const postRoute = require('./routes/post.routes');
const userRoute = require('./routes/user.routes');

app.use(helmet({ crossOriginEmbedderPolicy: false }));
//Paramétrage des headers
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
    res.setHeader('Cross-Origin-Resource-Policy', 'same-site');
    next();
});

process.on('unhandledRejection', (reason) => {
    console.log('Unhandled Rejection:', reason)
});

process.on('uncaughtException', (reason) => {
    console.log('uncaughtException', reason)
});

app.use(express.json());
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/posts', postRoute);
app.use('/api/user', userRoute);

module.exports = app;