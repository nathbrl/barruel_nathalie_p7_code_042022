/* USER QUERIES */
const createUserQuery = 'INSERT INTO public."user" (pseudo, email, password, is_admin, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';

const checkExistingEmailQuery = 'SELECT s FROM public."user" s WHERE s.email = $1';

const checkExistingPseudo = 'SELECT pseudo FROM public."user" WHERE pseudo = $1';

const checkUserQuery = 'SELECT * FROM public."user" WHERE email = $1';

/* POSTS QUERIES */

const allPostQuery = 'SELECT public.post.*, pseudo FROM public.post INNER JOIN public."user" ON public."user".user_id=public.post.user_id ORDER BY public.post.created_at DESC';

const createPostQuery = 'INSERT INTO public.post (content, image, created_at, updated_at, user_id) VALUES ($1, $2, $3, $4, $5) RETURNING *';

const postIdQuery = 'SELECT user_id FROM public.post WHERE post_id = $1';

const updatePostQuery = 'UPDATE public.post SET content = $1, image = $2, updated_at = $3 WHERE post_id = $4';

const deletePostQuery = 'DELETE FROM public.post WHERE post_id = $1';

/* LIKE QUERIES */

const userLikeQuery = 'SELECT count(*) FROM public."like" WHERE post_id = $1 AND user_id = $2';

const PostIdLikeQuery = 'SELECT count(*) FROM public."like" WHERE post_id = $1';

const addLikeQuery = 'INSERT INTO public."like" (post_id, user_id) VALUES ($1, $2) RETURNING *';

const deleteLikeQuery = 'DELETE FROM public."like" WHERE post_id = $1 AND user_id = $2';

module.exports = {
    createUserQuery,
    checkExistingEmailQuery,
    checkUserQuery,
    checkExistingPseudo,

    allPostQuery,
    postIdQuery,
    createPostQuery,
    updatePostQuery,
    deletePostQuery,

    userLikeQuery,
    PostIdLikeQuery,
    addLikeQuery,
    deleteLikeQuery,
};