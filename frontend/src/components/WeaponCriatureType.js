import { FormControl, InputLabel, Select, MenuItem, InputAdornment } from "@mui/material";
import { styled } from '@mui/material/styles';
import styles from '../styles/components.module.css'
import { GiMagicAxe } from "react-icons/gi";




const WeaponCriatureType = (props) => {
  
  return (
    <div className={styles.input__layout}>
          <FormControlStyle variant="filled" className='box' sx={{width: '100%', "& .MuiOutlinedInput-root.Mui-focused": {"& > fieldset": {borderColor: "orange"}}}}>
            <InputLabel>Tipo de Arma</InputLabel>
            { props.category.weapon !== 'magia ofensiva' ?
              <Select
                name="weapon_type"
                value={props.name ?? ''}
                label="Tipo de Arma"
                onChange={props.onChange}
                startAdornment={
                  <InputAdornment position="start">
                   <GiMagicAxe className={styles.icons}/>
                  </InputAdornment>
                }
                MenuProps={MenuProps}
              > 
                  <MenuItem value={''}>Sin especificar</MenuItem>
                  <MenuItem value={'normal'}>Normal</MenuItem>
                  <MenuItem value={'especial'}>Especial</MenuItem>
                  <MenuItem value={'magica'}>Magica</MenuItem>
                  <MenuItem value={'mithril'}>Mithril</MenuItem>
                  <MenuItem value={'arma sagrada'}>Arma sagrada</MenuItem>

              </Select> : 
              <Select
              name="weapon_type"
              value={props.name ?? ''}
              label="Tipo de Arma"
              onChange={props.onChange}
              startAdornment={
                <InputAdornment position="start">
                 <GiMagicAxe className={styles.icons}/>
                </InputAdornment>
              }
              MenuProps={MenuProps}
            > 
                <MenuItem value={''}>Sin especificar</MenuItem>
                <MenuItem value={'normal'}>Normal</MenuItem>
                <MenuItem value={'especial'}>Especial</MenuItem>

            </Select>
            }
          </FormControlStyle>
          </div> 
  )
}

export default WeaponCriatureType;



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

  const MenuProps = {
    PaperProps: {
     style: {
       backgroundColor: '#b65d32'
     },
   }, 
  };