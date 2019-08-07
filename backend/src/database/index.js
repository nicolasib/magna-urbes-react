const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://root:root@magna-urbes-api-bpban.mongodb.net/test?retryWrites=true&w=majority');

mongoose.Promise = global.Promise;

module.exports = mongoose;
