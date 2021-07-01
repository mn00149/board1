// util.js

var util = {};

util.noPermission = function(req, res){
  req.flash('errors', {login:"You don't have permission"});

  res.redirect('/');};

module.exports = util;
