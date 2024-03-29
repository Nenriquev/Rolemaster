const express = require('express');
const path = require('path')
const router = express.Router();
const filesController = require('../controller/filesController.js')
const readController = require('../controller/readController.js')



const uploadMiddleware = (req, res, next) => {
  if(!req?.files?.file){
    return res.status(500).json({error: 'No ha seleccionado ningun archivo'})
  }
  else {
    if(req.files.file.mimetype != 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'){
      return res.status(500).json({error: 'El archivo no esta soportado'})
    }
    const fileName = `${req.body.category}${path.extname(req.files.file.name)}`
    req.files.file.mv(path.join(__dirname, `../public/excel/${fileName}`)).then(() => next())
  }
  
}



/* GET home page. */
router.get('/', (req, res) =>{res.send('Servidor corriendo')})

router.post('/api/upload',uploadMiddleware, filesController.fileAuth) 
router.post('/api/read', readController.read) 
router.post('/api/criticals', readController.getCriticals) 
router.post('/api/magicals', readController.getMagicals)
router.post('/api/weapontype', readController.getWeapons) 
router.post('/api/distances', readController.getWeaponDistance) 
router.post('/api/getdistances', readController.getDistance) 





module.exports = router;
