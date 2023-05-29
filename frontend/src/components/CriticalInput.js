import { Button, FormControl, TextField, InputAdornment, Zoom } from "@mui/material";
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import { styled } from "@mui/material/styles";
import { useEffect, useState } from "react";
import styles from "../styles/components.module.css";





const CriticalInput = ({ critical, onChange, description, id, value }) => {

  const componente = (<p className={styles.description}>{description[id]?.critic}</p>)
  const [checked, setChecked] = useState(false);
  
  const handleChange = () => {
    setChecked(false);
  }

  useEffect(()=> {
    setChecked(true)
  },[description])



  return (
    <div className={styles.critical_container}>
      <div className={styles.critical_input}>
        <FormControlStyle
          variant="standard"
          className="box"
          sx={{
            width: "100px",
            "& .MuiOutlinedInput-root.Mui-focused": {
              "& > fieldset": { borderColor: "orange" },
            },
          }}
        >
          <TextField
            onChange={onChange}
            type="number"
            value={value[id] ?? ""}
            name={id}
            label={`${critical[id].type}`}
            variant="filled"
            size="small"
            sx={{
              "& .MuiFilledInput-underline:before": {
                borderBottomColor: "#701010",
              },
              "& .MuiFilledInput-underline:after": {
                borderBottomColor: "#701010",
              },
            }}
            onInput={(e) => {
              e.target.value =
                e.target.value != ""
                  ? Math.max(0, parseInt(e.target.value)).toString().slice(0, 3)
                  : "";
            }}
            inputProps={{
              inputMode: "numeric",
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment className={styles.icons} position="start" required>
                   {critical[id]?.icon}
                </InputAdornment>
              ),
            }}
          />
        </FormControlStyle>

        <Button onClick={handleChange} type="submit" variant="contained" color="success"><DoneOutlineIcon /></Button>
      </div>

      <Zoom in={checked}>{componente}</Zoom>
    </div>
  );
};

const FormControlStyle = styled(FormControl)((props) => ({
  "& .MuiFormLabel-root.MuiInputLabel-root": {
    transform: props.children.props.value
      ? "translate(5px,-14px) scale(0.75)"
      : "translate(4px,-14px) scale(0.75)",
    transition: ".4s cubic-bezier(.25,.8,.5,1)",
    color: "#A40000",
    zIndex: "0",
    fontFamily: 'Dragon Hunter',
    maxWidth: '250px',
    fontWeight: 'bold',
    paddingTop: '0px'
  },

  "& .MuiFormLabel-root.MuiInputLabel-root.Mui-focused": {
    transform: "translate(5px,-20px) scale(1)",
    transition: ".4s cubic-bezier(.25,.8,.5,1)",
    color: "#A40000",
  },
}));

export default CriticalInput;
