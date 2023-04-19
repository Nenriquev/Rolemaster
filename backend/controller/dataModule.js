const Armas = require('../database/models/Armas');
const Pifias = require('../database/models/Pifias');
const Criticos = require('../database/models/Criticos');
const Limites = require('../database/models/Limites');



const reduceCritical = (criatura, response) => {
  const criticals = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']
  const criature = Number(criatura);
  const attack = response;
  const letter = attack[attack.length - 2];
  const pos_letter = criticals.indexOf(letter);
  const pos_replacement = pos_letter - criature;

  if (pos_replacement >= 0) {
    const letter_replace = criticals[pos_replacement];
    const new_str = attack.replace(letter, letter_replace);
    return new_str;
  } else {
    const number = Number(attack.slice(0, -2));
    return number;
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

  criticals: async = (attackRoll, roll, criatureSize, weapon_type) => {
    const criticalRoll = typeof roll == 'number' ? roll : 0
    const result = []

    console.log(criticalRoll)

    return new Promise((resolve, reject) => {

    for (var i = attackRoll.length - 1; i >= 0; i--) {
      result.push(attackRoll[i])
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

        if(criatureSize == 'G' || criatureSize == 'L' || criatureSize == 'GM' || criatureSize == 'LM' ) {

          attackValues.critical = criatureSize
          attackValues.severity = weapon_type
        
        }

        Criticos.find({
          symbol: attackValues.critical,
          severity: attackValues.severity,
          start: { $lte: criticalRoll },
          end: { $gte: criticalRoll },
        }).then(response => {

            resolve(response)

        }).catch(err => reject(err));
      }
    })

  },

  limitType: async (limit) => {

    return new Promise ((resolve, reject) => {
      Limites.findOne({
        tipo: limit,
      }).then(response => {
        if(response){
        resolve(response.limite)
        }
      }).catch(err => reject(err))

    })
    
  }


}