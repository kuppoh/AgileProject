const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const userController = require("../controller/userController");

const localLogin = new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password"
    },
    (email, password, done) => {
      // Correct asynchronous handling
      userController.getUserByEmailIdAndPassword(email, password)
        .then(user => {
          if (user) {
            return done(null, user);  // User found and authenticated
          } else {
            return done(null, false, { message: "Your login details are not valid. Please try again" });
          }
        })
        .catch(err => {
          return done(err);  // Error during authentication
        });
    }
);

passport.serializeUser(function (user, done) {
  done(null, user.id);  // Serialize only user ID into the session
});

passport.deserializeUser(function (id, done) {
  userController.getUserById(id)  // Assuming you have this function to fetch user by ID
    .then(user => {
      if (user) {
        done(null, user);  // User found by ID
      } else {
        done(new Error("User not found"), null);  // No user found
      }
    })
    .catch(err => {
      done(err, null);  // Error fetching user
    });
});

module.exports = passport.use(localLogin);
