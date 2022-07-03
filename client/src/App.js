import React from "react";
import {BrowserRouter as Router} from 'react-router-dom'
import {DataProvider} from "./GlobleState"; 
import Header from "./component/headers/Header";
import MainPages from "./component/mainpages/Pages";
function App() {
  return (
  
         <DataProvider>
           <Router>
           <div className="App">
              <Header/>
              <MainPages/>
           </div>
           </Router>
         </DataProvider>
  
  );
}

export default App;
