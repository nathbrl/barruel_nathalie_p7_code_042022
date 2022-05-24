/* USER QUERIES */
const getUsersQuery = 'SELECT * FROM public."user"';

const createUserQuery = 'INSERT INTO public."user" (user_id, pseudo, email, password, is_admin, profile_picture, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *';

const checkExistingEmailQuery = 'SELECT s FROM public."user" s WHERE s.email = $1';

const checkUserQuery = 'SELECT * FROM public."user" WHERE email = $1';

const deleteUserQuery =  'DELETE FROM public."user" WHERE user_id = $1';

const updateUserQuery = 'UPDATE public."user" SET pseudo = $1, profile_picture = $2 WHERE user_id = $3 RETURNING *';

module.exports = {
    getUsersQuery,
    createUserQuery,
    checkExistingEmailQuery,
    deleteUserQuery,
    updateUserQuery,
    checkUserQuery,
};

/* POSTS QUERIES 
createPost,
    updatePostQuery,
    deletePostQuery,
    getAllPostsQuery,
    postLikesQuery,
    
const createPostQuery = '';

const updatePostQuery = '';

const deletePostQuery = '';

const getAllPostsQuery = '';

const postLikesQuery = '';*/