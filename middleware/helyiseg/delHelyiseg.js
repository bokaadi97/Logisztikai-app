//törli a betöltött helyiséget
const requireOption = require('../option').requireOption;;

module.exports = function(objRepo) {
    const eszkozModel = requireOption(objRepo, 'eszkozModel');

    return async function (req, res, next) {
        if (typeof res.locals.helyiseg === 'undefined') {
            return next();
        }

        await eszkozModel.deleteMany({_assignedto: res.locals.helyiseg._id});

        res.locals.helyiseg.remove(err => {
            if (err) {
                return next(err);
            }

            return res.redirect('/');
        });
    };
};