const sgMail = require('@sendgrid/mail');
const userQueries = require("../db/queries.users");

module.exports = {

    // Show User information
    show(req, res, next) {

    },

    // Create new User
    signUp(req, res, next) {
        res.render("user/sign_in_form");
    },

    create(req, res, next) {
        const values = {
            userName: req.body.userName,
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

                res.redirect(302, "/");
            }
        })
    },

    // Login existing User
    signIn(req, res, next) {

    },

    login(req, res, next) {

    },

    // Edit existing User
    edit(req, res, next) {

    },

    update(req, res, next) {

    },

    // Delete existing User
    destroy(req, res, next) {

    }

}