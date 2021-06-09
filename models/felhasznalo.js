
const mongoose = require("mongoose");
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');

const felhasznaloSchema = new mongoose.Schema({
    email: String,
    password: String
});

felhasznaloSchema.plugin(passportLocalMongoose);

const Felhasznalo = new mongoose.model("Felhasznalo", felhasznaloSchema);

module.exports = Felhasznalo;



