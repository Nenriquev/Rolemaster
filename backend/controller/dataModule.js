const Armas = require('../database/models/Armas');
const Pifias = require('../database/models/Pifias');
const Criticos = require('../database/models/Criticos');
const Limites = require('../database/models/Limites');



const reduceCritical = (criatura, response) => {
  
  const criticals = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']
  const criature = Number(criatura);
  const attack = response;
  const pos_letter = criticals.indexOf(attack.severity);
  const pos_replacement = pos_letter - criature;

  if (pos_replacement >= 0) {
    const letter_replace = criticals[pos_replacement];
    return {
      points: +response.points, 
      severity: letter_replace, 
      critical: response.critical
    }

  } else {
    return {
      points: +response.points, 
      severity: null, 
      critical: null
    }
  }
};

const destructure = (attack) => {

  if(typeof attack !== 'number' && attack !== 'F*'){

  let points = attack.match(/\d+/)[0];
  let critical = attack.match(/[A-Za-z]+/)[0];

  const attackValues = {
    points: +points,
    severity: critical[0],
    critical: critical[1],
  };

  return attackValues
  }

  return { points: attack }
}

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
        
        const destructureCritical = destructure(response[0].tirada[0])
        response[0].criticals = destructureCritical

        if(reduceSeverityOfCritical && isRollNotEmpty && isNotPfifia && response[0]?.tirada?.length > 0) {
      
          const reduce = reduceCritical(criatura, destructureCritical)
          response[0].criticals = reduce
        }

        
      }
      resolve(response)
      
    }).catch(err => reject(err)))
  },

  specialAttack: async (weaponKey, armour, criature) => {

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

      const responseData = response[0] || ''
      
      if(responseData) {
        const reduceSeverityOfCritical = criature == 2 || criature == 1;
        const destructureCritical = destructure(responseData.ataque[0]) 
        responseData.criticals = destructureCritical 

        if(reduceSeverityOfCritical) {
          const result = reduceCritical(criature, destructureCritical)
          response[0].tirada[0] = result 
        }
      }
      resolve(response)
    }).catch(err => reject(err)))
  },

  pifias: async = (type, roll) => {

    const pifiaRoll = isNaN(roll) ? 0 : roll

    return new Promise((resolve, reject) => {
      Pifias.find({
        type: type,
        start: { $lte: pifiaRoll },
        end: { $gte: pifiaRoll },
      }).then(response => {
          resolve(response)
      }).catch(err => reject(err))
    })

  },

  criticals: async = (attackRoll, roll, criatureSize, weapon_type) => {
    
    const criticalRoll = isNaN(roll) ? 0 : roll
    const result = []

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
    
  },

  distances: async (distance) => {

    console.log(distance)

  }


}