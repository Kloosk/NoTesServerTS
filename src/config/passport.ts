import {Strategy as JwtStrategy,ExtractJwt} from 'passport-jwt';
import {model} from 'mongoose';

const User = model("users");
const keys = require("./keys");
const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: keys.secretOrKey
};

module.exports = (passport:any) => {
    passport.use(
        new JwtStrategy(opts, (jwt_payload, done) => {
            User.findById(jwt_payload.id)
                .then((user:any) => {
                    if (user) return done(null, user);
                    return done(null, false);
                }).catch((err:never) => {throw new Error(err)});
        })
    );
};