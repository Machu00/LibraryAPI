var express = require('express'),
  app = express(),
  port = process.env.PORT || 5000;
  app.use(express.json());

var routes = require('./route'); //importing route
routes(app); //register the route

app.listen(port);
console.log('X API server started on: ' + port);
