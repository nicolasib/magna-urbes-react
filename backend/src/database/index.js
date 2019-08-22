const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://root:root@cluster0-r4ivy.mongodb.net/magnaUrbes?retryWrites=true&w=majority', {
    useNewUrlParser: true
});

mongoose.Promise = global.Promise;

module.exports = mongoose;
