const express = require('express');
const Authrouter = require('./auth');
const DbRouter = require('./db');

class AppRouter {
    constructor() {
        this.router = express.Router();
        this.routes();
    }
    routes() {
        this.router.use('/auth', new Authrouter().router);
        this.router.use('/db', new DbRouter().router);
    }
}

module.exports = AppRouter;