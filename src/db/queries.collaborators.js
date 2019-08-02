const sequelize = require("sequelize");
const Op = sequelize.Op;

const Collaborator = require("./models").Collaborator;
const User = require("./models").User;



module.exports = {

    findUserByUsernameOrEmail(usernameOrEmail, callback) {
        //find the user with their username, email or email with .com attached
        User.findOne({
            where: {
                [Op.or]: [{username: usernameOrEmail}, {email: usernameOrEmail}, {email: usernameOrEmail + ".com"}]
            }
        })
        .then((user) => {
            callback(null, user);
        })
        .catch((err) => {
            callback(err);
        })
    },



    addCollaborator(userId, username, wikiId, callback) {
        Collaborator.findOrCreate({where: {
            collaboratorId: userId,
            collaboratorUsername: username,
            wikiId: wikiId
        }})
        .then((res) => {
            callback(null, res);
        })
        .catch((err) => {
            callback(err);
        })
    },



    removeCollaborator(userid, callback) {
        Collaborator.destroy({where: {collaboratorId: userid}})
        .then((res) => {
            callback(null, res);
        })
        .catch((err) => {
            callback(err);
        })
    }

}