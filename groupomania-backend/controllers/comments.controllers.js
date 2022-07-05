const queries = require('../queries');
const pool = require('../config/db');

exports.getAllComments = async (req, res, next) => {
    const allComments = await pool.query(queries.postCommentsQuery);
    //console.log(allComments.rows);
    res.status(200).json(allComments.rows);
}

exports.createComment = async (req, res, next) => {
    const commentContent = req.body.content;
    const comment = {
        content: commentContent,
        created_at: new Date(),
        updated_at: null,
        post_id: req.params.id,
        user_id: req.user.userId,
   };
   //console.log(comment);
    const publishComment = await pool.query(queries.createCommentQuery, [comment.content, comment.created_at, comment.updated_at, comment.post_id, comment.user_id]);
    //console.log(publishComment);
        if (publishComment) {
            res.status(201).json({ message: `New comment added` });
        } else {
            res.status(400).json({ message: `New comment not added` });
        }
}

exports.deleteComment = async (req, res, next) => {
    const id = req.params.id;
    //console.log(id);
    const checkUserId = await pool.query(queries.commentIdQuery);
    if (!checkUserId) {
        res.status(400).json({ message: 'Aucun commentaire ne correspond dans la base de donnée'});
     } else {
        if(req.user.userId == checkUserId.rows[0].user_id) {
           const commentDelete = await pool.query(queries.deleteCommentQuery, [id]);
           //console.log(postDelete);
           if(!commentDelete) {
              res.status(400).json({ message: 'Comment was not deleted' });
           } else {
              res.status(200).json({ message: 'Comment was deleted successfully' });
           }
           console.log('Je peux supprimer le commentaire');
        } else {
           console.log('Je n\'ai pas le droit de supprimer le commentaire');
        }
        console.log('il y a bien un commentaire');
     }
}