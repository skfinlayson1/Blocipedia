const markdown = require("markdown").markdown;

const wikiQueries = require("../db/queries.wikis");
const Authorizer = require("../policies/wiki");

module.exports = {

    home(req, res, next) {

        // find all wikis
        wikiQueries.home((err, allWikis) => {
            if (err) {
                req.flash("error", err.message);
                res.redirect("/");
            } else {

                // check if the user is signed in
                const authorized = new Authorizer(req.user, allWikis);
                const wikis = [];

                if (authorized.newAndCreate()) {

                    // add all wikis that relate to the type of user currently signed in
                    // is the wiki private || private wiki owned by current user || user an admin
                    allWikis.forEach((wiki) => {
                        if (wiki.private === false || wiki.userId === req.user.id || req.user.role === "admin") {
                            wiki.title = markdown.toHTML(wiki.title);
                            wikis.push(wiki);
                        };
                    });

                } else {
                    // if user is a guest only show non private wikis
                    allWikis.forEach((wiki) => {
                        if (wiki.private === false) {
                            wiki.title = markdown.toHTML(wiki.title);
                            wikis.push(wiki);
                        };
                    });

                }

                res.render("wiki/home", {wikis});
            }
        })
    },

    show(req, res, next) {

        // find wiki data with primary key
        wikiQueries.show(req.params.id, (err, response) => {
            if (err || !response) {
                req.flash("error", "Wiki couldn't be found!")
                res.redirect("/wikis");
            } else {
                
                const user = req.user || null;
                const authorized = new Authorizer(user, response.wiki);

                // check if user is allowed to view this wiki
                // is the wiki private || private wiki owned by current user || user an admin
                if (authorized.allowedToView()) {
                    
                    // transpile markdown into HTML
                    response.wiki.title = markdown.toHTML(response.wiki.title);
                    response.wiki.body = markdown.toHTML(response.wiki.body);
                    res.render(`wiki/show_wiki`, {...response});
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