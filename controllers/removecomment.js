const { Comment, Report } = require('../models')

module.exports = {
    removeCommentHandler: (req, res) => {
        // removes the row with this commmentid
        // use transactions to rollback any changes in case of error
        const { commmentid } = req.commmentid;
        try {
            Comment.destroy({
                where: {
                    commmentid
                }
            })
        } catch (err) {
            console.log(err)
            return res.status(500).json({ error: "Error in removing Comment!" })
        }

        // checks and removes a report if with id exists
        try {
            Report.destroy({
                where: {
                    id: commmentid,
                    ispost: false
                }
            })
            return res.json({})
        } catch (err) {
            console.log(err)
            return res.status(500).json({ error: "Error in removing Comment!" })
        }
    }
}