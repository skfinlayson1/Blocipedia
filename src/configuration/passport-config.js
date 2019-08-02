const passport = require("passport");
const LocalStratagy = require('passport-local').Strategy;
const User = require("../db/models").User;
const helper = require("../authorizer/helpers");

module.exports = {

    init(app) {

        app.use(passport.initialize());
        app.use(passport.session());
        
        passport.use(new LocalStratagy((username, password, done) => {

            User.findOne({where: {username: username}})
            .then((user) => {
                if(!user) {return done(null, false, {message: "Incorrect username."})};
                if (!helper.comparePassword(password, user.password)) {
                    return done(null, false, {message: "Incorrect password"})
                };
                
                return done(null, user);
            })
            .catch((err) => {
                console.log(err);
                done();
            })
        }));

        passport.serializeUser((user, callback) => {
            callback(null, user.id);
        });

        passport.deserializeUser((id, callback) => {
            User.findByPk(id)
            .then((user) => {
                callback(null, user);
            })
            .catch((err) => {
                callback(err, user);
            })
        });

    }


}