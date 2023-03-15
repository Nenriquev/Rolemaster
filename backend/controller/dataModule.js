const Criticos_secundarios = require('../database/models/Criticos_secundarios') 


module.exports = {

  criticals: () => {

  },

  pifias: () => {

  },

  magicals: async (weapon, critical) => {
   const data = await Criticos_secundarios.findOne({arma: weapon, critico: critical.severity})
    console.log(data)
    
  }

}