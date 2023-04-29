import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import styles from '../../styles/components.module.css'
import { styled } from '@mui/material/styles';
import { GiArrowScope } from "react-icons/gi";

const DistanceInput = (props) => {

    return(
        <div className={`${styles.input__layout} ${styles.input__display}`}>
          <FormControlStyle variant="standard" className="box" sx={{width: '100%', "& .MuiOutlinedInput-root.Mui-focused": {"& > fieldset": {borderColor: "orange"}}}}>
            <TextField onChange={props.onChange} value={props.name ?? ''} type='number' name='distancia' label="Distancia" variant="filled" 
            inputProps={{
                inputMode:'numeric'
            }}
            InputProps={{ 
            startAdornment: 
                <InputAdornment position="start" required>
                  <GiArrowScope className={styles.icons}/>
                </InputAdornment>
            }}/>
            
          </FormControlStyle>  
      
        </div>
      );


}

const FormControlStyle = styled(FormControl)((props) => ({

  
    '& .MuiFormLabel-root.MuiInputLabel-root': { 
      transform: props.children.props.value ? '' : 'translate(50px, 15px) scale(1)',
      transition: ".4s cubic-bezier(.25,.8,.5,1)",
      zIndex: '0',
      },
  
      '& .MuiFormLabel-root.MuiInputLabel-root.Mui-focused': {
        transform: 'translate(14px, -9px) scale(0.75)',
        transition: ".4s cubic-bezier(.25,.8,.5,1)",
        color: 'yellow'
      },
  
      
      
    }))
    

export default DistanceInput;