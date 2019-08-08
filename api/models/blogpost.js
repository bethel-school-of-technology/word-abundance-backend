const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
  title: String,
  body: String,
  author: String,
}, 
  { timestamps: true }
);

 /* BlogSchema.methods.toJSON = function() {
  return {
    _id: this._id,
    title: this.title,
    body: this.body,
    author: this.author,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
  };
}; */

const Blog = mongoose.model("blogs", BlogSchema);
module.exports = Blog;