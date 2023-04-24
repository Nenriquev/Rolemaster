import { FormControl, InputLabel, Select, InputAdornment, MenuItem } from "@mui/material";
import { styled } from '@mui/material/styles';
import styles from '../../styles/components.module.css'
import { GiSwitchWeapon } from "react-icons/gi";


const WeaponType = (props) => {
    
    return(
        <FormControlStyle variant="filled" className="box" sx={{width: '100%', "& .MuiOutlinedInput-root.Mui-focused": {"& > fieldset": {borderColor: "orange"}} }}>
        <InputLabel>Tipo de arma</InputLabel>
        <Select
          value={props.selectedCategory?.weapon ?? ''} 
          defaultValue={''}
          label="Tipo de arma"
          onChange={props.onChange}
          startAdornment={
            <InputAdornment position="start">
             <GiSwitchWeapon className={styles.icons}/> 
            </InputAdornment>
          }
        >
          <MenuItem value={'1 mano'}>1 Mano</MenuItem>
          <MenuItem value={'contundentes'}>Contundentes</MenuItem>
          <MenuItem value={'magia ofensiva'}>Magia ofensiva</MenuItem>
          <MenuItem value={'animales'}>Animales</MenuItem>
          <MenuItem value={'artes marciales'}>Artes marciales</MenuItem>
        </Select>
      </FormControlStyle>
    )
}


export default WeaponType;


const FormControlStyle = styled(FormControl)((props) => ({
  
    '& .MuiFormLabel-root.MuiInputLabel-root': { 
      transform: props.children[1].props.value ? '' : 'translate(50px, 15px) scale(1)', 
      transition: ".4s cubic-bezier(.25,.8,.5,1)",  
      zIndex: '0'
      },
  
      '& .MuiFormLabel-root.MuiInputLabel-root.Mui-focused': {
        transform: 'translate(14px, -9px) scale(0.75)',
        transition: ".4s cubic-bezier(.25,.8,.5,1)"
      }, 
  
    }))