const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Armas = new Schema({
arma: {
  type: String,
  required: true,
},
tirada: {
  type: Object,
  required: false
},
pifias: {
  type: Array,
  required: false
}

});
const Armas_Table = mongoose.model("Armas", Armas);
module.exports = Armas_Table;