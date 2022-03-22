const config = require('config');
const webToken = require('jsonwebtoken');

module.exports = (req, res, next) => {
    if (req.method === 'OPTIONS') {
        next();
    }

    try {
        const token = req.headers.authorization.split(' ')[1];
        
        if (!token) {
            return res.status(401).json({ message: 'No authorisation' })
        };

        const decoded = webToken.verify(token, config.get('webTokenSecret'));
        
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: 'No authorisation' })
    }
}