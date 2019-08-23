const mongoose = require('../database/index');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    }

});

const Users = mongoose.model('Users', UserSchema);

module.exports = Users;