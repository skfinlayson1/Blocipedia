const bcrypt = require("bcrypt");

const User = require("./models").User;
const Wiki = require("./models").Wiki;
const Collaborator = require("./models").Collaborator;

module.exports = {

    show(id, callback) {

    },


    //create a new user and hash their password in the process
    create(values, callback) {
        const salt = bcrypt.genSaltSync();
        const hashedPassword = bcrypt.hashSync(values.password, salt);

        User.create({
            username: values.username,
            email: values.email,
            password: hashedPassword
        })
        .then((user) => {
            callback(null, user);
        })
        .catch((err) => {
            callback(err);
        })
    },


    // change the role of a user only, or change the role and set the users wiki's to public as well
    changeRole(id, role, changePrivateAndCollaborators, callback) {
        // Find the user
        User.findByPk(id)
        .then((user) => {
            // Update the users role to the value passed into the function
            user.update({role: role})
            .then((res) => {
                // check if we want their private wikis to become public and collaborators removed
                if (changePrivateAndCollaborators) {
                    Wiki.findAll({where: {userId: user.id, private: true}})
                    .then((wikis) => {
                        wikis.forEach((wiki) => {
                            wiki.update({private: false});
                        });

                        // return with all the users wikis set to public
                        callback(null, wikis);
                    })
                    .catch((err) => {

                        callback(err);
                    });
                } else {

                    // return the user with only the user role being changed
                    callback(null, res);                    
                }
            })
            .catch((err) => {
                callback(err);
            });
        });

    }

    

}