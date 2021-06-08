//betölti egy eszköz adatait a helyisegid alapján
const requireOption = require('../option').requireOption;

module.exports = function (objRepo) {

    const eszkozModel = requireOption(objRepo, 'eszkozModel');

    return function (req, res, next) {
        eszkozModel.findOne({
            _id: req.params.eszkozid
        }, function (err, megtalaltEszkoz) {
            if ((err) || (!megtalaltEszkoz)) {
                return res.redirect('/');
            }

            res.locals.eszkoz = megtalaltEszkoz;
            return next();
        });
    };

};