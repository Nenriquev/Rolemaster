import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import styles from '../../styles/components.module.css'

const CriatureInput = (props) => {
  
  return (
    <div className={styles.input__layout}>
    <FormControl className='box' sx={{width: '100%', "& .MuiOutlinedInput-root.Mui-focused": {"& > fieldset": {borderColor: "orange"}}}}>
        <InputLabel>Tipo de criatura</InputLabel>
        <Select
          name="criatura"
          value={props.name ?? ''}
          label="Tipo de criatura"
          onChange={props.onChange}
        >
          <MenuItem value={''}>Sin especificar</MenuItem>
          <MenuItem value={1}>1 grado</MenuItem>
          <MenuItem value={2}>2 grados</MenuItem>
          <MenuItem value={props.category.weapon === 'magia ofensiva' ? 'GM' : 'G'}>Grandes</MenuItem>
          <MenuItem value={props.category.weapon === 'magia ofensiva' ? 'LM' : 'L'}>Super Grandes</MenuItem>
        </Select>
      </FormControl>
      </div>
  )


}



export default CriatureInput;