var bodyParser = require('body-parser');
var express = require('express');
var path = require('path');
var fs = require('fs');

//CHOSEN PORT
var app = express();
var PORT = process.env.PORT || 8080;


//creating connections to use
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, './Develop/public')));

//ROUTES
require('./routing/api-routes.js')(app);
require('./routing/html-routes.js')(app);


//SERVER LISTEN
app.listen(PORT, function(){
    console.log("App listening on PORT: " + PORT);
})