const { use } = require('express/lib/router');
const mongoose = require('mongoose');

module.exports = (app) => {
    main().catch(err => console.log(err));

    async function main() {
        await mongoose.connect('mongodb://localhost:27017/cubicle', {autoIndex: false});
        // use.createIndex = true;
        console.log('Connected to database!');
    }

}