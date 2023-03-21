const Criticos_secundarios = require('../database/models/Criticos_secundarios') 
const Armas = require('../database/models/Armas') 

module.exports = {

  attack: async (weaponKey, armour) => {

    return new Promise((resolve, reject) => 
    Armas.aggregate([
      {
        $match: {
          arma: weaponKey,
        }
      },
      {
        $project: {
          tipo: '$tipo',
          arma: '$arma',
          ataque: {
            "$let": {
              "vars": {
                "ta1_value": `$TSM_ataques.ataque.${armour}`
              },
              "in": {
                "$arrayElemAt": [ "$$ta1_value", 0 ]
              }
            }
          },
          "_id": 0
        }
      }
    ]).then(response => resolve(response))
        .catch(err => reject(err)))
  },

}