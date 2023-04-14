import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import ShieldIcon from '@mui/icons-material/Shield';
import styles from '../../styles/components.module.css'

const ArmorInput = (props) => {
    return(
            <div className={styles.input__layout}>
              <FormControl variant="standard" className="box" sx={{width: '100%', "& .MuiOutlinedInput-root.Mui-focused": {"& > fieldset": {borderColor: "orange"}}}}>
                <TextField onChange={props.onChange} name='armadura' label="Armadura" variant="outlined" InputProps={{ startAdornment: 
                    <InputAdornment position="start">
                      <ShieldIcon className={styles.icons}/>
                    </InputAdornment>
                }}/>
                
              </FormControl>
          
            </div>
          );
    
}

export default ArmorInput;