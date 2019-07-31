const wikiQueries = require("../db/queries.wikis");
const Authorizer = require("../policies/wiki");

module.exports = {

    home(req, res, next) {
        wikiQueries.home((err, allWikis) => {
            if (err) {
                req.flash("error", err.message);
                res.redirect("/");
            } else {

                const authorized = new Authorizer(req.user, allWikis);
                const wikis = [];

                if (authorized.newAndCreate()) {

                    allWikis.forEach((wiki) => {
                        if (wiki.private === false || wiki.userId === req.user.id || req.user.role === "admin") {
                            wikis.push(wiki);
                        };
                    });

                } else {

                    allWikis.forEach((wiki) => {
                        if (wiki.private === false) {
                            wikis.push(wiki);
                        };
                    });

                }

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

                const user = req.user || null;
                const authorized = new Authorizer(user, wiki.wiki);

                if (authorized.allowedToView()) {
                    res.render(`wiki/show_wiki`, {...wiki});
                } else {
                    req.flash("error", "You're not allowed to do that.");
                    res.redirect("/wikis");
                }
                
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