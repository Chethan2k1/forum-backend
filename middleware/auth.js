var jwt = require('jsonwebtoken');
require('dotenv').config()
const key = process.env.JWT_SECRET

module.exports = {
    jwtverify: (req, res, next) => {
        const Header = req.header("authorization");
        if (Header == null) {
            res.status(401).send({ error: 'Provide Authentication!' });
        }

        const token = Header.split(' ')[1]
        // verify the token
        try {
            jwt.verify(token, key);
            // authentication success, decode the token
            req.body = { ...req.body, ...jwt.decode(token) };
            next();
        } catch (err) {
            console.log(err);
            res.status(403).send({ error: 'Unauthorized Access' });
        }
    }
}