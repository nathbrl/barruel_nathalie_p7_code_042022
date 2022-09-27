const queries = require('../queries');
const pool = require('../config/db');
const fs = require('fs');

/* LIKES */
exports.likePost = async (req, res, next) => {
   const id = req.params.id;
   const userId = req.user.userId;
   const rows = await pool.query(queries.userLikeQuery, [id, userId]);

   if (rows.rows[0].count == 0) {
      await pool.query(queries.addLikeQuery, [id, userId]);
   } else {
      await pool.query(queries.deleteLikeQuery, [id, userId]);
   }
   const totalLike = await pool.query(queries.PostIdLikeQuery, [id]);
   const likesNumber = {
      likes: parseInt(totalLike.rows[0].count)
   }
   return res.send(likesNumber);
}

/* GET ALL POSTS */
exports.getAllPosts = async (req, res, next) => {
   const posts = await pool.query(queries.allPostQuery);

   for (const post of posts.rows) {
      const postLike = await pool.query(queries.PostIdLikeQuery, [post.post_id]);
      post.numberLikes = parseInt(postLike.rows[0].count);
   }
   return res.status(200).json(posts.rows);
}

/* CREATE ONE POST */
exports.createPost = async (req, res, next) => {
   //POST WITHOUT MEDIA
   try {
      const postContent = JSON.parse(req.body.document);
      const postImage = req.file;
      
      if (postContent.content == null || postContent.content == undefined || postContent.content == '') {
         return res.status(400).json({ message: 'le champ texte ne peut être vide' });
      } else {
         if (postImage == undefined) {
            const postNoImage = {
               content: postContent.content,
               image: null,
               created_at: new Date(),
               updated_at: null,
               user_id: req.user.userId,
            };
            const publishPostNoMedia = await pool.query(queries.createPostQuery, [postNoImage.content, postNoImage.image, postNoImage.created_at, postNoImage.updated_at, postNoImage.user_id]);
            if (publishPostNoMedia) {
               return res.status(201).json({ ...publishPostNoMedia.rows[0], pseudo: req.user.pseudo, numberLikes: 0, message: 'Nouvelle publication ajouté' });
            } else {
               return res.status(400).json({ message: 'Nouvelle publication non ajouté' });
            }
         } else {
            //POST WITH MEDIA
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
               return res.status(201).json({ ...publishPost.rows[0], pseudo: req.user.pseudo, numberLikes: 0, message: 'Nouvelle publication ajouté' });
            } else {
               return res.status(400).json({ message: `Nouvelle publication non ajouté` });
            }
         }
      }
   } catch (error) {
      console.log(error);
   }
};

/**
 * UPDATE A POST
 */
exports.updatePost = async (req, res, next) => {
   const id = req.params.id;
   const postContent = JSON.parse(req.body.document);
   const postId = await pool.query(queries.postIdQuery, [id]);
   const postImage = req.file;
   try {
      if (!postId) {
         return res.status(404).json({ message: 'Aucun post ne correspond dans la base de donnée' });
      } else {
         if (req.user.userId == postId.rows[0].user_id || req.user.admin) {
            if (postImage == undefined) {
               //UPDATE WITHOUT MEDIA
               const updatePostNoImage = {
                  content: postContent.content,
                  image: null,
                  updated_at: new Date(),
                  message: 'Publication mise à jour'
               };
               const updatePostNoMedia = await pool.query(queries.updatePostQuery, [updatePostNoImage.content, updatePostNoImage.image, updatePostNoImage.updated_at, id]);
               if (!updatePostNoMedia) {
                  return res.status(400).json({ message: 'Publication non modifé' });
               } else {
                  return res.status(200).json(updatePostNoImage);
               }
            } else {
               //UPDATE WITH MEDIA
               if (postImage) {
                  const image = req.protocol + "://" + req.get("host") + "/images/" + req.file.filename;
                  const updatePostImage = {
                     content: postContent.content,
                     image: image,
                     updated_at: new Date(),
                     message: 'Publication mise à jour'
                  };
                  const updatePostWithMedia = await pool.query(queries.updatePostQuery, [updatePostImage.content, updatePostImage.image, updatePostImage.updated_at, id]);
                  if (!updatePostWithMedia) {
                     return res.status(400).json({ message: 'Publication non modifié' });
                  } else {
                     return res.status(200).json(updatePostImage);
                  }
               }
            }
         }
      }
   } catch (error) {
      console.log(error);
   }
}

/**
 * DELETE A POST
 */
exports.deletePost = async (req, res, next) => {
   const id = req.params.id;
   const rows = await pool.query(queries.postIdQuery, [id]);

   if (!rows.rows.length) {
      res.status(400).json({ message: 'Aucun post ne correspond dans la base de donnée' });
   } else {
      if (req.user.userId == rows.rows[0].user_id || req.user.admin) {
         const postDelete = await pool.query(queries.deletePostQuery, [id]);
         if (!postDelete) {
            return res.status(400).json({ message: 'Publication non supprimé vous n\'avez pas le droit' });
         } else {
            return res.status(200).json({ message: 'Publication supprimé avec succès' });
         }
      } else {
         return res.status(401).json({ message: 'Vous ne pouvez supprimer cette publication' });
      }
   }

}