const Wiki = require("./models").Wiki;
const User = require("./models").User;
const Collaborator = require("./models").Collaborator;

module.exports = {

    home(userId, callback) {
        Wiki.findAll({
            include: [{
                model: Collaborator,
                as: "collaborators"
            }]
        })
        .then((res) => {
            callback(null, res);
        })
        .catch((err) => {
            callback(err);
        })
    },



    create(values, callback) {
        Wiki.create({
            title: values.title,
            body: values.body,
            userId: values.userId,
            private: values.private
        })
        .then((res) => {
            callback(null, res);
        })
        .catch((err) => {
            callback(err);
        })
    },



    show(id, callback) {

        const result = {};

        //find the wiki requested
        Wiki.findByPk(id)
        .then((wiki) => {
            result.wiki = wiki;

            //find the user that created the wiki
            User.findByPk(wiki.userId)
            .then((user) => {
                result.user = user;

                //find all the collaborators related to the wiki
                Collaborator.findAll({ where: {wikiId: wiki.id} })
                .then((collaborators) => {
                    result.collaborators = collaborators;

                    callback(null, result);
                })
            })
        })
        .catch((err) => {
            callback(err);
        });
    },



    update(newValues, wikiId, callback) {
        Wiki.findByPk(wikiId)
        .then((wiki) => {
            wiki.update(newValues, {
                fields: Object.keys(newValues)
            })
            .then((res) => {
                callback(null, res);
            })
            .catch((err) => {
                callback(err);
            })
        })
        .catch((err) => {
            callback(err);
        })
    },

    

    destroy(id, callback) {
        Wiki.destroy({where: {id}})
        .then((res) => {
            callback(null, res);
        })
        .catch((err) => {
            callback(err);
        })
    }

} 