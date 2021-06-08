//betölti egy helyiség adatait a helyisegid alapján
const requireOption = require('../option').requireOption;

module.exports = function (objRepo) {

    const helyisegModel = requireOption(objRepo, 'helyisegModel');

    return function (req, res, next) {
        helyisegModel.findOne({
            _id: req.params.helyisegid
        }, function (err, megtalaltHelyiseg) {
            if ((err) || (!megtalaltHelyiseg)) {
                return res.redirect('/helyiseg');
            }

            res.locals.helyiseg = megtalaltHelyiseg;
            return next();
        });
    };

};