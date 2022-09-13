const queries = require('../queries');
const pool = require('../config/db');
const fs = require('fs');

/* LIKES */
exports.likePost = async (req, res, next) => {
   const id = req.params.id;
   const userId = req.user.userId;
   
   const rows = await pool.query(queries.userLikeQuery, [id, userId]);

   if (rows.rows[0].count == 0) {
      //query pour sauvegarder le like
         const like = {
            post_id: id,
            user_id: userId,
         }
         await pool.query(queries.addLikeQuery, [id, userId]);
      
   } else {
      await pool.query(queries.deleteLikeQuery, [id]);
      //query supprimer le like
   }
   const totalLike = await pool.query(queries.totalLikeQuery, [id]);
   const likesNumber = {
      likes: parseInt(totalLike.rows[0].count)
   }
   res.send( likesNumber );
}

/* GET ALL POSTS */
exports.getAllPosts = async (req, res, next) => {
   const posts = await pool.query(queries.allPostQuery);

   for (const post of posts.rows) {
      const postLike = await pool.query(queries.totalLikeQuery, [post.post_id]);
      post.numberLikes = parseInt(postLike.rows[0].count);
   }
   res.status(200).json(posts.rows);
}   
/* CREATE ONE POST */   
exports.createPost = async (req, res, next) => {
  //POST WITH MEDIA
  const postContent = JSON.parse(req.body.document);
  const postImage = req.file;

  if(postImage == undefined){
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

   if (!postId) {
      res.status(400).json({ message: 'Aucun post ne correspond dans la base de donnée'});
   } else {
      if(req.user.userId == postId.rows[0].user_id || req.user.admin) {
         const postUpdate = { 
            content: req.body.content,
            image: image,
            updated_at: new Date()
         }
         const postModif = await pool.query(queries.updatePostQuery, [postUpdate.content, postUpdate.image, postUpdate.updated_at, id]);
         if(!postModif) {
            res.status(400).json({ message: 'Échec de la mise à jour de la publication' });
         } else {
            res.status(200).json({ message: 'Publication mise à jour effectué' });
         }
      } else {
         res.status(403).json({ message: 'Je n\'ai pas le droit de modifier le post' });
      }
   }
}

exports.deletePost = async (req, res, next) => {
   const id = req.params.id;
   const rows = await pool.query(queries.postIdQuery, [id]);
   
   if (!rows.rows.length) {
      res.status(400).json({ message: 'Aucun post ne correspond dans la base de donnée'});
   } else {
      if(req.user.userId == rows.rows[0].user_id || req.user.admin) {
         const postDelete = await pool.query(queries.deletePostQuery, [id]);
         if(!postDelete) {
            res.status(400).json({ message: 'Publication non supprimé vous n\'avez pas le droit' });
         } else {
            res.status(200).json({ message: 'Publication supprimé avec succès' });
         }
      } else {
         res.status(401).json({ message: 'Vous ne pouvez supprimer cette publication' });
      }
   }

}

