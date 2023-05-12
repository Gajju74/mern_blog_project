const mongoose = require("mongoose");
const moment = require("moment");

const { Schema } = mongoose;

UserBlogSchema = new Schema({
  title: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    required: true,
  },
  // username: {
  //   type: String,
  //   required: true,
  // },
  imageUrl: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: moment().format("YYYY/MM/DD"),
  },
});

module.exports = mongoose.model("userblog", UserBlogSchema);
