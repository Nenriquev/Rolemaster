import { useRef, useState } from 'react';
import './css/uploadFile.css'
import { Box, InputLabel, MenuItem, FormControl, Select, Button, Alert} from '@mui/material'




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
    
   const response = await fetch("/upload", requestOptions)
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
    <div className="container">
      
        <form className="formulario" onSubmit={addTask}>
        <Box >
        <FormControl className='box' sx={{width: '100%'}}>
          <InputLabel id="demo-simple-select-label">Hoja a cargar</InputLabel>
          <Select
            ref={category}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={sheet}
            label="Hoja a cargar"
            onChange={handleChange}
          >
            <MenuItem value={'bonificadores'}>Bonificadores</MenuItem>
            <MenuItem value={'armas'}>Armas</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Button variant="contained" component="label">{file ? file.name : 'Seleccionar Archivo'}
        <input hidden type="file" onChange={handleFile} name="file"/>
      </Button>
          {status.error ?  <Alert variant="filled" severity="error">{status.error}</Alert> : null}
          {status.mensaje ? <Alert variant="filled" severity="success">{status.mensaje}</Alert>: null}
          <Button type='submit' variant="contained" color="success">Cargar</Button>
        </form>
  
    </div>
  );
}

export default UploadFile;
