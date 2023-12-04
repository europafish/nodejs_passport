const { Router } = require("express");
const passport = require("passport");
// const { setUserToken } = require('../utils/jwt');

const router = Router();
// jwt 인증용
// router.post(
//     '/',
//     passport.authenticate('local', { session: false }),
//     (req, res, next) => {
//       setUserToken(res, req.user);
//       res.redirect('/');
//     },
//   );

router.post("/", passport.authenticate("local"), (req, res, next) => {
  res.redirect("/");
});
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res, next) => {
    // userToken 설정하기
    setUserToken(res, req.user);
    res.redirect("/");
  }
);

module.exports = router;
