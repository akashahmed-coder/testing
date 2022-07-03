import './App.css';
import Pages from './components/mainpage/Page'
import {BrowserRouter} from 'react-router-dom'


function App() {
  return (
  <BrowserRouter>
  
    <Pages/>
  </BrowserRouter>
  );
}

export default App;
