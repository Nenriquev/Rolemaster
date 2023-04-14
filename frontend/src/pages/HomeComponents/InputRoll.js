import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import CasinoIcon from '@mui/icons-material/Casino';
import styles from '../../styles/components.module.css'

const InputRoll = (props) => {
    return(
            <div>
              <FormControl variant="standard" className="box" sx={{width: '100%', "& .MuiOutlinedInput-root.Mui-focused": {"& > fieldset": {borderColor: "orange"}}}}>
                <TextField onChange={props.onChange} name='tirada' label="Tirada" variant="outlined" InputProps={{ startAdornment: 
                    <InputAdornment position="start" required>
                      <CasinoIcon className={styles.icons}/>
                    </InputAdornment>
                }}/>
                
              </FormControl>
          
            </div>
          );
    
}

export default InputRoll;
