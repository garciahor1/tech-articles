var mongoose = require("mongoose");
var uniqueValidator = require('mongoose-unique-validator');
// Save a reference to the Schema constructor
var Schema = mongoose.Schema;
// Using the Schema constructor, create a new UserSchema object
// This is similar to a Sequelize model
var ArticleSchema = new Schema({
  // `name` must be unique and of type String
   // `title` is required and of type String
   title: {
    type: String,
    required: true,
    unique: true
  },
  articleLink: {
    type: String,
    required: true
  },
articleImage:{
    type: String,
    required: true
},
articleSrc:{
    type: String,
    required: true
},
articleDescription:{
    type: String,
    required: true
},
  comment: [{
    type: Schema.Types.ObjectId,
    ref: "Comment"
  }]
  // `notes` is an array that stores ObjectIds
  // The ref property links these ObjectIds to the Note model
  // This allows us to populate the User with any associated Notes

});
ArticleSchema.plugin(uniqueValidator);
// This creates our model from the above schema, using mongoose's model method
var Article = mongoose.model("Article", ArticleSchema);

// Export the User model
module.exports = Article;