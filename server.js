var express = require('express'),
    app     = express(),
    port    = '3001';

app.get('/', function (req, res) {
    //console.log(req);
    console.log('Node started at localhost:' + port);
    res.send('hello earthling');
});

app.listen(port);