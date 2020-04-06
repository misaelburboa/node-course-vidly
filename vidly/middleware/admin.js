module.exports = function(req, res, next) {
    console.log("ADMIN");
    if (!req.user.isAdmin) {
        return res.status(403).send('Access Denied.');
    }

    next();
};