// import alert from 'alert';
// routes/posts.js

var express  = require('express');
var router = express.Router();
var Post = require('../models/Post');

// Index
router.get('/', function(req, res){
  Post.find({})                  // 1
  .sort('-createdAt')            // 1
  .exec(function(err, posts){    // 1
    if(err) return res.json(err);
    res.render('posts/index', {posts:posts});
  });
});

// New
router.get('/new', function(req, res){
  res.render('posts/new');
});

// create
router.post('/', function(req, res){
  Post.create(req.body, function(err, post){
    if(err) return res.json(err);
    res.redirect('/posts');
  });
});

// show
router.get('/:id', function(req, res){
  Post.findOne({_id:req.params.id}, function(err, post){
    if(err) return res.json(err);
    res.render('posts/show', {post:post});
  });
});

// edit
router.get('/:id/edit', function(req, res){
  Post.findOne({_id:req.params.id}, function(err, post){
    if(err) return res.json(err);

    res.render('posts/edit', {post:post});
  });
});

// update

router.put('/:id', async(req, res) => {
  const {content} = req.body.body;
  const spassword = req.body.password;
  const opassword = await Post.findOne({_id:req.params.id});
  if(opassword['password'] == spassword){
    Post.findOneAndUpdate({_id:req.params.id}, req.body, function(err, post){
    if(err) return res.json(err);
    res.redirect("/posts/"+req.params.id);
  })}
    else {
          res.write("<script>alert('password is wrong')</script>");
          res.write("<script>window.location=\"../posts\"</script>");
        };
})
//   req.body.updatedAt = Date.now(); //2
//   Post.findOneAndUpdate({_id:req.params.id}, req.body, function(err, post){
//     if(err) return res.json(err);
//
//     res.redirect("/posts/"+req.params.id);
//   });
//
// });
// destroy
router.delete('/:id', function(req, res){
  console.log(req.body.password)
  Post.deleteOne({_id:req.params.id}, function(err){
    if(err) return res.json(err);
    res.redirect('/posts');
  });
});


module.exports = router;
