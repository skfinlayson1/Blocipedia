const wikiQueries = require("../db/queries.wikis");
const Authorizer = require("../policies/wiki");

module.exports = {

    home(req, res, next) {
        wikiQueries.home((err, wikis) => {
            if (err) {
                req.flash("error", err);
                res.redirect("/");
            } else {
                res.render("wiki/home", {wikis});
            }
        })
    },

    show(req, res, next) {

        wikiQueries.show(req.params.id, (err, wiki) => {
            if (err || !wiki) {
                req.flash("error", "Wiki couldn't be found!")
                res.redirect("/wikis");
            } else {
                res.render(`wiki/show_wiki`, {...wiki})
            }
        })

    },

    new(req, res, next) {

        const authorized = new Authorizer(req.user);

        if (authorized.newAndCreate()) {
            res.render("wiki/new_wiki");
        } else {
            req.flash("error", "Please create an account or sign in");
            res.redirect("/users/sign_up");
        }
        
    },

    create(req, res, next) {

        const authorized = new Authorizer(req.user);

        if (authorized.newAndCreate()) {
            const values = {
                title: req.body.title,
                body: req.body.body,
                userId: req.user.id,
                private: req.body.private || false
            }

            wikiQueries.create(values, (err, response) => {
                if (err) {
                    req.flash("error", err);
                    res.redirect("/");
                } else {
                    res.redirect("/") //fix this
                }
            })
        } else {
            req.flash("error", "Please sign in to do that!")
            res.redirect("/users/sign_up");
        }
    },

    edit(req, res, next) {

        wikiQueries.show(req.params.id, (err, wiki) => {
            if (err || !wiki) {
                req.flash("error", "Wiki couldn't be found!")
                res.redirect("/wikis");
            } else {

                const authorized = new Authorizer(req.user, wiki);
                
                if (authorized.editAndUpdate()) {
                    res.render(`wiki/edit_wiki`, {...wiki})
                } else {
                    req.flash("error", "You're not aloud to do that.")
                    res.redirect("/users/sign_up");
                }
                
            }
        })
    },

    update(req, res, next) {

            const newValues = {
                title: req.body.title,
                body: req.body.body,
                userId: req.user.id,
                private: req.body.private || false
            };

            wikiQueries.show(req.params.id, (err, wiki) => {
                if (err || !wiki) {
                    req.flash('error', "Couldn't find wiki entry.");
                    res.redirect(`/wikis/${req.params.id}`);
                } else {

                    const Authorized = new Authorizer(req.user, wiki);

                    wikiQueries.update(newValues, req.params.id, (err, response) => {
                        if (err) {
                            req.flash("error", "Something went wrong");
                            res.redirect(`/wikis/${req.params.id}/edit`);
                        } else {
                            res.redirect(`/wikis/${req.params.id}`);
                        };
                    })
                }
            })

      

    },

    destroy(req, res, next) {

        wikiQueries.show(req.params.id, (err, wiki) => {
            if (err || !wiki) {
                req.flash('error', "Couldn't find wiki entry.");
                res.redirect(`/wikis/${req.params.id}`);
            } else {

                const Authorized = new Authorizer(req.user, wiki);

                if (Authorized.editAndUpdate()) {
                    wikiQueries.destroy(req.params.id, (err, response) => {
                        if (err) {
                            req.flash("error", err);
                            res.redirect(`/wikis/${req.params.id}`);
                        } else {
                            res.redirect(`/wikis`);
                        }
                    })
                } else {
                    req.flash("error", "You're not aloud to do that.");
                    res.redirect("/wikis");
                }
            }
        })

    }

}