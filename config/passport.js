const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const User = mongoose.model("users");
const keys = require("./keys");
const opts = {};
opts.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrkey;
// JWT Config
module.exports = passport => {
  passport.use(
    new JWTStrategy(opts, async (jwt_paylod, done) => {
      const user = await User.findById(jwt_paylod.id);
      if (user) return done(null, user);
      return done(null, false);
    })
  );
};
