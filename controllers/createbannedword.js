const { BannedWord } = require('../models')

module.exports = {
    createBannedWordHandler: async (req, res) => {
        const { word } = req.body;
        // check if the banned word already exists
        try {
            const bword = await BannedWord.findOne({
                where: {
                    word
                }
            })

            if(bword != null) return res.status(200).json({})
        } catch (err) {
            console.log(err)
            return res.status(500).json({ error: "Failed add to banned words!" })
        }


        try {
            await BannedWord.create({ word })
            return res.status(200).json({})
        } catch (err) {
            console.log(err)
            return res.status(500).json({ error: "Failed add to banned words!" })
        }
    }
}
