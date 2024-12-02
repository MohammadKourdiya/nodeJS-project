const express = require("express");
const router = express.Router();
const moment = require("moment");
const customer = require("../modals/customerSchema");
const userController = require("../controllers/userController");

router.get("/", userController.user_index_get);

router.get("/view/:id", userController.user_view_get);

router.post("/search", userController.user_search_post);

router.get("/edit/:id", userController.user_edit_get);

router.delete("/edit/:id", userController.user_delete);

router.put("/edit/:id", userController.user_edit_put);

router.get("/user/add.html", userController.user_add_get);

router.post("/user/add.html", userController.user_add_post);

module.exports = router;
