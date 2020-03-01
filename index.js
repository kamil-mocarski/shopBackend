const express = require('express');
const path = require('path');
const AppRouter = require('./router');
const cors = require('cors');
class App {
    constructor() {
        this.httpApp = express();
        this.httpApp.use(cors());
        console.log("App has been created");

        this.startServer(3000).then(() => {
        console.log('Server has been started at port 3000')
        });
        this.httpApp.use('/shop', new AppRouter().router);
        this.httpApp.use('/static', express.static(path.join(__dirname, 'uploadfiles')));
    }


    startServer(portNo) {
        return new Promise( (resolve) => {
            this.httpApp.listen(portNo, () => {
                resolve();
            });
        });
    }
}
const app = new App();