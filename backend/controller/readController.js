const Armas = require('../database/models/Armas') 
const Criticos = require('../database/models/Criticos') 

module.exports = {

  read: async (req, res) => {

    const tirada = req?.body?.tirada > 151 ? 151 : Number(req?.body?.tirada);
    const armour = req?.body?.armadura?.toLowerCase() ? req?.body?.armadura?.toLowerCase() : ''
    const weaponKey = req?.body?.arma ? req.body.arma : ''
      /* Tiro el dado, si saco un numero bajo tengo que verificar que es pifia, si es pifia verifico que tipo de arma es y vuelvo a lanzar el dado, el resultado lo busco en tabla de pifias y retorno la descripcion*/
      /* */

    const pifia = await Armas.findOne({pifias:{ $elemMatch:{pifia : tirada}}}, {pifias:{ $elemMatch:{pifia : tirada}}})
      if(pifia){
        res.json({result: 'Pifiaste loco'})
      }

      /* Armas.aggregate([
      { $match: {arma: weaponKey} },
      {
        $project: {
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
          return res.json({result: response[0].tirada[0]})
        }
        return res.json({result: 'No se encontraron resultados'})
    }); 
 */
   
  },

  getCriticals: async (req, res) => {
    const tirada = req?.body?.tirada > 100 ? 100 : Number(req.body.tirada)
    const critical = req.body.critical
    const severitySymbols = ['A', 'B', 'C', 'D', 'E']
    const result = []
    severitySymbols.forEach(element => {
      if (critical.indexOf(element) != -1){
          result.push({severity: critical[critical.indexOf(element)], critical: critical[critical.indexOf(element) + 1]})
      }
    })
    if (result.length > 0) {
      Criticos.find({
        symbol: result[0].critical,
        severity: result[0].severity,
        start: { $lte: tirada },
        end: { $gte: tirada },
      }).exec((err, response) => {
        if (response) {
          if (response[0]?.description?.length > 0) {
            return res.json({ critic: response[0].description });
          }
          return res.json({ critic: "No se encontraron resultados" });
        }
      });
    }


    

  }
};