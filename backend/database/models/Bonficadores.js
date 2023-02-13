const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Bonificadores = new Schema({
tirada: {
  type: Number,
  required: true,
},
bonificador: {
  type: Number,
  required: false
}

});
const Bonificadores_Table = mongoose.model("Bonificadores", Bonificadores);
module.exports = Bonificadores_Table;