import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import {Button } from '@mui/material'
import Critical from "./HomeComponents/Critical";
import WeaponsInput from "./HomeComponents/WeaponsInput";
import CriatureInput from "./HomeComponents/CriatureInput";
import WeaponCriatureType from "./HomeComponents/WeaponCriatureType";
import LimitTypeInput from "./HomeComponents/LimitTypeInput";
import InputRoll from "./HomeComponents/InputRoll";
import ArmorInput from "./HomeComponents/ArmorInput";
import styles from '../styles/home.module.css'
import WeaponType from "./HomeComponents/WeaponType";
import Head from "next/head";
 

const Home = () => {

  const [status, setStatus] = useState('');
  const [data, setData] = useState('');
  const [critical, setCritical] = useState('');
  const [weapons, setWeapons] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const formRef = useRef();
  const focusedRef = useRef()
 

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
      focusedRef.current.scrollIntoView()
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
    setCritical('')
    setStatus('')
    formRef.current.reset();
  }


  return (
    
    <div className={styles.App}>
      <Head>
        <title>Rolemaster</title>
      </Head>

      
      
      <div className={styles.col}>
        <h1 className={styles.title}>HOME</h1>
        <button type="button" onClick={resetData}>Volver a tirar</button>
        <form className={styles.form} ref={formRef} onSubmit={handleSubmit}>
        
          <div className={styles.input__container}>
            <InputRoll onChange={handleData} name={data.tirada}/>
            <ArmorInput onChange={handleData} name={data.armadura}/>
          </div>
          <WeaponType onChange={handleCategory} selectedCategory={selectedCategory}/>
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
      </div>

        
      <div ref={focusedRef} tabIndex={0} className={styles.col}>

      <div className={styles.col_container}>
          <div>
            <h2 className={styles.title}>{status.result}</h2>
          </div>
        
            {
              critical && typeof(critical.result) != 'number' ?
        
                <Critical critical={critical} criature={{type: data.criatura, weapon_type: data.weapon_type}}/>
        
                : <h2 className={styles.title}>Esperando criticos...</h2>
            }
        </div>
      </div>
    </div>
  
  );
}

export default Home