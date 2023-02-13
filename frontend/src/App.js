import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './components/Home';
import UploadFile from './components/UploadFile'





function App() {
  return (
  <Router>
    <Routes>
      <Route exact path="/" element={<Home/>}/>
      <Route path="/uploadfile" element={<UploadFile/>}/>
    </Routes>
  </Router>
  );
}


  



export default App;
