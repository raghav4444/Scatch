const express = require('express');
const router = express.Router();
const ownerModel = require('../models/owners-model');

router.get('/', (req, res) => {
    res.send('Owners route is working');
});

if (process.env.NODE_ENV === 'development') {
    router.post('/create', async (req, res) => {
        // res.send('hey its working');
        let owners =await ownerModel.find();
        if(owners.length > 0){
            return res.status(500).send("YOU don't have permissions to create owner");
        }
        let {fullName, email, password} = req.body;
        let createdOwner = await ownerModel.create({
            fullName,
            email,
            password
        });
        res.status(201).send(createdOwner);
    });
}
module.exports = router;