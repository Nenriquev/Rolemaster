import { CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';
import styles from '../../styles/components.module.css'


const Spinner = () => {
  return(
    <CCircularProgress className={styles.spinner} thickness={5} color="error" />
  )
}

export default Spinner;



const CCircularProgress = styled(CircularProgress)((props) => ({
  
  
  height: 10,
  borderRadius: 5,
  color: 'rgb(164, 14, 14)',

  }))
