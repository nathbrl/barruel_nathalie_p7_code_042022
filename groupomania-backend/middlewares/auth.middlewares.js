require('dotenv').config();
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        if (req.headers.authorization == undefined ) {
            throw 'Les headers d\'autorisation sont absents';
        }
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.RANDOM_TOKEN_SECRET_KEY);
        if (!decodedToken) {
            return res.status(403).json("Unauthorized request")
        } else {
            req.user = decodedToken;
            next();
        }
    } catch (error) {
        res.status(500).json({ error });
    }
}