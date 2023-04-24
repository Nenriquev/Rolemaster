import { FormControl, InputLabel, Select, MenuItem, InputAdornment } from "@mui/material";
import styles from '../../styles/components.module.css'
import { GiSharpAxe } from "react-icons/gi";
import { styled } from '@mui/material/styles';



const WeaponsInput = (props) => {

  return (
    <div className={styles.input__layout}>
      
        <FormControlStyle variant="filled" className='box' sx={{width: '100%', "& .MuiOutlinedInput-root.Mui-focused": {"& > fieldset": {borderColor: "orange"}}}}>
          <InputLabel>Arma</InputLabel>
            <Select
              name="arma"
              value={props.name ?? ''}
              label="Arma"
              onChange={props.onChange}
              startAdornment={
                <InputAdornment position="start">
                  <GiSharpAxe className={styles.icons}/>
                </InputAdornment>
              }
              MenuProps={MenuProps}
            >
              {props.weapons.map((item, index) => {
            return ( <MenuItem key={index} value={item.arma}>{item.arma}</MenuItem> )
            })}
            </Select>

        </FormControlStyle>
        </div>
  )

}

export default WeaponsInput;


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