//  index.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require("cors");
const session = require("express-session");
const session_secret = "ssshhh";

// IMPORT MODELS
require('./models/Category');
require('./models/User');
require('./models/Book');
require('./models/Cart');
// require('./models/AdminBooks');
const app = express();
app.use(cors({
  credentials: true,
  origin: "http://localhost:3000"
}));

app.use(
  session({
    secret: session_secret,
    cookie: { maxAge: 1 * 60 * 60 * 1000 },
    resave: true,
    saveUninitialized:true
  })
);
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || `mongodb://localhost:27017/lms-db`, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(bodyParser.json());

//IMPORT ROUTES
require('./routes/CategoryRoute')(app);
// IMPORT Book
require('./routes/BookRoute')(app);
require('./routes/CartRoute')(app);
// IMPORT User
require('./routes/UserRoute')(app);
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`app running on port ${PORT}`)
});