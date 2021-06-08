const mongoose = require("mongoose");
const Schema = require('mongoose').Schema;

const eszkozSchema = new mongoose.Schema({
        nev: String,
        mennyiseg: Number,
        megjegyzes: String,
        _assignedto: {
            type: Schema.Types.ObjectId,
            ref: 'Helyiseg'
        }
});

const Eszkoz = new mongoose.model("Eszkoz", eszkozSchema);

module.exports = Eszkoz;


