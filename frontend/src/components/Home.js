import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './css/home.css'
 

const Home = () => {

  const [status, setStatus] = useState('')
  const [data, setData] = useState('')
  const [critical, setCritical] = useState('')
  const [criticalData, setCriticalData] = useState('')
  const [description, setDescription] = useState('')
  const [weapons, setWeapons] = useState([])
  const [selectedCategory, setSelectedCategory] = useState([])


  useEffect(() => {
    var requestOptions = {
      method: 'POST',
      body: JSON.stringify(selectedCategory),
      headers: { "Content-Type": "application/json" }  
    };

    fetch("/weapontype", requestOptions)
      .then((response) => response.json())
      .then((data) => setWeapons(data))
      .catch(error => console.log('error', error));

  }, [selectedCategory])


  const handleSubmit = async (e) => {
    e.preventDefault()
    var requestOptions = {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" }  
    };
    
   const response = await fetch("/read", requestOptions)
      .catch(error => console.log('error', error));
    const message = await response.json()
    setStatus(message)
    if(message.result !== 'No se encontraron resultados'){
      setCritical(message)
    }
    
  }

  const handleCriticalData =  (e) => {
    const { name, value } = e.target;
    setCriticalData({ ...criticalData, [name]: value});
  }



  const handleSubmitCritical = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('tirada', criticalData.critical)
    formData.append('critical', critical.result)
    formData.append('type', critical?.data?.tipo ? critical.data.tipo : null)

    
    var requestOptions = {
      method: 'POST',
      body: formData,
    };
    
   const response = await fetch("/criticals", requestOptions)
      .catch(error => console.log('error', error));
    const message = await response.json()
    setDescription(message)
  }

  const handleData = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  }

  const handleCategory = (e) => {
    setSelectedCategory({weapon: e.target.value})
  }



  return (
    <div className="App">
      <h1>HOME</h1>
      <Link to='/uploadFile'>Subir un archivo</Link>
      <form onSubmit={handleSubmit}>
        <label>Tirada <input onChange={handleData} type="text" id="tirada" name="tirada" /></label>
        <label>Armadura <input onChange={handleData} type="text" id="armadura" name="armadura" /></label>
        <select onChange={handleCategory} name='type'>
          <option defaultValue={''}>Selecciona una opci??n</option>
          <option value={'1 mano'}>1 Mano</option>
          <option value={'contundentes'}>Contundentes</option>
          <option value={'magia ofensiva'}>Magia ofensiva</option>
        </select>
        { weapons.data && weapons.data.length > 0 ?
        <select onChange={handleData} name='arma'>
          <option defaultValue={''}>Selecciona una opci??n</option>
          {weapons.data.map((item, index) => {
            return (
              <option key={index} value={item.arma}>{item.arma}</option>
              )
          })}
        </select> : ''
        } 
        <button type='submit'>Tirar</button>
      </form>
      <h2>{status.result}</h2>
      {
        critical && typeof(critical.result) != 'number' ? 
        <div className="container-description">
          <form onSubmit={handleSubmitCritical}>
            <label>Tirada <input onChange={handleCriticalData} type="text" id="critical" name="critical"/></label>
            <button type='submit'>Tirar</button>
            <h2>{description.critic}</h2>
          </form>
        </div>
          : ''
      }
    </div>
  );
}


export default Home