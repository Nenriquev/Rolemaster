import {InputAdornment, FormControl, Select, MenuItem, TextField} from '@mui/material';
import { useState } from 'react';
import styles from '../styles/components.module.css'
import { styled } from '@mui/material/styles';
import { GiChestArmor } from "react-icons/gi";
import ErrorIcon from '@mui/icons-material/Error';
import TransitionsModal from './partials/Modal';



const ArmorInput = (props) => {

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);



    return (
      <div className={`${styles.input__layout} ${styles.input__display}`}>
        <FormControlStyle
          variant="filled"
          className="box"
          sx={{ width: "100%" }}
        >
          <TextField error={props.error} onClick={handleOpen} value={props.name ?? ""} label="Armadura" variant="filled"
            sx={{
              "& .MuiFilledInput-underline:before": {
                borderBottomColor: "#701010",
              },
              "& .MuiFilledInput-underline:after": {
                borderBottomColor: "#701010",
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start" required>
                  {props.error ? <ErrorIcon className={styles.error__icon}/> : <GiChestArmor className={styles.icons} />}
                </InputAdornment>
              ),
            }}
          />

      
        </FormControlStyle>

        <TransitionsModal handleOpen={open} handleClose={handleClose} onChange={props.onChange} value={props.name}/>

      </div>
    );
    
}

export default ArmorInput;

const FormControlStyle = styled(FormControl)((props) => ({

  
  '& .MuiFormLabel-root.MuiInputLabel-root': { 
    transform: props.children.props.value == '' ? 'translate(42px, 15px) scale(1)' : 'translate(17px, 3px) scale(0.75)',
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