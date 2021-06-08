module.exports = function() {
    return function(req, res, next) {
        if (typeof req.body.password === 'undefined') {
            return next();
        }

        if (req.body.password === 'jelszo') {
            req.session.belepve = true;
            return req.session.save(err => res.redirect('/'));
        }

        res.locals.error = 'Hibás jelszó!';
        return next();
    };
};
