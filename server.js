var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');
var Bear       = require('./model');
var port = 3001;
var router = express.Router();

mongoose.connect('mongodb://localhost/rest');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//*** Start Middleware

// Logs a message when something is happening with the api
router.use(function (req, res, next) {
    console.log('Something is happening');
    next();
});

router.get('/', function (req, res) {
    res.json({message: 'welcome to the api'});
});

router.route('/bears')
    .post(function (req, res) {
        var model = new Bear();

        model.name = req.body.name; // name comes from the request

        model.save(function (err) {
            if (err) {
                res.send(err);
            }

            res.json({message: 'Model Item Created!'});
        });
    })
    .get(function (req, res) {
        Bear.find(function (err, bears) {
            if (err) {
                res.send(err);
            }

            res.json(bears);
        });
    });



app.use('/api', router);

app.listen(port);
console.log('app started on port ' + port);