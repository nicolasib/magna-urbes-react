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

        switch(data.query){
            case 'last':
                const last = await Century.find().limit(1).sort({$natural: -1});
                return res.json(last);
            break;
            case 'all':
                const all = await Century.find({ number: data.value });
                return res.json(all);
            break;
            case 'onlyNumber':
                const response = await Century.find();
                const numbers = [];
                response.forEach(element => {
                    numbers.push(element.number);
                });
                const filterNumbers = numbers.filter((item, index) => {
                    return numbers.indexOf(item) >= index;
                });
                return res.json(filterNumbers);
            break;
        }

        
    }
}