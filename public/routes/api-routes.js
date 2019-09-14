module.exports = function (server,db){
    server.get("/articles", function(req, res) {
        // Find all users
        db.Article.find().populate("comment")
          // Specify that we want to populate the retrieved users with any associated notes
          //.populate("notes")
          .then(function(db) {
            // If able to successfully find and associate all Users and Notes, send them back to the client
            res.json(db);
          })
          .catch(function(err) {
            // If an error occurs, send it back to the client
            res.json(err);
          });
      });



      server.get("/api-comments", function(req, res) {
        // Find all users
        db.Comment.find()
          // Specify that we want to populate the retrieved users with any associated notes
          //.populate("notes")
          .then(function(db) {
            // If able to successfully find and associate all Users and Notes, send them back to the client
            res.json(db);
          })
          .catch(function(err) {
            // If an error occurs, send it back to the client
            res.json(err);
          });
      });


      server.get("/api-articles", function(req, res) {
        // Find all users
        db.Article.find()
          // Specify that we want to populate the retrieved users with any associated notes
          //.populate("notes")
          .then(function(db) {
            // If able to successfully find and associate all Users and Notes, send them back to the client
            res.json(db);
          })
          .catch(function(err) {
            // If an error occurs, send it back to the client
            res.json(err);
          });
      });

      server.get("/api-articles-populated-with-comments", function(req, res) {
        // Find all users
        db.Article.find().populate("comment")
          // Specify that we want to populate the retrieved users with any associated notes
          //.populate("notes")
          .then(function(db) {
            // If able to successfully find and associate all Users and Notes, send them back to the client
            res.json(db);
          })
          .catch(function(err) {
            // If an error occurs, send it back to the client
            res.json(err);
          });
      });


      server.post("/add", function(req, res) {
       let idforArticle = req.body._id;
      
        db.Comment.create({body:req.body.body})
          .then(function(db) {
           // console.log("jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj");
           //console.log(dbBook);
            // If a Book was created successfully, find one library (there's only one) and push the new Book's _id to the Library's `books` array
            // { new: true } tells the query that we want it to return the updated Library -- it returns the original by default
            // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
          
            return db.Article.findOneAndUpdate({ _id:idforArticle },  {$push: { comment: db._id }} , { new: true });
            
           // return req.body
          })
          .then(function(db) {
           // console.log(dbLibrary)
            // If the Library was updated successfully, send it back to the client
            res.json(db);
          })
          .catch(function(err) {
            // If an error occurs, send it back to the client
            res.json(err);
          });
      });

}


