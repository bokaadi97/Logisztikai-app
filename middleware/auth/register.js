const passport = require("passport");
const requireOption = require('../option').requireOption;

module.exports = function(objRepo) {
    const Felhasznalo = requireOption(objRepo, 'felhasznaloModel');

    return function(req, res, next) {        
        Felhasznalo.register({username: req.body.username}, req.body.password, function(err, user){
            if(err){                
                //console.log(err);
                return res.redirect("/register");
            } else {
                passport.authenticate("local")(req, res, function(){
                    return res.redirect("/");
                });
            }
        });
        
        return next();
    };
};

