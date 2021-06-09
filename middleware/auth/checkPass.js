const passport = require("passport");
const Felhasznalo = require("../../models/felhasznalo");

module.exports = function() {
    return function(req, res, next) {
        const user = new Felhasznalo({
            username: req.body.username,
            password: req.body.password
        });

        return req.login(user, function(err){
            if(err){
                //console.log(err);
                return next();
            } else{
                passport.authenticate("local")(req,res,function(){
                    return res.redirect('/');
                });
                
            }
        });
        
        /*
        
        if (typeof req.body.password === 'undefined') {
            return next();
        }

        if (req.body.password === 'jelszo') {
            req.session.belepve = true;
            return req.session.save(err => res.redirect('/'));
        }

        res.locals.error = 'Hibás jelszó!';
        */

        //return next();
    };
};
