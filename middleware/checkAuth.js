// used for authentication

module.exports = {
    ensureAuthenticated: function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
    },
    forwardAuthenticated: function (req, res, next) {
        if (!req.isAuthenticated()) {
            return next();
        }
        res.redirect("/homepage"); // redirect to the user's homepage if they are authenticated
    },
    isAdmin: function (req, res, next) { // for admin/vet? views!
        if (req.user.role === "admin") {
            return next();
        }
        res.redirect("/login")
    }
};
