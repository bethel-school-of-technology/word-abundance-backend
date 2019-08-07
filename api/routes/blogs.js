const router = require('express').Router();
const Blog = require('../models/blogpost');

router.post('/', (req, res, next) => {
  const { body } = req;

  if(!body.title) {
    return res.status(422).json({
      errors: {
        title: 'is required',
      },
    });
  }

  if(!body.author) {
    return res.status(422).json({
      errors: {
        author: 'is required',
      },
    });
  }

  if(!body.body) {
    return res.status(422).json({
      errors: {
        body: 'is required',
      },
    });
  }

  const finalBlog = new Blog(body);
  return finalBlog.save()
    .then(() => res.json({ blog: finalBlog.toJSON() }))
    .catch(next);
});

router.get('/', (req, res, next) => {
  console.log(res)
  return Blog.find()
    .sort({ createdAt: 'descending' })
    .then((blogs) => res.json({ blogs: blogs.map(blog => blog.toJSON()) }))
    .catch(next);
});

router.param('id', (req, res, next, id) => {
  return Blog.findById(id, (err, blog) => {
    if(err) {
      return res.sendStatus(404);
    } else if(blog) {
      req.blog = blog;
      return next();
    }
  }).catch(next);
});

router.get('/:id', (req, res, next) => {
  return res.json({
    blog: req.blog.toJSON(),
  });
});

router.patch('/:id', (req, res, next) => {
  const { body } = req;

  if(typeof body.title !== 'undefined') {
    req.blog.title = body.title;
  }

  if(typeof body.author !== 'undefined') {
    req.blog.author = body.author;
  }

  if(typeof body.body !== 'undefined') {
    req.blog.body = body.body;
  }

  return req.blog.save()
    .then(() => res.json({ blog: req.blog.toJSON() }))
    .catch(next);
});

router.delete('/:id', (req, res, next) => {
  return Blog.findByIdAndRemove(req.blog._id)
    .then(() => res.sendStatus(200))
    .catch(next);
});

module.exports = router;