const { check, validationResult } = require("express-validator");
const AuthUser = require("../modals/authUser");
var jwt = require("jsonwebtoken");

const get_login = (req, res) => {
  res.render("auth/login.ejs");
};

const get_signup = (req, res) => {
  res.render("auth/signup.ejs");
};

const get_signout = (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/");
};

const post_signup = async (req, res) => {
  try {
    //  check validation (email & password)
    const objError = validationResult(req);

    if (objError.errors.length > 0) {
      return res.json({ arrValidationError: objError.errors });
    }
    //  check email is already exist
    const isCurrentEmail = await AuthUser.findOne({ email: req.body.email });

    if (isCurrentEmail) {
      return res.json({ existEmail: "Email is already exist" });
    }
    //  create new user & login
    const newUser = await AuthUser.create(req.body);
    var token = jwt.sign({ id: newUser._id }, process.env.SECRET_KEY);

    res.cookie("jwt", token, { httpOnly: true, maxAge: 86400000 });
    res.json({ id: newUser._id });
    location.assign("/home");
  } catch (err) {
    console.log(err);
  }
};

const post_login = async (req, res) => {
  try {
    const loginUser = await AuthUser.findOne({ email: req.body.email });
    if (loginUser == null) {
      res.json({ notFoundUser: "The user is not found in database" });
    } else {
      const match =
        loginUser.email == req.body.email &&
        loginUser.password == req.body.password;

      if (match) {
        var token = jwt.sign({ id: loginUser._id }, process.env.SECRET_KEY);
        res.cookie("jwt", token, { httpOnly: true, maxAge: 86400000 });
        res.json({ id: loginUser._id });
        location.assign("/home");
      } else {
        res.json({ passError: `inncorrect password for ${req.body.email}` });
      }
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  get_login,
  get_signup,
  get_signout,
  post_signup,
  post_login,
};
