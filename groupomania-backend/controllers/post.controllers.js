const queries = require('../queries');
const pool = require('../config/db');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

/**
 * GET ALL POSTS
 */
exports.getAllPosts = async (req, res, next) => {
    const posts = await pool.query(queries.allPostQuery, (error, result) => {
        res.status(200).json(result.rows);
    });
}    

/**
 * CREATE ONE POST
 */   
exports.createPost = async (req, res, next) => {
   const userId = await pool.query(queries.userIdQuery);
   console.log(req.user);
   const imageUrl = req.protocol + "://" + req.get("host") + "/images" + req.file?.filename;
   //console.log(imageUrl);
   const postContent = req.body.content;
   //console.log(content);
   const post = {
      content: postContent,
      atachment: imageUrl,
      created_at: new Date(),
      updated_at: null,
      user_id: req.user.userId,
   };
   //console.log(post);
   //ENVOIE LA REQUETE AVEC MULTER ET LES VALEURS PAR DEFAUT
   await pool.query(queries.createPostQuery, [ post.content, post.atachment, post.created_at, post.updated_at, post.user_id], function (err, result) {
      if (err) {
         throw err;
      } else {
         res.status(201).json({ message: `Nouveau post ajouté` });
      }
   })
};

exports.updatePost = async (req, res, next) => {
   const postId = '';
   const userId = '';
   const postAtachment = req.imageUrl;
   const postContent = req.body.content
}

