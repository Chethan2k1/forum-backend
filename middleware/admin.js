// this middleware checks for admin permissions
module.exports = {
    adminverify: async (req, res, next) => {
        // if the user is either mod or admin allow
        // for mods and admins the mod_categories will have more than one length
        if(req.body.isadmin) next();
        else res.status(403).send({ error: 'Unauthorized Access' });
    }
}