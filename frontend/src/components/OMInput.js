import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import styles from '../styles/components.module.css'
import { styled } from '@mui/material/styles';
import { GiSwordman} from "react-icons/gi";




const OMInput = (props) => {

    return(
            <div className={styles.input__modify_display}>
              <FormControlStyle variant="standard" className="box" sx={{width: '100%', "& .MuiOutlinedInput-root.Mui-focused": {"& > fieldset": {borderColor: "orange"}}}}>
                <TextField onChange={props.onChange} value={props.name ?? ''} name='om' label="O.M" variant="filled" 
                sx={{
                  '& .MuiFilledInput-underline:before': { borderBottomColor: '#701010' },
                  '& .MuiFilledInput-underline:after': { borderBottomColor: '#701010' },
                }}
                onInput = {(e) =>{
                  e.target.value = e.target.value != '' ? e.target.value.toString().slice(0,4) : ''
                }}
                InputProps={{ 
                startAdornment: 
                    <InputAdornment position="start" required>
                      <GiSwordman className={styles.icons}/>
                    </InputAdornment>
                }}/>
                
              </FormControlStyle>  
          
            </div>
          );
    
}

export default OMInput;


const FormControlStyle = styled(FormControl)((props) => ({

  
  '& .MuiFormLabel-root.MuiInputLabel-root': { 
    transform: props.children.props.value ? 'translate(17px, 3px) scale(0.75)' : 'translate(45px, 15px) scale(1)',
    transition: ".4s cubic-bezier(.25,.8,.5,1)",
    zIndex: '0',
    },

    '& .MuiFormLabel-root.MuiInputLabel-root.Mui-focused': {
      transform: 'translate(14px, -9px) scale(0.75)',
      transition: ".4s cubic-bezier(.25,.8,.5,1)",
      color: '#A40000'
    },

    
    
  }))
