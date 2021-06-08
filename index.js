const express = require('express');
const app = express();
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const session = require('express-session');

app.set('view engine', 'ejs');

app.use(
  session({
      secret: 'secret'
  })
);

/*
//mongoose inicializálása és egyben az officeDB létrehozása
mongoose.connect("mongodb+srv://bokaadi97:JELSZÓ_HELYE@cluster0.eln9b.mongodb.net/officeDB?retryWrites=true&w=majority",
    {
        //csak a depracation warningok miatt kell, a működést nem befolyásolja
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
*/

mongoose.connect('mongodb://localhost/BX4XFR',
    {
      //csak a depracation warningok miatt kell, a működést nem befolyásolja
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

app.use(bodyParser.urlencoded({extended: true}));

const server = app.listen(3000, function () {
  console.log("On :3000");
});

require('./routes')(app);