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
      await pool.query(queries.deleteLikeQuery, [id, userId]);
      //query supprimer le like
   }
   const totalLike = await pool.query(queries.totalLikeQuery, [id]);
   const likesNumber = {
      likes: parseInt(totalLike.rows[0].count)
   }
   res.send(likesNumber);
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
   console.log(req.body);
   //POST WITH MEDIA
   const postContent = JSON.parse(req.body.document);
   const postImage = req.file;
   if (req.body.document == null) {
      console.log('Le champ texte ne peut être vide');
      res.status(400).json({ message: 'le champ texte ne peut être vide' });
   } 
   if (postImage == undefined) {
      //POST WITHOUT MEDIA
      const postNoImage = {
         content: postContent.content,
         image: null,
         created_at: new Date(),
         updated_at: null,
         user_id: req.user.userId,
      };

      const publishPostNoMedia = await pool.query(queries.createPostQuery, [postNoImage.content, postNoImage.image, postNoImage.created_at, postNoImage.updated_at, postNoImage.user_id]);
      if (publishPostNoMedia) {
         res.status(201).json({ ...postNoImage, pseudo: req.user.pseudo, numberLikes: 0 });
      } else {
         res.status(400).json({ message: 'Post sans image non ajouté' });
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

      const publishPost = await pool.query(queries.createPostQuery, [
         post.content,
         post.image,
         post.created_at,
         post.updated_at,
         post.user_id,
      ]);
      if (publishPost) {
         res.status(201).json({ ...post, pseudo: req.user.pseudo, numberLikes: 0 });
      } else {
         res.status(400).json({ message: `Nouvelle publication ajouté` });
      }
   }
};

exports.updatePost = async (req, res, next) => {
   const id = req.params.id;
   const postContent = JSON.parse(req.body.document);
   const postId = await pool.query(queries.postIdQuery, [id]);
   const postImage = req.file;
   try {
      if (!postId) {
         return res.status(400).json({ message: 'Aucun post ne correspond dans la base de donnée' });
      } else {
         if (req.user.userId == postId.rows[0].user_id || req.user.admin) {
            if (postImage == undefined) {
               //POST WITHOUT MEDIA
               const updatePostNoImage = {
                  content: postContent.content,
                  image: null,
                  updated_at: new Date(),
               };
               const updatePostNoMedia = await pool.query(queries.updatePostQuery, [updatePostNoImage.content, updatePostNoImage.image, updatePostNoImage.updated_at, id]);
               if (!updatePostNoMedia) {
                  return res.status(400).json({ message: 'Publication non modifé' });
               } else {
                  return res.status(200).json({ message: 'Publication modifié' });
               }
            } else {
               if (postImage) {
                  const image = req.protocol + "://" + req.get("host") + "/images/" + req.file.filename;
                  const updatePostImage = {
                     content: postContent.content,
                     image: image,
                     updated_at: new Date(),
                  };
                  const updatePostWithMedia = await pool.query(queries.updatePostQuery, [updatePostImage.content, updatePostImage.image, updatePostImage.updated_at, id]);
                  if (!updatePostWithMedia) {
                     return res.status(400).json({ message: 'Publication non modifié' });
                  } else {
                     console.log('ok 2');
                     return res.status(200).json({ message: 'Publication modifié' });
                  }
               }
            }
         }
      }
   } catch (error) {
      console.log(error);
   }
}

exports.deletePost = async (req, res, next) => {
   const id = req.params.id;
   const rows = await pool.query(queries.postIdQuery, [id]);

   if (!rows.rows.length) {
      res.status(400).json({ message: 'Aucun post ne correspond dans la base de donnée' });
   } else {
      if (req.user.userId == rows.rows[0].user_id || req.user.admin) {
         const postDelete = await pool.query(queries.deletePostQuery, [id]);
         if (!postDelete) {
            res.status(400).json({ message: 'Publication non supprimé vous n\'avez pas le droit' });
         } else {
            res.status(200).json({ message: 'Publication supprimé avec succès' });
         }
      } else {
         res.status(401).json({ message: 'Vous ne pouvez supprimer cette publication' });
      }
   }

}