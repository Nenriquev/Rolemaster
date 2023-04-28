

const verify = async (attack, id_target, weapon) => {

  
  const secondaryCriticals = ['F','G','H','I','J']
  const result = []
  const formData = {}

  for (var i = attack.length - 1; i >= 0; i--) {
    result.push(attack[i])
  }

  const attackValues = {
    severity: result[1],
    critical: result[0]
  }


 if(secondaryCriticals.includes(attackValues.severity) && (id_target === 'critical2' || id_target === 'critical3') ){

    formData['weapon'] = weapon
    formData['attack'] = attack
    formData['id_target'] = id_target

  var requestOptions = {
    method: 'POST',
    body: JSON.stringify(formData),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  };
  
 const response = await fetch("http://localhost:3000/api/magicals", requestOptions)
    .catch(error => console.log('error', error));
  const message = await response.json()
  return message
  

 } else {
  return false
 }
  

  
}


export default verify