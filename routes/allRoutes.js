const express = require("express");
const router = express.Router();
const moment = require("moment");
const customer = require("../modals/customerSchema");
const userController = require("../controllers/userController");
const AuthUser = require("../modals/authUser");
var jwt = require("jsonwebtoken");

const { requireAuth, checkIfUser } = require("../middleware/middleware");
const { check, validationResult } = require("express-validator");
const authController = require("../controllers/authController");
//Level2

router.get("*", checkIfUser);

router.get("/login", authController.get_login);
router.get("/signup", authController.get_signup);
router.get("/signout", authController.get_signout);

router.post(
  "/signup",
  [
    check("email", "Please provide a valid email")
      .trim() // إزالة المسافات قبل وبعد
      .isEmail(),

    check(
      "password",
      "Password must be at least 8 characters with 1 upper case letter, 1 lower case letter, 1 number, and 1 special character"
    )
      .trim() // إزالة المسافات قبل وبعد
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*\(\)_\+\-\=\[\]\{\};:'",<>\./?]).{8,}$/
      ),
  ],
  authController.post_signup
);

router.post("/login", authController.post_login);

router.get("/", (req, res) => {
  res.render("wellcome");
});
//router.post("/signup", (req, res) => {
//AuthUser.create(req.body)
//    .then((result) => {
//      res.redirect("/home");
//    })
//    .catch((err) => {
//      console.log(err);
//      alert(err);
//    });
//});

//Level1

router.get("/home", requireAuth, userController.user_index_get);

router.get("/view/:id", requireAuth, userController.user_view_get);

router.post("/search", userController.user_search_post);

router.get("/edit/:id", requireAuth, userController.user_edit_get);

router.delete("/edit/:id", userController.user_delete);

router.put("/edit/:id", userController.user_edit_put);

router.get("/user/add.html", requireAuth, userController.user_add_get);

router.post("/user/add.html", userController.user_add_post);

module.exports = router;
