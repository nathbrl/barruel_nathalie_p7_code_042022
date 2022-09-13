/* USER QUERIES */
const getUsersQuery = 'SELECT * FROM public."user"';

const createUserQuery = 'INSERT INTO public."user" (pseudo, email, password, is_admin, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';

const checkExistingEmailQuery = 'SELECT s FROM public."user" s WHERE s.email = $1';

const checkUserQuery = 'SELECT * FROM public."user" WHERE email = $1';

const updateUserQuery = 'UPDATE public."user" SET pseudo = $1, updated_at = $2 WHERE user_id = $3 RETURNING *';

const deleteUserQuery =  'DELETE FROM public."user" WHERE user_id = $1';

/* POSTS QUERIES */

const allPostQuery = 'SELECT public.post.*, pseudo FROM public.post INNER JOIN public."user" ON public."user".user_id=public.post.user_id ORDER BY public.post.created_at DESC'; 

const createPostQuery = 'INSERT INTO public.post (content, image, created_at, updated_at, user_id) VALUES ($1, $2, $3, $4, $5) RETURNING *';

const postIdQuery = 'SELECT user_id FROM public.post WHERE post_id = $1';

const updatePostQuery = 'UPDATE public.post SET content = $1, image = $2, updated_at = $3 WHERE post_id = $4';

const deletePostQuery = 'DELETE FROM public.post WHERE post_id = $1';

const postQuery = 'SELECT public.post.*, pseudo FROM public.post';

/* LIKE QUERIES */

const userLikeQuery = 'SELECT count(*) FROM public."like" WHERE post_id = $1 AND user_id = $2';

const totalLikeQuery = 'SELECT count(*) FROM public."like" WHERE post_id = $1';

const addLikeQuery = 'INSERT INTO public."like" (post_id, user_id) VALUES ($1, $2) RETURNING *';

const deleteLikeQuery = 'DELETE FROM public."like" WHERE post_id = $1';

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
    postQuery,

    userLikeQuery,
    totalLikeQuery,
    addLikeQuery,
    deleteLikeQuery,
};