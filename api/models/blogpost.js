const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
  title: String,
  body: String,
  author: String,
}, 
  { timestamps: true }
);

const Blog = mongoose.model("blogs", BlogSchema);
module.exports = Blog;