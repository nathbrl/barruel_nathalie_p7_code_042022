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
   const userId = req.headers.authorization;
   console.log(userId);
   const imageUrl = req.protocol + "://" + req.get("host") + "/images" + req.file?.filename;
   //console.log(imageUrl);
   const content = req.body.content;
   //console.log(content);
   const post = {
      post_id: uuidv4(),
      content: content,
      atachment: imageUrl,
      created_at: new Date(),
      updated_at: null,
      user_id: userId,
   };
   console.log(post);
   //ENVOIE LA REQUETE AVEC MULTER ET LES VALEURS PAR DEFAUT
   await pool.query(queries.createPostQuery, [post.post_id, post.content, post.atachment, post.created_at, post.updated_at, post.user_id], function (err, result) {
      if (err) {
         throw err;
      } else {
         res.status(201).json({ message: `Nouveau post ajouté` });
      }
   })
};
    
