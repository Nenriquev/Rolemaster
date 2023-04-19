const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BonusSchema = new Schema({start: Number, end: Number, bonus: Schema.Types.Mixed}, {_id: false})

const Distance_bonus = new Schema({
arma: {
  type: String
},
bonus: [BonusSchema]

});
const Distance_table = mongoose.model("Distance_bonus", Distance_bonus);
module.exports = Distance_table;