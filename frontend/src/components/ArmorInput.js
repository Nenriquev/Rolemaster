import {InputAdornment, FormControl, Select, MenuItem} from '@mui/material';
import styles from '../styles/components.module.css'
import { styled } from '@mui/material/styles';
import { GiChestArmor } from "react-icons/gi";
import { InputLabel } from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';


const armour = ['ta1','ta2','ta3','ta4','ta5','ta6','ta7','ta8','ta9','ta10','ta11','ta12','ta13','ta14','ta15','ta16','ta17','ta18','ta19','ta20']
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
   PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 180,
      backgroundColor: '#b65d32'
    },
  }, 
};

const ArmorInput = (props) => {
    return(
            <div className={`${styles.input__layout} ${styles.input__display}`}>
              <FormControlStyle 
                variant="filled" 
                error={props.error}
                className="box" 
                sx={{width: '100%'}}

              >
                    
                <InputLabel>Armadura</InputLabel>
                <Select
                  sx={{':before': { borderBottomColor: '#701010' }, ':after': { borderBottomColor: '#701010' },}}
                  name="armadura"
                  value={props.name ?? ''}
                  label="Armadura"
                  onChange={props.onChange}
                  startAdornment={
                    <InputAdornment position="start">
                       {props.error ? <ErrorIcon className={styles.error__icon}/> : <GiChestArmor className={styles.icons}/>}
                    </InputAdornment>
                  }
                  MenuProps={MenuProps}
                >
                <MenuItem value={''}>Sin especificar</MenuItem>
                {
                  armour.map((element, index) => {
                    const menuItem = element.toLocaleUpperCase()
                    return (
                      <MenuItem key={index} value={element}>{menuItem}</MenuItem>
                    )
                  })
                }
               </Select>
              </FormControlStyle>
          
            </div>
          );
    
}

export default ArmorInput;

const FormControlStyle = styled(FormControl)((props) => ({

  
  '& .MuiFormLabel-root.MuiInputLabel-root': { 
    transform: props.children[1].props.value == '' ? 'translate(42px, 15px) scale(1)' : 'translate(17px, 3px) scale(0.75)',
    transition: ".4s cubic-bezier(.25,.8,.5,1)",
    zIndex: '0',
    },

    '& .MuiFormLabel-root.MuiInputLabel-root.Mui-focused': {
      transform: 'translate(14px, -9px) scale(0.75)',
      transition: ".4s cubic-bezier(.25,.8,.5,1)",
      color: '#A40000'
    },

    '& .MuiFilledInput-root & fieldset':{
      
    },

    


    '& .MuiFormLabel-root.MuiInputLabel-root.Mui-error':{
      color: '#af0303'
    }


    
  }))