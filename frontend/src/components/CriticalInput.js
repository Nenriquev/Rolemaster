import { Button, FormControl, TextField, InputAdornment } from "@mui/material";
import styles from "../styles/components.module.css";
import { styled } from "@mui/material/styles";

const CriticalInput = ({ critical, onChange, description, id, value }) => {
  return (
    <div>
      <div>
        <FormControlStyle
          variant="standard"
          className="box"
          sx={{
            width: "40%",
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
            label={critical[id]}
            variant="filled"
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
                <InputAdornment position="start" required>
                  {/* <GiSwordman className={styles.icons}/> */}
                </InputAdornment>
              ),
            }}
          />
        </FormControlStyle>

        <Button type="submit" variant="contained" color="success">Tirar</Button>
      </div>
      <h2 className={styles.description}>{description[id]?.critic}</h2>
    </div>
  );
};

const FormControlStyle = styled(FormControl)((props) => ({
  "& .MuiFormLabel-root.MuiInputLabel-root": {
    transform: props.children.props.value
      ? "translate(17px, 3px) scale(0.75)"
      : "translate(45px, 15px) scale(1)",
    transition: ".4s cubic-bezier(.25,.8,.5,1)",
    zIndex: "0",
  },

  "& .MuiFormLabel-root.MuiInputLabel-root.Mui-focused": {
    transform: "translate(14px, -9px) scale(0.75)",
    transition: ".4s cubic-bezier(.25,.8,.5,1)",
    color: "#A40000",
  },
}));

export default CriticalInput;
