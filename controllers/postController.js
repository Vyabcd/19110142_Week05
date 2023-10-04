const Post = require('../models/Post');

const posts = [];

exports.getPosts = (req, res) => {
  res.render('index', { posts });
};

exports.getCreatePost = (req, res) => {
  res.render('create-post');
};

exports.createPost = (req, res) => {
  const { title, content } = req.body;
  const postId = posts.length + 1;
  const post = new Post(postId, title, content);
  posts.push(post);
  res.redirect('/');
};

exports.getPostDetail = (req, res) => {
  const postId = parseInt(req.params.id);
  const post = posts.find(p => p.id === postId);
  res.render('post', { post });
};

exports.addComment = (req, res) => {
  const postId = parseInt(req.params.id);
  const { comment } = req.body;
  const post = posts.find(p => p.id === postId);
  if (post) {
    post.comments.push(comment);
  }
  res.redirect(`/post/${postId}`);
};

exports.deletePost = (req, res) => {
  const postId = parseInt(req.params.id);
  const postIndex = posts.findIndex(p => p.id === postId);
  if (postIndex !== -1) {
    posts.splice(postIndex, 1);
  }
  res.redirect('/');
};

exports.getEditPost = (req, res) => {
  const postId = parseInt(req.params.id);
  const post = posts.find(p => p.id === postId);
  res.render('edit-post', { post });
};

exports.editPost = (req, res) => {
  const postId = parseInt(req.params.id);
  const { title, content } = req.body;
  const post = posts.find(p => p.id === postId);
  if (post) {
    post.title = title;
    post.content = content;
  }
  res.redirect('/');
};

