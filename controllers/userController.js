const moment = require("moment");
const customer = require("../modals/customerSchema");

const user_index_get = (req, res) => {
  console.log("---------------------------------------");
  customer
    .find()
    .then((result) => {
      res.render("index", { arr: result, moment: moment });
    })
    .catch((err) => {
      console.log(err);
    });
};

const user_edit_get = (req, res) => {
  customer
    .findById(req.params.id)
    .then((result) => {
      res.render("user/edit", { obj: result, moment: moment });
    })
    .catch((err) => {
      console.log(err);
    });
};

const user_view_get = (req, res) => {
  // result ==> object
  customer
    .findById(req.params.id)
    .then((result) => {
      res.render("user/view", { obj: result, moment: moment });
    })
    .catch((err) => {
      console.log(err);
    });
};

const user_search_post = (req, res) => {
  console.log("************");
  const searchText = req.body.searchText.trim();
  customer
    .find({
      $or: [{ firstName: searchText }, { lastName: searchText }],
    })
    .then((result) => {
      //console.log(result);
      res.render("user/search", { arr: result, moment: moment });
    })
    .catch((err) => {
      console.log(err);
    });
};

const user_delete = (req, res) => {
  customer
    .findByIdAndDelete(req.params.id)
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
  console.log("done");
};

const user_edit_put = (req, res) => {
  customer
    .findByIdAndUpdate(req.params.id, req.body)
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
};

const user_add_get = (req, res) => {
  res.render("user/add");
};

const user_add_post = (req, res) => {
  customer
    .create(req.body)
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
};
module.exports = {
  user_edit_get,
  user_index_get,
  user_view_get,
  user_search_post,
  user_delete,
  user_edit_put,
  user_add_get,
  user_add_post,
};
