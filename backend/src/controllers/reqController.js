const express = require('express');

const Century = require('../models/Century');

const router = express.Router();

router.post('/register', async (req, res) => {
    try {
        const century = await Century.create(req.body);

        return res.send({ century });
    } catch (error) {
        return res.status(400).send({ error: 'Failed' });
    }
});

module.exports = app => app.use('/admin', router);
