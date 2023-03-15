const Armas = require('../database/models/Armas') 
const Criticos = require('../database/models/Criticos') 
const Pifias = require('../database/models/Pifias') 
const Criticos_secundarios = require('../database/models/Criticos_secundarios') 



module.exports = {

  read: async (req, res) => {
    const tiradaSM = Number(req?.body?.tirada);   //Tirada sin modificar
    const armour = req?.body?.armadura?.toLowerCase() ? req?.body?.armadura?.toLowerCase() : ''
    const weaponKey = req?.body?.arma ? req.body.arma : ''

    const pifia = await Armas.findOne({TSM_pifias:{ $elemMatch:{pifia : tiradaSM}}, arma: weaponKey}, {TSM_pifias:{ $elemMatch:{pifia : tiradaSM}}})
    const ataque = await Armas.findOne({TSM_ataques:{ $elemMatch:{tsm : tiradaSM}}, arma: weaponKey}, {TSM_ataques:{ $elemMatch:{tsm : tiradaSM}}})

      if(pifia){
       return res.json({result: 'Pifiaste', data: pifia.TSM_pifias[0]})
      }

      if(ataque){
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
        ]).exec((err, response) => {
          if(err){
            console.log(err)
          }
          if(response && response[0].ataque.length > 0){
            console.log(response)
            return res.json({result: response[0].ataque[0], data:{ arma: response[0].arma, tipo: response[0].tipo}})
          }
        })
        
      } else {

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
    ]).exec((err, response) => {
      if (err) {
       console.log(err)
      }
        if(response && response[0]?.tirada?.length > 0){
          return res.json({result: response[0].tirada[0] == 'F*' ? 'Pifiaste' : response[0].tirada[0], data:{arma: response[0].arma, tipo: response[0].tipo}})
        }
        return res.json({result: 'No se encontraron resultados'})
    }); 
 
  }
  },

  getCriticals: async (req, res) => {

    const tirada = Number(req?.body?.tirada)
    const attack = req.body.attack
    const result = []


    if (attack == "Pifiaste" || attack == 'F*') {
      Pifias.find({
        type: req.body.type,
        start: { $lte: tirada },
        end: { $gte: tirada },
      }).exec((err, response) => {
        if (response && response[0]?.description?.length > 0) {
          return res.json({ critic: response[0].description });
        }
        return res.json({ critic: "No se encontraron resultados" });
      });
    } else {
      
    for (var i = attack.length - 1; i >= 0; i--) {
      result.push(attack[i])
    }

    const attackValues = {
      severity: result[1],
      critical: result[0]
    }


       if (result.length > 0) {

        const secondaryCriticals = ['F','G','H','I','J']
        if(secondaryCriticals.includes(attackValues.severity)){
          attackValues.severity = 'E'
        }

        Criticos.find({
          symbol: attackValues.critical,
          severity: attackValues.severity,
          start: { $lte: tirada },
          end: { $gte: tirada },
        }).exec((err, response) => {
          if (response && response[0]?.description?.length > 0) {
            return res.json({critic: response[0]?.description});
          }
          return res.json({critic: "No se encontraron resultados" });
        });
      }
    }

  },


  getWeapons: async (req, res) => {
    const response = await Armas.find({tipo: req.body.weapon},'arma')
    return res.json({data: response})
  },


  getMagicals: async (req, res) => {

    const destructure = (attack) => {
      const result = [];
      for (var i = attack?.length - 1; i >= 0; i--) {
        result.push(attack[i]);
      }

      const attackValues = {
        severity: result[1],
        critical: result[0],
      };

      return attackValues
    }

    if (Object.entries(req.body).length != 0) {
      const weapon = req?.body?.weapon;
      const attack = req?.body?.attack;
      const id_target = req?.body?.id_target;

      const attackValues = destructure(attack)

      
      Criticos_secundarios.findOne({
        arma: weapon,
        critico: attackValues.severity,
      }).exec((err, response) => {
        if(response){
        return res.json({ attack: response[id_target] });
        } else{
          return res.json({attack: false})
        }
      });

      
    }

    else {
      return res.json({ attack: false})
    }
  }
};