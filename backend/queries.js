const getUsers = 'SELECT * FROM public."user"';

const createUser = 'INSERT INTO public."user" (user_id, pseudo, email, password, is_admin, profile_picture, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *';

const checkExistingEmail = 'SELECT s FROM public."user" s WHERE s.email = $1';

module.exports = {
    getUsers,
    createUser,
    checkExistingEmail,
};