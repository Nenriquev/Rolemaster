import { useRef, useState } from 'react';
import Link from "next/link";
import { Box, InputLabel, MenuItem, FormControl, Select, Button, Alert} from '@mui/material'
import styles from '../styles/uploadFile.module.css'




function UploadFile() {


  const [file, setFile] = useState('');
  const [data, setData] = useState('');
  const [status, setStatus] = useState('');
  const [sheet, setSheet] = useState('');
  const category = useRef()
  var formdata = new FormData();


  const addTask = async (e) =>{
    e.preventDefault()

    
    var requestOptions = {
      method: 'POST',
      body: data,
      redirect: 'follow'
    };
    
   const response = await fetch("http://localhost:3000/api/upload", requestOptions)
      .catch(error => console.log('error', error));
    const message = await response.json()
    setStatus(message)
    setFile('') 

  }


  const handleFile = (e) => {
    if(e.target.files){
    setFile(e.target.files[0])
    let namefile = e.target.files[0]
    let extFile = namefile.name.split('.').pop()
      if(extFile !== 'xlsx'){
        setStatus({error: 'Archivo invalido'})
      }
      else{
        setStatus('')
      }

      if(formdata.get('file') == null){
        formdata.append("file", namefile);
        formdata.append("category", sheet);
      }
      else{
        formdata.set('file', namefile)
      }

      setData(formdata)
    }
    
  }

  
  const handleChange = (event) => {
    setSheet(event.target.value);
    if(formdata.get('category') == null){
      formdata.append("category", event.target.value);
      formdata.append("file", file);
    }
    else{
      formdata.set('category', event.target.value)
    }
    setData(formdata)
  };
  return (
    <div className={styles.container}>

      <div className={styles.home_btn}>
        <Link href='/'>🏠</Link>
      </div>
      
        <form className={styles.form} onSubmit={addTask}>
        <Box >
        <FormControl className={styles.box} sx={{width: '100%', "& .MuiOutlinedInput-root.Mui-focused": {"& > fieldset": {borderColor: "orange"}}}}>
          <InputLabel >Hoja a cargar</InputLabel>
          <Select
            ref={category}
            value={sheet}
            label="Hoja a cargar"
            onChange={handleChange}
          >
            <MenuItem value={'bonificadores'}>Bonificadores</MenuItem>
            <MenuItem value={'armas'}>Armas</MenuItem>
            <MenuItem value={'criticos'}>Criticos</MenuItem>
            <MenuItem value={'pifias'}>Pifias</MenuItem>
          </Select>
        </FormControl>
      </Box>
      
      <div className={styles.alert_container}>
          {status.error ?  <Alert variant="filled" severity="error">{status.error}</Alert> : null}
          {status.mensaje ? <Alert variant="filled" severity="success">{status.mensaje}</Alert>: null}
      </div>

      <div className={styles.select_file_btn}>
      <Button className={styles.file_btn} variant="contained" component="label">{file ? file.name : 'Seleccionar Archivo'}
        <input hidden type="file" onChange={handleFile} name="file"/>
      </Button>
      </div>
    
          <Button className={styles.upload_btn} type='submit' variant="contained" color="success">Cargar</Button>
        </form>
  
    </div>
  );
}

export default UploadFile;
