import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import {FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material'
import Critical from "./Critical";
import WeaponsInput from "./WeaponsInput";
import CriatureInput from "./CriatureInput";
import WeaponCriatureType from "./WeaponCriatureType";
import LimitTypeInput from "./LimitTypeInput";
import './css/home.css'
 

const Home = () => {

  const [status, setStatus] = useState('')
  const [data, setData] = useState('')
  const [critical, setCritical] = useState('')
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

  const handleSubmit = useCallback(async (e) => {

    if(e){
      e.preventDefault()
    }
    
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
  },[data, setCritical, setStatus])

  useEffect(() => {
    handleSubmit()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[data.criatura, data.weapon_type, data.limite])


  const handleData = (e) => {
    if(e.target.name === 'arma'){
      setCritical('')
      setStatus('')
    }
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  }


  const handleCategory = (e) => {
    setSelectedCategory({weapon: e.target.value})
    setCritical('')
    setStatus('')
    setData(prevState => ({
      ...prevState,
      arma: '',
      criatura: '',
      weapon_type: '',
      limite: '',
    }));
  }

  return (
    <div className="App">
      <h1>HOME</h1>
      <Link to='/uploadFile'>Subir un archivo</Link>
      <form onSubmit={handleSubmit}>
        <label>Tirada <input onChange={handleData} type="text" id="tirada" name="tirada" required/></label>
        <label>Armadura <input onChange={handleData} type="text" id="armadura" name="armadura" required/></label>
        <FormControl className='box' sx={{width: '100%', "& .MuiOutlinedInput-root.Mui-focused": {"& > fieldset": {borderColor: "orange"}}}}>
        <InputLabel>Tipo de arma</InputLabel>
        <Select
          value={selectedCategory?.weapon ?? ''}
          defaultValue={''}
          label="Tipo de arma"
          onChange={handleCategory}
        >
          <MenuItem value={'1 mano'}>1 Mano</MenuItem>
          <MenuItem value={'contundentes'}>Contundentes</MenuItem>
          <MenuItem value={'magia ofensiva'}>Magia ofensiva</MenuItem>
          <MenuItem value={'animales'}>Animales</MenuItem>
          <MenuItem value={'artes marciales'}>Artes marciales</MenuItem>
        </Select>
      </FormControl>

      

        { 
          weapons.data && weapons.data.length > 0 ? 
          <WeaponsInput weapons={weapons.data} onChange={handleData} name={data.arma}/> : '' 
        } 

          <CriatureInput onChange={handleData} name={data.criatura} category={selectedCategory}/>
        
        { 
          data.criatura && (data.criatura === 'GM' || data.criatura === 'G' || data.criatura === 'LM' || data.criatura === 'L') ? 
          <WeaponCriatureType onChange={handleData} name={data.weapon_type} category={selectedCategory}/> : ''
        }
          
        {
          selectedCategory.weapon === 'animales' ? <LimitTypeInput type={'animales'} onChange={handleData} name={data.limite}/> : 
          ( selectedCategory.weapon === 'artes marciales' ? <LimitTypeInput type={'artes marciales'} onChange={handleData} name={data.limite}/> : '')
        }
        
          
  


        <Button type='submit' variant="contained" color="error">Tirar</Button>
      </form>


      <h2>{status.result}</h2>
      {
        critical && typeof(critical.result) != 'number' ? 
        <div className="container-description">
          <Critical critical={critical} criature={{type: data.criatura, weapon_type: data.weapon_type}}/>
        </div>
          : ''
      }
    </div>
  );
}


export default Home