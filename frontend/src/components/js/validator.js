

const validator = (data) => {
  const errors = {}

  if(!data.tirada || data.tirada === ''){
    errors.tirada = true
  }

  if(!data.armadura || data.armadura === ''){
    errors.armadura = true
  }

  if(!data.arma || data.arma === ''){
    errors.arma = true
  }


  


  return errors

}


export default validator;