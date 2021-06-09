const passport = require('passport');
const auth = require('./middleware/auth/auth');
const checkPass = require('./middleware/auth/checkPass');
const logout = require('./middleware/auth/logout');
const register = require('./middleware/auth/register');

const delEszkoz = require('./middleware/eszkoz/delEszkoz');
const getEszkoz = require('./middleware/eszkoz/getEszkoz');
const getEszkozList = require('./middleware/eszkoz/getEszkozList');
const saveEszkoz = require('./middleware/eszkoz/saveEszkoz');

const delHelyiseg = require('./middleware/helyiseg/delHelyiseg');
const getHelyiseg = require('./middleware/helyiseg/getHelyiseg');
const getHelyisegList = require('./middleware/helyiseg/getHelyisegList');
const saveHelyiseg = require('./middleware/helyiseg/saveHelyiseg');

const render = require('./middleware/render');

const eszkozModel = require('./models/eszkoz');
const helyisegModel = require('./models/helyiseg');
const felhasznaloModel = require('./models/felhasznalo');

module.exports = (app) => {

    const objRepo = {
        helyisegModel: helyisegModel,
        eszkozModel: eszkozModel,
        felhasznaloModel: felhasznaloModel
    };

    
    //új helyiség felvétele majd átirányítás az oldalára
    app.use('/helyiseg/new',
        auth(),
        saveHelyiseg(objRepo),
        render(objRepo, 'helyiseg_uj')
    );


    //egy addot helyiség odalának megjelenítése
    app.get('/helyiseg/:helyisegid',
        auth(),    
        getHelyiseg(objRepo),
        getEszkozList(objRepo),
        render(objRepo, 'helyiseg')
    );


    //helyiség nevének és megjegyzésének szerkesztése
    app.use('/helyiseg/edit/:helyisegid',
        auth(),
        getHelyiseg(objRepo),
        saveHelyiseg(objRepo),
        render(objRepo, 'helyiseg_mod')
    );


    //új eszköz létrehozása
    app.use('/eszkoz/:helyisegid/new',
        auth(),
        getHelyiseg(objRepo),
        saveEszkoz(objRepo),
        render(objRepo, 'eszkoz_uj')
    );


    //eszköz szerkesztése
    app.use('/eszkoz/:helyisegid/edit/:eszkozid',
        auth(),
        getEszkoz(objRepo),
        getHelyiseg(objRepo),
        saveEszkoz(objRepo),
        render(objRepo, 'eszkoz_mod')
    );


    //eszköz törlése majd átirányítás a régi helyiségének oldalára
    app.get('/eszkoz/:helyisegid/delete/:eszkozid',
        auth(),
        getEszkoz(objRepo),
        getHelyiseg(objRepo),
        delEszkoz()
    );


    //helyiség és az ahhoz tartozó eszközök törlése majd átirányítás a főoldalra
    app.get('/helyiseg/delete/:helyisegid',
        auth(),
        getHelyiseg(objRepo),
        delHelyiseg(objRepo)
    );

    app.use('/login',    
        checkPass(),
        render(objRepo, 'login')
    );

    app.use('/logout',
        logout()
    );

    app.use('/register',
        register(objRepo),
        render(objRepo, 'register')
    );


    //főoldalon kilistázza az összes helyiséget
    app.get('/',
        auth(),
        getHelyisegList(objRepo),
        render(objRepo, 'index')
    );

};