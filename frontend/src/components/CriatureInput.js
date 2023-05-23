import { FormControl, InputLabel, Select, MenuItem, InputAdornment } from "@mui/material";
import styles from '../styles/components.module.css'
import { GiSpikedDragonHead } from "react-icons/gi";
import { styled } from '@mui/material/styles';


const CriatureInput = (props) => {
  
  return (
    <div className={styles.input__layout}>
    <FormControlStyle variant="filled" className='box' sx={{width: '100%'}}>
        <InputLabel>Tipo de criatura</InputLabel>
        <Select
          sx={{":before": { borderBottomColor: "#701010" }, ":after": { borderBottomColor: "#701010" }}}
          name="criatura"
          value={props.name ?? 'Normal'}
          label="Tipo de criatura"
          onChange={props.onChange}
          startAdornment={
            <InputAdornment position="start">
              <GiSpikedDragonHead className={styles.icons}/>
            </InputAdornment>
          }
          MenuProps={MenuProps}
        >
          <MenuItem value={'Normal'} selected>Normal</MenuItem>
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
      transform: props.children[1].props.value ? 'translate(17px, 3px) scale(0.75)' : 'translate(40px, 15px) scale(1)', 
      transition: ".4s cubic-bezier(.25,.8,.5,1)",
      zIndex: '0'
      },
  
      '& .MuiFormLabel-root.MuiInputLabel-root.Mui-focused': {
        transform: 'translate(14px, -9px) scale(0.75)',
        transition: ".4s cubic-bezier(.25,.8,.5,1)",
        color: '#A40000'
      },   
    }))


    const MenuProps = {
      PaperProps: {
       style: {
         backgroundColor: '#b65d32'
       },
     }, 
    };