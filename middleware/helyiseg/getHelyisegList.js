//betölti a helyiséget listáját
const requireOption = require('../option').requireOption;

module.exports = function(objRepo) {
    const helyisegModel = requireOption(objRepo, 'helyisegModel');

    return function(req, res, next) {
        helyisegModel.find({}, (err, helyisegLista) => {
            if (err) {
                return next(err);
            }

            res.locals.helyiseg = helyisegLista;
            return next();
        });
    };
};
