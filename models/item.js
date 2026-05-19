const mongoose = require("mongoose");

const itemSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please input a name"],
  },
  description: {
    type: String,
    default:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  price: {
    type: Number,
    default: 10,
  },
  count: Number,
  displayed: {
    type: Boolean,
    default: true,
  },
  dateAdded: {
    type: Date,
    default: Date.now(),
  },
  category: {
    type: String,
    default: "Uncategorized",
  },
});

module.exports = mongoose.model("Item", itemSchema);
