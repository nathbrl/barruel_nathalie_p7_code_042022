const queries = require('../queries');
const pool = require('../config/db');
const fs = require('fs');

/**
 * GET ALL POSTS
 */
exports.getAllPosts = async (req, res, next) => {
   const posts = await pool.query(queries.allPostQuery);
   console.log(posts);
   res.status(200).json(posts.rows);
}   
/**
 * CREATE ONE POST
 */   
exports.createPost = async (req, res, next) => {
   const image = req.protocol + "://" + req.get("host") + "/images" + req.file?.filename;
   const postContent = req.body.content;
   const post = {
      content: postContent,
      atachment: image,
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

exports.updatePost = async (req, res, next) => {
   const id = req.params.id;
   const postId = await pool.query(queries.postIdQuery, [id]);
   const image = req.protocol + "://" + req.get("host") + "/images" + req.file?.filename;
   console.log(req.user.userId);
   console.log(req.user.is_admin == false);
   console.log(postId.rows[0].user_id);
   
   if (!postId) {
      res.status(400).json({ message: 'Aucun post ne correspond dans la base de donnée'});
   } else {
      if(req.user.userId == postId.rows[0].user_id) {
         const postUpdate = { 
            content: req.body.content,
            atachment: image,
            updated_at: new Date()
         }
         console.log(postUpdate.atachment);
         const postModif = await pool.query(queries.updatePostQuery, [postUpdate.content, postUpdate.atachment, postUpdate.updated_at, id]);
         if(!postModif) {
            res.status(400).json({ message: 'Publication was not updated' });
         } else {
            res.status(200).json({ message: 'Publication was updated successfully' });
         }
         console.log('Je peux modifier le post');
      } else {
         console.log('Je n\'ai pas le droit de modifier le post');
      }
      console.log('il y a bien un post');
   }
}

exports.deletePost = async (req, res, next) => {
   const id = req.params.id;
   const postId = await pool.query(queries.postIdQuery, [id]);
   
   if (!postId) {
      res.status(400).json({ message: 'Aucun post ne correspond dans la base de donnée'});
   } else {
      if(req.user.userId == postId.rows[0].user_id) {
         const postDelete = await pool.query(queries.deletePostQuery, [ id]);
         console.log(postDelete);
         if(!postDelete) {
            res.status(400).json({ message: 'Publication was not deleted' });
         } else {
            res.status(200).json({ message: 'Publication was deleted successfully' });
         }
         console.log('Je peux supprimer le post');
      } else {
         console.log('Je n\'ai pas le droit de supprimer le post');
      }
      console.log('il y a bien un post');
   }

}

