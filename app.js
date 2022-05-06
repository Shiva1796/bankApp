//Dotenv is a module to protect API keys
require('dotenv').config();
//Express framework for back-end structure with nodeJS
const express = require("express");
const app = express();
//bodyparser is a parsing middleware
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));
//EJS is an Embedded JavaScript templating used to connect the backend variables into the front end and create templates for heading and footer
const ejs = require("ejs");
app.set('view engine', 'ejs');
//Mongoose is used to create data schemas for MongoDB
const mongoose = require('mongoose');
//session, passport and passportLocalMongoose are frameworks used to create users with very secure passwords and connect it to mongoDB
const session = require('express-session');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');
//Port that will be used to access the server
//process.env.PORT is used by Heroku
const port = process.env.PORT || 3000;
//Static create a path ("/public") to access css, images and scripts
app.use(express.static("public"));
//connectLiveReload reloads the page automatically when notice any css, ejs or js files have been modified
var connectLiveReload = require("connect-livereload");
var livereload = require('livereload');
var livereloadServer = livereload.createServer({extraExts: ['ejs']});
livereloadServer.watch([__dirname + "/public",__dirname + "/views"]);

livereloadServer.server.once("connection", () => {
    setTimeout(() => {
        livereloadServer.refresh("/");
    }, 100);
  });

app.use(connectLiveReload())

//passport safety setup
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());


//Connects to DataBase
main().catch(err => console.log(err));

async function main() {
  //const db = await mongoose.connect('mongodb+srv://admin-mauricio:'+process.env.MONGODB_KEY+'@cluster0.bdhma.mongodb.net/bankDB');
  const db = await mongoose.connect('mongodb://localhost:27017/bankDB')
}

//Creates a schema for the database
const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    balance: {
        type: Number,
        default: 0
    },
    transactions: []
});

//Uses one of the standard passport schemas
userSchema.plugin(passportLocalMongoose);


const User = mongoose.model("User", userSchema);

// use static authenticate method of model in LocalStrategy
passport.use(User.createStrategy());

// use static serialize and deserialize of model for passport session support
passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

app.route('/')
.get((req,res) => {
    res.render("index");
})
.post(passport.authenticate("local",{
    successRedirect: "/dashboard",
    failureRedirect: "/"
}), (req, res) => {
    
});

app.route('/register')
.get((req,res) => {
    res.render("register");
})
.post((req,res) => {
    User.register(new User ({username: req.body.username}), req.body.password, (err,user) => {
        if(!err) {
            passport.authenticate('local')(req, res, (err) => {
                if(!err) {
                    res.redirect('/dashboard')
                } else {
                    console.log("Autenticate error:");
                    console.log(err);
                    res.redirect('/register')
                }
            })
        } else {
            console.log("Register error:");
            console.log(err);
            res.redirect('/register')
        }
    })
})

app.get('/about', (req,res) => {
    res.render("about");
});

app.get('/contact', (req,res) => {
    res.render("contact");
});

app.get('/testimonials', (req,res) => {
    res.render("testimonials");
});

app.get('/dashboard', (req,res) => {
    if(req.isAuthenticated()) {
        res.render("dashboard", {username: req.user.username, balance: req.user.balance});
    } else {
        console.log("not autenticated");
        res.redirect('/')
    }
    
});

app.listen(port, function() {
    console.log("Server started on port 3000");
  });