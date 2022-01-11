const User = require('../models/user.model');

async function initializeUser(req, res, next) {
  let user;

  if (!req.session) {
    next();
  } else {
  user = await User.findById(req.session.uid);
  }

  res.locals.user = user;
  
  next();
}

module.exports = initializeUser;
