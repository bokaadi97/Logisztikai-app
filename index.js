const express = require('express');
const app = express();
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');
const Felhasznalo = require('./models/felhasznalo');

app.set('view engine', 'ejs');

app.use(session({
      secret: 'mySecret',
      resave: false,
      saveUninitialized: false
  })
);

//Passport inicializálása
app.use(passport.initialize());
//Passport használja a fentebb beállított session-t
app.use(passport.session());

/*

//todo models mappába kiszervezni ======================
const felhasznaloSchema = new mongoose.Schema({
    email: String,
    password: String
});

felhasznaloSchema.plugin(passportLocalMongoose);

const Felhasznalo = new mongoose.model("Felhasznalo", felhasznaloSchema);

*/


//a frissen létrehozott séma használata 
passport.use(Felhasznalo.createStrategy());
passport.serializeUser(Felhasznalo.serializeUser());
passport.deserializeUser(Felhasznalo.deserializeUser());




//mongoose inicializálása és egyben az officeDB létrehozása
mongoose.connect("mongodb+srv://bokaadi97:JELSZO_HELYE@cluster0.eln9b.mongodb.net/officeDB?retryWrites=true&w=majority",
    {
        //csak a depracation warningok miatt kell, a működést nem befolyásolja
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

/*
mongoose.connect('mongodb://localhost/BX4XFR',
    {
      //csak a depracation warningok miatt kell, a működést nem befolyásolja
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
*/    
//szintén egy depracation warning miatt kell
mongoose.set("useCreateIndex", true);


app.use(bodyParser.urlencoded({extended: true}));

const server = app.listen(3000, function () {
  console.log("On: 3000");
});

require('./routes')(app);