import express from 'express';
import bcrypt from "bcryptjs";
import jwt  from "jsonwebtoken";

const router = express.Router();
const keys = require("../config/keys");

// Load input validation
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");

// Load User model
const User = require("../models/User");
//Load Notes model
const Notes = require("../models/Notes");

// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/register", (req, res) => {
    // Form validation
    const { errors, isValid } = validateRegisterInput(req.body);
    // Check validation
    if (!isValid) {
        return res.status(400).json({errors});
    }

    User.findOne({ email: req.body.email }).then((user:any) => {
        if (user) {
            return res.status(400).json({ errors: ["Email already exists" ]});
        } else {
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            });
            // Hash password before saving in database
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser
                        .save()
                        .then((user:any) =>{
                            res.send("ok");
                            //Create new notes bind to User
                            const newNotes = new Notes({
                                userId: user.id,
                            });
                            newNotes.save().then().catch((err:never) => {
                                    throw new Error(err)
                                });
                        }).catch((err:never) => {
                        throw new Error(err)
                    });
                });
            });
        }
    });
});

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", (req, res) => {
    // Form validation
    const { errors, isValid } = validateLoginInput(req.body);
    // Check validation
    if (!isValid) {
        return res.status(400).json({errors});
    }
    const email = req.body.email;
    const password = req.body.password;
    // Find user by email
    User.findOne({ email }).then((user:any) => {
        // Check if user exists
        if (!user) {
            return res.status(404).json({ errors:["Email not found" ]});
        }
// Check password
        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                // User matched
                // Create JWT Payload
                const payload = {
                    id: user.id,
                    name: user.name
                };
                // Sign token
                jwt.sign(
                    payload,
                    keys.secretOrKey,
                    {
                        expiresIn: 31556926 // 1 year in seconds
                    },
                    (err, token) => {
                        res.json({
                            success: true,
                            token: token
                        });
                    }
                );
            } else {
                return res
                    .status(400)
                    .json({ errors:["Password incorrect"]});
            }
        });
    });
});

module.exports = router;