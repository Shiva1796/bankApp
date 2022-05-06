const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
const port = process.env.PORT || 3000;
app.use(express.static("public"));
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

app.get('/', (req,res) => {
    res.render("index");
});

app.post('/', (req,res) => {
    console.log(req.body);
    res.render("dashboard", { userName: req.body.username });
})

app.get('/register', (req,res) => {
    res.render("register");
});

app.get('/about', (req,res) => {
    res.render("about");
});

app.get('/contact', (req,res) => {
    res.render("contact");
});

app.get('/testimonials', (req,res) => {
    res.render("testimonials");
});


app.listen(port, function() {
    console.log("Server started on port 3000");
  });