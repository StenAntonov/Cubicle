const Cube = require('../models/Cube');

// load and parse data file
// provide ability to:
// - read all entries
// - read single entry by id
// - add new entry
// * get matching entries by search criteria

async function init() {
    return (req, res, next) => {
        req.storage = {
            getAll,
            getById,
            create,
            edit
        };
        next();
    };
};

async function getAll(query) {

    const options = {};
    

    if(query.search) {
        options.name = { $regex: query.search, $options: 'i' }
    }

    if(query.from) {
        options.difficulty = {$gte: Number(query.from)};
    }

    if(query.to) {
        options.difficulty = options.difficulty || {};
        options.difficulty.$lte = Number(query.to);

    }

    let cubes = Cube.find(options).lean();

    return cubes;
};

async function getById(id) {
    const cube = Cube.findById(id).lean();

    if(cube) {
        return cube;
    }else {
        return undefined;
    }    
};

async function create(cube) {
    const record = new Cube(cube);
    return record.save();
};

async function edit(id, cube) {
    const existing = await Cube.findById(id);

    if(!existing){
        throw new ReferenceError('No such ID in database');
    };

    Object.assign(existing, cube);
    return existing.save();
}

module.exports = {
    init,
    getAll,
    getById,
    create,
    edit
};