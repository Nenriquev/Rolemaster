const Armas = require('../database/models/Armas') 
const Criticos = require('../database/models/Criticos') 
const Pifias = require('../database/models/Pifias') 


module.exports = {

  read: async (req, res) => {
    const tirada = Number(req?.body?.tirada);   //Tirada sin modificar
    const armour = req?.body?.armadura?.toLowerCase() ? req?.body?.armadura?.toLowerCase() : ''
    const weaponKey = req?.body?.arma ? req.body.arma : ''

    const pifia = await Armas.findOne({TSM_pifias:{ $elemMatch:{pifia : tirada}}, arma: weaponKey}, {TSM_pifias:{ $elemMatch:{pifia : tirada}}})
    const ataque = await Armas.findOne({TSM_ataques:{ $elemMatch:{tsm : tirada}}, arma: weaponKey}, {TSM_ataques:{ $elemMatch:{tsm : tirada}}})

      if(pifia){
       return res.json({result: 'Pifiaste', data: pifia.TSM_pifias[0]})
      }

      if(ataque){
        Armas.find({
          "arma": "Proyectil de luz",
          "TSM_ataques": {
            "$elemMatch": {
              "tsm": 100,
              "ataque.ta20": {
                "$exists": true
              }
            }
          }
        }).exec((err, response) => console.log(response))
        
      }

      
       Armas.aggregate([
      { $match: {arma: weaponKey} },
      {
        $project: {
          tipo: '$tipo',
          tirada: {
            $filter: {
              input: `$tirada.${tirada}.${armour}`,
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
          return res.json({result: response[0].tirada[0] == 'F*' ? 'Pifiaste' : response[0].tirada[0], data:{ tipo: response[0].tipo}})
        }
        return res.json({result: 'No se encontraron resultados'})
    }); 
 
   
  },

  getCriticals: async (req, res) => {
    const tirada = Number(req?.body?.tirada)
    const critical = req.body.critical
    const severitySymbols = ['A', 'B', 'C', 'D', 'E']
    const result = []


    if (critical == "Pifiaste" || critical == 'F*') {
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

    } 

      severitySymbols.forEach((element) => {
        if (critical.indexOf(element) != -1) {
          result.push({
            severity: critical[critical.indexOf(element)],
            critical: critical[critical.indexOf(element) + 1],
          });
        }
      });
      if (result.length > 0) {
        Criticos.find({
          symbol: result[0].critical,
          severity: result[0].severity,
          start: { $lte: tirada },
          end: { $gte: tirada },
        }).exec((err, response) => {
          if (response && response[0]?.description?.length > 0) {
            return res.json({ critic: response[0].description });
          }
          return res.json({ critic: "No se encontraron resultados" });
        });
      }

  },


  getWeapons: async (req, res) => {
    const response = await Armas.find({tipo: req.body.weapon},'arma')
    return res.json({data: response})
  }
};