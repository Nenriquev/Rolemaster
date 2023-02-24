const path = require('path')
const fs = require('fs')
const XLSX = require("xlsx");
const sheetVerify = require('./filesUploadModule')



module.exports = {

  fileAuth: async (req, res) => {

    if(!req?.files?.file){
      return res.status(500).json({error: 'No hay ningun archivo seleccionado'})
    }
    else{
    const workbook = XLSX.readFile(path.resolve(`public/excel/${req.body.category}${path.extname(req.files.file.name)}`))
    const firstSheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[firstSheetName];
    const verification = await sheetVerify(worksheet, req.body.category)
     
      if(!verification){
        fs.unlinkSync(path.resolve(`public/excel/${req.body.category}${path.extname(req.files.file.name)}`), (err) => console.log(err))
        return res.status(500).json({error: req.body.category ? `La hoja seleccionada no es la de ${req.body.category}` : 'Debe elegir una categoria'}) 
      }
      if(verification.verify == false){
        return res.status(500).json({error: `La hoja contiene errores en los datos`}) 
      }
       
      res.json({mensaje: 'Hoja cargada correctamente'})
      }

    
  },
}


