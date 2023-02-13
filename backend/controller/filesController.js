const Bonificadores = require('../database/models/Bonficadores') 
const Armas = require('../database/models/Armas') 
const path = require('path')
const fs = require('fs')
const XLSX = require("xlsx");



const sheetVerify = async (worksheet, category) => {

  const headers = XLSX.utils.sheet_to_json(worksheet, { header: 1 })[0];
  const renameHeader = headers.map(element => {
    return element.toLowerCase()
  });


  switch (category) {
    case 'bonificadores':
      if(renameHeader[0] == 'tirada' && renameHeader[1] == 'bonificador'){

        let verify = verifyColumn(worksheet)

        if(!verify){
          return {verify: false}
        }
        const sheet = XLSX.utils.sheet_to_json(worksheet, {defval:""})
        const newSheet = transformKeys(sheet)

        newSheet.forEach((data) => {
          Bonificadores.updateOne({ "tirada": data.tirada }, data, { upsert: true }, (err) => {
            if (err) {
              return console.log(err)
            }
          });
        });

        return true

      }
      else {
        return false
      }
    case 'armas':
      if(renameHeader[0] == 'arma' && renameHeader[1] == 'tirada'){

        const sheet = XLSX.utils.sheet_to_json(worksheet, {defval:""})
        const newSheet = transformKeys(sheet)
        let obj = {}

        newSheet.forEach((element, value) => {
          const array = [{'ta20':element.ta20}, {'ta19':element.ta19}, {'ta18':element.ta18}, {'ta17':element.ta17}, {'ta16':element.ta16}, {'ta15':element.ta15}, {'ta14':element.ta14}, {'ta13':element.ta13}, {'ta12':element.ta12}, {'ta11':element.ta11}, {'ta10':element.ta10}, {'ta9':element.ta9}, {'ta8':element.ta8}, {'ta7':element.ta7}, {'ta6':element.ta6}, {'ta5':element.ta5}, {'ta4':element.ta4}, {'ta3':element.ta3}, {'ta2':element.ta2}, {'ta1':element.ta1}]
          obj[element.tirada] = array
        })


       const name = newSheet.find(element => {
          return element.arma
        })

        const newObj = {
          arma: name.arma,
          tirada: obj
        }

        const verifyIfExist =  await Armas.exists({arma: name.arma})
        if(!verifyIfExist){
          await Armas.insertMany(newObj) 
        }
        else{
         await Armas.deleteOne({arma: name.arma})
         await Armas.insertMany(newObj)
        }

  
        return true
      }
      else{
        return false
      }

    default:
      break;
  }
}

const verifyColumn = (worksheet) => {
  const results = XLSX.utils.sheet_to_json(worksheet, {
    header: ["A"],
    blankrows: true,
    range: 1,
  });
  const verify = results.every((item, index) => {
    if (item.A == index) {
      return true;
    }
    return false;
  });
  return verify;
};

const transformKeys = (sheet) => {
  const lowerCaseDataArray = sheet.map((data) => {
    const lowerCaseData = {};
    Object.keys(data).forEach((key) => {
      lowerCaseData[key.toLowerCase()] = data[key];
    });
    return lowerCaseData;
  });

  return lowerCaseDataArray;
};


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


