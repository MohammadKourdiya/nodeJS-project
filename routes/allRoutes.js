const express = require("express");
const router = express.Router();
const moment = require("moment");
const customer = require("../modals/customerSchema");
const userController = require("../controllers/userController");
const AuthUser = require("../modals/authUser");
var jwt = require("jsonwebtoken");

const { requireAuth, checkIfUser } = require("../middleware/middleware");

//Level2

router.get("*", checkIfUser);

router.get("/", (req, res) => {
  res.render("wellcome");
});

router.get("/login", (req, res) => {
  res.render("auth/login.ejs");
});
router.get("/signup", (req, res) => {
  res.render("auth/signup.ejs");
});
router.get("/signout", (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/");
});

router.post("/signup", async (req, res) => {
  try {
    const result = await AuthUser.create(req.body);
    console.log(result);
    res.redirect("/home");
  } catch (err) {
    console.log(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const loginUser = await AuthUser.findOne({ email: req.body.email });
    if (loginUser == null) {
      console.log("user is not found in database");
    } else {
      const match =
        loginUser.email == req.body.email &&
        loginUser.password == req.body.password;

      if (match) {
        console.log("login successfully");
        var token = jwt.sign({ id: loginUser._id }, "lll");
        res.cookie("jwt", token, { httpOnly: true, maxAge: 86400000 });
        res.redirect("/home");
      } else {
        console.log("email or pass is wrong");
      }
    }
  } catch (err) {
    console.log(err);
  }
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
