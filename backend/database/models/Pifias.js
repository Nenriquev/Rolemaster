const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Pifias = new Schema({
start: {
  type: Number,
  required: true,
},
end: {
  type: Number,
  required: true
},
type: {
  type: String,
  required: true,
  lowercase: true
},
description: {
  type: String
}

});
const Pifias_Table = mongoose.model("Pifias", Pifias);
module.exports = Pifias_Table;