const sgMail = require('@sendgrid/mail');
const passport = require("passport");

const userQueries = require("../db/queries.users");

module.exports = {

    // Show User information
    show(req, res, next) {

    },

    // Create new User
    signUp(req, res, next) {
        res.render("user/sign_up_form");
    },

    create(req, res, next) {
        const values = {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        };

        userQueries.create(values, (err, value) => {
            if(err) {
                req.flash("error", err);
                res.redirect("/users/sign_up");
            } else {

                sgMail.setApiKey(process.env.SENDGRID_API_KEY);
                const msg = {
                    to: value.email,
                    from: 'shane_finlayson@yahoo.com',
                    subject: 'Thank you!',
                    text: 'Thank you for signing up for blocipedia!', //change this
                    html: '<strong>Thank you for signing up for blocipedia!</strong>',
                };
                sgMail.send(msg);

                passport.authenticate("local")(req, res, () => {
                    req.flash("notice", "Sign in successful");
                    res.redirect("/");
                });

            }
        })
    },

    // Login existing User
    signIn(req, res, next) {
        res.render("user/sign_in_form")
    },

    login(req, res, next) {
        passport.authenticate("local", {
            failureRedirect: "/users/sign_in",
            failureFlash: true
            })(req, res, function () {
                if(!req.user) {
                    req.flash("error", "Sign in failed");
                    res.redirect("/users/sign_in");
                } else {
                    req.flash("notice", "Sign in successful");
                    res.redirect("/");
                }
            })
    },

    // Edit existing User
    edit(req, res, next) {

    },

    update(req, res, next) {

    },

    // Delete existing User
    signOut(req, res, next) {
        req.logout();
        req.flash("notice", "You've successfully signed out!");
        res.redirect("/");
    },

    makeAdmin(req, res, next) {
        userQueries.changeRole(req.params.id, 'admin', (err, response) => {
            if (err) {
                req.flash("error", "something went wrong!");
                res.redirect("/");
            } else {
                req.flash("notice", "You are now an admin!")
                res.redirect("/");
            }
        })
    }

}