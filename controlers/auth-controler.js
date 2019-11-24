const PouchDB = require('pouchdb');
PouchDB.plugin(require('pouchdb-find'));

class AuthControler {
    constructor() {
        this.db = new PouchDB('../db/auth');
    }
    checkPassword(login, password) {
        return this.db.find({
            selector: {login, password},
            fields: ['_id', 'login'],
        });

    }
    createUser(login, password, email) {
        return this.db.post({
            login,
            password,
            email,
        });
    }

    changePassword(id, data) {
        return this._getUser(id).then(user => this._updateUser(user, data));
            
    }
    _updateUser(user, data) {

        return this.db.put({...user, ...data});
    }
    _getUser(id) {
        return this.db.get(id);
    }
}
module.exports = AuthControler;
