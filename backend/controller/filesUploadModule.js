const Bonificadores = require('../database/models/Bonficadores') 
const Armas = require('../database/models/Armas') 
const Criticos = require('../database/models/Criticos') 
const Pifias = require('../database/models/Pifias') 
const Distance_bonus = require('../database/models/Distance_bonus') 
const XLSX = require("xlsx");


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



const sheetVerify = async (worksheet, category) => {

  const headers = XLSX.utils.sheet_to_json(worksheet, { header: 1 })[0];
  const renameHeader = headers.map(element => {
    return element.toLowerCase()
  });

  const sheet = XLSX.utils.sheet_to_json(worksheet, { defval: "" });
  const newSheet = transformKeys(sheet);


  switch (category) {
    case "bonificadores":
      if (renameHeader[0] == "tirada" && renameHeader[1] == "bonificador") {
        let verify = verifyColumn(worksheet);

        if (!verify) {
          return { verify: false };
        }

        newSheet.forEach((data) => {
          Bonificadores.updateOne(
            { tirada: data.tirada },
            data,
            { upsert: true },
            (err) => {
              if (err) {
                return console.log(err);
              }
            }
          );
        });

        return true;
      } else {
        return false;
      }
    case "armas":
      if (renameHeader[0] == "arma" && renameHeader[1] == "tirada") {
        const sheet = XLSX.utils.sheet_to_json(worksheet, { defval: "" });
        const newSheet = transformKeys(sheet);
        let obj = {};

        newSheet.forEach((element, value) => {
          const array = [
            { ta20: element.ta20 },
            { ta19: element.ta19 },
            { ta18: element.ta18 },
            { ta17: element.ta17 },
            { ta16: element.ta16 },
            { ta15: element.ta15 },
            { ta14: element.ta14 },
            { ta13: element.ta13 },
            { ta12: element.ta12 },
            { ta11: element.ta11 },
            { ta10: element.ta10 },
            { ta9: element.ta9 },
            { ta8: element.ta8 },
            { ta7: element.ta7 },
            { ta6: element.ta6 },
            { ta5: element.ta5 },
            { ta4: element.ta4 },
            { ta3: element.ta3 },
            { ta2: element.ta2 },
            { ta1: element.ta1 },
          ];
          if(element.tsm != 'TSM'){
          obj[element.tirada] = array;
          }
          
        });
        
        const data = newSheet.find((element) => {
          return element.arma;
        });


        const pifias = newSheet.flatMap((element) => element.tsm == '' || element.ta1 != 'F*' || element.ta20 != 'F*' ? [] : {pifia: element.tirada, tipo: element.tipo});
        const ataques = newSheet.flatMap((element) => {
          const array = [
            { ta20: element.ta20 },
            { ta19: element.ta19 },
            { ta18: element.ta18 },
            { ta17: element.ta17 },
            { ta16: element.ta16 },
            { ta15: element.ta15 },
            { ta14: element.ta14 },
            { ta13: element.ta13 },
            { ta12: element.ta12 },
            { ta11: element.ta11 },
            { ta10: element.ta10 },
            { ta9: element.ta9 },
            { ta8: element.ta8 },
            { ta7: element.ta7 },
            { ta6: element.ta6 },
            { ta5: element.ta5 },
            { ta4: element.ta4 },
            { ta3: element.ta3 },
            { ta2: element.ta2 },
            { ta1: element.ta1 },
          ]; 
          
         return element.tsm == '' || element.ta1 == 'F*' || element.ta20 == 'F*' ? [] : {tsm: element.tirada, ataque: array}});

        const newObj = {
          arma: data.arma,
          tipo: data.tipo,
          tirada: obj,
          TSM_pifias: pifias,
          TSM_ataques: ataques,
        };
       
          const verifyIfExist = await Armas.exists({ arma: data.arma });
        if (!verifyIfExist) {
          await Armas.insertMany(newObj);
        } else {
          await Armas.deleteOne({ arma: data.arma });
          await Armas.insertMany(newObj);
        }   

 
        return true;
      } else {
        return false;
      }

    case "criticos":
      const cutHeaders = headers.slice(4);

      if (renameHeader[0] == "simbolo" && renameHeader[1] == "tipo") {
        const result = sheet.map((column) => {
          const loop = cutHeaders.map((element) => {
            return {
              type: column.tipo,
              symbol: column.simbolo,
              severity: element,
              start: column.Start,
              end: column.End,
              description: column[element],
            };
          });
          return loop;
        });

        const verifyIfExist = await Criticos.exists({type: result[0][0].type,});
        if (!verifyIfExist) {
          result.forEach((element) => {
            Criticos.insertMany(element);
          });
        } else {
          await Criticos.deleteMany({ type: result[0][0].type });
          result.forEach((element) => {
            Criticos.insertMany(element);
          });
        }
        return true;
      } else {
        return false;
      }
      
    
    case 'pifias': 

    if(renameHeader[0] == 'start' && renameHeader[1] == 'end'){
      const cutHeaders = headers.slice(2);
      const data = []
      sheet.forEach((column) => {
        cutHeaders.forEach((element) => {
          data.push({
            start: column.start,
            end: column.end,
            type: element,
            description: column[element],
          })
        });
      });
      
      const verifyIfExist = await Pifias.count()
      if(verifyIfExist == 0){
       await Pifias.insertMany(data)
      }
      else{
        await Pifias.deleteMany({})
        await Pifias.insertMany(data)
      }
      return true
    }
    else {
      return false
    }


    case 'modificadores alcance':

      if(renameHeader[0] == 'arma' && renameHeader[1] == 'a') {

        const values = {
          a: {start: 0, end: 3},
          b: {start: 4, end: 8},
          c: {start: 9, end: 8},
          d: {start: 16, end: 30},
          e: {start: 31, end: 45},
          f: {start: 46, end: 60},
          g: {start: 61, end: 90},
          h: {start: 91, end: 110},
          i: {start: 111, end: 120}
        }

        const arrayOfBonuses = newSheet.map(object => {
          const bonus = [];
        
          for (const property in object) {
            if (property !== 'arma') {
              bonus.push({
                start: values[property].start,
                end: values[property].end,
                bonus: object[property]
              });
            }
          }
        return {weapon: object.arma, bonus: bonus}
        })

        const verifyIfExist = await Distance_bonus.count()
          if(verifyIfExist == 0){
            await Distance_bonus.insertMany(arrayOfBonuses)
          }
          else{
            await Distance_bonus.deleteMany({})
            await Distance_bonus.insertMany(arrayOfBonuses)
          }

        return true
      } 

      return false


    default:
      break;
  }
}


module.exports = sheetVerify

