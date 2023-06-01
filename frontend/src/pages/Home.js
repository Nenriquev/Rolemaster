import { useState, useEffect, useCallback, useRef } from "react";
import Head from "next/head";
import { Button, IconButton, Tooltip, Fade } from '@mui/material'
import { styled } from "@mui/material/styles";
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import destructureCriticals from "../components/js/criticalsList"
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
import OMInput from "../components/OMInput";
import Spinner from "@/components/partials/Spiner";
import validator from "@/components/js/validator";
import Header from "@/components/partials/Header";


const apiUrl = process.env.NEXT_PUBLIC_API_URL

const Home = () => {

  const [dataResults, setDataResults] = useState('');
  const [data, setData] = useState({});
  const [critical, setCritical] = useState(false);
  const [weapons, setWeapons] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [weaponDistance, setWeaponDistance] = useState(false);
  const [errors, setErrors] = useState({})
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
      .then((data) => {
      setWeaponDistance(data)
      setData(prevState => ({
        ...prevState,
        distance: data ? data.weaponDistance[0].start : ''  
      }));
      }
      )
      .catch(error => console.log('error', error));

  }, [data.arma])


  const handleSubmit = useCallback(async (e) => {

    setErrors(validator(data))


    if(e){
      e.preventDefault()
    }

    var requestOptions = {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" }  
    };

    setLoad(true);

    try{
      const response = await fetch(`${apiUrl}/api/read`, requestOptions);
      const responseData = await response.json();
      setDataResults(responseData)
   
      if(responseData.result !== 'No se encontraron resultados'){
        focusedRef.current.scrollIntoView()
        setCritical({opened: true, critical: destructureCriticals(responseData.result,null)})
      }
      setLoad(false)
    }
    catch(error){
      console.log(error)
    }
   
  
    
  },[data, setCritical, setDataResults])


  useEffect(() => {
    if(data.criatura || data.weapon_type || data.limite){
    handleSubmit()
    }
  },[data.criatura, data.weapon_type, data.limite])


  const handleData = (e) => {
    if(e.target.name === 'arma' || e.target.name === 'criatura' || e.target.name === 'weapon_type'){
      setCritical('')
      setDataResults('')
    }
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
    setErrors(prevState => ({...prevState, [name]: false}))
  }


  const handleCategory = (e) => {
    setSelectedCategory({weapon: e.target.value})
    setCritical('')
    setDataResults('')
    setData(prevState => ({
      ...prevState,
      arma: '',
      criatura: 'Normal',
      weapon_type: '',
      limite: '',
      distance: ''
    }));
    setErrors(prevState => ({...prevState, arma: false}))
  }

  const resetData = () => {
    setSelectedCategory({weapon: ''})
    setData('')
    setCritical('')
    setDataResults('')
    setErrors('')
    formRef.current.reset();
  }

  return (
    
    <div className='main'>
        <Head>
          <title>Rolemaster</title>
        </Head>

    <Header/>
        

      <div className={styles.App}>
        
        <div className={styles.col}>
          <div className={styles.col_container}>
            
              <div className={styles.main_container}>
                <div className={styles.form_container}>
                  <form className={styles.form} ref={formRef} onSubmit={handleSubmit}>
      
                    <div className={styles.input__container}>
                      <InputRoll onChange={handleData} name={data.tirada} error={errors.tirada}/>
                      <ArmorInput onChange={handleData} name={data.armadura} error={errors.armadura}/>
                    </div>
                    <div className={styles.input__container}>
                      <BOInput onChange={handleData} name={data.bo}/>
                      <BDInput onChange={handleData} name={data.bd}/>
                      <OMInput onChange={handleData} name={data.om}/>
                    </div>
                    <WeaponType onChange={handleCategory} selectedCategory={selectedCategory}/>
      
                    {
                      weapons.data && weapons.data.length > 0 ?
                      <WeaponsInput weapons={weapons.data} onChange={handleData} name={data.arma} error={errors.arma}/> : ''
                    }
                      <Fade in={true}>{weaponDistance()}</Fade>
                    {
                      weaponDistance.isWeaponDistance ?
                      
                      <DistanceInput onChange={handleData} distance={data.distance} weapon={data.arma} weaponDistance={weaponDistance.weaponDistance}/> : ''
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
      
      
                    <StyledButton sx={{width:'100%'}} type='submit' variant="contained" color="error">Obtener resultado</StyledButton>

                    <div className={styles.reset_button}>
                      <Tooltip title='Volver a tirar'>
                        <StyledIconButton type="button" variant="contained" onClick={resetData}><RestartAltIcon/></StyledIconButton>
                      </Tooltip> 
                    </div>

                  </form>
                </div>
              </div>
          </div>
        </div>

        <div className={styles.center_div}>
            <div className={styles.result_title}>
             { load ? <Spinner/> : <h2 className={styles.title}>{dataResults?.data?.points ? `${dataResults?.data?.points} P.V` : dataResults.result}</h2>} 
            </div>
        </div>
      
        <div ref={focusedRef} tabIndex={0} className={styles.col}>
          <div className={styles.secondcol_container}>
      
            <div className={styles.main_container}>
              {
                critical.opened && typeof(dataResults.result) != 'number' ?
                  <Critical data={dataResults} criature={{type: data.criatura, weapon_type: data.weapon_type}}/>
                  : <div className={styles.critical_header}><h2 className={styles.title}>Esperando criticos...</h2></div>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  
  );
}

export default Home


const StyledButton = styled(Button)(() => ({
  backgroundColor: '#A40000',
}));

const StyledIconButton = styled(IconButton)(() => ({
  backgroundColor: 'none',
  transform: 'rotate(5deg)'
}));

