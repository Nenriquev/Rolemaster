import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import Head from "next/head";
import { Button } from '@mui/material'
import Critical from "../components/Critical";
import WeaponsInput from "../components/WeaponsInput";
import CriatureInput from "../components/CriatureInput";
import WeaponCriatureType from "../components/WeaponCriatureType";
import LimitTypeInput from "../components/LimitTypeInput";
import InputRoll from "../components/InputRoll";
import ArmorInput from "../components/ArmorInput";
import styles from '../styles/home.module.css'
import WeaponType from "../components/WeaponType";
import DistanceInput from "../components/DistanceInput";
import BOInput from "../components/BOInput";
import BDInput from "../components/BDInput";
import Spinner from "@/components/partials/Spiner";

const apiUrl = process.env.NEXT_PUBLIC_API_URL
 

const Home = () => {

  const [status, setStatus] = useState('');
  const [data, setData] = useState('');
  const [critical, setCritical] = useState('');
  const [weapons, setWeapons] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [weaponDistance, setWeaponDistance] = useState(false)
  const [load, setLoad] = useState(false)
  const formRef = useRef();
  const focusedRef = useRef()
 

  useEffect(() => {
    var requestOptions = {
      method: 'POST',
      body: JSON.stringify(selectedCategory),
      headers: { "Content-Type": "application/json" }  
    };

    fetch(`${apiUrl}/api/weapontype`, requestOptions)
      .then((response) => response.json())
      .then((data) => setWeapons(data))
      .catch(error => console.log('error', error));

  }, [selectedCategory])

  useEffect(() => {
    var requestOptions = {
      method: 'POST',
      body: JSON.stringify({weapon: data.arma}), 
      headers: { "Content-Type": "application/json" }   
    };

    fetch(`${apiUrl}/api/distances`, requestOptions)
      .then((response) => response.json())
      .then((data) => setWeaponDistance(data))
      .catch(error => console.log('error', error));

  }, [data.arma])

  const handleSubmit = useCallback(async (e) => {

    if(e){
      e.preventDefault()
    }
    
    var requestOptions = {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" }  
    };
    
   const response = await fetch(`${apiUrl}/api/read`, requestOptions).catch(
     (error) => console.log("error", error)
   );
   setLoad(true);
   const responseData = await response.json();
  
    setStatus(responseData)
    setLoad(false)
    if(responseData.result !== 'No se encontraron resultados'){
      focusedRef.current.scrollIntoView()
      setCritical(responseData)
    }
  },[data, setCritical, setStatus])


  useEffect(() => {
    if(data.criatura || data.weapon_type || data.limite){
    handleSubmit()
    }
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

      
      <Link href='uploadFile'>Subir archivo</Link>
      <div className={styles.col}>

        <div className={styles.col_container}>
          <div className={styles.row_title}>
            <h1 className={styles.title}>Rolemaster</h1>
          </div>
            <div className={styles.main_container}>
              <div className={styles.form_container}>
                <form className={styles.form} ref={formRef} onSubmit={handleSubmit}>
                  
                  <div className={styles.input__container}>
                    <InputRoll onChange={handleData} name={data.tirada}/>
                    <ArmorInput onChange={handleData} name={data.armadura}/>
                  </div>
                  <div className={styles.input__container}>
                    
                    <BOInput onChange={handleData} name={data.bo}/>
                    <BDInput onChange={handleData} name={data.bd}/>
                  </div>
                  <WeaponType onChange={handleCategory} selectedCategory={selectedCategory}/>
                  {
                    weapons.data && weapons.data.length > 0 ?
                    <WeaponsInput weapons={weapons.data} onChange={handleData} name={data.arma}/> : ''
                  }

                  {

                    weaponDistance ? 
                    <DistanceInput onChange={handleData} name={data.distancia} /> : ''
          
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

                  <button type="button" onClick={resetData}>Volver a tirar</button>
                </form>
              </div>
            </div>
        </div>
      </div>
       
      <div ref={focusedRef} tabIndex={0} className={styles.col}>
                  {console.log(load)}
      <div className={styles.col_container}>
          <div className={styles.row_title}>
            { load ? <Spinner/> : <h2 className={styles.title}>{status.result}</h2>}
          </div>

          <div className={styles.main_container}>
            {
              critical && typeof(critical.result) != 'number' ?
                <Critical critical={critical} criature={{type: data.criatura, weapon_type: data.weapon_type}}/>
                : <div className={styles.critical_header}><h2 className={styles.title}>Esperando criticos...</h2></div>
            }
          </div>
        </div>
      </div>
    </div>
  
  );
}

export default Home