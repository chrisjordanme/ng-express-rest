var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');
var Bear       = require('./model');
var port = 3001;
var router = express.Router();
var root = __dirname;

mongoose.connect('mongodb://localhost/rest');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//*** Start Middleware

// Logs a message when something is happening with the api
router.use(function (req, res, next) {
    console.log('Something is happening');
    console.log(req);
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

router.route('/bears/:bear_id')
    .get(function (req, res) {
        Bear.findById(req.params.bear_id, function (err, bear) {
            if (err) {
                res.send(err);
            }

            res.json(bear);
        });
    })
    .put(function (req, res) {

        // use our bear model to find the bear we want
        Bear.findById(req.params.bear_id, function(err, bear) {

            if (err)
                res.send(err);

            bear.name = req.body.name; 	// update the bears info

            // save the bear
            bear.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'Bear updated!' });
            });

        });
    })
    .delete(function (req, res) {
        Bear.remove({
            _id: req.params.bear_id
        }, function(err, bear) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
    });

router.get('/home', function (req, res, next) {
    res.sendFile(__dirname + '/index.html');
});


app.use(express.static(__dirname + '/bower_components'));
app.use(express.static(__dirname + '/'));



app.use('/api', router);

app.listen(port);
console.log('app started on port ' + port);