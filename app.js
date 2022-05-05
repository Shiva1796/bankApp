const express = require("express");
const ejs = require("ejs");
const app = express();
app.set('view engine', 'ejs');
const port = process.env.PORT || 3000;
app.use(express.static("public"));


app.get('/', (req,res) => {
    res.render("index");
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