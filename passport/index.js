const passport = require("passport");
const local = require("./strategies/local");
const jwt = require("./strategies/jwt");
const google = require("./strategies/google");

module.exports = () => {
  passport.use(local);
  // passport.use(jwt);
  passport.use(google);
  passport.serializeUser((user, done) => {
    done(null, user);
  });
  passport.deserializeUser((obj, done) => {
    done(null, obj);
  });
};
