const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const userController = require('../controller/userController.js');


const localLogin = new LocalStrategy(
    {
        usernameField: "email",
        passwordField: "password",
    },
    async (email, password, done) => {
        try {
        const user = await userController.getUserByEmailIdAndPassword(email, password);
        return user
            ? done(null, user)
            : done(null, false, { message: "Invalid email or password" });
        } catch (error) {
        done(null, false, { message: "Invalid email or password" });
        }
    }
);


passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(async function (id, done) {
    try {
        let user = await userController.getUserById(id);
        if (user) {
        done(null, user);
        } else {
        done({ message: "User not found" }, null);
        }
    } catch (error) {
        done(error);
    }
});

module.exports = passport.use(localLogin);