import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import {FormControl, InputLabel, Select, MenuItem, Button, Box } from '@mui/material'
import Critical from "./HomeComponents/Critical";
import WeaponsInput from "./HomeComponents/WeaponsInput";
import CriatureInput from "./HomeComponents/CriatureInput";
import WeaponCriatureType from "./HomeComponents/WeaponCriatureType";
import LimitTypeInput from "./HomeComponents/LimitTypeInput";
import InputRoll from "./HomeComponents/InputRoll";
import styles from '../styles/home.module.css'
import ArmorInput from "./HomeComponents/ArmorInput";
 

const Home = () => {

  const [status, setStatus] = useState('');
  const [data, setData] = useState('');
  const [critical, setCritical] = useState('');
  const [weapons, setWeapons] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const formRef = useRef();

  useEffect(() => {
    var requestOptions = {
      method: 'POST',
      body: JSON.stringify(selectedCategory),
      headers: { "Content-Type": "application/json" }  
    };

    fetch("http://localhost:3000/api/weaponType", requestOptions)
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
    
   const response = await fetch("http://localhost:3000/api/read", requestOptions)
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
    if(e.target.name === 'arma' || e.target.name === 'criatura' || e.target.name === 'weapon_type'){
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

  const resetData = () => {
    setSelectedCategory({weapon: ''})
    setData('')
    formRef.current.reset();
  }

  console.log(data)

  return (
    <div className={styles.App}>
      <h1>HOME</h1>
      <Link href='/uploadFile'>Subir un archivo</Link>
      <button type="button" onClick={resetData}>reset</button>
      <form className={styles.form} ref={formRef} onSubmit={handleSubmit}>
        <InputRoll onChange={handleData}/>
        <ArmorInput onChange={handleData}/>
        <FormControl className="box" sx={{width: '100%', "& .MuiOutlinedInput-root.Mui-focused": {"& > fieldset": {borderColor: "orange"}}}}>
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
        
        


        <Button sx={{width:'100%'}} type='submit' variant="contained" color="error">Tirar</Button>
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