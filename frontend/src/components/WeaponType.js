import { FormControl, InputLabel, Select, InputAdornment, MenuItem } from "@mui/material";
import { styled } from '@mui/material/styles';
import styles from '../styles/components.module.css'
import { GiSwitchWeapon } from "react-icons/gi";



const WeaponType = (props) => {
    
    return(
      <div className={styles.input__layout}>
        <FormControlStyle variant="filled" className="box" sx={{width: '100%', "& .MuiOutlinedInput-root.Mui-focused": {"& > fieldset": {borderColor: "orange"}} }}>
        <InputLabel>Tipo de arma</InputLabel>
        <Select
          sx={{
            ":before": { borderBottomColor: "#701010" },
            ":after": { borderBottomColor: "#701010" },
          }}
          value={props.selectedCategory?.weapon ?? ''} 
          defaultValue={''}
          label="Tipo de arma"
          onChange={props.onChange}
          startAdornment={
            <InputAdornment position="start">
             <GiSwitchWeapon className={styles.icons}/> 
            </InputAdornment>
          }
          MenuProps={MenuProps}
        >
          <MenuItem value={'1 mano'}>1 Mano</MenuItem>
          <MenuItem value={'contundentes'}>Contundentes</MenuItem>
          <MenuItem value={'magia ofensiva'}>Magia ofensiva</MenuItem>
          <MenuItem value={'animales'}>Animales</MenuItem>
          <MenuItem value={'artes marciales'}>Artes marciales</MenuItem>
        </Select>
      </FormControlStyle>
      </div>
    )
}


export default WeaponType;


const FormControlStyle = styled(FormControl)((props) => ({
  
    '& .MuiFormLabel-root.MuiInputLabel-root': { 
      transform: props.children[1].props.value ? 'translate(17px, 3px) scale(0.75)' : 'translate(50px, 15px) scale(1)', 
      transition: ".4s cubic-bezier(.25,.8,.5,1)",  
      zIndex: '0'
      },
  
      '& .MuiFormLabel-root.MuiInputLabel-root.Mui-focused': {
        transform: 'translate(14px, -9px) scale(0.75)',
        transition: ".4s cubic-bezier(.25,.8,.5,1)",
        color: '#A40000'
      }, 
  
    }))

    const MenuProps = {
      PaperProps: {
       style: {
         backgroundColor: '#b65d32'
       },
     }, 
    };
    