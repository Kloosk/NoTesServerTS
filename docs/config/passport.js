"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const passport_jwt_1 = require("passport-jwt");
const mongoose_1 = require("mongoose");
const User = mongoose_1.model("users");
const keys = require("./keys");
const opts = {
    jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: keys.secretOrKey
};
module.exports = (passport) => {
    passport.use(new passport_jwt_1.Strategy(opts, (jwt_payload, done) => {
        User.findById(jwt_payload.id)
            .then((user) => {
            if (user)
                return done(null, user);
            return done(null, false);
        }).catch((err) => { throw new Error(err); });
    }));
};
