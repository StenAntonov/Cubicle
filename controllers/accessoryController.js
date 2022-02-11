const router = require('express').Router();

router.get('/create', (req, res) => {
    res.render('createAccessory', { title: 'Create New Accessory' });
});

router.post('/create', async (req, res) => {
    const accessory = {
        name: req.body.name,
        imageUrl: req.body.imageUrl,
        description: req.body.description
    }

    await req.storage.createAccessory(accessory);

    res.redirect('/');
});

module.exports = router;