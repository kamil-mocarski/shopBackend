const express = require ('express');
class App {
    constructor() {
        this.httpApp = express();
        console.log("App has been created")
        this.startServer(3000).then(() => 
        console.log('Server has been started at port 3000'));
    }
    startServer(portNo) {
        return new Promise( (resolve) => {
            this.httpApp.listen(portNo, () => {
                resolve();
            })
        });
    }
}
const app = new App();