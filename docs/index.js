"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
app.get('/newmember', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.header('Authorization');
    if (token) {
        try {
            return res.json([{ id: 1, messages: [{ id: 1, message: "test one" }, { id: 2, message: "test 2" }] }]);
        }
        catch (e) {
            res.status(401).send('Incorrect token');
        }
    }
    else {
        res.status(401).send('Not authorized');
    }
}));
app.post('/auth', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password)
        return res.status(400).send('Did not supply either email or password!');
    const accessToken = 1234567891011121316466;
    return res.json({ accessToken });
}));
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server up and running on port ${port} !`));
