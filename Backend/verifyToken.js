const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
    const authHeader = req.headers.token

    if (authHeader) {
        const token = authHeader.split(" ")[1];

        jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
            if (err) {
                return res.status(403).json({
                    message: 'Invalid Token'
                })
            } else {
                req.user = user
                next();
            }
        })

    } else {
        return res.status(401).json({
            message: 'Unauthorized user'
        })
    }
}

module.exports = verifyToken