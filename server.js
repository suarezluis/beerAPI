const express = require("express");
const app = express();
const request = require("request");
const cheerio = require("cheerio");

var name;
const PORT = process.env.PORT || 3003;

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/:beerName", (req, res) => {
  console.log("responding");
  console.log("params", req.params.beerName);

  let name = req.params.beerName;

  request(
    "https://api.brewerydb.com/v2/search/?key=25e5612de5524a1bf68a0933f4b4562a&q=" +
      name +
      "&type=beer",
    (error, response, html) => {
      if (!error && response.statusCode == 200) {
        //   console.log(JSON.parse(html));
        console.log("cheerio response", JSON.parse(response.body));
        if (
          response.body != undefined &&
          req.params.beerName != "favicon.ico"
        ) {
          res.json(JSON.parse(response.body).data);
        } else {
        }
      }
    }
  );
});

app.listen(PORT, () => {
  console.log("Server running on port 3003");
});

// Keep heroku awake
var http = require("http");
setInterval(function() {
  http.get("http://suarezluis-beerapi.herokuapp.com");
}, 300000); // every 5 minutes (300000)
