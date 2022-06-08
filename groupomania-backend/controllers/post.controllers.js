const queries = require('../queries');
const pool = require('../config/db');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

exports.getAllPosts = async (req, res, next) => {
    const posts = await pool.query(queries.allPostQuery, (error, result) => {
        console.log(posts);
        console.log(result);
        res.status(200).json(posts.rows);
    });
}    
    
