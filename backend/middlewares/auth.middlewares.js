require('dotenv').config();
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        if (req.headers.authorization === undefined) {
            throw 'Les headers d\'autorisation sont absents';
        }
        const token = req.headers["authorization"];
        console.log(token);
        const decodedToken = jwt.verify(token, process.env.RANDOM_TOKEN_SECRET_KEY);
        const email = decodedToken.email;
        req.auth = { email };
        if(req.body.email && req.body.email !== email) {
            throw 'User email is not valid';
        } else {
            next();
        }
    } catch (error){
        res.status(401).json({ error: error || 'Requête non authentifiée'});
    }
}