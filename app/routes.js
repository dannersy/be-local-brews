
const url = "http://api.brewerydb.com/v2/";
const BREWERYDB_KEY = process.env.BREWERYDB_KEY;
const request = require('request');


module.exports = function(app){
  app.post('/locations', function(req,res){ //Receive location info and send list
    console.log("POST to /locations recieved with data: ", req.body);
    const paramQuery = "locations?postalCode=";
    const input = req.body.location;
    const apiKey = "&key=" + BREWERYDB_KEY;
    const fullQuery = url + paramQuery + input + apiKey;
    request({
      url: fullQuery,
      method: 'GET',
      callback: function(error, response, body) {
        if (error) {
          console.log("ERROR!", error);
          response.json("error");
        } else if (response) {
            console.log(body);
            res.send(body);
        }
      }
    }); //End request
  }); //End POST
}
