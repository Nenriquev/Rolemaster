import { FormControl, InputLabel, Select, MenuItem, InputAdornment } from "@mui/material";
import styles from '../../styles/components.module.css'
import { GiPaw, GiNinjaHeroicStance } from "react-icons/gi";

const animales = ['pequeño', 'mediano', 'grande', 'super grande']
const artes_marciales = ['rango 1', 'rango 2', 'rango 3','rango 4']
  

const LimitTypeInput = (props) => {

  const type = props?.type === 'animales' ? animales : artes_marciales;

  
  return (
    <div>
    <FormControl className='box' sx={{width: '100%', "& .MuiOutlinedInput-root.Mui-focused": {"& > fieldset": {borderColor: "orange"}}}}>
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
      </FormControl>
      </div>
  )


}



export default LimitTypeInput;