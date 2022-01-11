const User = require('../models/user.model');


async function getUser(req, res, next) {
  try {
    const user = await User.findById(res.locals.uid);
    res.render()
  } catch (error) {
    next(error);
  }
}