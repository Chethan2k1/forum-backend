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


                mod.forEach(function (itm) {
                    mod_categories.push(itm.dataValues.category)
                })

                // create the mod_categories array
                req.body = { ...req.body, mod_categories }
                // successfullly found the user
                // now we have to create a jwt token for the user
                const key = config.JWTSECRET;
                // if admin just add * as a category for mod_categories
                if(user.dataValues.isadmin) mod_categories = ['*']
                const data = { userid: user.dataValues.userid, mod_categories, isadmin: user.dataValues.isadmin }
                const token = jwt.sign(data, key, { expiresIn: "2d" });
                return res.status(200).json({ ...user.dataValues, mod_categories, token, id: undefined, password: undefined })
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