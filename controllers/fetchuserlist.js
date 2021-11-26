const { User } = require('../models')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

module.exports = {
    getUsersList: async (req, res) => {
        const { keyword } = req.query
        // fetch top 5 users which match with keyword
        try {
            const users = await User.findAll({
                limit:5,
                where: {
                    username: {[Op.like]: `${keyword}%`} 
                }
            })

            return res.status(200).json(users)
        } catch (err) {
            console.log(err)
            return res.status(500).json({ error: "Failed to fetch users!" })
        }
    }
}
