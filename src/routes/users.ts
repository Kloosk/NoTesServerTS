import express from 'express';
import bcrypt from "bcryptjs";
import jwt  from "jsonwebtoken";

const router = express.Router();
const keys = require("../config/keys");
const verify = require('../auth/verifyToken');

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
// @route POST api/users/changename
// @desc Change name of user
// @access Private
router.post("/changename",verify,(req, res) => {
    const data = req.body;
    const {id} = (req as any).user;
    if(typeof data.name === undefined){
        return res.status(400).json({errors: ["Name doesn't exist"]});
    }
    if(data.name.length > 20 || data.name.length < 3){
        return res.status(400).json({errors: ["Required length 3-20"]});
    }
    User.updateOne(//update username
        {_id: id},
        {$set: {name: data.name}})
        .then(() => res.status(200).json({errors: []}))
        .catch((err:never) => {throw new Error(err)});
});
// @route DELETE api/users/removeacc
// @desc Remove account
// @access Private
router.delete("/removeacc",verify,(req, res) => {
    const {id} = (req as any).user;
    User.deleteOne({_id: id})
        .then(() => res.status(200).json({}))
        .catch((err:never) => {throw new Error(err)});
});

module.exports = router;