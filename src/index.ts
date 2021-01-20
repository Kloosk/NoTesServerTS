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

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server up and running on port ${port} !`));