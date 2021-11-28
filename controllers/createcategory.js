const { Category } = require('../models')

module.exports = {
    createCategoryHandler: async (req, res) => {
        const { name } = req.body;
        // check if the category already exists
        try {
            const category = await Category.findOne({
                where: { name }
            })

            if (category != null)
                return res.status(200).json({})
        } catch (err) {
            console.log(err)
            return res.status(500).json({ error: "Failed to create a new category!" })
        }

        try {
            const category = await Category.create({ name })
            // not to return the password
            return res.status(200).json({});
        } catch (err) {
            console.log(err)
            return res.status(500).json({ error: "Failed to create a new category!" })
        }
    }
}
