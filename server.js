var appRoot = __dirname,
    express = require('express'),
    mongoose = require('mongoose'),
    mAdmin = mongoose.mongo.Admin,
    app = express(),
    port = '3001';

mongoose.connect('mongodb://localhost:27017/blah');

var kittySchema = mongoose.Schema({
    name: String
});

kittySchema.methods.speak = function () {
    var greeting = this.name
        ? "Meow name is " + this.name
        : "I don't have a name"
    console.log(greeting);
};

var Kitten = mongoose.model('Kitten', kittySchema);


var fluffy = new Kitten({ name: 'fluffy' });
fluffy.speak() // "Meow name is fluffy"

fluffy.save(function (err, fluffy) {
    if (err) return console.error(err);
    fluffy.speak();
});


var buffy = new Kitten({ name: 'buffy' });
buffy.speak() // "Meow name is fluffy"

buffy.save(function (err, buffy) {
    if (err) return console.error(err);
    buffy.speak();
});


Kitten.find(function (err, kittens) {
    if (err) return console.error(err);
    console.log(kittens);
});

//Kitten.find({ name: /^Fluff/ }, callback);


var silence = new Kitten({ name: 'Silence' });
console.log(silence.name) // 'Silence'

//var connection = mongoose.createConnection(
//    'mongodb://localhost:27017/blah');

console.log(mongoose.connection.readyState);
var db = mongoose.connection;

// check mongoose connectivity
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
    // yay!
    console.log(mongoose.connection.readyState);

    //new mAdmin(connection.db).listDatabases(function(err, result) {
    //    console.log('listDatabases succeeded');
    //    // database list stored in result.databases
    //    var allDatabases = result;
    //    console.log(allDatabases);
    //});

});

app.get('/', function (req, res) {
    //console.log(req);
    console.log('Node started at localhost:' + port);
    res.send('hello earthling');
});



app.listen(port);