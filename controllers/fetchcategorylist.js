const { Category } = require('../models')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

module.exports = {
    getCategoryList: async (req, res) => {
        const { keyword } = req.query
        // fetch top 5 categories which match with keyword
        try {
            const categories = await Category.findAll({
                limit:5,
                where: {
                    // name: keyword 
                    name: {[Op.like]: `${keyword}%`} 
                }
            })

            return res.status(200).json(categories)
        } catch (err) {
            console.log(err)
            return res.status(500).json({ error: "Failed to fetch categories!" })
        }
    }
}
