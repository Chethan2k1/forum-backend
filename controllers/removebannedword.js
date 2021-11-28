const { BannedWord } = require('../models')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

module.exports = {
    removeBannedWordsHandler: async (req, res) => {
        const { word } = req.body;

        try {
            await BannedWord.destroy({
                where: {
                    word
                }
            })

            return res.status(200).json({});
        } catch (err) {
            console.log(err)
            return res.status(500).json({ error: "Failed remove from banned words!" })
        }
    }
}