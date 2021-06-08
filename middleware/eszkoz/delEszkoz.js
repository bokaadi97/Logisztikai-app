//törli a betöltött eszközt
module.exports = function() {
    return function(req, res, next) {
        if (typeof res.locals.eszkoz === 'undefined') {
            return next();
        }

        res.locals.eszkoz.remove(err => {
            if (err) {
                return next(err);
            }

            return res.redirect('/helyiseg/' + res.locals.helyiseg._id );
        });
    };
};
