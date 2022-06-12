require('dotenv').config();
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        if (req.headers.authorization === undefined) {
            throw 'Les headers d\'autorisation sont absents';
        }
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.RANDOM_TOKEN_SECRET_KEY);
        const user_id = decodedToken.user_id;
        if (req.body.user_id && req.body.user_id != user_id) {
            return res.status(403).json("Unauthorized request")
        } else {
            next();
        }
    } catch (error) {
        res.status(401).json({ error: 'Invalid request'});
    }
}