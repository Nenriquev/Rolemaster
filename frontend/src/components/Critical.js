  import { useState } from "react"
  import verify from "./Magicals"
  import styles from '../styles/home.module.css'
  import destructureCriticals from "./js/criticalsList"
  import CriticalInput from "./CriticalInput"

  const apiUrl = process.env.NEXT_PUBLIC_API_URL
  
  

const Critical = (props) => {

   


  const [criticalData, setCriticalData] = useState([])
  const [description, setDescription] = useState('')
  const attack = props?.data?.result
  const type = props?.data?.data?.pifia?.tipo
  const weapon = props.data?.data?.arma
  const criature = props?.criature?.type
  const weapon_type = props?.criature?.weapon_type
  const IsvalidCritical2 = (criature !== 'GM' && criature !== 'LM') && (attack.includes('F') || attack.includes('G') || attack.includes('H') || attack.includes('I') || attack.includes('J'))
  const IsvalidCritical3 = (criature !== 'GM' && criature !== 'LM') && (attack.includes('H') || attack.includes('I') || attack.includes('J'))
  const critical = destructureCriticals(attack, weapon)


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
    
   const response = await fetch(`${apiUrl}/api/criticals`, requestOptions)
      .catch(error => console.log('error', error));
    const message = await response.json()
    setDescription({...description, [e.target.id]: message})
  }

  

  const handleCriticalData =  (e) => {
    const { name, value } = e.target;
    setCriticalData({ ...criticalData, [name]: value});
  }

  
  
  return (

    
    <div className={styles.container_description}>

      <form id="critical" onSubmit={handleSubmitCritical}>
        <CriticalInput id={'critical'} value={criticalData} critical={critical} description={description} onChange={handleCriticalData}/>
      </form>
      {
         IsvalidCritical2 ? 
      <form id="critical2" onSubmit={handleSubmitCritical}>
        <CriticalInput id={'critical2'} value={criticalData} critical={critical} description={description} onChange={handleCriticalData}/>
      </form> : ''
      }
      {
        IsvalidCritical3 ? 
      <form id="critical3" onSubmit={handleSubmitCritical}>
        <CriticalInput id={'critical3'} value={criticalData}critical={critical} description={description} onChange={handleCriticalData}/>
      </form> : ''
      }
      </div>
  );
  
}

export default Critical;







