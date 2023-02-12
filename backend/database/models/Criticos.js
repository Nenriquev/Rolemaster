const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Criticos = new Schema({
tirada: {
  type: Number,
  required: true,
},
bonificador: {
  type: Number,
  required: false
}

});
const Criticos_Table = mongoose.model("Criticos", Criticos);
module.exports = Criticos_Table;