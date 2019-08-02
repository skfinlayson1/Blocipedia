const collaboratorQueries = require("../db/queries.collaborators");

module.exports = {

    addCollaborator(req, res, next) {

        // find the user the author is attempting to add as a collaborator
        collaboratorQueries.findUserByUsernameOrEmail(req.body.userOrEmail, (err, user) => {

            if (err || !user) {
                req.flash("error", "We couldn't find that user!")
                res.redirect(`/wikis/${req.params.wikiId}`);
            } else {

                // add the user and the wiki's primary key to the table
                collaboratorQueries.addCollaborator(user.id, user.username, req.params.wikiId, (err, response) => {

                    if (err) {
                        req.flash("error", "We couldn't add that user as a collaborator!")
                        res.redirect(`/wikis/${req.params.wikiId}`);
                    } else {
                        req.flash("userAdded", `User ${user.username} was added as a collaborator.`)
                        res.redirect(`/wikis/${req.params.wikiId}`)
                    }
                    
                })
            }

        })

    },



    removeCollaborator(req, res, next) {
        collaboratorQueries.removeCollaborator(req.params.userId, (err, response) => {
            if (err) { 
                req.flash("error", "We weren't able to remove that user.");
                res.redirect(req.headers.referer);
            } else {
                req.flash("notice", "User has been removed");
                res.redirect(req.headers.referer);
            }
        })
    }




}