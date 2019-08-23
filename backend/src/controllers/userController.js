const Users = require('../models/Users');

module.exports = {

    async index(req, res){
        const { user, pass } = req.body;

        const userExists = await Users.findOne({
            username: user, 
            password: pass
        });

        if(!userExists) return res.json({error: `Invalid data!`});

        return res.json(userExists);
    },

    async store(req, res){
        const { user, pass } = req.body;
        
        const userExists = await Users.findOne({
            username: user,
            password: pass
        });
        
        if(userExists) return res.json({error: `User already exists!`});

        try{
            const account =  await Users.create({
                username: user,
                password: pass
            });

            return res.json(account);
        }catch (error){
            return res.status(400).send(error);
        }

    }
}

