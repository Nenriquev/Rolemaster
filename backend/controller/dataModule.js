const Armas = require('../database/models/Armas') 

module.exports = {

  attack: async (weaponKey, armour, tiradaSM, criatura) => {
    

    const criticos = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']

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

      if(criatura != '' && typeof(response[0]?.tirada[0]) != 'number') {
        const criature = Number(criatura)
        const attack = response[0].tirada[0];
        const letra = attack[attack.length - 2]
        const pos_letra = criticos.indexOf(letra); 
        const pos_reemplazo = pos_letra - criature; 
        
          if(pos_reemplazo >= 0){
            const letra_reemplazo = criticos[pos_reemplazo]; 
            const nuevo_str = attack.replace(letra, letra_reemplazo); 
            response[0].tirada[0] = nuevo_str
          } else {
            const numero = attack.slice(0, -2);
            response[0].tirada[0] = numero
          }
      } 

      resolve(response)
      
    })
        .catch(err => reject(err)))
  },

  specialAttack: async (weaponKey, armour) => {

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