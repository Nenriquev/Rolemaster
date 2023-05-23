const Armas = require('../database/models/Armas') 
const Criticos_secundarios = require('../database/models/Criticos_secundarios')
const Distance_bonus = require('../database/models/Distance_bonus')
const dataModule = require('../controller/dataModule') 

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

module.exports = {

  read: async (req, res) => {

    let tiradaSM = req.body.tirada ? Number(req?.body?.tirada) : '0';   //Tirada sin modificar
    const limit = req.body.limite ?? ''
    const armour = req?.body?.armadura?.toLowerCase() ? req?.body?.armadura?.toLowerCase() : '0'
    const criatura = req.body.criatura ?? ''
    const weaponKey = req?.body?.arma ?? ''
    const distance = req.body.distancia ?? ''
    const pifia = await Armas.findOne({TSM_pifias:{ $elemMatch:{pifia : tiradaSM}}, arma: weaponKey}, {TSM_pifias:{ $elemMatch:{pifia : tiradaSM}}})
    const specialAttack = await Armas.findOne({TSM_ataques:{ $elemMatch:{tsm : tiradaSM}}, arma: weaponKey}, {TSM_ataques:{ $elemMatch:{tsm : tiradaSM}}})
    

      if(pifia){
       return res.json({result: 'Pifiaste', data: pifia.TSM_pifias[0]})
      }

      else if(specialAttack){
        const response = await dataModule.specialAttack(weaponKey, armour, criatura)
        if(response && response[0].ataque?.length > 0){
        return res.json({result: response[0].ataque[0], data:{ arma: response[0].arma, tipo: response[0].tipo}})
        } else {
          return res.json({result: 'No se encontraron resultados'})
        }
      } 
      
      else {

        if(limit != '') {
          const limitType = await dataModule.limitType(limit)
          tiradaSM = tiradaSM >= limitType ? limitType : tiradaSM
        }

        const response = await dataModule.attack(weaponKey, armour, tiradaSM, criatura)
        if(response && response[0]?.tirada?.length > 0){
          const destructureCritical = destructure(response[0].tirada[0])
          return res.json({result: response[0].tirada[0] == 'F*' ? 'Pifiaste' : response[0].tirada[0], data:{arma: response[0].arma, tipo: response[0].tipo, destructured: destructureCritical}})
        }
        return res.json({result: 'No se encontraron resultados'})
       }


  },

  getCriticals: async (req, res) => {

    const tirada = Number(req?.body?.tirada)
    const attack = req.body.attack
    const criature = req.body.criature
    const weapon_type = req.body.weapon_type



    if (attack == "Pifiaste" || attack == 'F*') {
      const response = await dataModule.pifias(req.body.type, tirada)
      if (response && response[0]?.description?.length > 0) {
        return res.json({ critic: response[0].description });
      }
      return res.json({ critic: "No se encontraron resultados" });
      
    } else {

      const response = await dataModule.criticals(attack, tirada, criature, weapon_type)
      if (response && response[0]?.description?.length > 0) {
        return res.json({critic: response[0]?.description});
      }
      return res.json({critic: "No se encontraron resultados" });
    }

  },


  getWeapons: async (req, res) => {
    const response = await Armas.find({tipo: req.body.weapon},'arma')
    return res.json({data: response})
  },


  getMagicals: async (req, res) => {

    if (Object.entries(req.body).length != 0) {
      const weapon = req?.body?.weapon;
      const attack = req?.body?.attack;
      const id_target = req?.body?.id_target;

      const attackValues = destructure(attack)
      
      
      Criticos_secundarios.findOne({
        arma: weapon,
        critical: attackValues.severity,
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
  },

  getWeaponDistance: async (req, res) => {

    const response = await Distance_bonus.findOne({weapon: req.body.weapon},'bonus')

    if(response){
      const verifyIfisProjectile = response?.bonus?.every(item => item.bonus === 'Fuera Rango')
      return res.json({isWeaponDistance: !verifyIfisProjectile, weaponDistance: !this.isWeaponDistance ? response.bonus : null })
    } 
    return res.json(false)
    
  },

  getDistance: async (req, res) => {
    
    const distance = req.body.distance !== '' ? req.body.distance : ''

     const response = await Distance_bonus.findOne({ 
      weapon: req.body.weapon, 
      bonus: { 
        $elemMatch: { 
          start: { $lte: distance}, 
          end: { $gte: distance } 
        } 
      } 
    },{ "bonus.$": 1 }) 

    if(response && response.bonus.length > 0){
      return res.json({bonus: response.bonus[0].bonus})
    }

    return res.json({bonus: 'Fuera de rango'})
  }
};