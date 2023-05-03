import { useEffect, useState } from 'react';
import {FormControl, InputAdornment, InputLabel, Select, MenuItem} from '@mui/material';
import styles from '../styles/components.module.css'
import { styled } from '@mui/material/styles';
import { GiArrowScope } from "react-icons/gi";
import Spinner from './partials/Spiner';

const apiUrl = process.env.NEXT_PUBLIC_API_URL

const DistanceInput = (props) => {


  const [distance, setDistance] = useState('')
  const [load, setLoad] = useState(false)

  useEffect(() => {
    var requestOptions = {
      method: 'POST',
      body: JSON.stringify({weapon: props.weapon, distance: props.distance}), 
      headers: { "Content-Type": "application/json" }   
    };

    setLoad(true)

    fetch(`${apiUrl}/api/getdistances`, requestOptions)
      .then((response) => response.json())
      .then((data) => setDistance(data))
      .catch(error => console.log('error', error)); 

      setLoad(false)

  },[props.distance])

    return(
      <div className={styles.input__distance_container}>
        <div className={styles.input__distance_display}>
          <FormControlStyle 
            variant="filled" 
            error={props.error}
            className="box" 
            sx={{width: '100%', "& .MuiOutlinedInput-root.Mui-focused": {"& > fieldset": {borderColor: "orange"}}}}>

            <InputLabel>Distancia</InputLabel>
            <Select
                  name="distance"
                  value={props.distance ?? ''}
                  defaultValue={''}
                  label="Distancia"
                  onChange={props.onChange}
                  startAdornment={
                    <InputAdornment position="start">
                       {props.error ? <ErrorIcon className={styles.error__icon}/> : <GiArrowScope className={styles.icons}/>}
                    </InputAdornment>
                  }
                  MenuProps={MenuProps}
              >
                <MenuItem value={''}>Sin especificar</MenuItem>
                {
                  props.weaponDistance.map((element, index) => {
                    return(
                      <MenuItem key={index} value={element.start}>{`${element.start} mts - ${element.end} mts ~ [ ${element.bonus} ]`}</MenuItem>
                    )
                  })
                }
              </Select>

               
          </FormControlStyle>  
      
        </div>
        <div className={styles.input__distance_display}>
          {load ? <Spinner/> : <h2 style={{color:'rgb(164, 14, 14)', textAlign:'center'}}>{distance.bonus}</h2>}
        </div>
      </div>
      );


}

const FormControlStyle = styled(FormControl)((props)  => ({

  
    '& .MuiFormLabel-root.MuiInputLabel-root': { 
      transform: props.children[1].props.value !== '' ? 'translate(17px, 3px) scale(0.75)' : 'translate(40px, 15px) scale(1)', 
      transition: ".4s cubic-bezier(.25,.8,.5,1)",
      zIndex: '0',
      },
  
      '& .MuiFormLabel-root.MuiInputLabel-root.Mui-focused': {
        transform: 'translate(14px, -9px) scale(0.75)',
        transition: ".4s cubic-bezier(.25,.8,.5,1)",
        color: 'yellow',
      }, 
    }))
    
    const MenuProps = {
      PaperProps: {
       style: {
         backgroundColor: '#b65d32'
       },
     }, 
    };

export default DistanceInput;