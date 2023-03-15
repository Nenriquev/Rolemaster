const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Criticos_secundarios = new Schema({
arma: {
  type: String,
  required: true,
},
critical:{
  type: String
},
critical2:{
  type: String
},
critical3:{
  type: String
}


});
const Criticos_secundarios_Table = mongoose.model("Criticos_secundarios", Criticos_secundarios);
module.exports = Criticos_secundarios_Table;