import { CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';


const Spinner = () => {
  return(
    <CCircularProgress  color="error" />
  )
}

export default Spinner;



const CCircularProgress = styled(CircularProgress)((props) => ({
  
  
  height: 10,
  borderRadius: 5,
  color: 'yellow'

  }))
