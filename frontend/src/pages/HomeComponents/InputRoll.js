import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import styles from '../../styles/components.module.css'
import { GiPerspectiveDiceSixFacesThree } from "react-icons/gi";


const InputRoll = (props) => {
    return(
            <div className={`${styles.input__layout} ${styles.input__display}`}>
              <FormControl variant="standard" className="box" sx={{width: '100%', "& .MuiOutlinedInput-root.Mui-focused": {"& > fieldset": {borderColor: "orange"}}}}>
                <TextField onChange={props.onChange} name='tirada' label="Tirada" variant="outlined" InputProps={{ startAdornment: 
                    <InputAdornment position="start" required>
                      <GiPerspectiveDiceSixFacesThree className={styles.icons}/>
                    </InputAdornment>
                }}/>
                
              </FormControl>  
          
            </div>
          );
    
}

export default InputRoll;
