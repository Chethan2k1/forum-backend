const { BannedWord } = require('../models')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

module.exports = {
    getBannedWordsHandler: async (req, res) => {
        const { keyword } = req.query
        console.log("Keyword : " + keyword)
        // fetch top 5 bannedword which match with keyword
        try {
            const bannedWords = await BannedWord.findAll({
                limit:5,
                where: {
                    word: {[Op.like]: `${keyword}%`} 
                }
            })

            return res.status(200).json(bannedWords)
        } catch (err) {
            console.log(err)
            return res.status(500).json({ error: "Failed to fetch banned words!" })
        }
    }
}
