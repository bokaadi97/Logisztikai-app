const mongoose = require("mongoose");
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');
const findOrCreate = require("mongoose-findorcreate");


const felhasznaloSchema = new mongoose.Schema({
    email: { type: String, unique: false, sparse:true},
    password: String
});

felhasznaloSchema.plugin(passportLocalMongoose);
felhasznaloSchema.plugin(findOrCreate);

const Felhasznalo = new mongoose.model("Felhasznalo", felhasznaloSchema);

module.exports = Felhasznalo;