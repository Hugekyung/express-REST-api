module.exports = (req, res, next) => {
    if (req.isAuthenticated()) { 
        return next();
    }
    return res.status(403).send("403 Error") 
}