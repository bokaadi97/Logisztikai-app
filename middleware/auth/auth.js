module.exports = function() {
    return function(req, res, next) {
        if (typeof req.session.belepve === 'undefined' || req.session.belepve !== true) {
            return res.redirect('/login');
        }

        next();
    };
};