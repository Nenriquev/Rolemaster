  import { useState } from "react"
  import { Button } from "@mui/material"
  import verify from "./Magicals"

  
  

const Critical = (props) => {

  const [criticalData, setCriticalData] = useState([])
  const [description, setDescription] = useState('')
  const attack = props.critical.result
  const type = props?.critical?.data?.tipo
  const weapon = props.critical?.data?.arma
  const criature = props?.criature?.type
  const weapon_type = props?.criature?.weapon_type
  const IsvalidCritical2 = (criature !== 'GM' && criature !== 'LM') && (attack.includes('F') || attack.includes('G') || attack.includes('H') || attack.includes('I') || attack.includes('J'))
  const IsvalidCritical3 = (criature !== 'GM' && criature !== 'LM') && (attack.includes('H') || attack.includes('I') || attack.includes('J'))

 

  const handleSubmitCritical = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    const result = await verify(attack, e.target.id, weapon)
    if(result){
      formData.append('attack', result.attack)
    }else {
      formData.append('attack', attack)
    }
    formData.append(`tirada`, criticalData[e.target.id]) 
    formData.append('type', type ? type : null)
    formData.append('weapon', weapon ? weapon : null)
    formData.append('criature', criature ? criature : null)
    formData.append('weapon_type', weapon_type ? weapon_type : null)
    
    var requestOptions = {
      method: 'POST',
      body: formData,
    };
    
   const response = await fetch("http://localhost:3000/api/criticals", requestOptions)
      .catch(error => console.log('error', error));
    const message = await response.json()
    setDescription({...description, [e.target.id]: message})
  }

  

  const handleCriticalData =  (e) => {
    const { name, value } = e.target;
    setCriticalData({ ...criticalData, [name]: value});
  }
  
  return (
    <div>
      <form id="critical" onSubmit={handleSubmitCritical}>
        <label>Critico 1<input onChange={handleCriticalData} type="text" id="critical" name="critical"/></label>
        <Button type='submit' variant="contained" color="success">Tirar critico #1</Button>
        <h2>{description?.critical?.critic}</h2>
      </form>
      {
         IsvalidCritical2 ? 
      <form id="critical2" onSubmit={handleSubmitCritical}>
        <label>Critico 2<input onChange={handleCriticalData} type="text" name="critical2"/></label>
        <Button type='submit' variant="contained" color="success">Tirar critico #2</Button>
        <h2>{description?.critical2?.critic}</h2>
      </form> : ''
      }
      {
        IsvalidCritical3 ? 
      <form id="critical3" onSubmit={handleSubmitCritical}>
        <label>Critico 3<input onChange={handleCriticalData} type="text" name="critical3"/></label>
        <Button type='submit' variant="contained" color="success">Tirar critico #3</Button>
        <h2>{description?.critical3?.critic}</h2>
      </form> : ''
      }
      </div>
  );
  
}

export default Critical;







