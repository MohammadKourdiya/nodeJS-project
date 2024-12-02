const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// define the Schema (the structure of the article)
const customerSchema = new Schema(
  {
    firstName: String,
    lastName: String,
    email: String,
    tel: String,
    age: String,
    country: String,
    gender: String,
    
  
  },
  { timestamps: true }
);

// Create a model based on that schema
const customer = mongoose.model("customer", customerSchema);

// export the model
module.exports = customer;
