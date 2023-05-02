import { FormControl, InputLabel, Select, MenuItem, InputAdornment } from "@mui/material";
import { styled } from '@mui/material/styles';
import styles from '../styles/components.module.css'
import { GiPaw, GiNinjaHeroicStance } from "react-icons/gi";

const animales = ['pequeño', 'mediano', 'grande', 'super grande']
const artes_marciales = ['rango 1', 'rango 2', 'rango 3','rango 4']
  

const LimitTypeInput = (props) => {

  const type = props?.type === 'animales' ? animales : artes_marciales;

  
  return (
    <div>
    <FormControlStyle variant="filled" className='box' sx={{width: '100%', "& .MuiOutlinedInput-root.Mui-focused": {"& > fieldset": {borderColor: "orange"}}}}>
        <InputLabel>Tipo de limite</InputLabel>
        <Select
          name="limite"
          value={props.name ?? ''}
          label="Tipo de limite"
          onChange={props.onChange}
          startAdornment={
            <InputAdornment position="start">
             {props.type === 'animales' ? <GiPaw className={styles.icons}/> : <GiNinjaHeroicStance className={styles.icons}/>} 
            </InputAdornment>
          }
          MenuProps={MenuProps}
        >
          <MenuItem value={''}>Sin especificar</MenuItem>
          {
            type.map((element, index) => {
              const limit_type = element.charAt(0).toUpperCase() + element.slice(1)
              
              return (
                <MenuItem key={index} value={element}>{limit_type}</MenuItem>
              )
            })
          }
        </Select>
      </FormControlStyle>
      </div>
  )


}



export default LimitTypeInput;



const FormControlStyle = styled(FormControl)((props) => ({
  
  
  '& .MuiFormLabel-root.MuiInputLabel-root': { 
    transform: props.children[1].props.value ? 'translate(17px, 3px) scale(0.75)' : 'translate(50px, 15px) scale(1)', 
    transition: ".4s cubic-bezier(.25,.8,.5,1)",
    zIndex: '0'
    },

    '& .MuiFormLabel-root.MuiInputLabel-root.Mui-focused': {
      transform: 'translate(14px, -9px) scale(0.75)',
      transition: ".4s cubic-bezier(.25,.8,.5,1)"
    }, 
  }))


  const MenuProps = {
    PaperProps: {
     style: {
       backgroundColor: '#b65d32'
     },
   }, 
  };