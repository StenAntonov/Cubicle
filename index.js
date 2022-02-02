// [X] initialize express app
// [X] setup handlebars
// [X] setup static files
// [X] setup storage middleware 
// [X] set main route handler (controller action)

const express = require('express');
const expressConfig = require('./config/express');
const routesConfig = require('./config/routes');

const { init: storage } = require('./models/storage');


start();

async function start() {
    const port = 3000;
    const app = express();

    expressConfig(app);
    app.use(await storage());
    routesConfig(app);

    
    app.listen(port, () => console.log(`Server is running on port: ${port}`));
};