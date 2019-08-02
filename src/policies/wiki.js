const ApplicationPolicies = require("./application");

module.exports = class wiki extends ApplicationPolicies {

    _isOwner() {
        return this.user && this.record && (this.user.id === this.record.wiki.userId || this._isAdmin());
    }

    allowedToView() {
        if(this.user) {
            return this.user.role === "admin" || !this.record.wiki.private || this.user.id === this.record.wiki.userId;
        } else {
            return !this.record.wiki.private;
        }
    }
    
    isCollaborator() {
        if(this.user) {
            let allowed = false;
            this.record.collaborators.forEach((collab) => {
                if (this.user.id === collab.collaboratorId) {
                    allowed = true;
                };
            });
            return allowed;
        } else {
            return false;
        }
    }

}