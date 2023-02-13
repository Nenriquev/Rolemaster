const Armas = require('../database/models/Armas') 

module.exports = {

  read: async (req, res) => {

    const arrayKey = req?.body?.tirada?.toLowerCase() ? req?.body?.tirada?.toLowerCase() : ''
    const objectKey = req?.body?.armadura?.toLowerCase() ? req?.body?.armadura?.toLowerCase() : ''
    const weaponKey = req?.body?.arma ? req.body.arma : ''

      Armas.aggregate([
      { $match: {arma: weaponKey} },
      {
        $project: {
          tirada: {
            $filter: {
              input: `$tirada.${arrayKey}.${objectKey}`,
              as: "item",
              cond: { $ne: [`$$item.${objectKey}`, {}] },
            },
          },
        },
      },
    ]).exec((err, result) => {
      if (err) {
       console.log(err)
      }
      if (result) {
        if(result[0]?.tirada?.length > 0){
          return res.json({result: result[0].tirada[0]})
        }
        return res.json({result: 'No se encontraron resultados'})
      }
      else {
        return res.json({result: 'No se encontraron resultados'})
      }
    }); 

   
      },
    };