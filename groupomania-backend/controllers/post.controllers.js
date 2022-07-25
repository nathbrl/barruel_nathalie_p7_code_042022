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
  //POST WITH MEDIA
  const postContent = JSON.parse(req.body.document);
  const postImage = req.file;
  
  console.log(postImage);

  if(postImage == undefined){
   console.log(postImage);
     //POST WITHOUT MEDIA
     const postNoImage = {
      content: postContent.content,
      image: null,
      created_at: new Date(),
      updated_at: null,
      user_id: req.user.userId,
   };

   //ENVOIE LA REQUETE AVEC MULTER ET LES VALEURS PAR DEFAUT
   const publishPostNoMedia = await pool.query(queries.createPostQuery, [ postNoImage.content, postNoImage.image, postNoImage.created_at, postNoImage.updated_at, postNoImage.user_id]);
   if (publishPostNoMedia) {
      res.status(201).json(postNoImage);
   } else {
      res.status(400).json({ message: `New post without image not added` });
   }
  } else {
   console.log(postImage);
   const image = req.protocol + "://" + req.get("host") + "/images/" + req.file.filename;
   const post = {
      content: postContent.content,
      image: image,
      created_at: new Date(),
      updated_at: null,
      user_id: req.user.userId,
   };

   //ENVOIE LA REQUETE AVEC MULTER ET LES VALEURS PAR DEFAUT
   const publishPost = await pool.query(queries.createPostQuery, [
      post.content,
      post.image,
      post.created_at,
      post.updated_at,
      post.user_id,
   ]);
   if (publishPost) {
      res.status(201).json(post);
   } else {
      res.status(400).json({ message: `New post not added` });
   }
  }
};

exports.updatePost = async (req, res, next) => {
   
   const id = req.params.id;
   const postId = await pool.query(queries.postIdQuery, [id]);
   const image = req.protocol + "://" + req.get("host") + "/images/" + req.file.filename;
   console.log(image);
   
   if (!postId) {
      res.status(400).json({ message: 'Aucun post ne correspond dans la base de donnée'});
   } else {
      if(req.user.userId == postId.rows[0].user_id) {
         const postUpdate = { 
            content: req.body.content,
            image: image,
            updated_at: new Date()
         }
         //console.log(postUpdate.image);
         const postModif = await pool.query(queries.updatePostQuery, [postUpdate.content, postUpdate.image, postUpdate.updated_at, id]);
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
   const rows = await pool.query(queries.postIdQuery, [id]);
   
   if (!rows.rows.length) {
      res.status(400).json({ message: 'Aucun post ne correspond dans la base de donnée'});
   } else {
      if(req.user.userId == rows.rows[0].user_id) {
         const postDelete = await pool.query(queries.deletePostQuery, [id]);
         //console.log(postDelete);
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

