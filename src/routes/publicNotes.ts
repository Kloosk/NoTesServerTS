import express from 'express';

const router = express.Router();
const verify = require('../auth/verifyToken');

//Load Notes model
const PublicNotes = require("../models/PublicNotes");

// @route GET api/publicnotes
// @desc Get all publicnotes
// @access Private
router.get("/publicnotes",verify,(req, res) => {
    PublicNotes.findOne({name: "publicNotes"})
        .then((notes:any) => res.status(200).json(notes.publicNotes))
        .catch((err:never) => res.status(400).json({err}))
});

module.exports = router;
