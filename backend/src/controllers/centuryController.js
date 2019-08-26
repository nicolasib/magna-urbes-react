const Century = require('../models/Century');

module.exports = {
    async store(req, res){

        const century = req.body;

        try{        
            const addCentury = await Century.create(century);
            return res.json(addCentury);
        }catch (error){
            return res.status(400).json({error});
        }
    },
    async index(req, res){
        const data = req.body;

        if(data.query === 'last'){
            const consulta = await Century.find().limit(1).sort({$natural: -1});
            return res.json(consulta);
        }

        
    }
}