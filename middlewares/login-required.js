const { User } = require("../models");

module.exports = (req, res, next) => {
  if (!req.user) {
    res.redirect("/");
    return;
  }

  // passwordReset 확인하여 redirect 하기
  if (req.user.passwordReset) {
    res.redirect("/change-password");
    return;
  }
  next();
};
