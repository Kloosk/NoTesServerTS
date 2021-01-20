import express from 'express';

const router = express.Router();
const verify = require('../auth/verifyToken');

// Load input validation
const validateAddNote = require("../validation/addNote");

//Load Notes model
const Notes = require("../models/Notes");
//Load PublicNotes model
const PublicNotes = require("../models/PublicNotes");

// @route GET api/notes/dashboard
// @desc Return all notes
// @access Private
router.get("/dashboard",verify,(req, res) => {
    const {id} = (req as any).user;
    Notes.findOne({id}).then((notes:any) => {
        // Check if notes exist
        if (!notes) {
            return res.status(404).json({ errors: "Error: User not found" });
        }
        res.json({
            data: notes.notes
        });
    });
});

// @route POST api/notes/add
// @desc Added new note
// @access Private
router.post("/add",verify,(req, res) => {
    // Form validation
    const { errors, isValid } = validateAddNote(req.body);
    // Check validation
    if (!isValid) {
        return res.status(400).json({errors});
    }

    let newObj = req.body;
    const {id,name} = (req as any).user;

    Notes.findOne({userId: id})
        .then((user:any) => {
            if(!user) return res.status(200).json({ errors: "Wrong Id" });

            newObj = {...newObj,num: user.num};//added to req obj new value: num(is unique id for one note)
            const arr = user.notes;//array with notes
            arr.unshift(newObj);//added to array with notes on first position(index 0)

            Notes.updateOne(//update num
                {userId: id},
                {$set: {num: user.num+1}})
                .then()
                .catch((err:never) => {throw new Error(err)});

            Notes.updateOne(//update array with notes
                {userId: id},
                {$set: {notes: arr}})
                .then()
                .catch((err:never) => {throw new Error(err)});
        }).catch((err:never) => {throw new Error(err)});

    //if status == false, add to public section
    if(!newObj.status){
        PublicNotes.findOne({name: "publicNotes"})
            .then((res:any) => {
            if(!res){
                const newNotes = new PublicNotes({
                    name: "publicNotes"
                });
                newNotes.save();
            }
        }).catch((err:never) => {throw new Error(err)});

        PublicNotes.findOne({name: "publicNotes"}).then((res:any) => {
            const arrOfPublicNotes = res.publicNotes;

            arrOfPublicNotes.unshift({...newObj,name,num: arrOfPublicNotes.length});

            PublicNotes.updateOne(
                {name: "publicNotes"},
                {$set: {publicNotes: arrOfPublicNotes}})
                .then()
                .catch((err:never) => {throw new Error(err)});
        }).catch((err:never) => {throw new Error(err)});
    }
    return res.status(200).json({msg: "Num update correctly"});
});

// @route GET api/users/edit
// @desc Return note with passed id
// @access Private
router.get("/edit",verify,(req, res) => {
    const num = req.header('id');
    const {id} = (req as any).user;
    Notes.findOne({userId: id})
        .then((response:any) => {
            if (!response) return res.status(400).json({errors: "Wrong Id"});

            const {notes} = response;
            const post = notes.find((el:any) => el.num == num);
            return res.status(200).json({data: post});
        }).catch((err:never) => {throw new Error(err)});

});


// @route POST api/notes/edit
// @desc Update note with passed num
// @access Private
router.post("/edit",verify,(req, res) => {
    // Form validation
    const { errors, isValid } = validateAddNote(req.body);
    // Check validation
    if (!isValid) {
        return res.status(400).json({errors});
    }

    let newObj = req.body;
    const {id} = (req as any).user;
    Notes.findOne({userId: id})
        .then((response:any) => {
            if (!response) return res.status(400).json({errors: "Wrong Id"});

            const arr = response.notes; //array from db
            const noteIndex = arr.findIndex((el:any) => el.num == newObj.num); //searching index of edited note
            arr.splice(noteIndex,1,newObj); //replace note with new one

            Notes.updateOne(//update array with notes
                {userId: id},
                {$set: {notes: arr}})
                .then(() => res.status(200).json({msg: "Update correctly"}))
                .catch((err:never) => {throw new Error(err)});
        }).catch((err:never) => {throw new Error(err)});

});

// @route POST api/notes/delete
// @desc Delete note with this num
// @access Private
router.post("/delete",verify,(req, res) => {
    let newObj = req.body;
    const {id} = (req as any).user;
    Notes.findOne({userId: id})
        .then((response:any) => {
            if (!response) return res.status(400).json({errors: "Wrong Id"});

            const arr = response.notes; //array from db
            const noteIndex = arr.findIndex((el:any) => el.num == newObj.num); //searching index of edited note
            arr.splice(noteIndex,1); //delete note

            Notes.updateOne(//update array with notes
                {userId: id},
                {$set: {notes: arr}}
            )
                .then(() => res.status(200).json({msg: "Delete correctly"}))
                .catch((err:never) => {throw new Error(err)});
        }).catch((err:never) => {throw new Error(err)});
});

module.exports = router;