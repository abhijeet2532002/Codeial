// Express
const express = require('express');
const port = 9091;

// Database requirement
const db = require('./config/mongoose');

// import express layout
const expressLayout = require('express-ejs-layouts');

// import router
const router = require('./router/Home');

// session and cookies
const session = require('express-session');
const cookies = require('cookie-parser');

// mongo-connect server
const MongoStore = require('connect-mongo');

// passport require and config
const passport = require('passport');
const passportConfig = require('./config/PassportConfig');
const passportGoogle = require('./config/PassportGoogleAuth');

const app = express();

console.log('chat server is listening on port 6000');

// express Layout
app.use(expressLayout);
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);
app.use('/uploads',express.static(__dirname + '/uploads'));

// Encode the url
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// SESSION COOKIES
app.use(cookies());
app.use(session({
    name: 'codeial',
    secret: "secret key",
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: (1000 * 60 * 60)
    },
    store: MongoStore.create({
        mongoUrl: 'mongodb://localhost:27017/pratice2',
        autoRemove: 'native'
    })
}));

// passport
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAunthenticatedUser);

// Static file or view file
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('assests'));

// Router
app.use('/',router);

// app server
app.listen(port, (err) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log(`project is start running on port number : ${port}`);
});