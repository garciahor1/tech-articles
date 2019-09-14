const axios = require("axios");
var cheerio = require("cheerio");
const path = require("path");

module.exports = function (server, db) {


  server.get("/", function (req, res) {
    // Make a request via axios for the news section of `ycombinator`
    axios.get("https://www.google.com/search?q=technology&tbm=nws&rlz=1C5CHFA_enUS736US736&biw=1680&bih=947&gbv=1&sei=O2V4Xcr8LIK7ggfVm73wAg").then(function (response) {
      // Load the html body from axios into cheerio
      var $ = cheerio.load(response.data);

      var articlesCol = [];
      // For each element with a "title" class
      $(".g").each(function (i, element) {
        // Save the text and href of each link enclosed in the current element
        const title = $(element)
          .find(".r a")
          .text();
        const originalLink = $(element)
          .find(".r a")
          .attr("href");
        const articleImage = $(element)
          .find(".th")
          .attr("src");
        const originalSrc = $(element)
          .find(".f")
          .text();
        const articleDescription = $(element)
          .find(".st")
          .text();

        var httpLink = originalLink.substring(originalLink.indexOf("h") + 0);
        var articleLink = httpLink.substr(0, httpLink.indexOf('&') + -1);
        var articleSrc = originalSrc.substr(0, originalSrc.indexOf('-') + -1);

        if (title && articleLink && articleImage && articleSrc && articleDescription) {
          // Insert the data in the scrapedData db
          articlesCol.push({
            title: title,
            articleLink: articleLink,
            articleImage: articleImage,
            articleSrc: articleSrc,
            articleDescription: articleDescription,
          });
        }
      });
      // When the server starts, create and save a new User document to the db
      // The "unique" rule in the User model's schema will prevent duplicate users from being added to the server
      db.Article.create(articlesCol)
        .then(function (dbUser) {
          // console.log(dbUser);
        })
        .catch(function (err) {
          //console.log(err.message);
        });


      // Send a "Scrape Complete" message to the browser
      //res.sendFile(path.join(__dirname, "../public/articles.html"));

      // console.log(articles);
    });
    res.sendFile(path.join(__dirname, "../articles.html"));
    display()
  });

  function display() {

  }

}


