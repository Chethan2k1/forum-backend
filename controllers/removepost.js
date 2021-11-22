const { Post, Report } = require('../models')

module.exports = {
    removePostHandler: (req, res) => {
        // removes the row with this postid
        // use transactions to rollback any changes in case of error
        const { postid } = req.postid;
        try {
            Post.destroy({
                where: {
                    postid
                }
            })
        } catch (err) {
            console.log(err)
            return res.status(500).json({ error: "Error in removing Post!" })
        }

        // checks and removes a report if with id exists
        try {
            Report.destroy({
                where: {
                    id: postid,
                    ispost: true
                }
            })

            return res.json({})
        } catch (err) {
            console.log(err)
            return res.status(500).json({ error: "Error in removing Post!" })
        }
    }
}