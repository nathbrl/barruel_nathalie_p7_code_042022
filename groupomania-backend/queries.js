/* USER QUERIES */
const getUsersQuery = 'SELECT * FROM public."user"';

const createUserQuery = 'INSERT INTO public."user" (pseudo, email, password, is_admin, profile_picture, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *';

const checkExistingEmailQuery = 'SELECT s FROM public."user" s WHERE s.email = $1';

const checkUserQuery = 'SELECT * FROM public."user" WHERE email = $1';

const updateUserQuery = 'UPDATE public."user" SET pseudo = $1, profile_picture = $2, updated_at = $3 WHERE user_id = $4 RETURNING *';

const deleteUserQuery =  'DELETE FROM public."user" WHERE user_id = $1';

/* POSTS QUERIES */

const allPostQuery = 'SELECT public.post.*, pseudo, profile_picture FROM public.post INNER JOIN public."user" ON public."user".user_id=public.post.user_id ORDER BY public.post.created_at ASC'; 

const createPostQuery = 'INSERT INTO public.post (content, atachment, created_at, updated_at, user_id) VALUES ($1, $2, $3, $4, $5) RETURNING *';

const postIdQuery = 'SELECT user_id FROM public.post WHERE post_id = $1';

const updatePostQuery = 'UPDATE public.post SET content = $1, atachment = $2, updated_at = $3 WHERE post_id = $4';

const deletePostQuery = 'DELETE FROM public.post WHERE post_id = $1';

const postCommentsQuery = 'SELECT public.post.*, pseudo, profile_picture FROM public.post INNER JOIN public."user" ON public."user".user_id=public.comment.user_id INNER JOIN public.comment ON public.post.post_id=public.comment.post_id';

/* COMMENT QUERIES */
const allCommentsQuery = 'SELECT * FROM public.comment'; 
//SELECT public.comment.* FROM public.post INNER JOIN public.post ON public.comment.user_id=public.post.user_id => BONNE QUERY ?

const commentIdQuery = 'SELECT * FROM public.comment';

const createCommentQuery = 'INSERT INTO public.comment (content, created_at, updated_at, post_id, user_id) VALUES ($1, $2, $3, $4, $5) RETURNING *';

const deleteCommentQuery = 'DELETE FROM public.comment WHERE comment_id = $1';
/* LIKE QUERIES */

module.exports = {
    getUsersQuery,
    createUserQuery,
    checkExistingEmailQuery,
    deleteUserQuery,
    updateUserQuery,
    checkUserQuery,

    allPostQuery,
    postIdQuery,
    createPostQuery,
    updatePostQuery,
    deletePostQuery,
    postCommentsQuery,

    allCommentsQuery,
    commentIdQuery,
    createCommentQuery,
    deleteCommentQuery
};