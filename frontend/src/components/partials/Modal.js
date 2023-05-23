import {Backdrop , TableContainer, Table, TableRow, TableCell, TableBody}  from '@mui/material';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import styles from '../../styles/components.module.css'
import { useState } from 'react';



function createData(type, armours) {
  return { type, armours};
}

const rows = [
  createData('Sin Armadura',['ta1','ta2','ta3','ta4','ta5']),
  createData('Camison', ['ta6','ta7','ta8','ta9','ta10']),
  createData('Coraza', ['ta11','ta12','ta13','ta14','ta15']),
  createData('Bla Ble', ['ta16','ta17','ta18','ta19','ta20']),
  
];

const TransitionsModal = (props) => { 


  const [selectedOption, setSelectedOption] = useState('')

  
  const handleChange = (e) => {

      setSelectedOption(e.target.id)
  }

  

  return (
    <div>
      <Modal
        open={props.handleOpen}
        onClose={props.handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={props.handleOpen}>
          <Box sx={style}>
            <TableContainer sx={style_table}>
              <form value={props.value ?? ""} onChange={props.onChange}>
                <Table>
                  <TableBody>
                    {rows.map((row, index) => (
                      <TableRow
                        key={index}
                        sx={{
                          "&:last-child td": { border: 0 },
                        }}
                      >
                        <TableCell sx={style_row} component="th" scope="row">
                          {row.type}
                        </TableCell>
                        <TableCell sx={style_cell}>
                          {row?.armours?.map((element,index) => (
                            
                            <div key={index+10}>
                              <input onChange={handleChange} onClick={props.handleClose} className={styles.input__radio} type="radio" name="armadura"
                                id={element}
                                value={element}
                              />
                              <label
                                style={{ backgroundColor: selectedOption === element ? "#A40000" : "#5733007b"}}
                                className={styles.label__radio}
                                htmlFor={element}
                              >
                                {element.toUpperCase()}
                              </label>
                            </div>
                          ))}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </form>
            </TableContainer>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: '#8d3725',
  border: '2px solid #000',
  boxShadow: 23,
  pl: 2,
  pr:2,
  pb:2,
};

const style_cell = {
  display: 'flex',
  pl: 1,
  pr: 1,
  justifyContent: 'space-evenly',
  borderBottom: 0,
}


const style_row = {
  display:'flex',
  justifyContent: 'center',
  borderBottom: '0px',
  bgcolor: '#8d3725',
  p: 0.6,
}

const style_table = {
  bgcolor: '#9d8b62'
}





export default TransitionsModal;