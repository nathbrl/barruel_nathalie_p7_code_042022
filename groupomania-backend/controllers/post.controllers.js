const queries = require('../queries');
const pool = require('../config/db');
const fs = require('fs');

/**
 * GET ALL POSTS
 */
exports.getAllPosts = async (req, res, next) => {
   const posts = await pool.query(queries.allPostQuery);
   res.status(200).json(posts.rows);
}    

/**
 * CREATE ONE POST
 */   
exports.createPost = async (req, res, next) => {
   const imageUrl = req.body.atachment;
   //req.protocol + "://" + req.get("host") + "/images" + req.file?.filename;
   const postContent = req.body.content;
   const post = {
      content: postContent,
      atachment: imageUrl,
      created_at: new Date(),
      updated_at: null,
      user_id: req.user.userId,
   };
   //ENVOIE LA REQUETE AVEC MULTER ET LES VALEURS PAR DEFAUT
   const publishPost = await pool.query(queries.createPostQuery, [ post.content, post.atachment, post.created_at, post.updated_at, post.user_id]) 
      if (publishPost) {
         res.status(201).json({ message: `New post added` });
      } else {
         res.status(400).json({ message: `New post not added` });
      }
};

exports.deletePost = async (req, res, next) => {
   const postId = req.params.id;
   const userId = req.user.userId;
   const suppress = await pool.query(queries.deletePostQuery, [postId]);
      console.log(result.rows);

      if (!suppress) {
         res.status(400).json({ message: 'Sorry you can not delete this post'});
      } else {
         if (userId)
         res.status(200).json({ message: 'Publication deleted'});
      }

}

exports.updatePost = async (req, res, next) => {

}