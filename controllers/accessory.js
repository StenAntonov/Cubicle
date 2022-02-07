module.exports = {
    createAccessory(req, res) {
        res.render('createAccessory', { title: 'Create New Accessory' });
    },
    async accessoryPost(req, res) {
        const accessory = {
            name: req.body.name,
            imageUrl: req.body.imageUrl,
            description: req.body.description
        }

        await req.storage.createAccessory(accessory);

        res.redirect('/');
    }
};