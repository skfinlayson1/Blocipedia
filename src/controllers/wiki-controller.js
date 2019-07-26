const wikiQueries = require("../db/queries.wikis");

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
        res.render("wiki/new_wiki");
    },

    create(req, res, next) {

        if(req.user) {
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
            res.redirect("/users/sign_in");
        }
    },

    edit(req, res, next) {

        wikiQueries.show(req.params.id, (err, wiki) => {
            if (err || !wiki) {
                req.flash("error", "Wiki couldn't be found!")
                res.redirect("/wikis");
            } else {
                res.render(`wiki/edit_wiki`, {...wiki})
            }
        })
    },

    update(req, res, next) {

        if(req.user) {
            const newValues = {
                title: req.body.title,
                body: req.body.body,
                userId: req.user.id,
                private: req.body.private || false
            };

            wikiQueries.update(newValues, req.params.id, (err, response) => {
                if (err) {
                    req.flash("error", "Something went wrong");
                    res.redirect(`/wikis/${req.params.id}/edit`);
                } else {
                    res.redirect(`/wikis/${req.params.id}`);
                }
            })
        } else {
            req.flash("error", "Please sign in to do that!")
            res.redirect("/users/sign_in");
        }
    },

    destroy(req, res, next) {
        wikiQueries.destroy(req.params.id, (err, response) => {
            if (err) {
                req.flash("error", err);
                res.redirect(`/wikis/${req.params.id}`);
            } else {
                res.redirect(`/wikis`);
            }
        })
    }

}