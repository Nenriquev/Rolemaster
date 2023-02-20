const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Criticos = new Schema({
type: {
  type: String,
  required: false,
},
symbol: {
  type: String,
  required: false
},
severity: {
  type: String,
  required: false
},
start: {
  type: Number,
  required: false
},
end: {
  type: Number,
  required: false
},
description: {
  type: String,
  required: false
}

});
const Criticos_Table = mongoose.model("Criticos", Criticos);
module.exports = Criticos_Table;