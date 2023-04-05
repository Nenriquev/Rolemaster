const Armas = require('../database/models/Armas') 
const Pifias = require('../database/models/Pifias') 
const Criticos = require('../database/models/Criticos') 


const reduceCritical = (criatura, response) => {
  const criticos = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']
  const criature = Number(criatura);
  const attack = response;
  const letra = attack[attack.length - 2];
  const pos_letra = criticos.indexOf(letra);
  const pos_reemplazo = pos_letra - criature;

  if (pos_reemplazo >= 0) {
    const letra_reemplazo = criticos[pos_reemplazo];
    const nuevo_str = attack.replace(letra, letra_reemplazo);
    return nuevo_str;
  } else {
    const numero = attack.slice(0, -2);
    return numero;
  }
};

module.exports = {

  attack: async (weaponKey, armour, tiradaSM, criatura) => {

    return new Promise ((resolve, reject) => 
    Armas.aggregate([
      { $match: {arma: weaponKey} },
      {
        $project: {
          arma: '$arma',
          tipo: '$tipo',
          tirada: {
            $filter: {
              input: `$tirada.${tiradaSM}.${armour}`,
              as: "item",
              cond: { $ne: [`$$item.${armour}`, {}] },
            },
          },
        },
      },
    ]).then(response => {
    
      if(response.length > 0 && response[0].tirada != null) {
        const reduceSeverityOfCritical = criatura == 2 || criatura == 1;
        const isRollNotEmpty = typeof(response[0]?.tirada[0]) != 'number' 
        const isNotPfifia = response[0]?.tirada[0] != 'F*'

        if(reduceSeverityOfCritical && isRollNotEmpty && isNotPfifia) {
          const result = reduceCritical(criatura, response[0]?.tirada[0])
          response[0].tirada[0] = result 
        }
      }

      resolve(response)
      
    }).catch(err => reject(err)))
  },

  specialAttack: async (weaponKey, armour, criatura) => {

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
    ]).then(response => {
      if(criatura != '' && typeof(response[0]?.ataque[0]) != 'number' && response[0].tirada[0] != 'F*') {
        const result = reduceCritical(criatura, response[0]?.ataque[0])
        response[0].ataque[0] = result 
      } 
      resolve(response)
    }).catch(err => reject(err)))
  },

  pifias: async = (type, tirada) => {

    return new Promise((resolve, reject) => {
      Pifias.find({
        type: type,
        start: { $lte: tirada },
        end: { $gte: tirada },
      }).then(response => {
          resolve(response)
      }).catch(err => reject(err))
    })

  },

  criticals: async = (attack, tirada, criature, weapon_type) => {
    const result = []

    return new Promise((resolve, reject) => {

    for (var i = attack.length - 1; i >= 0; i--) {
      result.push(attack[i])
    }

    const attackValues = {
      severity: result[1],
      critical: result[0]
    }


       if (result.length > 0) {

        const secondaryCriticals = ['F','G','H','I','J']

        if(secondaryCriticals.includes(attackValues.severity)) {
          attackValues.severity = 'E'
        }

        if(criature == 'G' || criature == 'L' || criature == 'GM' || criature == 'LM' ) {

          attackValues.critical = criature
          attackValues.severity = weapon_type
        
        }

        Criticos.find({
          symbol: attackValues.critical,
          severity: attackValues.severity,
          start: { $lte: tirada },
          end: { $gte: tirada },
        }).then(response => {

            resolve(response)

        }).catch(err => reject(err));
      }
    })

  },


}