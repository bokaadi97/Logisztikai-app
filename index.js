const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');
const Felhasznalo = require('./models/felhasznalo');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
//csak azért kell, hogy a GoogleStrategy-nél működjön a findOrCreate függvény
const findOrCreate = require("mongoose-findorcreate");

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


//a frissen létrehozott séma használata 
passport.use(Felhasznalo.createStrategy());


//=====1-ES VERZIÓ=======
passport.serializeUser(Felhasznalo.serializeUser());
passport.deserializeUser(Felhasznalo.deserializeUser());
//=====1-ES VERZIÓ VÉGE=======

//=====2-ES VERZIÓ=======

//ezek a szerializálók már nem csak lokálisan működnek, kellenek az OAuth-hoz
/*
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  Felhasznalo.findById(id, function(err, user) {
      done(err, user);
  });
});
*/
//=====2-ES VERZIÓ VÉGE=======


//Google strategy konfigurálása
passport.use(new GoogleStrategy({
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: "http://localhost:3000/auth/google/callback",
  userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
},
function(accessToken, refreshToken, profile, cb) {
  Felhasznalo.findOrCreate({ googleId: profile.id }, function (err, user) {
    return cb(err, user);
  });
}
));


/*
//mongoose inicializálása és egyben az officeDB létrehozása
mongoose.connect("mongodb+srv://bokaadi97:JELSZÓ_HELYE@cluster0.eln9b.mongodb.net/officeDB?retryWrites=true&w=majority",
    {
        //csak a depracation warningok miatt kell, a működést nem befolyásolja
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
*/

mongoose.connect('mongodb://localhost/logisztikai_rendszer',
    {
      //csak a depracation warningok miatt kell, a működést nem befolyásolja
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  
//szintén egy depracation warning miatt kell
mongoose.set("useCreateIndex", true);


app.use(bodyParser.urlencoded({extended: true}));

const server = app.listen(3000, function () {
  console.log("On: 3000");
});

require('./routes')(app);