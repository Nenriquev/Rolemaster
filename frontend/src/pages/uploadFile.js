import { useRef, useState } from 'react';
import Head from "next/head";
import { motion } from "framer-motion";
import FormData from 'form-data';
import Link from "next/link";
import { Box, InputLabel, MenuItem, FormControl, Select, Button, Alert, InputAdornment} from '@mui/material'
import { styled } from '@mui/material/styles';
import styles from '../styles/uploadFile.module.css'  
import { GiCloudUpload } from "react-icons/gi";
import Header from '@/components/partials/Header';

const apiUrl = process.env.NEXT_PUBLIC_API_URL

const show = {
  opacity: 1,
  display: "block",
};

const hide = {
  opacity: 0,
  transitionEnd: {
    display: "none"
  }
};



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
    
   const response = await fetch(`${apiUrl}/api/upload`, requestOptions)
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
    <div className={styles.main}>
        <Head>
          <title>Rolemaster - Subir archivo</title>
        </Head>

      <Header/>

      <div className={styles.container}>
        <div className={styles.home_btn}>
          <Link href='/'>🏠</Link>
        </div>
      
          <div className={styles.form_container}>
            <form className={styles.form} onSubmit={addTask}>
            <Box >
            <FormControlStyle className='box' sx={{width: '100%'}}>
              <InputLabel >Hoja a cargar</InputLabel>
              <Select
                ref={category}
                value={sheet}
                label="Hoja a cargar"
                onChange={handleChange}
                startAdornment={
                  <InputAdornment position="start">
                   <GiCloudUpload className={styles.icons}/>
                  </InputAdornment>
                }
              >
                <MenuItem value={'bonificadores'}>Bonificadores</MenuItem>
                <MenuItem value={'armas'}>Armas</MenuItem>
                <MenuItem value={'criticos'}>Criticos</MenuItem>
                <MenuItem value={'pifias'}>Pifias</MenuItem>
                <MenuItem value={'modificadores alcance'}>Modificadores por alcance</MenuItem>
              </Select>
            </FormControlStyle>
                    </Box>
                  
                    <div className={styles.alert_container}>
                      <motion.div transition={{ type: "spring"}} animate={status.error ? show : hide}>
                        <Alert variant="filled" severity="error">{status.error}</Alert>
                      </motion.div>
              
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
      </div>
    </div>
  );
}

export default UploadFile;


const FormControlStyle = styled(FormControl)((props) => ({
  
  
  '& .MuiFormLabel-root.MuiInputLabel-root': { 
    transform: props.children[1].props.value ? '' : 'translate(50px, 15px) scale(1)', 
    transition: ".4s cubic-bezier(.25,.8,.5,1)",
    zIndex: '0',
    },

    '& .MuiFormLabel-root.MuiInputLabel-root.Mui-focused': {
      transform: 'translate(14px, -9px) scale(0.75)',
      transition: ".4s cubic-bezier(.25,.8,.5,1)",
      color: '#A40000'
    }, 

    "& .MuiOutlinedInput-root.Mui-focused": {"& > fieldset": {borderColor: "#A40000"}}

    
    
  }))



  