
const url = "http://api.brewerydb.com/v2/";
const BREWERYDB_KEY = process.env.BREWERYDB_KEY;
const request = require('request');


module.exports = function(app){

  app.post('/locations', function(req,res){ //Receive location info and send list
    console.log("POST to /locations recieved with data: ", req.body);
    if(!req.body.location){
      res.json({error:"Missing location in data object"});
      return
    }
    const paramQuery = `search/geo/point?lat=${req.body.location.lat}&lng=${req.body.location.lng}`;
    const radius = `&radius=${req.body.radius}`
    const apiKey = `&key=${BREWERYDB_KEY}`;
    const fullQuery = url + paramQuery + radius + apiKey;
    console.log("THIS IS REQ.BODY", req.body);
    request({
      url: fullQuery,
      method: 'GET',
      callback: function(error, response, body) {
        if (error) {
          console.log("ERROR!", error);
          response.json("error");
        } else if (response) {
            console.log("Request completed and sent body");
            res.send(body);
        }
      }
    }); //End /locations request
  }); //End /locations POST

  app.post('/beers', function(req, res){
    console.log("POST to /beers recieved with data: ", req.body.brewery);
    const paramQuery = `brewery/${req.body.brewery}/beers`;
    const apiKey = `?key=${BREWERYDB_KEY}`;
    const fullQuery = url + paramQuery + apiKey;
    request({
      url: fullQuery,
      method: 'GET',
      callback: function(error, response, body){
        if (error) {
          console.log("ERROR!", error);
          response.json("error");
        } else if (response) {
            console.log(body);
            res.send(body);
        }
      }
    })//End /beers request
  })//End /beers POST

}
