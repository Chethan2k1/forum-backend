const { User } = require('../models')
const config = require(__dirname + '/../config/config.json');
const jwt = require('jsonwebtoken');

module.exports = {
    loginHandler: async (req, res) => {
        const { email, password } = req.body
        // search the entry in the DB
        try {
            const user = await User.findOne({
                where: { email, password }
            })

            if (user == null) {
                return res.status(200).json({ error: 'Invalid credentials!' })
            }

            // successfullly found the user
            // now we have to create a jwt token for the user
            const key = config.JWTSECRET;
            const token = jwt.sign({ id: user.id }, key, { expiresIn: "2d" });
            return res.status(200).json({ ...user.dataValues, token, id: undefined, password: undefined })
        } catch (err) {
            console.log(err)
            return res.status(500).json({ error: 'Login Failed!' })
        }
    }
}