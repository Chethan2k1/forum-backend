// this middleware checks for mod permissions
module.exports = {
    modverify: async (req, res, next) => {
        // if the user is either mod or admin allow
        // for mods
        if(req.body.mod_categories.length != 0) next();
    }
}