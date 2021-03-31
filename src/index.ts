import express from "express";
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
import passport from "passport";
const cors = require('cors');

const users = require("./routes/users");
const notes = require("./routes/notes");
const publicNotes = require("./routes/publicNotes");

const app = express();

// Bodyparser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Cors
app.use(cors());

// DB Config
const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose.connect(db, { useNewUrlParser: true,useUnifiedTopology: true})
    .then(() => console.log("MongoDB successfully connected"))
    .catch((err:never) => {
        throw new Error(err)
    })
;

// Passport middleware
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);

//Route Users
app.use("/api/users", users);
//Route PublicNotes
app.use("/api/", publicNotes);
//Route Notes
app.use("/api/notes", notes);
const arrData = [{id: 3, message: "test 3"},{id: 1, message: "test one"},{id: 2, message: "test 2"}];
let i=4;
setTimeout(() => {
    arrData.push({id: i, message: `test ${i}`});
},30000);
app.get('/newmember', async (req, res, next) => {
    const token = req.header('Authorization')
    if (token) {
        try {
            return res.json({"notifcations":arrData})
        } catch (e) {
            res.status(401).send('Incorrect token')
        }
    } else {
        res.status(401).send('Not authorized')
    }
})
app.post('/auth', async (req, res, next) => {
    const { email, password } = req.body
    if (!email || !password)
        return res.status(400).send('Did not supply either email or password!')

    const accessToken = 1234567891011121316466
    return res.json({ accessToken })
})





const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server up and running on port ${port} !`));