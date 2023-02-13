import { useState } from "react";
import { Link } from "react-router-dom";
import './css/home.css'

const Home = () => {

  const [status, setStatus] = useState('')
  const [data, setData] = useState('')

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
  }

  const handleData = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  }


  return (
    <div className="App">
      <h1>HOME</h1>
      <Link to='/uploadFile'> Subir un archivo</Link>
      <form onSubmit={handleSubmit}>
        <label>Tirada <input onChange={handleData} type="text" id="tirada" name="tirada" /></label>
        <label>Armadura <input onChange={handleData} type="text" id="armadura" name="armadura" /></label>
        <select onChange={handleData} name='arma'>
          <option defaultValue={''}>Selecciona una opción</option>
          <option value={'Aguijones'}>Aguijones</option>
          <option value={'Alfanje'}>Alfanje</option>
        </select>
        <button type='submit'>tirar</button>
      </form>
      <h2>{status.result}</h2>
    </div>
  );
}


export default Home