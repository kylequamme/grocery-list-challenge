var express = require('express');
var index = require('./routes/index');
var groceries = require('./routes/groceries');
var pg = require('pg');

var app = express();

app.use(express.static('public'));
app.use('/', index);
app.use('/groceries', groceries);

var server = app.listen(3000, handleServerStart);

function handleServerStart() {
  var port = server.address().port;
  console.log("Listening on port ", port);
}
