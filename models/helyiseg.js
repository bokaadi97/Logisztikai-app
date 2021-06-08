const mongoose = require("mongoose");

const helyisegSchema = new mongoose.Schema({
    nev: String,
    megjegyzes: String
});

const Helyiseg = new mongoose.model("Helyiseg", helyisegSchema);

module.exports = Helyiseg;