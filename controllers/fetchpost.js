const { Post } = require('../models')

module.exports = {
    getpostHandler: async (req, res) => {
        const { postid } = req.query
        // create an entry in the DB
        try {
            const post = await Post.findOne({
                where: { postid }
            })

            if(post != null)
                return res.status(200).json(post);
            else
                return res.status(404);
        } catch (err) {
            console.log(err)
            return res.status(500).json({ error: "Failed to fetch post!" })
        }
    }
}
