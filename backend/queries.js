const getUsers = 'SELECT * FROM public."user"';

const createUser = 'INSERT INTO public."user" (user_id, pseudo, email, password, is_admin, profile_picture, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *';

const checkExistingEmail = 'SELECT s FROM public."user" s WHERE s.email = $1';

const deleteUser =  'DELETE FROM public."user" WHERE user_id = $1';

const updateUser = 'UPDATE public."user" SET pseudo = $1, profile_picture = $2 WHERE user_id = $3 RETURNING *';

module.exports = {
    getUsers,
    createUser,
    checkExistingEmail,
    deleteUser,
    updateUser,
};