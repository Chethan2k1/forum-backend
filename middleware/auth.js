var jwt = require('jsonwebtoken');
const config = require(__dirname + '/../config/config.json');

module.exports = {
    jwtverify: (req, res, next) => {
        console.log("Here in the middleware")
        const Header = req.header("authorization");
        console.log(Header)
        if (Header == null) {
            res.status(401).send({ error: 'Provide Authentication!' });
        }

        const token = Header.split(' ')[1]
        // verify the token
        try {
            jwt.verify(token, config.JWTSECRET);
            // authentication success, decode the token
            const id = jwt.decode(token).id;
            req.body = { ...req.body, id };
            console.log("user id (in middleware) : " + id)
            next();
        } catch (err) {
            res.status(403).send({ error: 'Unauthorized Access' });
        }
    }
}