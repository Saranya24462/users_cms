// var mongoose = require('mongoose');
// const Bluebird = require('bluebird');
//
// // Make Mongoose use Bluebird instead of built-in promises.
// mongoose.Promise = Bluebird;
//
//
// //Set up default mongoose connection
// var mongoDB = 'mongodb://127.0.0.1/users';
// mongoose.connect(mongoDB, { useNewUrlParser: true });
//
// //Get the default connection
// var db = mongoose.connection;
//
// //Bind connection to error event (to get notification of connection errors)
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));
// var schema = new mongoose.Schema({
//     email : String,
//     role : String,
//
// })
//
// var Athlete = mongoose.model('users', schema);
//
// // find all athletes who play tennis, selecting the 'name' and 'age' fields
// Athlete.find({ 'email': 'abc@gmail.com' }, function (err, athletes) {
//     if (err) return handleError(err);
//     console.log(athletes)
//     // 'athletes' contains the list of athletes that match the criteria.
//     // Athlete.findAsync({ 'email': 'abc@gmail.com' })
// // var findUserPromise = promisify(Athlete.find)
// //
// // Model.find({ name: 'Mr. Anderson' }).
// //
// // findUserPromise({ name: req.body.name })
// //
// // // Athlete.find({ 'email': 'abc@gmail.com' }).exec()
// //
// //     .then(function (err,result) {
// // console.log(result)
// //         })
//
// })
var data={ role: 'superadmin' }
console.log(typeof data)
console.log(data.a)
if(data.role==='superadmin'){
    console.log('hi')
}
else
{
    console.log('no')
}