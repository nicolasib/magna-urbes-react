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

    }
}