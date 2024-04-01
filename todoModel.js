const mongoose = require("mongoose");
const Schema = mongoose.Schema({
  text: String,
});
const Todo = mongoose.model("Todo", Schema);
module.exports = Todo;
