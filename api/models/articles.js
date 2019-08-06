const mongoose = require('mongoose');

const ArticlesSchema = new mongoose.Schema({
  title: String,
  body: String,
  author: String,
}, 
  { timestamps: true }
);

ArticlesSchema.methods.toJSON = function() {
  return {
    _id: this._id,
    title: this.title,
    body: this.body,
    author: this.author,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
  };
};

//module.exports = mongoose.model('Articles', ArticlesSchema);

const Article = mongoose.model("articles", ArticlesSchema);
module.exports = Article;