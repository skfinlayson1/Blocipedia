module.exports = class ApplicationPolicy  {

    constructor(user, record) {
        this.user = user;
        this.record = record;
    }

    _isMember() {
        return this.user && this.user.role === 'memeber';
    }

    _isProUser() {
        return this.user && this.user.role === 'pro';
    }

    _isAdmin() {
        return this.user && this.user.role === 'admin';
    }

    _isOwner() {
        return this.user.id === this.record.userId || this._isAdmin();
    }

    privateWiki() {
        return this._isOwner() || this._isAdmin();
    }

    newAndCreate() {
        return this.user != null;
    }

    editAndUpdate() {
        return this._isAdmin() || this._isOwner();
    }

    delete() {
        return this.editAndUpdate();
    }



}