const { User, Moderator } = require('../models')
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
            // find the categories the user is moderator for
            let mod_categories = []
            try {
                const mod = await Moderator.findAll({
                    attributes: ['category'],
                    where: {
                        userid: user.dataValues.id
                    }
                })

                if (mod.length == 0) return res.status(404).json({ error: "Unauthorized Access!" })
                else {
                    mod.forEach(function (itm) {
                        mod_categories.push(itm.dataValues.category)
                    })

                    // create the mod_categories array
                    req.body = { ...req.body, mod_categories }
                    // successfullly found the user
                    // now we have to create a jwt token for the user
                    const key = config.JWTSECRET;
                    const token = jwt.sign({ userid: user.dataValues.userid, mod_categories }, key, { expiresIn: "2d" });
                    return res.status(200).json({ ...user.dataValues, token, id: undefined, password: undefined })
                    next();
                }
            } catch (err) {
                console.log(err);
                return res.status(500).json({ error: "Internal Server Error!" })
            }
        } catch (err) {
            console.log(err)
            return res.status(500).json({ error: 'Login Failed!' })
        }
    }
}