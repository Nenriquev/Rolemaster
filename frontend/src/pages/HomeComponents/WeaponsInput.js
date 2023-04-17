import { FormControl, InputLabel, Select, MenuItem, InputAdornment } from "@mui/material";
import styles from '../../styles/components.module.css'
import { GiSharpAxe } from "react-icons/gi";


const WeaponsInput = (props) => {

  return (
    <div className={styles.input__layout}>
      
        <FormControl className='box' sx={{width: '100%', "& .MuiOutlinedInput-root.Mui-focused": {"& > fieldset": {borderColor: "orange"}}}}>
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
              
            >
              {props.weapons.map((item, index) => {
            return ( <MenuItem key={index} value={item.arma}>{item.arma}</MenuItem> )
            })}
            </Select>

        </FormControl>
        </div>
  )

}

export default WeaponsInput;