const express =require('express');
const AuthController = require('../controlers/auth-controler');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();


class AuthRouter {
    constructor() {
        this.router = express.Router();
        this.controller = new AuthController();
        this.routes();
    }
    routes() {
        this.router.post('/', jsonParser, this._checkPassword.bind(this));

        this.router.post('/create', jsonParser, this._createUser.bind(this));

        this.router.put('/:id', jsonParser, this._changePassword.bind(this));
    }

    _checkPassword(req, res) {
        const userData = req.body;
        this.controller.checkPassword(userData.login, userData.password)
        .then(response => {
            if(response.docs.length === 0) {
                res.status(401).send('wrong credentials');
            } else {
                res.status(200).send(response.docs[0]);
            }
        })
    }
    _createUser(req, res) {
        const userData = req.body;
        this.controller.createUser(userData.login, userData.password, userData.email,)
        .then((response) => {
            res.send(response);
        })
        .catch((err) => {
            res.status(500).send(err);
        });
    }
    _changePassword(req, res) {
        const id = req.params.id;
        this.controller.changePassword(id, req.body)
        .then(response => res.send(response))
        .catch(err => res.status(500).send(err));
    }
}
module.exports = AuthRouter;