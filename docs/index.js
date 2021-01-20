"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport_1 = __importDefault(require("passport"));
const cors = require('cors');
const users = require("./routes/users");
const notes = require("./routes/notes");
const publicNotes = require("./routes/publicNotes");
const app = express_1.default();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
const db = require("./config/keys").mongoURI;
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB successfully connected"))
    .catch((err) => {
    throw new Error(err);
});
app.use(passport_1.default.initialize());
require("./config/passport")(passport_1.default);
app.use("/api/users", users);
app.use("/api/", publicNotes);
app.use("/api/notes", notes);
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server up and running on port ${port} !`));
