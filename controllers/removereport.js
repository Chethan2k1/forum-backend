const { Report } = require('../models')

module.exports = {
    removeReportHandler: (req, res) => {
        const { postid, ispost } = req.postid;
        try {
            Report.destroy({
                where: {
                    postid,
                    ispost
                }
            })

            return res.json({})
        } catch (err) {
            console.log(err)
            return res.status(500).json({ error: "Error in removing Report!" })
        }
    }
}