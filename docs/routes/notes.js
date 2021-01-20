"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const verify = require('../auth/verifyToken');
const validateAddNote = require("../validation/addNote");
const Notes = require("../models/Notes");
const PublicNotes = require("../models/PublicNotes");
router.get("/dashboard", verify, (req, res) => {
    const { id } = req.user;
    Notes.findOne({ userId: id })
        .then((notes) => {
        if (!notes)
            return res.status(404).json({ errors: "Error: User not found" });
        return res.json({ data: notes.notes });
    })
        .catch((err) => { throw new Error(err); });
});
router.post("/add", verify, (req, res) => {
    const { errors, isValid } = validateAddNote(req.body);
    if (!isValid) {
        return res.status(400).json({ errors });
    }
    let newObj = req.body;
    const { id, name } = req.user;
    Notes.findOne({ userId: id })
        .then((user) => {
        if (!user)
            return res.status(200).json({ errors: "Wrong Id" });
        newObj = Object.assign(Object.assign({}, newObj), { num: user.num });
        const arr = user.notes;
        arr.unshift(newObj);
        Notes.updateOne({ userId: id }, { $set: { num: user.num + 1 } })
            .then()
            .catch((err) => { throw new Error(err); });
        Notes.updateOne({ userId: id }, { $set: { notes: arr } })
            .then()
            .catch((err) => { throw new Error(err); });
    }).catch((err) => { throw new Error(err); });
    if (!newObj.status) {
        PublicNotes.findOne({ name: "publicNotes" })
            .then((res) => {
            if (!res) {
                const newNotes = new PublicNotes({
                    name: "publicNotes"
                });
                newNotes.save();
            }
        }).catch((err) => { throw new Error(err); });
        PublicNotes.findOne({ name: "publicNotes" }).then((res) => {
            const arrOfPublicNotes = res.publicNotes;
            arrOfPublicNotes.unshift(Object.assign(Object.assign({}, newObj), { name, num: arrOfPublicNotes.length }));
            PublicNotes.updateOne({ name: "publicNotes" }, { $set: { publicNotes: arrOfPublicNotes } })
                .then()
                .catch((err) => { throw new Error(err); });
        }).catch((err) => { throw new Error(err); });
    }
    return res.status(200).json({ msg: "Num update correctly" });
});
router.get("/edit", verify, (req, res) => {
    const num = req.header('id');
    const { id } = req.user;
    Notes.findOne({ userId: id })
        .then((response) => {
        if (!response)
            return res.status(400).json({ errors: "Wrong Id" });
        const { notes } = response;
        const post = notes.find((el) => el.num == num);
        return res.status(200).json({ data: post });
    }).catch((err) => { throw new Error(err); });
});
router.post("/edit", verify, (req, res) => {
    const { errors, isValid } = validateAddNote(req.body);
    if (!isValid) {
        return res.status(400).json({ errors });
    }
    let newObj = req.body;
    const { id } = req.user;
    Notes.findOne({ userId: id })
        .then((response) => {
        if (!response)
            return res.status(400).json({ errors: "Wrong Id" });
        const arr = response.notes;
        const noteIndex = arr.findIndex((el) => el.num == newObj.num);
        arr.splice(noteIndex, 1, newObj);
        Notes.updateOne({ userId: id }, { $set: { notes: arr } })
            .then(() => res.status(200).json({ msg: "Update correctly" }))
            .catch((err) => { throw new Error(err); });
    }).catch((err) => { throw new Error(err); });
});
router.post("/delete", verify, (req, res) => {
    let newObj = req.body;
    const { id } = req.user;
    Notes.findOne({ userId: id })
        .then((response) => {
        if (!response)
            return res.status(400).json({ errors: "Wrong Id" });
        const arr = response.notes;
        const noteIndex = arr.findIndex((el) => el.num == newObj.num);
        arr.splice(noteIndex, 1);
        Notes.updateOne({ userId: id }, { $set: { notes: arr } })
            .then(() => res.status(200).json({ msg: "Delete correctly" }))
            .catch((err) => { throw new Error(err); });
    }).catch((err) => { throw new Error(err); });
});
module.exports = router;
