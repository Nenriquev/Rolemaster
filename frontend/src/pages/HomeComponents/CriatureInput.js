import { FormControl, InputLabel, Select, MenuItem, InputAdornment } from "@mui/material";
import styles from '../../styles/components.module.css'
import { GiSpikedDragonHead } from "react-icons/gi";
import { styled } from '@mui/material/styles';


const CriatureInput = (props) => {
  
  return (
    <div className={styles.input__layout}>
    <FormControlStyle variant="filled" className='box' sx={{width: '100%', "& .MuiOutlinedInput-root.Mui-focused": {"& > fieldset": {borderColor: "orange"}}}}>
        <InputLabel>Tipo de criatura</InputLabel>
        <Select
          name="criatura"
          value={props.name ?? ''}
          label="Tipo de criatura"
          onChange={props.onChange}
          startAdornment={
            <InputAdornment position="start">
              <GiSpikedDragonHead className={styles.icons}/>
            </InputAdornment>
          }
          MenuProps={MenuProps}
        >
          <MenuItem value={''}>Sin especificar</MenuItem>
          <MenuItem value={1}>1 grado</MenuItem>
          <MenuItem value={2}>2 grados</MenuItem>
          <MenuItem value={props.category.weapon === 'magia ofensiva' ? 'GM' : 'G'}>Grandes</MenuItem>
          <MenuItem value={props.category.weapon === 'magia ofensiva' ? 'LM' : 'L'}>Super Grandes</MenuItem>
        </Select>
      </FormControlStyle>
      </div>
  )


}



export default CriatureInput;


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