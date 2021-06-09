module.exports = function() {
    return function(req, res, next) {
        req.logout();
        res.redirect("/login");
        /*
        req.session.destroy(err => {
            res.redirect('/login');
        });
        */
    };
};