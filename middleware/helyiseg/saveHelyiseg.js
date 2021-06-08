//menti (vagy frissíti, ha már létezik) a helyiség adatait, ha azok adottak
const requireOption = require('../option').requireOption;

module.exports = function (objRepo) {
    let helyisegModel = requireOption(objRepo, 'helyisegModel');

    return function (req, res, next) {
        if (typeof req.body.nev === 'undefined'){
            return next();
        }

        if (typeof res.locals.helyiseg === 'undefined') {
            res.locals.helyiseg = new helyisegModel();
        }

        res.locals.helyiseg.nev = req.body.nev;
        res.locals.helyiseg.megjegyzes = req.body.megjegyzes;

        return res.locals.helyiseg.save(function(err,result) {
            if (err) {
                return next(err);
            }

            return res.redirect('/helyiseg/' + result.id);
        });

    };

};