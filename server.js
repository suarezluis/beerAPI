const express = require("express");
const app = express();
const request = require("request");
const cheerio = require("cheerio");

var name;

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

app.listen(3003, () => {
  console.log("Server running on port 3003");
});