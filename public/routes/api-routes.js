module.exports = function (server, db) {
  server.get("/articles", function (req, res) {

    db.Article.find().populate("comment")

      .then(function (db) {

        res.json(db);
      })
      .catch(function (err) {

        res.json(err);
      });
  });



  server.get("/api-comments", function (req, res) {

    db.Comment.find()

      .then(function (db) {

        res.json(db);
      })
      .catch(function (err) {

        res.json(err);
      });
  });


  server.get("/api-articles", function (req, res) {

    db.Article.find()

      .then(function (db) {

        res.json(db);
      })
      .catch(function (err) {

        res.json(err);
      });
  });

  server.get("/api-articles-populated-with-comments", function (req, res) {

    db.Article.find().populate("comment")

      .then(function (db) {

        res.json(db);
      })
      .catch(function (err) {

        res.json(err);
      });
  });


  server.post("/add", function (req, res) {
    let idforArticle = req.body._id;

    db.Comment.create({ body: req.body.body })
      .then(function (pushing) {

        return db.Article.findOneAndUpdate({ _id: idforArticle }, { $push: { comment: pushing._id } }, { new: true });

      })
      .then(function (db) {

        res.json(db);
      })
      .catch(function (err) {

        res.json(err);
      });
  });

}


