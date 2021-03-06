// this middleware checks for mod permissions
module.exports = {
    modverify: async (req, res, next) => {
        // if the user is either mod or admin allow
        // for mods and admins the mod_categories will have more than one length
        if(req.body.mod_categories.length != 0 || req.body.isadmin) next();
        else res.status(403).send({ error: 'Unauthorized Access' });
    }
}