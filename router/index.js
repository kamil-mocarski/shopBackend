const express = require('express');
const Authrouter = require('./auth');

class AppRouter {
    constructor() {
        this.router = express.Router();
        this.routes();
    }
    routes() {
        this.router.use('/auth', new Authrouter().router)
    }
}

module.exports = AppRouter;