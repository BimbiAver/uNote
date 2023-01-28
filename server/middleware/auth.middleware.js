require('dotenv').config();

const jwt = require('jsonwebtoken');

// Authorization
const isLoggedIn = async (req, res, next) => {
    try {
        // Check whether the auth header exists or not
        if (req.headers.authorization) {
            // Parse token from header
            const token = req.headers.authorization.split(' ')[1]; //split the header and get the token
            if (token) {
                const payload = await jwt.verify(token, process.env.JWT_SECRET);
                if (payload) {
                    // store user data in request object
                    req.user = payload;
                    next();
                } else {
                    res.status(400).json({ error: 'token verification failed' });
                }
            } else {
                res.status(400).json({ error: 'malformed auth header' });
            }
        } else {
            res.status(400).json({ error: 'No authorization header' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = { isLoggedIn };
