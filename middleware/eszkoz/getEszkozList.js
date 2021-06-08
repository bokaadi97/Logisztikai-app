//betölti az eszközök listáját
const requireOption = require('../option').requireOption;

module.exports = function(objRepo) {
    const eszkozModel = requireOption(objRepo, 'eszkozModel');

    return function(req, res, next) {
        eszkozModel.find({_assignedto: req.params.helyisegid}, (err, eszkozLista) => {
            if (err) {
                return next(err);
            }

            res.locals.eszkoz = eszkozLista;
            return next();
        });
    };
};
