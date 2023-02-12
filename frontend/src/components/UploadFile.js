import { useRef, useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';




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
    <div className="App">
      <header className="App-header">
        <form className="formulario" onSubmit={addTask}>
        <Box>
        <FormControl sx={{width: '100%'}}>
          <InputLabel id="demo-simple-select-label">Hoja a cargar</InputLabel>
          <Select
            ref={category}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={sheet}
            label="Hoja a cargar"
            onChange={handleChange}
          >
            <MenuItem value={'criticos'}>Criticos</MenuItem>
            <MenuItem value={'armas'}>Armas</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
      </Box>
          <input type="file" onChange={handleFile} name="file" />
          {status.error ? (
            <h1 style={{ color: "red" }}>{status.error}</h1>
          ) : (
            <h1 style={{ color: "green" }}>{status.mensaje}</h1>
          )}
          <button type="submit">Submit</button>
        </form>
      </header>
    </div>
  );
}

export default UploadFile;
