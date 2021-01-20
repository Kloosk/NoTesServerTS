"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const router = express_1.default.Router();
const keys = require("../config/keys");
const verify = require('../auth/verifyToken');
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");
const User = require("../models/User");
const Notes = require("../models/Notes");
router.post("/register", (req, res) => {
    const { errors, isValid } = validateRegisterInput(req.body);
    if (!isValid) {
        return res.status(400).json({ errors });
    }
    User.findOne({ email: req.body.email }).then((user) => {
        if (user) {
            return res.status(400).json({ errors: ["Email already exists"] });
        }
        else {
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            });
            bcryptjs_1.default.genSalt(10, (err, salt) => {
                bcryptjs_1.default.hash(newUser.password, salt, (err, hash) => {
                    if (err)
                        throw err;
                    newUser.password = hash;
                    newUser
                        .save()
                        .then((user) => {
                        res.send("ok");
                        const newNotes = new Notes({
                            userId: user.id,
                        });
                        newNotes.save().then().catch((err) => {
                            throw new Error(err);
                        });
                    }).catch((err) => {
                        throw new Error(err);
                    });
                });
            });
        }
    });
});
router.post("/login", (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body);
    if (!isValid) {
        return res.status(400).json({ errors });
    }
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({ email }).then((user) => {
        if (!user) {
            return res.status(404).json({ errors: ["Email not found"] });
        }
        bcryptjs_1.default.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                const payload = {
                    id: user.id,
                    name: user.name
                };
                jsonwebtoken_1.default.sign(payload, keys.secretOrKey, {
                    expiresIn: 31556926
                }, (err, token) => {
                    res.json({
                        success: true,
                        token: token
                    });
                });
            }
            else {
                return res
                    .status(400)
                    .json({ errors: ["Password incorrect"] });
            }
        });
    });
});
router.post("/changename", verify, (req, res) => {
    const data = req.body;
    const { id } = req.user;
    if (typeof data.name === undefined) {
        return res.status(400).json({ errors: ["Name doesn't exist"] });
    }
    if (data.name.length > 20 || data.name.length < 3) {
        return res.status(400).json({ errors: ["Required length 3-20"] });
    }
    User.updateOne({ _id: id }, { $set: { name: data.name } })
        .then(() => res.status(200).json({ errors: [] }))
        .catch((err) => { throw new Error(err); });
});
router.delete("/removeacc", verify, (req, res) => {
    const { id } = req.user;
    User.deleteOne({ _id: id })
        .then(() => res.status(200).json({}))
        .catch((err) => { throw new Error(err); });
});
module.exports = router;
