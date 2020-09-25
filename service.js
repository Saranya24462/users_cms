var mongoose = require('mongoose');

var mongoDB = 'mongodb://127.0.0.1/content_management_system';
mongoose.connect(mongoDB, {useNewUrlParser: true});

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
mongoose.set('useFindAndModify', false);

var UserService = function (app) {
    this.app = app;

};
module.exports = UserService;


UserService.prototype.init = function () {}

UserService.prototype.insert = function (input) {

    var userSchema = mongoose.Schema({
        email: String,
        password: String,
        role: String,
        username: String

    });

    var userData = mongoose.model('user', userSchema, 'users');

    var userInfo = new userData({
        email: input.email,
        password: input.password,
        role: input.role,
        username: input.username
    });
    return mongoose.connection.collection('users').insert(userInfo);

}


UserService.prototype.find = function (input) {

    console.log("input", input)
    var schema = new mongoose.Schema({
        email: String,
    })


    var user = mongoose.model('users', schema);

    var data = user.findOne({'email': input.email}, function (err, users) {
        if (err) return handleError(err);
        console.log(users)
    })
    return data
}



UserService.prototype.getUsers = function (input) {

    console.log("input", input)
    var schema = new mongoose.Schema({
        createdBy: String
    })

    var getData = mongoose.model('users', schema);

    var data = getData.find({'createdBy': input.username}, function (err, results) {
        if (err) return handleError(err);
        console.log(results)
    })
    return data
}



UserService.prototype.findAdmin = function (input) {

    console.log("input", input)
    var schema = new mongoose.Schema({
        username: String,
    })

    var users = mongoose.model('users', schema);

    var data = users.findOne({'username': input.createdBy}, {'role': 1, '_id': 0}, function (err, result) {
        if (err) return handleError(err);
        console.log(result)
    })
    console.log("data", data)
    return data
}
UserService.prototype.insertStaff = function (input) {

    var schema = mongoose.Schema({
        email: String,
        createdBy: String,
        role: String,
        username: String,
        status: String

    });

    var staffData = mongoose.model('staff', schema, 'users');

    var staffInfo = new staffData({
        email: input.email,
        createdBy: input.createdBy,
        role: input.role,
        username: input.username,
        status: "INVITE USER"
    });
    return mongoose.connection.collection('users').insert(staffInfo);
}


UserService.prototype.updateUserStatus = function (input) {


    var customersSchema = mongoose.Schema({

        email: {type: String, required: true},

        status: {type: String, required: true}
    });

    var customerObject = mongoose.model('user', customersSchema, 'users');


    var query = {email: input.email};

    return customerObject.findOneAndUpdate(query, {$set: {status: "ACTIVE"}}, {upsert: true}, function (err, result) {

        if (err) {

            console.log("error query");

        } else {

            console.log(result, "result");

        }

    })
}