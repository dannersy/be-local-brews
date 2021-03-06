
//modules =============
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

//config ==============
const PORT = process.env.PORT || 8080;
app.use(bodyParser.urlencoded({ extended:true }));
app.use(bodyParser.json());
app.use(cors());
require('./app/routes')(app);

// start app ============
app.listen(PORT, function(){
  console.log("Now listening on Port: ", PORT);
})
