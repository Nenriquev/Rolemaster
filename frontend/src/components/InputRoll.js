import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import styles from '../styles/components.module.css'
import { styled } from '@mui/material/styles';
import { GiPerspectiveDiceSixFacesThree } from "react-icons/gi";
import ErrorIcon from '@mui/icons-material/Error';




const InputRoll = (props) => {

  

    return(
            <div className={`${styles.input__layout} ${styles.input__display}`}>
              <FormControlStyle variant="standard" className="box" sx={{width: '100%' }}>
                <TextField onChange={props.onChange} value={props.name ?? ''} type='number' name='tirada' label="Tirada" variant="filled" 
                error={props.error}
                sx={{
                  '& .MuiFilledInput-underline:before': { borderBottomColor: '#701010' },
                  '& .MuiFilledInput-underline:after': { borderBottomColor: '#701010' },
                }}
                onInput = {(e) =>{
                  e.target.value = e.target.value != '' ? Math.max(0, parseInt(e.target.value) ).toString().slice(0,3) : ''
                }}
                inputProps={{
                  inputMode:'numeric'
                }}
                InputProps={{ 
                startAdornment: 
                    <InputAdornment position="start" required>
                      {props.error ? <ErrorIcon className={styles.error__icon}/> : <GiPerspectiveDiceSixFacesThree className={styles.icons}/>}
                    </InputAdornment>
                }}/>
                
              </FormControlStyle>  
          
            </div>
          );
    
}

export default InputRoll;


const FormControlStyle = styled(FormControl)((props) => ({

  
  '& .MuiFormLabel-root.MuiInputLabel-root': { 
    transform: props.children.props.value ? 'translate(17px, 3px) scale(0.75)' : 'translate(50px, 15px) scale(1)',
    transition: ".4s cubic-bezier(.25,.8,.5,1)",
    zIndex: '0',
    },

    '& .MuiFormLabel-root.MuiInputLabel-root.Mui-focused': {
      transform: 'translate(14px, -9px) scale(0.75)',
      transition: ".4s cubic-bezier(.25,.8,.5,1)",
      color: '#A40000'
    },

    '& .MuiFormLabel-root.MuiInputLabel-root.Mui-error':{
      color: '#af0303'
    }

    
    
  }))


