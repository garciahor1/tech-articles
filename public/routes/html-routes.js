const axios = require("axios");
var cheerio = require("cheerio");
const path = require("path");

module.exports = function (server, db) {


  server.get("/", function (req, res) {

    axios.get("https://www.google.com/search?q=technology&tbm=nws&rlz=1C5CHFA_enUS736US736&biw=1680&bih=947&gbv=1&sei=O2V4Xcr8LIK7ggfVm73wAg").then(function (response) {

      var $ = cheerio.load(response.data);

      var articlesCol = [];

      $(".g").each(function (i, element) {

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

          articlesCol.push({
            title: title,
            articleLink: articleLink,
            articleImage: articleImage,
            articleSrc: articleSrc,
            articleDescription: articleDescription,
          });
        }
      });

      db.Article.create(articlesCol)
        .then(function (dbUser) {

        })
        .catch(function (err) {

        });
    });
    res.sendFile(path.join(__dirname, "../articles.html"));
    display()
  });

  function display() {

  }

}


