# Bank App
This is a open source web app made by a group of students to simulate starting and mantaining a new project on a company.
![Landing-page](/public/images/Bank-app-landing-page.png)

## Setup

```sh
cd bankApp

npm init

node app.js
```

the app will be running at: `http://localhost:3000`

# Highlights

## Branch Structure

* The "master" branch has everything necessary to start a server locally for development.
* The "dbConnection" branch has all the modules necessary to deploy the website using MongoDB.

When using "dbConnection", rename the file ".env_sample" to ".env" and replace the information inside for your personal Keys.


## Handy Libraries:

see: `app.js`
```js
//Dotenv is a module to protect API keys
require('dotenv').config();
//Express framework for back-end structure with nodeJS
const express = require("express");
//bodyparser is a parsing middleware
const bodyParser = require("body-parser");
//EJS is an Embedded JavaScript templating used to connect the backend variables into the front end and create templates for heading and footer
const ejs = require("ejs");
//Mongoose is used to create data schemas for MongoDB
const mongoose = require('mongoose');
//session, passport and passportLocalMongoose are frameworks used to create users with very secure passwords and connect it to mongoDB
const session = require('express-session');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');
//connectLiveReload reloads the page automatically when notice any css, ejs or js files have been modified
var connectLiveReload = require("connect-livereload");
var livereload = require('livereload');
```

## Tips for developers:

* When you pull those new files, cd to the working folder and run the code "NPM init" to install the two NPM modules added.

* When using EJS, we change the extension of .HTML to .EJS so the framework can read it (it will make sense in the future).