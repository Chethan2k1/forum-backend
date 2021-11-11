const { User } = require('../models')

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

            return res.status(200).json({...user.dataValues, id: undefined, password: undefined})
        } catch (err) {
            console.log(err)
            return res.status(500).json({ error: 'Login Failed!' })
        }
    }
}