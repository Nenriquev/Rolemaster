import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const WeaponCriatureType = (props) => {
  
  return (
    <div>
          <FormControl className='box' sx={{width: '100%', "& .MuiOutlinedInput-root.Mui-focused": {"& > fieldset": {borderColor: "orange"}}}}>
            <InputLabel>Tipo de Arma</InputLabel>
            { props.category.weapon !== 'magia ofensiva' ?
              <Select
                name="weapon_type"
                value={props.name ?? ''}
                label="Tipo de Arma"
                onChange={props.onChange}
              > 
                  <MenuItem value={''}>Sin especificar</MenuItem>
                  <MenuItem value={'normal'}>Normal</MenuItem>
                  <MenuItem value={'especial'}>Especial</MenuItem>
                  <MenuItem value={'magica'}>Magica</MenuItem>
                  <MenuItem value={'mithril'}>Mithril</MenuItem>
                  <MenuItem value={'arma sagrada'}>Arma sagrada</MenuItem>

              </Select> : 
              <Select
              name="weapon_type"
              value={props.name ?? ''}
              label="Tipo de Arma"
              onChange={props.onChange}
            > 
                <MenuItem value={''}>Sin especificar</MenuItem>
                <MenuItem value={'normal'}>Normal</MenuItem>
                <MenuItem value={'especial'}>Especial</MenuItem>

            </Select>
            }
          </FormControl>
          </div> 
  )
}

export default WeaponCriatureType;