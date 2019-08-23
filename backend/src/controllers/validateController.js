const Users = require('../models/Users');

module.exports = {
    async index(req, res){
        const { user } = req.body;

        const userExists = await Users.findOne({
            username: user
        });

        if(userExists) return res.json(userExists);

        return res.json({error: 0});
    }
}