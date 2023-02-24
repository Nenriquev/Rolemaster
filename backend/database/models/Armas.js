const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PifiaSchema = new Schema({pifia: Number, tipo: {type: String, lowercase: true}}, {_id: false})
const AtaqueSchema = new Schema({tsm: Number, ataque: {type: Array}}, {_id: false})

const Armas = new Schema({
arma: {
  type: String,
  required: true,
},
tipo:{
  type: String,
  required: true,
  lowercase: true
},
tirada: {
  type: Object,
  required: false
},
TSM_pifias: [PifiaSchema],
TSM_ataques: [AtaqueSchema],

});
const Armas_Table = mongoose.model("Armas", Armas);
module.exports = Armas_Table;