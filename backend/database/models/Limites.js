const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Limites = new Schema({
tipo: {
  type: String
},
limite: {
  type: Number
},

});
const Limites_Table = mongoose.model("Limites", Limites);
module.exports = Limites_Table;