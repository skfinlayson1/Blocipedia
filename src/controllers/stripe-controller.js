const secretKey = process.env.STRIPE_SECRET;
const stripeKey = process.env.STRIPE_KEY;

const stripe = require("stripe")(secretKey);
const Authorizer = require("../policies/stripe.js");
const userQueries = require("../db/queries.users");

module.exports = {

    proPage(req, res, next) {
        const authorized = new Authorizer(req.user);

        if(authorized.newAndCreate()) {
            res.render("stripe/stripe-purchase.ejs");
        } else {
            req.flash("error", "Please sign in to do that");
            res.redirect("/users/sign_up_form");
        };

    },

    charge(req, res, next) {

        let amount = 1500;

        stripe.customers.create({
            email: req.body.email,
            card: req.body.id
        })
        .then((customer) => {

            stripe.charges.create({
                amount,
                description: "Pro Member Charge",
                currency: "usd",
                customer: customer.id
            })
            .then((charge) => {
                userQueries.changeRole(req.params.id, "pro", (err, response) => {
                    if (err) {
                        req.flash("error", "Something went wrong!");
                        res.redirect(307, "/");
                    } else {
                        req.flash("error", "You are now a Pro member");
                        res.redirect(307, "/");
                    }
                })

            })
            .catch((err) => {
                req.flash("error", "Payment Failed")
                res.redirect(307, "/");
            })
        })

    },

}