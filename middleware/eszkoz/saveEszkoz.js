//menti (vagy frissíti, ha már létezik) az eszköz adatait, ha azok adottak
const requireOption = require('../option').requireOption;

module.exports = function (objRepo) {
    const eszkozModel = requireOption(objRepo, 'eszkozModel');

    return function (req, res, next) {

        if (
            (typeof req.body.nev === 'undefined') ||
            (typeof req.body.mennyiseg === 'undefined') ||
            (typeof req.body.megjegyzes === 'undefined')
        ){
            return next();
        }

        if (typeof res.locals.eszkoz === 'undefined') {
            res.locals.eszkoz = new eszkozModel();
        }

        if (Number.isNaN(parseInt(req.body.mennyiseg))) {
            return next(new Error('A mennyiséget számmal kell megadni!'));
        }

        res.locals.eszkoz.nev = req.body.nev;
        res.locals.eszkoz.mennyiseg = parseInt(req.body.mennyiseg);
        res.locals.eszkoz.megjegyzes = req.body.megjegyzes;
        res.locals.eszkoz._assignedto = res.locals.helyiseg.id;

        return res.locals.eszkoz.save(function(err) {
            if (err) {
                return next(err);
            }

            return res.redirect('/helyiseg/' + res.locals.helyiseg.id);
        });

    };

};